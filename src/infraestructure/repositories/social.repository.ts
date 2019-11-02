import { IRepository } from "./irepository";
import { FollowingUser } from "../../dto/following.user";
import { SocialDao } from "../dao/follow/social.dao";
import { Inject } from "typescript-ioc";
import { FollowUser } from "../../commands/followUser/model/follow.user";
import { Notification } from "../../dto/notification";
import { Post } from "../../dto/post/post";
import { Attachment } from "../../dto/post/attachment";
import { Reaction } from "../../dto/post/reaction";

export class SocialRepository implements IRepository<FollowUser> {
    
    @Inject
    private socialDao: SocialDao;

    public async getFollowingUsers(username: string): Promise<FollowingUser[]> {
        
        return await this.socialDao.getFollowingUsers(username);
    }
    
    public async add(followUser: FollowUser): Promise<boolean> {
        return await this.socialDao.add(followUser);
    }
    
    public async addNotification(notificacion: Notification): Promise<boolean> {
        return await this.socialDao.addNotification(notificacion);
    }
    
    public async addPost(post: Post) {
        return await this.socialDao.addPost(post);
    }
    
    public async addMentionedUsers(mentionedUsers: string[], uuidPost: string) {
        for (let mentionedUser of mentionedUsers) {
            await this.socialDao.addMentionedUser(mentionedUser, uuidPost)
        }
    }
    
    public async addReaction(reaction: Reaction) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.addReaction(reaction);
        await this.socialDao.addReaction(reaction);
    }
    
    public async addAttachments(attachments: Attachment[]) {
        for (const attachment of attachments) {
            await this.socialDao.addAttachments(attachment);
        }
    }
    
    public async addAttachment(attachment: Attachment) {
        return await this.socialDao.addAttachments(attachment);
    }
    
    public async getFollowersRelationship(senderUsername: string, receiverUsername: string): Promise<FollowUser[]> {
        return await this.socialDao.getFollowersRelationship(senderUsername, receiverUsername);
    }
    
    public async getChatMessageHistory(username: string, init: number, limit: number)/*: Map<string, Object>*/ {
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
    
    public async getPosts(username: string, init: number, limit: number, profileUsername: string)/*: Map<string, Object>*/ {
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
            let followingUsernames: string[] = followingUser.stream().map( FollowingUser:, :, getUsername).collect(Collectors.toList());
            followingUsernames.add(username);
            count = this.socialDao.countFollowingPosts(this.dbi, username, followingUsernames);
            history = this.socialDao.getFollowingPosts(this.dbi, username, followingUsernames, init, limit);
        }
        
        let postUuids: string[] = history.stream().map(Post:, :, getUuid).collect(Collectors.toList());
        let originalUuidsPosts: string[] = history.stream().map( Post:, :, getUuidOriginalPost).collect(Collectors.toList());
        let comments: List<Post> = this.socialDao.getCommentsByGroup(this.dbi, postUuids);
        // TODO esto en ocasiones no es necesario hacerlo, ya que puede ser que el originalPost est� entre los posts de history
        let originalPosts: List<Post> = this.socialDao.getPostsByGroup(this.dbi, originalUuidsPosts);
        let commentUuids: string[] = comments.stream().map( Post:, :, getUuid).collect(Collectors.toList());
        let originalPostsUuids: string[] = originalPosts.stream().map(Post:, :, getUuid).collect(Collectors.toList());
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
    
    public async getOwnPosts(uuidPosts: string[], username: string): Promise<string[]> {
        return await this.socialDao.getOwnPosts(uuidPosts, username);
    }
    
    public async getReactionByType(username: string, uuidPost: string, reactionType: string)/*: Reaction*/ {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //return this.socialDao.getReactionByType(username, uuidPost, reactionType);
    }
    
    public async getReaction(username: string, uuidPost: string): Promise<Reaction[]> {
        return await this.socialDao.getReaction(username, uuidPost);
    }
    
    public async getUserNotifications(username: string)/*: List<Notification>*/ {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //return this.socialDao.getUserNotifications(username);
    }
    
    public async stopFollowingUser(username: string, followingUserName: string) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.removeFollowingUser(username, followingUserName);
    }
    
    public async saveChatMessage(message/*: ChatMessage*/) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.saveChatMessage(message);
    }
    
    public async changeStateFollowUser(senderUsername: string, username: string, state: number) {
        return await this.socialDao.changeStateFollowUser(senderUsername, username, state);
    }
    
    public async updateReactionType(username: string, uuidPost: string, reactionType: string) {
        //this.socialDao = this.dbi.onDemand(SocialDao.class);
        //this.socialDao.updateReactionType(username, uuidPost, reactionType);
        return await this.socialDao.updateReactionType(username, uuidPost, reactionType);
    }
    
    public async deleteNotification(senderUsername: string, username: string, notificationType: string) {
        return await this.socialDao.deleteNotification(senderUsername, username, notificationType);
    }
    
    public async removeReaction(username: string, uuidPost: string, reactionType: string) {
        return await this.socialDao.removeReaction(username, uuidPost, reactionType);
    }
    
    public async deleteAllReactions(uuidPosts: string[]) {
        return await this.socialDao.deleteAllReactions(uuidPosts);
    }
    
    public async deleteAllMentionedUsers(uuidPosts: string[]) {
        return await this.socialDao.deleteAllMentionedUsers(uuidPosts);
    }
    
    public async deleteAttachments(uuidPosts: string[], username: string) {
        return await this.socialDao.deleteAttachments(uuidPosts, username);
    }
    
    public async deletePosts(uuidPosts: string[], username: string) {
        return await this.socialDao.deletePosts(uuidPosts, username);
    }
    
    public async changeNotifToViewed(username: string, ids/*: string[]*/) {
        return await this.socialDao.changeNotifToViewed(username, ids);
    }
    
    public async update(clothe: FollowUser) {
        
    }
    
    public async remove(clothe: FollowUser) {
        
    }
}