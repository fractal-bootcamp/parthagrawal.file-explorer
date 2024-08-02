import express from "express";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import s3client from "../../../utils/s3Client"
import s3Service from "../../services/s3Service"
import handleBuffer from "../../../utils/handleBuffer";
import multer from "multer";

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Hello file!');
});

router.get('/:key', async (req, res) => {
    const { key } = req.params;

    try {

        const response = await s3Service({ bucketName: "parthbucketbrigade" }).getFileFromBucket({ objectName: key });

        const data = response.data
        const metadata = response.metadata
        const statusCode = metadata.httpStatusCode

        if (!data) {
            return res.status(statusCode ? statusCode : 500)
        }


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
    }
    catch (error) {
        return res.status(500).send(error);
    }





});

const upload = multer({ dest: 'uploads/' });
router.post('/new', upload.single('file'), async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const file: Express.Multer.File = req.file;

    const response = await s3Service({ bucketName: "parthbucketbrigade" }).addNewObjectToBucket({ objectName: file.originalname, contentBuffer: file.buffer, contentType: file.mimetype });

    res.send(response);

})

router.get('/all', async (req, res) => {
    const response = await s3Service({ bucketName: "parthbucketbrigade" }).getAllFilesFromBucket();
    res.send(response);
})



export default router;