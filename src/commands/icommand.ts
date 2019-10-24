import { CommandResult } from "./command.result";
import { UserSessionInfo } from "../dto/user.session.info";

export interface ICommand <T> {
    commandName(): String;
    getData(): T
    setData(data: T);
    setSesionInfo(sesionInfo: UserSessionInfo); 
    execute(): Promise<CommandResult>;
}