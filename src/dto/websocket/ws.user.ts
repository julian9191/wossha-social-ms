//@DynamoDBTable(tableName="ws_users")
export class WsUser {
    
    //@DynamoDBHashKey()
    public username: string;
    
    //@DynamoDBHashKey()
    public ConnectionId: string;
    
    public constructor (username: string, connectionId: string) {
        this.username = this.username;
        this.ConnectionId = connectionId;
    }
}