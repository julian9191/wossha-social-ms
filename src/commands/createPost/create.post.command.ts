import { CommandResult, ICommand } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { SocialRepository } from "../../infraestructure/repositories/social.repository";
import { UserSessionInfo } from "wossha-msbase-lib";
import { CreatePost } from "./model/create.post";
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


export class CreatePostCommand implements ICommand<CreatePost> {
    
    private data: CreatePost;
    private sesionInfo: UserSessionInfo;
    
    @Inject
    private repo: SocialRepository;
    private S3Uploader: S3Uploader = new S3Uploader();
    
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

        console.log("Start executing command "+JSON.stringify(this.data));

        let result: CommandResult = new CommandResult();
        let createPostResponse: CreatePostResponse = new CreatePostResponse();
        let post: Post = PostFactory.createPost(this.data);
        
        await this.repo.addPost(post);
        if (post.mentionedUsers && post.mentionedUsers.length > 0) {
            await this.repo.addMentionedUsers(post.mentionedUsers, post.uuid);
        }
        
        if (post.type == PostTypesEnum.IMAGE_POST) {
            console.log("1. postType: " + post.type);
            let attachments: Attachment[] = await this.getAttachments(this.data.images, post);
            await this.repo.addAttachments(attachments);
            createPostResponse.attachments = attachments;
            let savePictureEvent: Event = this.generateSavePictureEvent(attachments);
            result.addEvent(savePictureEvent);
        }
        else if (post.type == PostTypesEnum.VIDEO_POST) {
            console.log("2. postType: " + post.type);
            let attachment: Attachment = new Attachment(null, uuidv4(), PostTypesEnum.VIDEO_POST, post.uuid, this.data.videoCode, this.sesionInfo.username, null, null);
            await this.repo.addAttachment(attachment);
            let attachments: Attachment[] = [];
            attachments.push(attachment);
            createPostResponse.attachments = attachments;
        }
        else {
            console.log("3. postType: " + post.type);
        }
        
        createPostResponse.uuidPost = post.uuid;
        result.setResponse(createPostResponse);

        console.log("finish executing command "+JSON.stringify(this.data)+" with result: "+JSON.stringify(result));
        return result;
    }
    
    private async getAttachments(images: PictureFileDTO[], post: Post): Promise<Attachment[]> {
        let attachments: Attachment[] = [];
        for (let i = 0; i < images.length; i++) {
            let attachment: Attachment = new Attachment(null, uuidv4(), PostTypesEnum.IMAGE_POST, post.uuid, uuidv4(), this.sesionInfo.username, null, null);
            // push image into S3
            await this.S3Uploader.save(this.data.images[i], attachment.url);
            attachments.push(attachment);
        }
        
        return attachments;
    }
    
    private generateSavePictureEvent(attachments: Attachment[]): SavePictureEvent {
        let pictures: PictureInfo[] = [];

        for (let i = 0; i < attachments.length; i++) {
            let pictureInfo: PictureInfo = new PictureInfo(attachments[i].url, this.data.images[i].filename, this.data.images[i].filetype, PictureTypesEnum.POST_PICTURE, this.data.images[i].size, null);
            pictures.push(pictureInfo);
        }
        let message: Message = new Message();
        message.pictures = pictures;
        let savePictureEvent = new SavePictureEvent(Globals.APP_NAME, this.sesionInfo.username);
        savePictureEvent.message = message;
        return savePictureEvent;
    }

}

export class CreatePostResponse {
    public uuidPost: string = null;
    public attachments: Attachment[] = null;
}