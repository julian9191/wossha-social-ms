var AWS = require('aws-sdk');

export class ServiceAPIUtil {
    
    public async callAPI(endpoint: string, connectionId: string, data: any): Promise<boolean> {

        let message = JSON.stringify(data);
        const apigwManagementApi = new AWS.ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: endpoint
        });

        let pr = new Promise<boolean>(function(resolve, reject){
            apigwManagementApi.postToConnection({ 
                "ConnectionId": connectionId, 
                "Data": message 
            }, (err, success) => {
                if (err) {
                    console.log('Socket error', err);
                    reject(false);
                } else {
                    console.log("message sent to websocket: "+JSON.stringify(success));
                    resolve(true);
                }
            }
        )});

        return pr;

    }
    
}