import app from "./app";
import serverless = require('serverless-http')
import { Globals } from "./globals";



const handler = serverless(app);
module.exports.handler = async (event, context) => {
    
    console.log("incoming event: "+JSON.stringify(event));
    Globals.AWS_ACCOUNT_ID = context.invokedFunctionArn.split(":")[4];
    Globals.LAMBDA_REGION = context.invokedFunctionArn.split(":")[3];

    return await handler(event, context);
};