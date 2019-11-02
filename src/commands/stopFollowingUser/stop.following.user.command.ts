import { CommandResult, ICommand } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { SocialRepository } from "../../infraestructure/repositories/social.repository";
import { UserSessionInfo } from "wossha-msbase-lib";
import { StopFollowingUser } from "./model/stop.following.user";
import { FollowUser } from "../followUser/model/follow.user";


export class StopFollowingUserCommand implements ICommand<StopFollowingUser> {
    
    private data: StopFollowingUser;
    private sesionInfo: UserSessionInfo;
    
    @Inject
    private repo: SocialRepository;
    
    public commandName(): string {
        return "StopFollowingUser";
    }
    
    public getData(): StopFollowingUser {
        return this.data;
    }
    
    public setData(data: StopFollowingUser) {
        this.data = data;
    }

    public setSesionInfo(sesionInfo: UserSessionInfo) {
        this.sesionInfo = sesionInfo;
    }
    
    public async execute(): Promise<CommandResult> {
        console.log("Start executing command "+JSON.stringify(this.data));
        
        let result: CommandResult = new CommandResult();
        let followUsers: FollowUser[] = await this.repo.getFollowersRelationship(this.data.username, this.data.followingUserName);
        let followUser:FollowUser = null;

        if(followUsers.length>0){
            followUser = followUsers[0];
        }

        if (followUsers == null) {
            throw new Error("Actualmente no estás siguiendo a este usuario");
        }
        else if ((followUser.state == 1)) {
            result.setMessage("Has dejado correctamente de seguir al usuario " + this.data.followingUserName);
        }
        else {
            result.setMessage("Has cancelado correctamente la solicitud para seguir al usuario " + this.data.followingUserName);
        }
        
        await this.repo.stopFollowingUser(this.data.username, this.data.followingUserName);

        console.log("finish executing command "+JSON.stringify(this.data)+" with result: "+JSON.stringify(result));
        return result;
    }
    
    

}
