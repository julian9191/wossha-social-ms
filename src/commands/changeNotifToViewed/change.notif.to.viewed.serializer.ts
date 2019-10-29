import { ICommand, ICommandSerializer } from "wossha-msbase-lib";
import { Inject } from "typescript-ioc";
import { ChangeNotifToViewedCommand } from "./change.notif.to.viewed.command";
import { ChangeNotifToViewed } from "./model/change.notifTo.viewed";

export class ChangeNotifToViewedSerializer implements ICommandSerializer<ChangeNotifToViewed> {
    
    @Inject
    private command: ChangeNotifToViewedCommand;
    
    public deserialize(data: any): ICommand<ChangeNotifToViewed> {
        let dto: ChangeNotifToViewed = data;
        this.command.setData(dto);
        return this.command;
    }
}