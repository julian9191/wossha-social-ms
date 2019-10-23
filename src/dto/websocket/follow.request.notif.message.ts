import { IChatMessage } from "./Ichat.message";
import { Notification } from "../notification";

export class FollowRequestNotifMessage implements IChatMessage {
    
    private responseType: string = "FOLLOW-REQUEST-NOTIF";
    public fromId: string;
    public toId: string;

    public message: Notification;
    
    public constructor (fromId: string, toId: string, message: Notification) {
        this.fromId = fromId;
        this.toId = toId;
        this.message = message;
    }
    
    public getResponseType(): string {
        return this.responseType;
    }
    
    public setResponseType(responseType: string) {
        this.responseType = this.responseType;
    }
    
}