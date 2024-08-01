import { ListBucketsCommand, ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import s3client from "./s3Client"


const helloS3 = async () => {
    console.log("listing buckets")
    const command = new ListBucketsCommand({});

    const { Buckets } = await s3client.send(command);

    console.log("Buckets:")
    console.log(Buckets?.map((bucket) => bucket.Name).join("\n"));

}

const addNewObjectToBucket = async (bucketName: string, objectName: string, content: string) => {
    console.log("adding...")
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectName,
        Body: content,
    });
    await s3client.send(command);
}

export const listFilesInBucket = async ({ bucketName }) => {
    console.log("listing files in bucket")
    const command = new ListObjectsCommand({
        Bucket: bucketName,
    });

    const { Contents } = await s3client.send(command);
    console.log("Contents:")
    console.log(Contents)
    console.log(Contents?.map((content) => content.Key).join("\n"));

}





helloS3()

addNewObjectToBucket("parthbucketbrigade", "testfile.txt", "ayo ayo")
listFilesInBucket({ bucketName: "parthbucketbrigade" })