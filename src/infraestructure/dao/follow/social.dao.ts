import { FollowingUser } from '../../../dto/following.user';
import { BaseDao } from "../base.dao";
import { FollowingUserMapper } from "./following.user.mapper";
import { ParamSet } from "../param.set";
import { FollowUserMapper } from './follow.user.mapper';
import { FollowUser } from '../../../commands/followUser/model/follow.user';
import { Notification } from '../../../dto/notification';
import { Post } from '../../../dto/post/post';
import { Attachment } from '../../../dto/post/attachment';

export class SocialDao extends BaseDao {

    private followingUserMapper: FollowingUserMapper = new FollowingUserMapper();
    private followUserMapper: FollowUserMapper = new FollowUserMapper();


    //SELECTS--------------------------------------------------------------------------------------------------------------------------------------

    public async getFollowingUsers(username: string){
        try {
            let query = `select 
            RECEIVER_USERNAME as USERNAME, STATE  
            from twss_followers where  
            SENDER_USERNAME=:username AND STATE=1`;

            let params = new ParamSet();
            params.addParam("username", username);
            

            return this.executeQuery(query, params, this.followingUserMapper);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.getFollowingUsers: ${err}`);
            return null;
        }
    }

    public async getFollowersRelationship(senderUsername: string, receiverUsername: string) : Promise<FollowUser[]>{
        try {
            let query = `select * 
            from twss_followers 
            where SENDER_USERNAME=:senderUsername AND RECEIVER_USERNAME=:receiverUsername`;

            let params = new ParamSet();
            params.addParam("senderUsername", senderUsername);
            params.addParam("receiverUsername", receiverUsername);

            return this.executeQuery(query, params, this.followUserMapper);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.getFollowersRelationship: ${err}`);
            return null;
        }
    }

    // INSERTS--------------------------------------------------------------------------------------------------------------------------------------
    
    public async addNotification(notificacion: Notification) : Promise<boolean>{
        try {
            let query = `Insert into TWSS_NOTIFICATIONS 
            (TYPE,RECEIVER_USERNAME,SENDER_USERNAME,SENDER_NAME,SENDER_PICTURE,VIEWED,OPENED) 
            values (:type,:receiverUserName,:senderUserName,:senderName,:senderPicture,:viewed,:opend)`;

            console.log("aaaaa: "+JSON.stringify(notificacion));

            let params = new ParamSet();
            params.addParam("type", notificacion.type);
            params.addParam("receiverUserName", notificacion.receiverUserName);
            params.addParam("senderUserName", notificacion.senderUserName);
            params.addParam("senderName", notificacion.senderName);
            params.addParam("senderPicture", notificacion.senderPicture);
            params.addParam("viewed", notificacion.viewed?"1":"0");
            params.addParam("opend", notificacion.opend?"1":"0");

            return this.execute(query, params);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.addNotification: ${err}`);
            return null;
        }
    }

    public async add(followUser:FollowUser) : Promise<boolean>{
        try {
            let query = `Insert into TWSS_FOLLOWERS 
            (UUID,SENDER_USERNAME,RECEIVER_USERNAME,STATE) values 
            (:uuid, :senderUsername, :receiverUsername, :state)`;

            let params = new ParamSet();
            params.addParam("uuid", followUser.uuid);
            params.addParam("senderUsername", followUser.senderUsername);
            params.addParam("receiverUsername", followUser.receiverUsername);
            params.addParam("state", followUser.state+"");

            return this.execute(query, params);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.add: ${err}`);
            return null;
        }
    }

    public async addPost(post: Post) : Promise<boolean>{
        try {
            let query = `Insert into TWSS_POSTS 
            (UUID,TYPE,USERNAME,TEXT,UUID_PARENT,UUID_ORIGINAL_POST) values 
            (:uuid, :type, :username, :text, :uuidParent, :uuidOriginalPost)`;

            let params = new ParamSet();
            params.addParam("uuid", post.uuid);
            params.addParam("type", post.type);
            params.addParam("username", post.username);
            params.addParam("text", post.text);
            params.addParam("uuidParent", post.uuidParent);
            params.addParam("uuidOriginalPost", post.uuidOriginalPost);

            return this.execute(query, params);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.addPost: ${err}`);
            return null;
        }
    }

    public async addMentionedUser(mentionedUser: string, uuidPost: string) : Promise<boolean>{
        try {
            let query = `Insert into TWSS_MENTIONED_USERS_POST 
            (UUID_POST,USERNAME) values (:uuidPost, :mentionedUser)`;

            let params = new ParamSet();
            params.addParam("uuidPost", uuidPost);
            params.addParam("mentionedUser", mentionedUser);

            return this.execute(query, params);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.addMentionedUser: ${err}`);
            return null;
        }
    }

    public async addAttachments(attachment: Attachment) : Promise<boolean>{
        try {
            let query = `Insert into TWSS_ATTACHMENTS 
            (UUID,TYPE,UUID_POST,URL,USERNAME) values 
            (:uuid, :type, :uuidPost, :url, :username)`;

            let params = new ParamSet();
            params.addParam("uuid", attachment.uuid);
            params.addParam("type", attachment.type);
            params.addParam("uuidPost", attachment.uuidPost);
            params.addParam("url", attachment.url);
            params.addParam("username", attachment.username);

            return this.execute(query, params);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.addAttachments: ${err}`);
            return null;
        }
    }


    // UPDATES--------------------------------------------------------------------------------------------------------------------------------------

    public async changeStateFollowUser(senderUsername: string, username: string, state: number) : Promise<boolean>{
        try {
            let query = `UPDATE TWSS_FOLLOWERS SET STATE = :state 
            WHERE SENDER_USERNAME=:senderUsername AND RECEIVER_USERNAME=:username`;

            let params = new ParamSet();
            params.addParam("senderUsername", senderUsername);
            params.addParam("username", username);
            params.addParam("state", state+"");

            return this.execute(query, params);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.changeStateFollowUser: ${err}`);
            return null;
        }
    }

    public async changeNotifToViewed(username: string, ids: string[]) : Promise<boolean>{
        try {
            let query = `UPDATE TWSS_NOTIFICATIONS
            SET VIEWED = 1
            WHERE RECEIVER_USERNAME = :username`;
            query += ids.length!=0 ? " AND ID IN (<ids>) " : " ";

            let typesBindMap : Map<string, string[]> = new Map();
            typesBindMap.set("ids", ids);
            query = this.generateBingIdentifier(query, typesBindMap);

            let params = new ParamSet();
            this.addInClauseBind(params, typesBindMap);
            params.addParam("username", username);

            return this.execute(query, params);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.changeNotifToViewed: ${err}`);
            return null;
        }
    }


    // REMOVES--------------------------------------------------------------------------------------------------------------------------------------

    public async deleteNotification(senderUsername: string, username: string, notificationType: string) : Promise<boolean>{
        try {
            let query = `DELETE FROM TWSS_NOTIFICATIONS 
            WHERE SENDER_USERNAME=:senderUsername AND RECEIVER_USERNAME=:username AND TYPE=:notificationType`;

            let params = new ParamSet();
            params.addParam("senderUsername", senderUsername);
            params.addParam("username", username);
            params.addParam("notificationType", notificationType);

            return this.execute(query, params);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.deleteNotification: ${err}`);
            return null;
        }
    }

}