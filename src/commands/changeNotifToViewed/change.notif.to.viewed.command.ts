import { CommandResult, ICommand } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { SocialRepository } from "../../infraestructure/repositories/social.repository";
import { UserSessionInfo } from "../../dto/user.session.info";
import { ChangeNotifToViewed } from "./model/change.notifTo.viewed";

export class ChangeNotifToViewedCommand implements ICommand<ChangeNotifToViewed> {
    
    private data: ChangeNotifToViewed;
    private sesionInfo: UserSessionInfo;
    
    @Inject
    private repo: SocialRepository;
    
    public commandName(): string {
        return "ChangeNotifToViewed";
    }
    
    public getData(): ChangeNotifToViewed {
        return this.data;
    }
    
    public setData(data: ChangeNotifToViewed) {
        this.data = data;
    }

    public setSesionInfo(sesionInfo: UserSessionInfo) {
        this.sesionInfo = sesionInfo;
    }
    
    public async execute(): Promise<CommandResult> {
        console.log("Start executing command "+JSON.stringify(this.data));

        let result: CommandResult = new CommandResult();
        await this.repo.changeNotifToViewed(this.sesionInfo.username, this.data.ids);
        result.setMessage("Las notificaciones se han actualizado correctamente");
        
        console.log("finish executing command "+JSON.stringify(this.data)+" with result: "+JSON.stringify(result));
        return result;
    }
    
}