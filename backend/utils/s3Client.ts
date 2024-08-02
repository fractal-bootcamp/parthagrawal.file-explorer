import { S3Client } from "@aws-sdk/client-s3";

const AWS_REGION = process.env.AWS_REGION;
const ACCESS_KEY = process.env.S3_ACCESS_KEY_ID;
const ACCESS_SECRET = process.env.S3_ACCESS_SECRET;

if (!ACCESS_KEY || !ACCESS_SECRET || !AWS_REGION) {
    throw new Error("Missing some S3 credentials");
}

const s3Client = new S3Client({
    region: AWS_REGION, // e.g., 'us-east-1'
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: ACCESS_SECRET,
    },
});

export default s3Client;
