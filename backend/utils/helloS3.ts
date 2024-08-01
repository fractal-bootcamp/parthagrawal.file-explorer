import { ListBucketsCommand } from "@aws-sdk/client-s3";
import s3client from "./s3Client"


const helloS3 = async () => {
    const command = new ListBucketsCommand({});

    const { Buckets } = await s3client.send(command);

    console.log("Buckets:")
    console.log(Buckets?.map((bucket) => bucket.Name).join("\n"));

}

helloS3()