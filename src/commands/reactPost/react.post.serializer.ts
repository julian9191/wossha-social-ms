import { ICommand, ICommandSerializer } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { ReactPost } from "./model/react.post";
import { ReactPostCommand } from "./react.post.command";

export class ReactPostSerializer implements ICommandSerializer<ReactPost> {
    
    @Inject
    private command: ReactPostCommand;
    
    public deserialize(data: any): ICommand<ReactPost> {
        let dto: ReactPost = data;
        this.command.setData(dto);
        return this.command;
    }
}