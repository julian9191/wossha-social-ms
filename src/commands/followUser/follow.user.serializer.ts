import { ICommandSerializer } from "../Icommand.serializer";
import { FollowUser } from "./model/follow.user";
import { Inject } from "typescript-ioc";
import { FollowUserCommand } from "./follow.user.command";
import { ICommand } from "../icommand";

export class FollowUserSerializer implements ICommandSerializer<FollowUser> {
    
    @Inject
    private command: FollowUserCommand;
    
    public deserialize(data: any): ICommand<FollowUser> {
        let dto: FollowUser = data;
        this.command.setData(dto);
        return this.command;
    }
}