import { Notification } from "../notification";
import { IChatMessage } from "./Ichat.message";

export class AcceptFollowMessage implements IChatMessage {
    
    public responseType: String = "ACCEPT-FOLLOW";
    public fromId: String;
    public toId: String;
    public message: Notification;
    
    public constructor (fromId: String, toId: String, message: Notification) {
        this.fromId = fromId;
        this.toId = toId;
        this.message = message;
    }
    
    public getResponseType(): String {
        return this.responseType;
    }
    
    public setResponseType(responseType: String) {
        this.responseType = responseType;
    }
}