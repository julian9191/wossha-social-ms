import { NotificationsEnum } from "../../../infraestructure/enums/notifications.enum";

export class RefuseFollow {
    
    public notificationType: string = NotificationsEnum.FOLLOW_REQUEST;
    public username: string;
    public senderUsername: string;
    
    public constructor (username: string, senderUsername: string) {
        this.username = username;
        this.senderUsername = senderUsername;
    }
}