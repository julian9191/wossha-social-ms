import { PictureFileDTO } from "wossha-msbase-lib";

export class CreatePost {
    
    public commandName: string;
    public username: string;
    public uuidParent: string;
    public text: string;
    public images: PictureFileDTO[];
    public mentionedUsers: string[];
    public videoCode: string;
    
    public constructor (commandName: string, username: string, uuidParent: string, text: string) {
        this.commandName = commandName;
        this.username = username;
        this.uuidParent = uuidParent;
        this.text = text;
    }
    
    /*public constructor (commandName: string, username: string, text: string) {
        this.commandName = this.commandName;
        this.username = this.username;
        this.text = this.text;
    }*/
}