import { FollowingUser } from '../../../dto/following.user';
import { BaseDao } from "../base.dao";
import { FollowingUserMapper } from "./following.user.mapper";
import { Inject } from "typescript-ioc";
import { ParamSet } from "../param.set";

export class SocialDao extends BaseDao {

    private followingUserMapper: FollowingUserMapper = new FollowingUserMapper();

    public async getFollowingUsers(username:string) : Promise<FollowingUser[]>{
        try {
            let query = `select 
            RECEIVER_USERNAME as USERNAME, STATE  
            from twss_followers where  
            SENDER_USERNAME=:username AND STATE=1`;

            let params = new ParamSet();
            params.addParam("username", username);

            return this.execute(query, params, this.followingUserMapper);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.getFollowingUsers: ${err}`);
            return null;
        }
    }


    public async inClauseBindExample() : Promise<FollowingUser[]>{
        try {

            let usernames:string[] = ["carito", "juliancho9191"];

            let query = `select 
            RECEIVER_USERNAME as USERNAME, STATE  
            from twss_followers where  
            SENDER_USERNAME in (<usernames>) AND STATE=1`;

            let typesBindMap : Map<string, string[]> = new Map();
            typesBindMap.set("usernames", usernames);
            query = this.generateBingIdentifier(query, typesBindMap);

            let params = new ParamSet();
            this.addInClauseBind(params, typesBindMap);
            

            return this.execute(query, params, this.followingUserMapper);
        } catch (err) {
            console.log(`Error ocurred when trying to excecute the query in SocialDao.getFollowingUsers: ${err}`);
            return null;
        }
    }
}