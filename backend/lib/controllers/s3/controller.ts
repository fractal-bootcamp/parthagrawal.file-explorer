import express from "express";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import s3client from "../../../utils/s3Client"


const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Hello file!');
});

router.get('/:key', async (req, res) => {
    const { key } = req.params;

});

router.post('/new', async (req, res) => {

})



export default router;