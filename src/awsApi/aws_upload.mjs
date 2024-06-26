import { S3Client} from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
dotenv.config();
import { Readable } from 'stream';
import { Upload } from "@aws-sdk/lib-storage";
import {parse} from "json2csv";
// env variables
const bucketName = process.env.BUCKET_NAME; 
const accessKey = process.env.AWS_ACCESS_KEY_ID; 
const secretKey = process.env.AWS_SECRET_ACCESS_KEY; 
const region =  process.env.AWS_REGION;
const dirPath = 'Experiment_data';
// s3 client
const s3 = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    }
});



async function uploadCsvToS3(dataObj,path) {

    var csv_ = parse(dataObj);
    const csvStream = Readable.from([csv_]);

    // // Upload the CSV file to S3
    const uploadCsv = new Upload({
        client:s3,
        params: {
            Bucket: bucketName,
            Key: path,
            Body: csvStream,
            ContentType: 'text/csv'
        }
    });
    return await uploadCsv.done();
}
async function handleData(dataObj,path) {
    try {
        return uploadCsvToS3(dataObj,path);
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}

export default handleData;




