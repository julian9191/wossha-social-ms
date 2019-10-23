export class FollowUser {
    
    private username: string;
    private uuid: string;
    private senderUsername: string;
    private senderName: string;
    private senderPicture: string;
    private receiverUsername: string;
    private state: number;
    
    public constructor (username: string, uuid: string, senderUsername: string, senderName: string, receiverUsername: string, state: number) {
        this.username = username;
        this.uuid = uuid;
        this.senderUsername = senderUsername;
        this.senderName = senderName;
        this.receiverUsername = receiverUsername;
        this.state = state;
    }
    
    public getUsername(): string {
        return this.username;
    }
    
    public setUsername(username: string) {
        this.username = username;
    }
    
    public getUuid(): string {
        return this.uuid;
    }
    
    public setUuid(uuid: string) {
        this.uuid = uuid;
    }
    
    public getSenderUsername(): string {
        return this.senderUsername;
    }
    
    public setSenderUsername(senderUsername: string) {
        this.senderUsername = senderUsername;
    }
    
    public getReceiverUsername(): string {
        return this.receiverUsername;
    }
    
    public setReceiverUsername(receiverUsername: string) {
        this.receiverUsername = receiverUsername;
    }
    
    public getState(): number {
        return this.state;
    }
    
    public setState(state: number) {
        this.state = state;
    }
    
    public getSenderName(): string {
        return this.senderName;
    }
    
    public setSenderName(senderName: string) {
        this.senderName = senderName;
    }
    
    public getSenderPicture(): string {
        return this.senderPicture;
    }
    
    public setSenderPicture(senderPicture: string) {
        this.senderPicture = senderPicture;
    }
}