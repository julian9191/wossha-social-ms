import {
    table,
    hashKey,
} from '@aws/dynamodb-data-mapper-annotations';

@table('ws_users')
export class WsUser {

    @hashKey()
    public username: string;
    
    @hashKey()
    public connectionId: string
}