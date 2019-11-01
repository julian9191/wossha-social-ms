import { ICommand, ICommandSerializer } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { DeletePost } from "./model/delete.post";
import { DeletePostCommand } from "./delete.post.command";

export class DeletePostSerializer implements ICommandSerializer<DeletePost> {
    
    @Inject
    private command: DeletePostCommand;
    
    public deserialize(data: any): ICommand<DeletePost> {
        let dto: DeletePost = data;
        this.command.setData(dto);
        return this.command;
    }
}