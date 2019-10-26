export class Globals {

    public static AWS_ACCOUNT_ID:string = null;
    public static LAMBDA_REGION:string = null;
    public static APP_NAME:string = 'WOSSHA-SOCIAL-LAMBDA';
    
    
    private static QUEUES_MAP:any = null;

    public static getQueuesMap(key:string):string{
        if(this.QUEUES_MAP == null && process.env.QUEUES_MAP != null){
            this.QUEUES_MAP = JSON.parse(process.env.QUEUES_MAP);
        }

        if(this.QUEUES_MAP != null){
            return this.QUEUES_MAP[key];
        }
        return null;
    }
}