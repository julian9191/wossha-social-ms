import { ICommandSerializer } from "wossha-msbase-lib";
import { FollowUserSerializer } from "./followUser/follow.user.serializer";
import { Inject } from "typescript-ioc";
import { AcceptFollowSerializer } from "./acceptFollow/accept.follow.serializer";
import { ChangeNotifToViewedSerializer } from "./changeNotifToViewed/change.notif.to.viewed.serializer";
import { CreatePostSerializer } from "./createPost/create.post.serializer";
import { DeletePostSerializer } from "./deletePost/delete.post.serializer";
import { ReactPostSerializer } from "./reactPost/react.post.serializer";
import { RefuseFollowSerializer } from "./refuseFollow/refuse.follow.serializer";
import { SharePostSerializer } from "./sharePost/share.post.serializer";

export class CommandSerializers {
    
    private processors: Map<String, ICommandSerializer<any>> = new Map();
    
    // serializers
    @Inject
    private followUserSerializer: FollowUserSerializer;
    @Inject
    private acceptFollowSerializer: AcceptFollowSerializer;
    @Inject
    private changeNotifToViewedSerializer: ChangeNotifToViewedSerializer;
    @Inject
    private createPostSerializer: CreatePostSerializer;
    @Inject
    private deletePostSerializer: DeletePostSerializer;
    @Inject
    private reactPostSerializer: ReactPostSerializer;
    @Inject
    private refuseFollowSerializer: RefuseFollowSerializer;
    @Inject
    private sharePostSerializer: SharePostSerializer;
    /*@Inject
    private stopFollowingUserSerializer: StopFollowingUserSerializer;*/

    public constructor(){
        this.initMapper();
    }
    
    private initMapper() {
        this.processors.set("FollowUser", this.followUserSerializer);
        this.processors.set("AcceptFollow", this.acceptFollowSerializer);
        this.processors.set("ChangeNotifToViewed", this.changeNotifToViewedSerializer);
        this.processors.set("CreatePost", this.createPostSerializer);
        this.processors.set("DeletePost", this.deletePostSerializer);
        this.processors.set("ReactPost", this.reactPostSerializer);
        this.processors.set("RefuseFollow", this.refuseFollowSerializer);
        this.processors.set("SharePost", this.sharePostSerializer);
        //this.processors.set("StopFollowingUser", this.stopFollowingUserSerializer);
    }
    
    public get(commandName: String): ICommandSerializer<any> {
        return this.processors.get(commandName);
    }
}