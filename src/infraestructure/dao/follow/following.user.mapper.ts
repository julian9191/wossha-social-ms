import { FollowingUser } from "../../../dto/following.user";
import { ResultSetMapper } from "../result.set.mapper";

export class FollowingUserMapper implements ResultSetMapper<FollowingUser>{

    public map(result: any): FollowingUser[] {
        let array: FollowingUser[] = [];

        for (let i = 0; i < result.length; i++) {

            let followingUser = new FollowingUser(
                result[i]["USERNAME"], 
                result[i]["STATE"]
            );
            
            array.push(followingUser);
        }

        return array;
    }
}