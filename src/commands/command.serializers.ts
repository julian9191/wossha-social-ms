import { ICommandSerializer } from "./Icommand.serializer";
import { FollowUserSerializer } from "./followUser/follow.user.serializer";
import { Inject } from "typescript-ioc";
import { AcceptFollowSerializer } from "./acceptFollow/accept.follow.serializer";
import { ChangeNotifToViewedSerializer } from "./changeNotifToViewed/change.notif.to.viewed.serializer";

export class CommandSerializers {
    
    private processors: Map<String, ICommandSerializer<any>> = new Map();;
    
    // serializers
    @Inject
    private followUserSerializer: FollowUserSerializer;
    @Inject
    private acceptFollowSerializer: AcceptFollowSerializer;
    @Inject
    private changeNotifToViewedSerializer: ChangeNotifToViewedSerializer;
    /*@Inject
    private stopFollowingUserSerializer: StopFollowingUserSerializer;
    @Inject
    private refuseFollowSerializer: RefuseFollowSerializer;
    @Inject
    private createPostSerializer: CreatePostSerializer;
    @Inject
    private reactPostSerializer: ReactPostSerializer;
    @Inject
    private deletePostSerializer: DeletePostSerializer;
    @Inject
    private sharePostSerializer: SharePostSerializer;*/

    public constructor(){
        this.initMapper();
    }
    
    private initMapper() {
        this.processors.set("FollowUser", this.followUserSerializer);
        this.processors.set("AcceptFollow", this.acceptFollowSerializer);
        this.processors.set("ChangeNotifToViewed", this.changeNotifToViewedSerializer);
        /*this.processors.set("StopFollowingUser", this.stopFollowingUserSerializer);
        this.processors.set("RefuseFollow", this.refuseFollowSerializer);
        this.processors.set("CreatePost", this.createPostSerializer);
        this.processors.set("SharePost", this.sharePostSerializer);
        this.processors.set("ReactPost", this.reactPostSerializer);
        this.processors.set("DeletePost", this.deletePostSerializer);*/
    }
    
    public get(commandName: String): ICommandSerializer<any> {
        return this.processors.get(commandName);
    }
}