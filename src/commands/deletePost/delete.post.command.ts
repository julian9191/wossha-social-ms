
import { CommandResult, ICommand } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { SocialRepository } from "../../infraestructure/repositories/social.repository";
import { UserSessionInfo } from "wossha-msbase-lib";
import { DeletePost } from "./model/delete.post";
import { Event } from "wossha-jsonevents-lib";
import { RemovePictureEvent } from "wossha-jsonevents-lib/dist/events/pictures/RemovePictureEvent/remove.picture.event";
import { Message } from "wossha-jsonevents-lib/dist/events/pictures/RemovePictureEvent/message";
import { Globals } from "../../globals";


export class DeletePostCommand implements ICommand<DeletePost> {
    
    private data: DeletePost;
    
    private sesionInfo: UserSessionInfo;
    
    @Inject
    private repo: SocialRepository;
    
    public commandName(): string {
        return "DeletePost";
    }
    
    public getData(): DeletePost {
        return this.data;
    }
    
    public setData(data: DeletePost) {
        this.data = data;
    }

    public setSesionInfo(sesionInfo: UserSessionInfo) {
        this.sesionInfo = sesionInfo;
    }
    
    public async execute(): Promise<CommandResult> {
        console.log("Start executing command "+JSON.stringify(this.data));
        
        let result: CommandResult = new CommandResult();
        let uuidPosts: string[] = [];
        uuidPosts.push(this.data.uuidPost);
        uuidPosts = uuidPosts.concat(this.data.comments);
        uuidPosts = await this.repo.getOwnPosts(uuidPosts, this.sesionInfo.username);
        if (uuidPosts.length>0) {
            await this.repo.deleteAttachments(uuidPosts, this.sesionInfo.username);
            await this.repo.deleteAllReactions(uuidPosts);
            await this.repo.deleteAllMentionedUsers(uuidPosts);
            await this.repo.deletePosts(uuidPosts, this.sesionInfo.username);
            if (this.data.attachments.length>0) {
                let savePictureEvent: Event = this.generateRemovePictureEvent(this.data.attachments.map((x:any) => {return x.url}));
                result.addEvent(savePictureEvent);
            }
            
            result.setMessage("La publicación se ha eliminado correctamente");
        }
        else {
            result.setMessage("Ha ocurrido un error al intentar eliminar esta publicación");
        }

        console.log("finish executing command "+JSON.stringify(this.data)+" with result: "+JSON.stringify(result));
        return result;
    }

    private generateRemovePictureEvent(uuidAttachment: string[]): RemovePictureEvent {
        let message: Message = new Message();
        message.uuidPictures = uuidAttachment;
        let removePictureEvent: RemovePictureEvent = new RemovePictureEvent(Globals.APP_NAME, this.sesionInfo.username);
        removePictureEvent.message = message;
        return removePictureEvent;
    }
}