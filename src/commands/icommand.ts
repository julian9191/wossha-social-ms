import { CommandResult } from "./command.result";

export interface ICommand <T> {
    getData(): T
    commandName(): String;
    setData(data: T);
    setUsername(username: string); 
    execute(): Promise<CommandResult>;
}