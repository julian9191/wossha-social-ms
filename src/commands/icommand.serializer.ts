import { ICommand } from "./icommand";

export interface ICommandSerializer<T> {
    deserialize(data:any): ICommand<T>;
}