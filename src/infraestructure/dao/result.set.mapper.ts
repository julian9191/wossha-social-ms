export interface ResultSetMapper<T>{
    map(result: any):T[];
}