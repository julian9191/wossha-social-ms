export class ReactPost {
    
    public commandName: string;
    public username: string;
    public reactionType: string;
    public uuidPost: string;
    
    public constructor (commandName: string, username: string, reactionType: string, uuidPost: string) {
        this.commandName = commandName;
        this.username = username;
        this.reactionType = reactionType;
        this.uuidPost = uuidPost;
    }
    
}