export class Reaction {
    
    public id: number;
    public uuid: string;
    public type: string;
    public uuidPost: string;
    public username: string;
    
    //  Formats output date when this DTO is passed through JSON
    //@JsonFormat(pattern="yyyy-MM-dd HH:mm")
    public created: Date;
    
}