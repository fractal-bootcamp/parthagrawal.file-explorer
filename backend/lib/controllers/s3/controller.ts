import express from "express";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import s3client from "../../../utils/s3Client"
import s3Service from "../../services/s3Service"
import handleBuffer from "../../../utils/handleBuffer";


const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Hello file!');
});

router.get('/:key', async (req, res) => {
    const { key } = req.params;

    const data = await s3Service({ bucketName: "parthbucketbrigade" }).getFileFromBucket({ objectName: key });
    if (!data) return res.status(404).send("File not found");

    // Process the buffer based on its content type
    const contentType = 'text/plain'
    // const contentType = req.headers['content-type'];
    if (contentType && contentType.startsWith('text/')) {
        const textData = data.toString('utf-8');
        return res.send(textData);
    } else if (contentType && contentType.startsWith('image/')) {
        res.set('Content-Type', contentType);
        return res.send(data);
    } else {
        return res.status(400).send("Unsupported content type");
    }


});

router.post('/new', async (req, res) => {

})



export default router;