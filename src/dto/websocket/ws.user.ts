//@DynamoDBTable(tableName="ws_users")
export class WsUser {
    
    //@DynamoDBHashKey()
    private username: string;
    
    //@DynamoDBHashKey()
    private ConnectionId: string;
    
    public constructor (username: string, connectionId: string) {
        this.username = this.username;
        this.ConnectionId = connectionId;
    }
    
    public getUsername(): string {
        return this.username;
    }
    
    public setUsername(username: string) {
        this.username = this.username;
    }
    
    public getConnectionId(): string {
        return this.ConnectionId;
    }
    
    public setConnectionId(connectionId: string) {
        this.ConnectionId = connectionId;
    }
}