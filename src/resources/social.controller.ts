import * as Express from "express";
import { FollowingUser } from "../dto/following.user";
import { SocialRepository } from "../infraestructure/repositories/social.repository";
var AWS = require('aws-sdk');


var sqs = new AWS.SQS({region : 'us-east-1'});
const router = Express.Router();
const PREFIX : string = "/social";

const repo: SocialRepository = new SocialRepository();

router.get(PREFIX+"/following-users", async (req: /*Express.Request*/any, res: Express.Response) => {
    try {
        const username : string = req.header('username');
        
        /*for (var i = 0; i < 10; i++) {
            await sendMessages(username+"_"+i);
        }*/
        let resp : FollowingUser[] = await repo.getFollowingUsers(username);
        res.json({"resp": resp});

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