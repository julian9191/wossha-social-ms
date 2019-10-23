
export interface IRepository <T> {
    
    add(entity : T);

    remove(entity : T);

    update(entity : T);
}