export class Reaction {
    
    public id: number;
    public uuid: string;
    public type: string;
    public uuidPost: string;
    public username: string;
    
    //  Formats output date when this DTO is passed through JSON
    //@JsonFormat(pattern="yyyy-MM-dd HH:mm")
    public created: Date;
    
    public constructor (id: number, uuid: string, type: string, uuidPost: string, username: string, created: Date) {
        this.id = id;
        this.uuid = uuid;
        this.type = type;
        this.uuidPost = uuidPost;
        this.username = username;
        this.created = created;
    }
}