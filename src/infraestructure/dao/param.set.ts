export class ParamSet{

    public paramNames:string[];
    public paramValues:string[];

    public constructor(){
        this.paramNames = [];
        this.paramValues = [];
    }

    public addParam(name:string, value:string){
        this.paramNames.push(name);
        this.paramValues.push(value);
    }
}
