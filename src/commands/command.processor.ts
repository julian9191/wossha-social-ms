import * as Express from "express";
import { ICommandSerializer } from "./Icommand.serializer";
import { ICommand } from "./icommand";
import { CommandSerializers } from "./command.serializers";
var AWS = require('aws-sdk');

var sqs = new AWS.SQS({region : 'us-east-1'});
const router = Express.Router();
const PREFIX : string = "/social";
const commandSerializers: CommandSerializers = new CommandSerializers();

router.get(PREFIX+"/commands", async (req: Express.Request, res: Express.Response) => {
    try {
        const jsonMessage : string = req.MessageBody;
        const messaje = JSON.parse(jsonMessage);
        
        let cs: ICommandSerializer = commandSerializers.get(messaje.commandName);
        //command: ICommand = cs.deserialize(json);




        //res.json({"resp": resp});

    } catch(error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
});

async function sendMessages(message){
    try {
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

export default router;