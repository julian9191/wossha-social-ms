import { ICommand, ICommandSerializer } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { SharePostCommand } from "./share.post.command";
import { SharePost } from "./model/share.post";

export class SharePostSerializer implements ICommandSerializer<SharePost> {
    
    @Inject
    private command: SharePostCommand;
    
    public deserialize(data: any): ICommand<SharePost> {
        let dto: SharePost = data;
        this.command.setData(dto);
        return this.command;
    }
}