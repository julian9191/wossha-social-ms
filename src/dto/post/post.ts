import { Reaction } from "./reaction";
import { Attachment } from "./attachment";

export class Post {
    
    public id: number;
    public uuid: string;
    public type: string;
    public username: string;
    public text: string;
    public uuidParent: string;
    public uuidOriginalPost: string;
    //  Formats output date when this DTO is passed through JSON
    //@JsonFormat(pattern="yyyy-MM-dd HH:mm")
    public created: Date;
    //  Formats output date when this DTO is passed through JSON
    //@JsonFormat(pattern="yyyy-MM-dd HH:mm")
    public modified: Date;
    public reactions: Reaction[];
    public comments: Post[];
    public originalPost: Post;
    public attachments: Attachment[];
    public mentionedUsers: string[];
    
    /*public constructor (id: number, uuid: string, type: string, username: string, text: string, uuidParent: string, created: Date, modified: Date, reactions: Reaction[], comments: Post[], attachments: Attachment[]) {
        this.id = id;
        this.uuid = uuid;
        this.type = type;
        this.username = username;
        this.text = text;
        this.uuidParent = uuidParent;
        this.created = created;
        this.modified = modified;
        this.reactions = reactions;
        this.comments = comments;
        this.attachments = attachments;
    }*/
    
    /*public constructor (id: number, uuid: string, type: string, username: string, text: string, uuidParent: string, uuidOriginalPost: string, created: Date, modified: Date) {
        this.id = this.id;
        this.uuid = this.uuid;
        this.type = this.type;
        this.username = this.username;
        this.text = this.text;
        this.uuidParent = this.uuidParent;
        this.uuidOriginalPost = this.uuidOriginalPost;
        this.created = this.created;
        this.modified = this.modified;
    }*/
    
    public constructor (uuid: string) {
        this.uuid = this.uuid;
    }
    
}