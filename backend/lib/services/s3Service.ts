import { _Object, GetObjectCommand, ListBucketsCommand, ListObjectsCommand, ListObjectsCommandOutput, PutObjectCommand, PutObjectCommandOutput } from "@aws-sdk/client-s3";
import s3client from "../../utils/s3Client"
import { U } from "vitest/dist/reporters-BU_vXAUX.js";



type AddNewObjectToBucketProps = {
    bucketName: string,
    objectName: string,
    content: string
}



type GetFileFromBucketProps = {
    bucketName: string,
    objectName: string
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
        listFilesInBucket: async ({ bucketName }): Promise<_Object[] | null> => {
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
        getFileFromBucket: async ({ bucketName, objectName }: GetFileFromBucketProps): Promise<Uint8Array | null> => {
            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: objectName,
            });

            const response = await s3client.send(command);

            if (!response.Body) {
                return null;
            }


            const buffer: Uint8Array = await response.Body.transformToByteArray();

            return buffer;


        }
    }

}


