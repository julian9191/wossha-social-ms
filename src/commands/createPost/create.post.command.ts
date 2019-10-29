import { CommandResult, ICommand } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { SocialRepository } from "../../infraestructure/repositories/social.repository";
import { UserSessionInfo } from "wossha-msbase-lib";
import { CreatePost } from "./model/create.post";
import { Post } from "../../dto/post/post";
import { PostFactory } from "../../infraestructure/factories/post.factory";
import { PostTypesEnum } from "../../infraestructure/enums/post.types.enum";
import { Attachment } from "../../dto/post/attachment";
import { Event } from "../../infraestructure/event/event";
import uuidv4  from "uuid/v4";
import { PictureFileDTO } from "wossha-msbase-lib";
import { SavePictureEvent } from "../../infraestructure/event/save.picture.event";
import { PictureInfo } from "../../infraestructure/event/picture.info";
import { PictureTypesEnum } from "wossha-msbase-lib";
import { Message } from "../../infraestructure/event/message";
import { Globals } from "../../globals";

export class CreatePostCommand implements ICommand<CreatePost> {
    
    private data: CreatePost;
    private sesionInfo: UserSessionInfo;
    
    @Inject
    private repo: SocialRepository;
    
    public commandName(): string {
        return "CreatePost";
    }
    
    public getData(): CreatePost {
        return this.data;
    }
    
    public setData(data: CreatePost) {
        this.data = data;
    }

    public setSesionInfo(sesionInfo: UserSessionInfo) {
        this.sesionInfo = sesionInfo;
    }
    
    public async execute(): Promise<CommandResult> {
        let result: CommandResult = new CommandResult();
        let createPostResponse: CreatePostResponse = new CreatePostResponse();
        let post: Post = PostFactory.createPost(this.data);
        await this.repo.addPost(post);
        if (post.mentionedUsers && post.mentionedUsers.length > 0) {
            this.repo.addMentionedUsers(post.mentionedUsers, post.uuid);
        }
        
        if (post.type = PostTypesEnum.IMAGE_POST) {
            console.log("1. postType: " + post.type);
            let attachments: Attachment[] = this.getAttachments(this.data.images, post);
            this.repo.addAttachments(attachments);
            createPostResponse.attachments = attachments;
            let savePictureEvent: Event = this.generateSavePictureEvent(attachments);
            result.addEvent(savePictureEvent);
        }
        else if (post.type = PostTypesEnum.VIDEO_POST) {
            console.log("2. postType: " + post.type);
            let attachment: Attachment = new Attachment(null, uuidv4(), PostTypesEnum.VIDEO_POST, post.uuid, this.data.videoCode, this.sesionInfo.username, null, null);
            this.repo.addAttachment(attachment);
            let attachments: Attachment[] = [];
            attachments.push(attachment);
            createPostResponse.attachments = attachments;
        }
        else {
            console.log("3. postType: " + post.type);
        }
        
        createPostResponse.uuidPost = post.uuid;
        result.setResponse(createPostResponse);
        return result;
    }
    
    private getAttachments(images: PictureFileDTO[], post: Post): Attachment[] {
        let attachments: Attachment[] = [];
        for (let image in images) {
            let attachment: Attachment = new Attachment(null, uuidv4(), PostTypesEnum.IMAGE_POST, post.uuid, uuidv4(), this.sesionInfo.username, null, null);
            attachments.push(attachment);
        }
        
        return attachments;
    }
    
    private generateSavePictureEvent(attachments: Attachment[]): SavePictureEvent {
        let pictures: PictureInfo[] = [];
        for (let i = 0; i < attachments.length; i++) {
            // push image into S3
            //this.pushInS3(this.data.getImages().get(i), attachments.get(i).getUrl());
            let pictureInfo: PictureInfo = new PictureInfo(attachments[i].url, this.data.images[i].filename, this.data.images[i].filetype, PictureTypesEnum.POST_PICTURE, this.data.images[i].size, null);
            pictures.push(pictureInfo);
        }
        
        let message: Message = new Message();
        message.pictures = pictures;
        SavePictureEvent;
        new SavePictureEvent(Globals.APP_NAME, this.sesionInfo.username, message);
        return;
    }
    
    private pushInS3(image: PictureFileDTO, uuid: string) {
        /*try {
            let fis: InputStream = WosshaTool.getPictureInpurStream(image.getValue());
            this.uploadObject.save(fis, uuid);
        }
        catch (e) {
            System.out.println(e.getMessage());
        }*/
        
    }

}

export class CreatePostResponse {
    public uuidPost: string;
    public attachments: Attachment[];
}