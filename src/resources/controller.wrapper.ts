export class ControllerWrapper {
    
    public static wrapMessaje(msj: string, response: Object): any {
        
        let subString = "Error: ";
        if(msj.startsWith(subString)){
            msj = msj.substring(subString.length, msj.length)
        }
        return {"msj": msj, "response":response};
    }
}