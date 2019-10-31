var AWS = require('aws-sdk');

export class ServiceAPIUtil {
    
    public async callAPI(endpoint: string, connectionId: string, data: any): Promise<boolean> {
        /*let mapper: ObjectMapper = new ObjectMapper();
        let jsonstring: string;
        try {
            jsonstring = mapper.writeValueAsstring(message);
            System.out.println(("%%% before send message to client: " 
                            + (connectionId + (", " + message))));
            let parts: string[] = endpoint.split("execute-api.");
            let region: string = parts[1].split(".amazonaws")[0];
            let endpointConfiguration: EndpointConfiguration = new EndpointConfiguration(endpoint, region);
            let api: AmazonApiGatewayManagementApi = AmazonApiGatewayManagementApiClientBuilder.standard().withEndpointConfiguration(endpointConfiguration).build();
            let request: PostToConnectionRequest = new PostToConnectionRequest();
            request.withConnectionId(connectionId);
            request.withData(ByteBuffer.wrap(jsonstring.getBytes()));
            let result: PostToConnectionResult = api.postToConnection(request);
            System.out.println("%%% message have been sent");
        }
        catch (e) {
            System.out.println(("error trying to send the message: " + e.getMessage()));
        }*/

        let message = JSON.stringify(data);
        console.log("%%% before send message to client: "+connectionId+", "+message);
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