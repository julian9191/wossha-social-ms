import { CommandResult, ICommand } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { SocialRepository } from "../../infraestructure/repositories/social.repository";
import { UserSessionInfo } from "wossha-msbase-lib";
import { ReactPost } from "./model/react.post";
import { Post } from "../../dto/post/post";
import { PostFactory } from "../../infraestructure/factories/post.factory";
import { PostTypesEnum } from "../../infraestructure/enums/post.types.enum";
import { Attachment } from "../../dto/post/attachment";
import uuidv4  from "uuid/v4";
import { PictureFileDTO } from "wossha-msbase-lib";
import { PictureTypesEnum } from "wossha-msbase-lib";
import { Globals } from "../../globals";
import { S3Uploader } from "../../infraestructure/s3/s3.uploader";

import { SavePictureEvent } from "wossha-jsonevents-lib/dist/events/pictures/SavePictureEvent/save.picture.event";
import { PictureInfo } from "wossha-jsonevents-lib/dist/events/pictures/SavePictureEvent/picture.info";
import { Event } from "wossha-jsonevents-lib/dist/events/api/event";
import { Message } from "wossha-jsonevents-lib/dist/events/pictures/SavePictureEvent/message";
import { Reaction } from "../../dto/post/reaction";


export class ReactPostCommand implements ICommand<ReactPost> {
    
    private data: ReactPost;
    private sesionInfo: UserSessionInfo;
    
    @Inject
    private repo: SocialRepository;
    private S3Uploader: S3Uploader = new S3Uploader();
    
    public commandName(): string {
        return "ReactPost";
    }
    
    public getData(): ReactPost {
        return this.data;
    }
    
    public setData(data: ReactPost) {
        this.data = data;
    }

    public setSesionInfo(sesionInfo: UserSessionInfo) {
        this.sesionInfo = sesionInfo;
    }
    
    public async execute(): Promise<CommandResult> {
        console.log("Start executing command "+JSON.stringify(this.data));
        
        let result: CommandResult = new CommandResult();
        let prevReactions: Reaction[] = await this.repo.getReaction(this.sesionInfo.username, this.data.uuidPost);
        let prevReaction: Reaction = null;
        if(prevReactions.length>0){
            prevReaction = prevReactions[0];
        }
        
        if (prevReaction != null && prevReaction.type == this.data.reactionType) {
            await this.repo.removeReaction(this.sesionInfo.username, this.data.uuidPost, this.data.reactionType);
            result.setMessage("remove");
        }
        else {
            let reaction: Reaction = new Reaction();
            reaction.uuid = uuidv4();
            reaction.type = this.data.reactionType;
            reaction.uuidPost = this.data.uuidPost;
            reaction.username = this.sesionInfo.username;
            if ((prevReaction == null)) {
                await this.repo.addReaction(reaction);
                result.setMessage("ok");
            }
            else {
                await this.repo.updateReactionType(this.sesionInfo.username, this.data.uuidPost, this.data.reactionType);
                result.setMessage(prevReaction.type);
            }
            
        }

        console.log("finish executing command "+JSON.stringify(this.data)+" with result: "+JSON.stringify(result));
        return result;
    }
    
    

}
