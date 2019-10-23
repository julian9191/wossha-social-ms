export class FollowUser {
    
    public username: string;
    public uuid: string;
    public senderUsername: string;
    public senderName: string;
    public senderPicture: string;
    public receiverUsername: string;
    public state: number;
    
    //mapper constructor
    public constructor (username: string, uuid: string, senderUsername: string, 
        receiverUsername: string, state: number) {
            
        this.username = username;
        this.uuid = uuid;
        this.senderUsername = senderUsername;
        this.receiverUsername = receiverUsername;
        this.state = state;
    }

}