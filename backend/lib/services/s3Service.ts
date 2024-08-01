import { _Object, GetObjectCommand, ListBucketsCommand, ListObjectsCommand, ListObjectsCommandOutput, PutObjectCommand, PutObjectCommandOutput } from "@aws-sdk/client-s3";
import s3client from "../../utils/s3Client"
import { U } from "vitest/dist/reporters-BU_vXAUX.js";



type AddNewObjectToBucketProps = {
    bucketName: string,
    objectName: string,
    content: string
}


export const s3Service = ({ bucketName }: { bucketName: string }) => {
    return {
        listBuckets: async () => {
            console.log("listing buckets")
            const command = new ListBucketsCommand({});

            const { Buckets } = await s3client.send(command);

            return Buckets;

        },
        addNewObjectToBucket: async ({ objectName, content, }: AddNewObjectToBucketProps): Promise<PutObjectCommandOutput> => {
            console.log("adding...")
            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: objectName,
                Body: content,
            });
            const response = await s3client.send(command);

            return response;
        },
        listFilesInBucket: async (): Promise<_Object[] | null> => {
            console.log("listing files in bucket")
            const command = new ListObjectsCommand({
                Bucket: bucketName,
            });

            const response = await s3client.send(command);

            const { Contents } = response;
            if (!Contents) {
                return null;
            }

            return Contents;
        },
        getFileFromBucket: async ({ objectName }: { objectName: string }): Promise<Buffer | null> => {
            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: objectName,
            });

            const response = await s3client.send(command);

            if (!response.Body) {
                return null;
            }


            const array: Uint8Array = await response.Body.transformToByteArray();

            const buffer = Buffer.from(array);
            return buffer;


        }
    }

}

export default s3Service;


