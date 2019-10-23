import { ICommandSerializer } from "./Icommand.serializer";

export class CommandSerializers {
    
    private processors: Map<String, ICommandSerializer> = new Map();;
    
    // serializers
    private followUserSerializer: FollowUserSerializer;
    private stopFollowingUserSerializer: StopFollowingUserSerializer;
    private acceptFollowSerializer: AcceptFollowSerializer;
    private changeNotifToViewedSerializer: ChangeNotifToViewedSerializer;
    private refuseFollowSerializer: RefuseFollowSerializer;
    private createPostSerializer: CreatePostSerializer;
    private reactPostSerializer: ReactPostSerializer;
    private deletePostSerializer: DeletePostSerializer;
    private sharePostSerializer: SharePostSerializer;
    
    public initMapper() {
        this.processors.set("FollowUser", this.followUserSerializer);
        this.processors.set("StopFollowingUser", this.stopFollowingUserSerializer);
        this.processors.set("AcceptFollow", this.acceptFollowSerializer);
        this.processors.set("ChangeNotifToViewed", this.changeNotifToViewedSerializer);
        this.processors.set("RefuseFollow", this.refuseFollowSerializer);
        this.processors.set("CreatePost", this.createPostSerializer);
        this.processors.set("SharePost", this.sharePostSerializer);
        this.processors.set("ReactPost", this.reactPostSerializer);
        this.processors.set("DeletePost", this.deletePostSerializer);
    }
    
    public get(commandName: String): ICommandSerializer {
        return this.processors.get(commandName);
    }
    
    public setFollowUserSerializer(followUserSerializer: FollowUserSerializer) {
        this.followUserSerializer = followUserSerializer;
    }
    
    public setStopFollowingUserSerializer(stopFollowingUserSerializer: StopFollowingUserSerializer) {
        this.stopFollowingUserSerializer = stopFollowingUserSerializer;
    }
    
    public setAcceptFollowSerializer(acceptFollowSerializer: AcceptFollowSerializer) {
        this.acceptFollowSerializer = acceptFollowSerializer;
    }
    
    public setChangeNotifToViewedSerializer(changeNotifToViewedSerializer: ChangeNotifToViewedSerializer) {
        this.changeNotifToViewedSerializer = changeNotifToViewedSerializer;
    }
    
    public setRefuseFollowSerializer(refuseFollowSerializer: RefuseFollowSerializer) {
        this.refuseFollowSerializer = refuseFollowSerializer;
    }
    
    public setCreatePostSerializer(createPostSerializer: CreatePostSerializer) {
        this.createPostSerializer = createPostSerializer;
    }
    
    public setReactPostSerializer(reactPostSerializer: ReactPostSerializer) {
        this.reactPostSerializer = reactPostSerializer;
    }
    
    public setDeletePostSerializer(deletePostSerializer: DeletePostSerializer) {
        this.deletePostSerializer = deletePostSerializer;
    }
    
    public setSharePostSerializer(sharePostSerializer: SharePostSerializer) {
        this.sharePostSerializer = sharePostSerializer;
    }
}