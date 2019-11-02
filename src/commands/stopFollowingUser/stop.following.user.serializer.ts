import { ICommand, ICommandSerializer } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { StopFollowingUser } from "./model/stop.following.user";
import { StopFollowingUserCommand } from "./stop.following.user.command";

export class StopFollowingUserSerializer implements ICommandSerializer<StopFollowingUser> {
    
    @Inject
    private command: StopFollowingUserCommand;
    
    public deserialize(data: any): ICommand<StopFollowingUser> {
        let dto: StopFollowingUser = data;
        this.command.setData(dto);
        return this.command;
    }
}