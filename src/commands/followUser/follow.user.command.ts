import { ICommand } from "../icommand";
import { FollowUser } from "./model/follow.user";
import { Inject } from "typescript-ioc";
import { SocialRepository } from "../../infraestructure/repositories/social.repository";
import { CommandResult } from "../command.result";
import { UserSessionInfo } from "../../dto/user.session.info";
import uuidv4  from "uuid/v4";
import { Notification } from "../../dto/notification";
import { FollowRequestNotifMessage } from "../../dto/websocket/follow.request.notif.message";
import { WsUser } from "../../dto/websocket/ws.user";
import { NotificationsEnum } from "../../infraestructure/enums/notifications.enum";

export class FollowUserCommand implements ICommand<FollowUser> {
    
    private static WS_ENDPOINT: string = process.env.WS_ENDPOINT;
    private data: FollowUser;
    private sesionInfo: UserSessionInfo;
    
    @Inject
    private repo: SocialRepository;
    
    public commandName(): string {
        return "FollowUser";
    }
    
    public getData(): FollowUser {
        return this.data;
    }
    
    public setData(data: FollowUser) {
        this.data = data;
    }

    public setSesionInfo(sesionInfo: UserSessionInfo) {
        this.sesionInfo = sesionInfo;
    }
    
    public async execute(): Promise<CommandResult> {

        console.log("Start executing command "+JSON.stringify(this.data));

        let result: CommandResult = new CommandResult();
        let followUsers: FollowUser[] = await this.repo.getFollowersRelationship(this.data.senderUsername, this.data.receiverUsername);
        let followUser:FollowUser;
        if ((followUsers != null && followUsers.length>0)) {
            followUser = followUsers[0]
            if ((followUser.state == 1)) {
                let message = "Ya estás siguiendo a este usuario";
                console.error(message);
                throw new Error(message);
            }
            else {
                let message = "Ya enviaste una solicitud para seguir a este usuario";
                console.error(message);
                throw new Error(message);
            }
        }
        
        this.data.uuid = uuidv4();
        this.data.state = 0;

        let resu = await this.repo.add(this.data);
        
        result.setMessage("La solicitud para seguir al usuario "+ this.data.receiverUsername + " se ha enviado");
        let notificacion: Notification = this.createFollowRequestNotificationDto(this.sesionInfo.username, this.data.senderName, this.data.senderPicture, this.data.receiverUsername);

        this.repo.addNotification(notificacion);
        let followRequestNotifMessage: FollowRequestNotifMessage = new FollowRequestNotifMessage(this.data.senderUsername, this.sesionInfo.username, notificacion);
        /*let user: WsUser = DynamoDbDao.getConnection(this.data.getReceiverUsername());
        if ((user != null)) {
            let destinationConnectionId: string = user.getConnectionId();
            System.out.println(("send messaje to user by ws: " + followRequestNotifMessage.toString()));
            ServiceAPIUtil.callAPI(WS_ENDPOINT, destinationConnectionId, followRequestNotifMessage);
            System.out.println("sent messaje to user by ws");
        }*/
        
        console.log("finish executing command "+JSON.stringify(this.data)+" with result: "+JSON.stringify(result));
        return result;
    }
    
    private createFollowRequestNotificationDto(senderUsername: string, senderName: string, senderPicture: string, receiverUsername: string): Notification {
        let notificacion: Notification = new Notification(NotificationsEnum.FOLLOW_REQUEST, receiverUsername, senderUsername, senderName, senderPicture, false, false, new Date());
        return notificacion;
    }
    
}