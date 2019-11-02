import { ICommand, ICommandSerializer } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { RefuseFollow } from "./model/refuse.follow";
import { RefuseFollowCommand } from "./refuse.follow.command";

export class RefuseFollowSerializer implements ICommandSerializer<RefuseFollow> {
    
    @Inject
    private command: RefuseFollowCommand;
    
    public deserialize(data: any): ICommand<RefuseFollow> {
        let dto: RefuseFollow = data;
        this.command.setData(dto);
        return this.command;
    }
}