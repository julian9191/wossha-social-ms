import { Event } from "./event";
import { Message } from "./message";

export class SavePictureEvent extends Event {
    
    public static serialVersionUID: number;
    public message: Message;
    public static eventName: string = "SAVE-PICTURE";
    
    /*public constructor (originApp: string, username: string) {
        super("SAVE-PICTURE", originApp, username);
        this.message = new Message();
    }*/
    
    public constructor (originApp: string, username: string, message: Message) {
        super("SAVE-PICTURE", originApp, username);
        this.message = message;
    }
}