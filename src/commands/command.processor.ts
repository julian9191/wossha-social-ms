import * as Express from "express";
import { ICommandSerializer } from "./Icommand.serializer";
import { ICommand } from "./icommand";
import { CommandSerializers } from "./command.serializers";
import { UserSessionInfo } from "../dto/user.session.info";
import { CommandResult } from "./command.result";
import { Event } from "../infraestructure/event/event";
import { ControllerWrapper } from "../resources/controller.wrapper";
var AWS = require('aws-sdk');

var sqs = new AWS.SQS({region : 'us-east-1'});
const router = Express.Router();
const PREFIX : string = "/social";
const commandSerializers: CommandSerializers = new CommandSerializers();

router.post(PREFIX+"/commands", async (req: Express.Request, res: Express.Response) => {
    try {
        const data = req.body;

        let cs: ICommandSerializer<any> = commandSerializers.get(data.commandName);;
        let command: ICommand<any> = cs.deserialize(data);
        /*let userSessionInfo: UserSessionInfo = new UserSessionInfo(req.header("firstName"), 
            req.header("lastName"), req.header("profilePicture"), 
            req.header("username"));*/
        let userSessionInfo: UserSessionInfo = new UserSessionInfo("julian", 
            "Giraldo", "29f794fd-8eca-11e9-a116-6fcd3081ca34", 
            "juliancho9191");
        command.setSesionInfo(userSessionInfo);
        let result: CommandResult = await command.execute();

        console.log("number of events: "+result.events.length);
			
		//await pushMessageToSQS(result.events);

        res.status(200).json(ControllerWrapper.wrapMessaje(result.message, result.response));

    } catch(error) {
        console.log("/////////////// llega al catch");
        res.status(500).json(ControllerWrapper.wrapMessaje(error+"", null))
    }
});

async function pushMessageToSQS(events: Event[]){

    for (const event of events) {
        let message = JSON.stringify(event);
        try {
            //let queueName = properties.getString("EVENT." + event.name + ".QUEUES");
            let sqsPayload = {
              MessageBody: message,
              QueueUrl: "https://sqs.us-east-1.amazonaws.com/954592372276/example-queue"
            };
            await sqs.sendMessage(sqsPayload).promise();
        
            console.log("messages sent: "+message);
        }catch (err) {
            console.error("error sending the message: "+message+": "+err);
        }

    }
}

export default router;