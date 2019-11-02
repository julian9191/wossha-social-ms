import { CommandResult, ICommand } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { SocialRepository } from "../../infraestructure/repositories/social.repository";
import { UserSessionInfo } from "wossha-msbase-lib";
import { SharePost } from "./model/share.post";
import { CreatePostResponse } from "../createPost/create.post.command";
import { PostFactory } from "../../infraestructure/factories/post.factory";
import { Post } from "../../dto/post/post";


export class SharePostCommand implements ICommand<SharePost> {
    
    private data: SharePost;
    private sesionInfo: UserSessionInfo;
    
    @Inject
    private repo: SocialRepository;
    
    public commandName(): string {
        return "SharePost";
    }
    
    public getData(): SharePost {
        return this.data;
    }
    
    public setData(data: SharePost) {
        this.data = data;
    }

    public setSesionInfo(sesionInfo: UserSessionInfo) {
        this.sesionInfo = sesionInfo;
    }
    
    public async execute(): Promise<CommandResult> {
        console.log("Start executing command "+JSON.stringify(this.data));
        
        let result: CommandResult = new CommandResult();
        let createPostResponse: CreatePostResponse = new CreatePostResponse();
        let post: Post = PostFactory.createSharePost(this.data);
        await this.repo.addPost(post);
        createPostResponse.uuidPost = post.uuid;
        result.setResponse(createPostResponse);

        console.log("finish executing command "+JSON.stringify(this.data)+" with result: "+JSON.stringify(result));
        return result;
    }
    
    

}
