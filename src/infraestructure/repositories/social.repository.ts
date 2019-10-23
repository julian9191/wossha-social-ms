import { IRepository } from "./irepository";
import { FollowUser } from "../../dto/follow.user";
import { FollowingUser } from "../../dto/following.user";
import { SocialDao } from "../dao/follow/social.dao";
import { Inject } from "typescript-ioc";

export class SocialRepository implements IRepository<FollowUser> {
    
    @Inject
    private socialDao: SocialDao;

    public async getFollowingUsers(username: string): Promise<FollowingUser[]> {
        
        return await this.socialDao.getFollowingUsers(username);
    }
    
    public add(clothe: FollowUser) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.add(clothe);
    }
    
    public addNotification(notificacion: /*Notification*/any) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.addNotification(notificacion);
    }
    
    public addPost(/*post: Post*/) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.addPost(post);
    }
    
    public addMentionedUsers(mentionedUsers/*: List<string>*/, uuidPost: string) {
        /*this.socialDao = this.dbi.onDemand(SocialDao.class);
        for (let mentionedUser: string in mentionedUsers) {
            this.socialDao.addMentionedUser(mentionedUser, uuidPost);
        }
        */
    }
    
    public addReaction(reaction/*: Reaction*/) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.addReaction(reaction);
    }
    
    public addAttachments(attachments/*: List<Attachment>*/) {
        /*this.socialDao = this.dbi.onDemand(SocialDao.class);
        for (let attachment: Attachment in attachments) {
            this.socialDao.addAttachments(attachment);
        }
        */
    }
    
    public addAttachment(attachment/*: Attachment*/) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.addAttachments(attachment);
    }
    
    public getFollowersRelationship(senderUsername: string, receiverUsername: string)/*: FollowUser*/ {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //return this.socialDao.getFollowersRelationship(senderUsername, receiverUsername);
    }
    
    public getChatMessageHistory(username: string, init: number, limit: number)/*: Map<string, Object>*/ {
        /*this.socialDao = this.dbi.onDemand(SocialDao.class);
        let count: Integer = this.socialDao.countChatMessageHistory(username);
        let history: List<ChatMessage> = this.socialDao.getChatMessageHistory(username, init, limit);
        Collections.reverse(history);
        let pagination: Pagination = new Pagination(count, init, limit);
        let resultMap: Map<string, Object> = new HashMap();
        resultMap.put("pagination", pagination);
        resultMap.put("result", history);
        return resultMap;*/
    }
    
    public getPosts(username: string, init: number, limit: number, profileUsername: string)/*: Map<string, Object>*/ {
        /*this.socialDao = this.dbi.onDemand(SocialDao.class);
        let count: Integer = 0;
        let history: List<Post> = new ArrayList();
        if (((profileUsername != null) 
                    && !profileUsername.equals(""))) {
            count = this.socialDao.countMyPosts(profileUsername);
            history = this.socialDao.getMyPosts(profileUsername, init, limit);
        }
        else {
            let followingUser: List<FollowingUser> = this.getFollowingUsers(username);
            let followingUsernames: List<string> = followingUser.stream().map( FollowingUser:, :, getUsername).collect(Collectors.toList());
            followingUsernames.add(username);
            count = this.socialDao.countFollowingPosts(this.dbi, username, followingUsernames);
            history = this.socialDao.getFollowingPosts(this.dbi, username, followingUsernames, init, limit);
        }
        
        let postUuids: List<string> = history.stream().map(Post:, :, getUuid).collect(Collectors.toList());
        let originalUuidsPosts: List<string> = history.stream().map( Post:, :, getUuidOriginalPost).collect(Collectors.toList());
        let comments: List<Post> = this.socialDao.getCommentsByGroup(this.dbi, postUuids);
        // TODO esto en ocasiones no es necesario hacerlo, ya que puede ser que el originalPost est� entre los posts de history
        let originalPosts: List<Post> = this.socialDao.getPostsByGroup(this.dbi, originalUuidsPosts);
        let commentUuids: List<string> = comments.stream().map( Post:, :, getUuid).collect(Collectors.toList());
        let originalPostsUuids: List<string> = originalPosts.stream().map(Post:, :, getUuid).collect(Collectors.toList());
        if (((commentUuids != null) 
                    && !commentUuids.isEmpty())) {
            postUuids.addAll(commentUuids);
        }
        
        if (((originalPostsUuids != null) 
                    && !originalPostsUuids.isEmpty())) {
            postUuids.addAll(originalPostsUuids);
        }
        
        let reactions: List<Reaction> = this.socialDao.getReactionsByGroup(this.dbi, postUuids);
        let attachments: List<Attachment> = this.socialDao.getAttachmentsByGroup(this.dbi, postUuids);
        let mentionedUsers: List<MentionedUser> = this.socialDao.getMentionedUsersByGroup(this.dbi, postUuids);
        for (let i: number = 0; (i < comments.size()); i++) {
            let uuid: string = comments.get(i).getUuid();
            comments.get(i).setReactions(reactions.stream().filter(r, -, Greater, r.getUuidPost().equals(uuid)).collect(Collectors.toList()));
            comments.get(i).setAttachments(attachments.stream().filter(a, -, Greater, a.getUuidPost().equals(uuid)).collect(Collectors.toList()));
            comments.get(i).setMentionedUsers(mentionedUsers.stream().filter(a, -, Greater, a.getUuidPost().equals(uuid)).map( MentionedUser:, :, getUsername).collect(Collectors.toList()));
        }
        
        for (let i: number = 0; (i < originalPosts.size()); i++) {
            let uuid: string = originalPosts.get(i).getUuid();
            originalPosts.get(i).setAttachments(attachments.stream().filter(a, -, Greater, a.getUuidPost().equals(uuid)).collect(Collectors.toList()));
            originalPosts.get(i).setMentionedUsers(mentionedUsers.stream().filter(a, -, Greater, a.getUuidPost().equals(uuid)).map( MentionedUser:, :, getUsername).collect(Collectors.toList()));
        }
        
        for (let i: number = 0; (i < history.size()); i++) {
            let uuid: string = history.get(i).getUuid();
            let uuidOriginalPost: string = history.get(i).getUuidOriginalPost();
            history.get(i).setReactions(reactions.stream().filter(r, -, Greater, r.getUuidPost().equals(uuid)).collect(Collectors.toList()));
            history.get(i).setAttachments(attachments.stream().filter(a, -, Greater, a.getUuidPost().equals(uuid)).collect(Collectors.toList()));
            history.get(i).setMentionedUsers(mentionedUsers.stream().filter(a, -, Greater, a.getUuidPost().equals(uuid)).map(MentionedUser:, :, getUsername).collect(Collectors.toList()));
            history.get(i).setComments(comments.stream().filter(c, -, Greater, c.getUuidParent().equals(uuid)).collect(Collectors.toList()));
            if ((uuidOriginalPost != null)) {
                let originalPost: List<Post> = originalPosts.stream().filter(c, -, Greater, c.getUuid().equals(uuidOriginalPost)).collect(Collectors.toList());
                if (((originalPost != null) 
                            && !originalPost.isEmpty())) {
                    history.get(i).setOriginalPost(originalPost.get(0));
                }
                
            }
            
        }
        
        let pagination: Pagination = new Pagination(count, init, limit);
        let resultMap: Map<string, Object> = new HashMap();
        resultMap.put("pagination", pagination);
        resultMap.put("result", history);
        System.out.println(("number of posts: " + history.size()));
        return resultMap;*/
    }
    
    public getOwnPosts(uuidPosts/*: List<string>*/, username: string)/*: List<string>*/ {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //return this.socialDao.getOwnPosts(this.dbi, uuidPosts, username);
    }
    
    public getReactionByType(username: string, uuidPost: string, reactionType: string)/*: Reaction*/ {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //return this.socialDao.getReactionByType(username, uuidPost, reactionType);
    }
    
    public getReaction(username: string, uuidPost: string)/*: Reaction*/ {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //return this.socialDao.getReaction(username, uuidPost);
    }
    
    public getUserNotifications(username: string)/*: List<Notification>*/ {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //return this.socialDao.getUserNotifications(username);
    }
    
    public stopFollowingUser(username: string, followingUserName: string) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.removeFollowingUser(username, followingUserName);
    }
    
    public saveChatMessage(message/*: ChatMessage*/) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.saveChatMessage(message);
    }
    
    public changeStateFollowUser(senderUsername: string, username: string, state: number) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.changeStateFollowUser(senderUsername, username, state);
    }
    
    public updateReactionType(username: string, uuidPost: string, reactionType: string) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.updateReactionType(username, uuidPost, reactionType);
    }
    
    public deleteNotification(senderUsername: string, username: string, notificationType: string) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.deleteNotification(senderUsername, username, notificationType);
    }
    
    public removeReaction(username: string, uuidPost: string, reactionType: string) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.removeReaction(username, uuidPost, reactionType);
    }
    
    public deleteAllReactions(uuidPosts/*: List<string>*/) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.deleteAllReactions(this.dbi, uuidPosts);
    }
    
    public deleteAllMentionedUsers(uuidPosts/*: List<string>*/) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.deleteAllMentionedUsers(this.dbi, uuidPosts);
    }
    
    public deleteAttachments(uuidPosts/*: List<string>*/, username: string) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.deleteAttachments(this.dbi, username, uuidPosts);
    }
    
    public deletePosts(uuidPosts/*: List<string>*/, username: string) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.deletePosts(this.dbi, username, uuidPosts);
    }
    
    public changeNotifToViewed(username: string, ids/*: List<string>*/) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.changeNotifToViewed(this.dbi, username, ids);
    }
    
    public update(clothe: FollowUser) {
        
    }
    
    public remove(clothe: FollowUser) {
        
    }
}