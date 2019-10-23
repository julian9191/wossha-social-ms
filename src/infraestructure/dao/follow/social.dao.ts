import { FollowingUser } from '../../../dto/following.user';
import { BaseDao } from "../base.dao";
import { FollowingUserMapper } from "./following.user.mapper";
import { ParamSet } from "../param.set";
import { FollowUserMapper } from './follow.user.mapper';
import { FollowUser } from '../../../commands/followUser/model/follow.user';
import { Notification } from '../../../dto/notification';

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

            let params = new ParamSet();
            params.addParam("type", notificacion.type);
            params.addParam("receiverUserName", notificacion.receiverUserName);
            params.addParam("senderUserName", notificacion.senderUserName);
            params.addParam("senderName", notificacion.senderName);
            params.addParam("senderPicture", notificacion.senderPicture);
            params.addParam("viewed", notificacion.viewed+"");
            params.addParam("opend", notificacion.opend+"");

            return this.execute(query, params);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.addNotification: ${err}`);
            return null;
        }
    }
}