export class SharePost {
    
    public commandName: string;
    public username: string;
    public uuidOriginalPost: string;
    public text: string;
    
    public constructor (commandName: string, username: string, uuidOriginalPost: string, text: string) {
        this.commandName = commandName;
        this.username = username;
        this.uuidOriginalPost = uuidOriginalPost;
        this.text = text;
    }
}