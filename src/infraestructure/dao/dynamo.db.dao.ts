import { WsUser } from "../../dto/websocket/ws.user";
import DynamoDB = require('aws-sdk/clients/dynamodb');
import {DataMapper} from '@aws/dynamodb-data-mapper';
import { Globals } from "../../globals";
var AWS = require('aws-sdk');


export class DynamoDbDao {

    private mapper: DataMapper = null;
    private docClient = new AWS.DynamoDB.DocumentClient();
    
    constructor(){
        const client = new DynamoDB({region: Globals.LAMBDA_REGION});
        this.mapper = new DataMapper({client});
    }

    public async saveConnection(username: string, connectionId: string): Promise<any> {
        let user: WsUser = new WsUser();
        user.connectionId = connectionId;
        user.username = username;

        return this.mapper.put({item: user});
    }
    
    public async deleteConnection(username: string, connectionId: string): Promise<Boolean> {
        var params = {
            TableName : 'ws_users',
            Key: {
              "username": username
            }
          };

        let _this = this;
        let pr = new Promise<boolean>(function(resolve, reject){
            _this.docClient.delete(params, function(err, data) {
                if (err) {
                    console.log("Unable to delete. Error:"+ err);
                    reject(false);
                } else {
                    console.log("Delete succeeded. "+JSON.stringify(data));
                    resolve(true);
                }
            }
        )});

        return pr;
    }
    
    public async getConnection(username: string): Promise<WsUser> {
        
        let params = {
            IndexName : "username-index",
            ExpressionAttributeValues: {
                ":userIdVal": username
            },
            TableName: "ws_users",
            KeyConditionExpression: "username = :userIdVal"
        };

        let _this = this;
        let pr = new Promise<WsUser>(function(resolve, reject){
            _this.docClient.query(params, function(err, data) {
                if (err) {
                    reject("Unable to query. Error:"+ err);
                } else {
                    console.log("Query succeeded. "+JSON.stringify(data));
                    data.Items.forEach(function(item) {
                        resolve(item);
                    });
                }
            }
        )});
        
        return pr;
    }
    
    public async getConnectionByConnectionId(connectionId: String): Promise<WsUser> {

        let params = {
            IndexName : "connectionId-index",
            ExpressionAttributeValues: {
                ":connectionIdVal": connectionId
            },
            TableName: "ws_users",
            KeyConditionExpression: "connectionId = :connectionIdVal"
        };

        let _this = this;
        let pr = new Promise<WsUser>(function(resolve, reject){
            _this.docClient.query(params, function(err, data) {
                if (err) {
                    reject("Unable to query. Error:"+ err);
                } else {
                    console.log("Query succeeded. "+JSON.stringify(data));
                    data.Items.forEach(function(item) {
                        resolve(item);
                    });
                }
            }
        )});
        
        return pr;
    }
}