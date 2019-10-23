import { ResultSetMapper } from "../result.set.mapper";
import { FollowUser } from "../../../commands/followUser/model/follow.user";

export class FollowUserMapper implements ResultSetMapper<FollowUser>{

    public map(result: any): FollowUser[] {
        let array: FollowUser[] = [];

        for (let i = 0; i < result.length; i++) {

            let followingUser = new FollowUser(
                result[i]["SENDER_USERNAME"], 
                result[i]["UUID"],
                result[i]["SENDER_USERNAME"],
                result[i]["RECEIVER_USERNAME"],
                result[i]["STATE"]
            );

            array.push(followingUser);
        }

        return array;
    }
}