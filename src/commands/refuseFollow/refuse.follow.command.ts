import { CommandResult, ICommand } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { SocialRepository } from "../../infraestructure/repositories/social.repository";
import { UserSessionInfo } from "wossha-msbase-lib";
import { RefuseFollow } from "./model/refuse.follow";


export class RefuseFollowCommand implements ICommand<RefuseFollow> {
    
    private data: RefuseFollow;
    private sesionInfo: UserSessionInfo;
    
    @Inject
    private repo: SocialRepository;
    
    public commandName(): string {
        return "RefuseFollow";
    }
    
    public getData(): RefuseFollow {
        return this.data;
    }
    
    public setData(data: RefuseFollow) {
        this.data = data;
    }

    public setSesionInfo(sesionInfo: UserSessionInfo) {
        this.sesionInfo = sesionInfo;
    }
    
    public async execute(): Promise<CommandResult> {
        console.log("Start executing command "+JSON.stringify(this.data));
        
        let result: CommandResult = new CommandResult();
        await this.repo.deleteNotification(this.data.senderUsername, this.data.username, this.data.notificationType);
        result.setMessage("La solicitud de  @"+this.data.senderUsername+" se ha eliminado");

        console.log("finish executing command "+JSON.stringify(this.data)+" with result: "+JSON.stringify(result));
        return result;
    }
    
    

}
