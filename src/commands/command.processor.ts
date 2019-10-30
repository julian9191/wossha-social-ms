import * as Express from "express";
import { CommandSerializers } from "./command.serializers";
import { UserSessionInfo } from "wossha-msbase-lib";
import { CommandResult, ICommand, ICommandSerializer } from "wossha-msbase-lib";
import { Event } from "wossha-jsonevents-lib";
import { ControllerWrapper } from "wossha-msbase-lib";
import { Globals } from "../globals";
var AWS = require('aws-sdk');

var sqs = new AWS.SQS({region : 'us-east-1'});
const router = Express.Router();
const PREFIX : string = "/social";
const commandSerializers: CommandSerializers = new CommandSerializers();

router.post(PREFIX+"/commands", async (req: /*Express.Request*/any, res: Express.Response) => {
    try {
        const data = req.body;

        let cs: ICommandSerializer<any> = commandSerializers.get(data.commandName);;
        let command: ICommand<any> = cs.deserialize(data);
        let userSessionInfo: UserSessionInfo = req.authorizer;

        command.setSesionInfo(userSessionInfo);
        let result: CommandResult = await command.execute();

        console.log("number of events: "+result.getEvents().length);
			
		await pushMessageToSQS(result.getEvents());

        res.status(200).json(ControllerWrapper.wrapMessaje(result.getMessage(), result.getResponse()));

    } catch(error) {
        console.error(error);
        res.status(500).json(ControllerWrapper.wrapMessaje(error+"", null))
    }
});

async function pushMessageToSQS(events: Event[]){
    
    for (const event of events) {
        let message = JSON.stringify(event);
        let queueName = Globals.getQueuesMap("EVT." + event.name);
        try {
            let sqsPayload = {
              MessageBody: message,
              QueueUrl: `https://sqs.${Globals.LAMBDA_REGION}.amazonaws.com/${Globals.AWS_ACCOUNT_ID}/${queueName}`
            };
            await sqs.sendMessage(sqsPayload).promise();
        
            console.log(`messages sent to queue ${queueName}: ${message}`);
        }catch (err) {
            console.error(`error sending the message to queue ${queueName}: ${message}, with error: ${err}`);
        }

    }
}

export default router;