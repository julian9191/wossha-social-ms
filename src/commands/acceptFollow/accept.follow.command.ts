import { ICommand } from "../icommand";
import { Inject } from "typescript-ioc";
import { SocialRepository } from "../../infraestructure/repositories/social.repository";
import { CommandResult } from "../command.result";
import { UserSessionInfo } from "../../dto/user.session.info";
import { Notification } from "../../dto/notification";
import { NotificationsEnum } from "../../infraestructure/enums/notifications.enum";
import { AcceptFollowMessage } from "../../dto/websocket/accept.follow.message";
import { AcceptFollow } from "./model/accept.follow";


export class AcceptFollowCommand implements ICommand<AcceptFollow> {
    
    private static WS_ENDPOINT: string = process.env.WS_ENDPOINT;
    
    private data: AcceptFollow;
    
    private sesionInfo: UserSessionInfo;
    
    @Inject
    private repo: SocialRepository;
    
    public commandName(): string {
        return "AcceptFollow";
    }
    
    public getData(): AcceptFollow {
        return this.data;
    }
    
    public setData(data: AcceptFollow) {
        this.data = data;
    }

    public setSesionInfo(sesionInfo: UserSessionInfo) {
        this.sesionInfo = sesionInfo;
    }
    
    public async execute(): Promise<CommandResult> {

        console.log("#######$$$$$$$: "+JSON.stringify(this.data));

        let result: CommandResult = new CommandResult();
        console.log("1111");
        await this.repo.changeStateFollowUser(this.data.senderUsername, this.data.username, 1);
        console.log("2222");
        await this.repo.deleteNotification(this.data.senderUsername, this.data.username, this.data.notificationType);
        console.log("3333");
        let notificacion: Notification = this.createFollowRequestNotificationDto(this.sesionInfo.username, (this.sesionInfo.firstName + (" " + this.sesionInfo.lastName)), this.sesionInfo.profilePicture, this.data.senderUsername);
        console.log("4444");
        await this.repo.addNotification(notificacion);
        console.log("5555");
        let acceptFollowMessage: AcceptFollowMessage = new AcceptFollowMessage(this.sesionInfo.username, this.data.senderUsername, notificacion);
        /*let user: WsUser = DynamoDbDao.getConnection(this.data.getSenderUsername());
        if ((user != null)) {
            let destinationConnectionId: string = user.getConnectionId();
            ServiceAPIUtil.callAPI(WS_ENDPOINT, destinationConnectionId, acceptFollowMessage);
        }*/
        console.log("6666");
        result.setMessage("Ahora @" + this.data.senderUsername + " te sigue");
        console.log("7777");
        return result;
    }
    
    private createFollowRequestNotificationDto(senderUsername: string, senderName: string, senderPicture: string, receiverUsername: string): Notification {
        let notificacion: Notification = new Notification(NotificationsEnum.ACCEPT_FOLLOW, receiverUsername, senderUsername, senderName, senderPicture, false, false, new Date());
        return notificacion;
    }
}