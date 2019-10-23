import { Event } from "../infraestructure/event/event";

export class CommandResult {
    
    public message: string;
    public response: any;
    public events: Event[];

    public addEvent(event: Event) {
        this.events.push(event);
    }
}