var AWS = require('aws-sdk');

export class S3Uploader {

	private s3 = new AWS.S3();
	private S3_BUCKET: String = process.env.S3_BUCKET;

	public save(base64Data: any, filename: string): Promise<boolean> {

		let decodedImage = Buffer.from(base64Data.replace(/^data:image\/\w+;base64,/, ""), 'base64');

		const params = {
			"Bucket": this.S3_BUCKET,
			"Key": filename,
			"Body": decodedImage,
			"ACL": 'public-read',
			"ContentEncoding": 'base64',
			"ContentType": `image/png`
		}
        let _this = this;
        let s3UploadPromise = new Promise<boolean>(function(resolve, reject) {
            _this.s3.upload(params, function(err, data) {
                if (err) {
					console.log("Error uploading file "+filename+": "+err);
                    reject(false);
                } else {
					console.log("picture stored in s3: " + filename);
                    resolve(true);
                }
            });
        });

        return s3UploadPromise;

	}
}