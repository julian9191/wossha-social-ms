import { CreatePost } from "../../commands/createPost/model/create.post";
import { Post } from "../../dto/post/post";
import uuidv4  from "uuid/v4";
import { PostTypesEnum } from "../enums/post.types.enum";
import { SharePost } from "../../commands/sharePost/model/share.post";

export class PostFactory {
    
    public static createPost(createPost: CreatePost): Post {

        let post: Post = new Post(uuidv4());

        post.username = createPost.username;

        console.log("!!!!: "+JSON.stringify(createPost))

        console.log("---!createPost.images: "+!createPost.images)
        console.log("---createPost.images.length==0: "+(createPost.images.length==0))
        console.log("---!createPost.videoCode: "+!createPost.videoCode)
        console.log("---createPost.videoCode == '': "+(createPost.videoCode == ""))

        if ((!createPost.images || createPost.images.length==0) && 
            (!createPost.videoCode || createPost.videoCode == "")) {

            console.log("#### SIMPLE_POST");
            post.type = PostTypesEnum.SIMPLE_POST;
        }
        else if (createPost.videoCode && createPost.videoCode != "") {
            console.log("#### VIDEO_POST");
            post.type = PostTypesEnum.VIDEO_POST;
        }
        else {
            console.log("#### IMAGE_POST");
            post.type = PostTypesEnum.IMAGE_POST;
        }
        
        if (createPost.uuidParent && createPost.uuidParent != "") {
            post.uuidParent = createPost.uuidParent;
        }
        
        if (createPost.text && createPost.text != "") {
            post.text = createPost.text;
        }
        
        post.mentionedUsers = createPost.mentionedUsers;
        return post;
    }
    
    public static createSharePost(sharePost: SharePost): Post {
        let post: Post = new Post(uuidv4());
        post.username = sharePost.username;
        post.type = PostTypesEnum.SIMPLE_POST;
        post.uuidOriginalPost = sharePost.uuidOriginalPost;
        if (sharePost.text && sharePost.text != "") {
            post.text = sharePost.text;
        }
        
        return post;
    }
}