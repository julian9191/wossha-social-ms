export class ControllerWrapper {
    
    public static wrapMessaje(msj: string, response: Object): any {
        return {"msj": msj, "response":response};
    }
}