import uuidv5 = require('uuid/v5');

export class Event {
    
    private uuid: string;
    
    private name: string;
    
    private originApp: string;
    
    private username: string;
    
    //@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd hh:mm:ss")
    private timestamp: Date;
  
    public constructor (name: string, originApp: string, username: string) {
        this.uuid = uuidv5();
        this.name = name;
        this.originApp = originApp;
        this.username = username;
        this.timestamp = new Date();
    }

}