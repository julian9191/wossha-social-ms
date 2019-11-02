export class StopFollowingUser {
    
    public username: string;
    public followingUserName: string;
    
    public constructor (username: string, followingUserName: string) {
        this.username = username;
        this.followingUserName = followingUserName;
    }
}
