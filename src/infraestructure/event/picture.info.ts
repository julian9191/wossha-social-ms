export class PictureInfo{
    
    public uuidPicture: string;
    public name: string;
    public fileType: string;
    public type: string;
    public fileSize: number;
    public uuidPictureToRemove: string;
    
    public constructor (uuidPicture: string, name: string, fileType: string, type: string, fileSize: number, uuidPictureToRemove: string) {
        this.uuidPicture = uuidPicture;
        this.name = name;
        this.fileType = fileType;
        this.type = type;
        this.fileSize = fileSize;
        this.uuidPictureToRemove = uuidPictureToRemove;
    }
}