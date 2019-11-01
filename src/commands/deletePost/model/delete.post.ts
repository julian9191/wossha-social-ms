import { Attachment } from "../../../dto/post/attachment";

export class DeletePost {
    
    public commandName: string;
    public username: string;
    public uuidPost: string;
    public comments: string[];
    public attachments: Attachment[];
    
    public constructor (commandName: string, username: string, uuidPost: string, attachments: Attachment[]) {
        this.commandName = commandName;
        this.username = username;
        this.uuidPost = uuidPost;
        this.attachments = attachments;
    }
}