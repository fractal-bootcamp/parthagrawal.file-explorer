import { _Object, Bucket, GetObjectCommand, ListBucketsCommand, ListObjectsCommand, ListObjectsCommandOutput, PutObjectCommand, PutObjectCommandOutput } from "@aws-sdk/client-s3";
import type { ResponseMetadata } from "@smithy/types"; // Importing ResponseMetadata type
import s3client from "../../utils/s3Client"
import { S, U } from "vitest/dist/reporters-BU_vXAUX.js";



type AddNewObjectToBucketProps = {
    objectName: string,
    contentBuffer: Buffer,
    contentType: string
}

type S3ServiceResponse<T> = {
    data: T | null,
    metadata: ResponseMetadata
}


export const s3Service = ({ bucketName }: { bucketName: string }) => {
    return {
        listBuckets: async (): Promise<S3ServiceResponse<Bucket[]>> => {
            console.log("listing buckets")
            const command = new ListBucketsCommand({});

            const response = await s3client.send(command);
            const { Buckets } = response;

            if (!Buckets) {
                return {
                    data: null,
                    metadata: response.$metadata,
                };
            }

            return {
                data: Buckets,
                metadata: response.$metadata
            };

        },
        addNewObjectToBucket: async ({ objectName, contentBuffer, contentType }: AddNewObjectToBucketProps): Promise<S3ServiceResponse<null>> => {

            console.log("adding...")
            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: objectName,
                Body: contentBuffer,
                ContentType: contentType
            });
            const response = await s3client.send(command);

            return {
                data: null,
                metadata: response.$metadata
            };
        },
        listFilesInBucket: async (): Promise<S3ServiceResponse<_Object[]>> => {
            console.log("listing files in bucket")
            const command = new ListObjectsCommand({
                Bucket: bucketName,
            });

            const response = await s3client.send(command);

            const { Contents } = response;
            if (!Contents) {
                return {
                    data: null,
                    metadata: response.$metadata
                }
            }

            return {
                data: Contents,
                metadata: response.$metadata
            };
        },

        getFileFromBucket: async ({ objectName }: { objectName: string }): Promise<S3ServiceResponse<Buffer>> => {
            const command = new GetObjectCommand({
                Bucket: bucketName,
                Key: objectName,
            });

            const response = await s3client.send(command);

            if (!response.Body) {
                return {
                    data: null,
                    metadata: response.$metadata
                }
            }


            const array: Uint8Array = await response.Body.transformToByteArray();

            const buffer = Buffer.from(array);
            return {
                data: buffer,
                metadata: response.$metadata
            }


        }
    }

}


export default s3Service;


