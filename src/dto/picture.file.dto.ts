export class PictureFileDTO {
    
    public filename: string;
    public filetype: string;
    public size: number;
    public value: string;
    
    public constructor (filename: string, filetype: string, size: number, value: string) {
        this.filename = filename;
        this.filetype = filetype;
        this.size = size;
        this.value = value;
    }
    
}