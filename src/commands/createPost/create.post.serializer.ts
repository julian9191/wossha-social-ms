import { ICommand, ICommandSerializer } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { CreatePost } from "./model/create.post";
import { CreatePostCommand } from "./create.post.command";

export class CreatePostSerializer implements ICommandSerializer<CreatePost> {
    
    @Inject
    private command: CreatePostCommand;
    
    public deserialize(data: any): ICommand<CreatePost> {
        let dto: CreatePost = data;
        this.command.setData(dto);
        return this.command;
    }
}