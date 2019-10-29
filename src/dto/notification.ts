export class Notification {
    
    public id: number;
    public type: string;
    public receiverUserName: string;
    public senderUserName: string;
    public senderName: string;
    public senderPicture: string;
    public viewed: boolean;
    public opend: boolean;
    //  Formats output date when this DTO is passed through JSON
    //@JsonFormat(pattern="yyyy-MM-dd HH:mm")
    public created: Date;

    public constructor (type: string, receiverUserName: string, senderUserName: string, senderName: string, senderPicture: string, viewed: boolean, opend: boolean, created: Date) {
        this.type = type;
        this.receiverUserName = receiverUserName;
        this.senderUserName = senderUserName;
        this.senderName = senderName;
        this.senderPicture = senderPicture;
        this.viewed = viewed;
        this.opend = opend;
        this.created = created;
    }
}