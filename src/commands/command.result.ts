import { Event } from "../infraestructure/event/event";

export class CommandResult {
    
    private message: string = "";
    private response: any = null;
    private events: Event[] = [];

    public addEvent(event: Event) {
        this.events.push(event);
    }

    public getMessage(): string {
        return this.message;
    }
    
    public setMessage(message: string) {
        this.message = message;
    }
    
    public getEvents(): Event[] {
        return this.events;
    }
    
    public setEvents(events: Event[]) {
        this.events = events;
    }
    
    public getResponse(): Object {
        return this.response;
    }
    
    public setResponse(response: Object) {
        this.response = response;
    }
}