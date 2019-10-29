export class Attachment {
    
    public id: number;
    public uuid: string;
    public type: string;
    public uuidPost: string;
    public url: string;
    public username: string;
    //  Formats output date when this DTO is passed through JSON
    //@JsonFormat(pattern="yyyy-MM-dd HH:mm")
    public created: Date;
    //  Formats output date when this DTO is passed through JSON
    //@JsonFormat(pattern="yyyy-MM-dd HH:mm")
    public modified: Date;
    
    public constructor (id: number, uuid: string, type: string, uuidPost: string, url: string, username: string, created: Date, modified: Date) {
        this.id = id;
        this.uuid = uuid;
        this.type = type;
        this.uuidPost = uuidPost;
        this.url = url;
        this.username = username;
        this.created = created;
        this.modified = modified;
    }

}