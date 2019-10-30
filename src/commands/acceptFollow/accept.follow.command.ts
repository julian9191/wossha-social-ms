
import { CommandResult, ICommand } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { SocialRepository } from "../../infraestructure/repositories/social.repository";
import { UserSessionInfo } from "wossha-msbase-lib";
import { Notification } from "../../dto/notification";
import { NotificationsEnum } from "../../infraestructure/enums/notifications.enum";
import { AcceptFollowMessage } from "../../dto/websocket/accept.follow.message";
import { AcceptFollow } from "./model/accept.follow";
import { WsUser } from "../../dto/websocket/ws.user";
import { DynamoDbDao } from "../../infraestructure/dao/dynamo.db.dao";


export class AcceptFollowCommand implements ICommand<AcceptFollow> {
    
    private static WS_ENDPOINT: string = process.env.WS_ENDPOINT;
    
    private data: AcceptFollow;
    
    private sesionInfo: UserSessionInfo;
    
    @Inject
    private repo: SocialRepository;
    private dynamoDbDao: DynamoDbDao = new DynamoDbDao();
    
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
        console.log("Start executing command "+JSON.stringify(this.data));
        let result: CommandResult = new CommandResult();
        await this.repo.changeStateFollowUser(this.data.senderUsername, this.data.username, 1);
        await this.repo.deleteNotification(this.data.senderUsername, this.data.username, this.data.notificationType);

        let notificacion: Notification = this.createFollowRequestNotificationDto(this.sesionInfo.username, (this.sesionInfo.firstName + (" " + this.sesionInfo.lastName)), this.sesionInfo.profilePicture, this.data.senderUsername);
        await this.repo.addNotification(notificacion);

        let acceptFollowMessage: AcceptFollowMessage = new AcceptFollowMessage(this.sesionInfo.username, this.data.senderUsername, notificacion);
        
        console.log("111111111111")
        let user: WsUser = await this.dynamoDbDao.getConnection(this.data.senderUsername);
        console.log("222222222: "+JSON.stringify(user));
        /*if ((user != null)) {
            let destinationConnectionId: string = user.getConnectionId();
            ServiceAPIUtil.callAPI(WS_ENDPOINT, destinationConnectionId, acceptFollowMessage);
        }*/

        result.setMessage("Ahora @" + this.data.senderUsername + " te sigue");

        console.log("finish executing command "+JSON.stringify(this.data)+" with result: "+JSON.stringify(result));
        return result;
    }
    
    private createFollowRequestNotificationDto(senderUsername: string, senderName: string, senderPicture: string, receiverUsername: string): Notification {
        let notificacion: Notification = new Notification(NotificationsEnum.ACCEPT_FOLLOW, receiverUsername, senderUsername, senderName, senderPicture, false, false, new Date());
        return notificacion;
    }
}