import { ICommand } from "./icommand";

export interface ICommandSerializer<T> {
    deserialize(json:string): ICommand<T>;
}