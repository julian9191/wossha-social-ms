import { ICommandSerializer } from "../Icommand.serializer";
import { Inject } from "typescript-ioc";
import { ICommand } from "../icommand";
import { AcceptFollow } from "./model/accept.follow";
import { AcceptFollowCommand } from "./accept.follow.command";

export class AcceptFollowSerializer implements ICommandSerializer<AcceptFollow> {
    
    @Inject
    private command: AcceptFollowCommand;
    
    public deserialize(data: any): ICommand<AcceptFollow> {
        let dto: AcceptFollow = data;
        this.command.setData(dto);
        return this.command;
    }
}