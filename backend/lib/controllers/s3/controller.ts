import express from "express";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import s3client from "../../../utils/s3Client"

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Hello file!');
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.send(`Hello World! ${id}`);
});

router.post('/new', async (req, res) => {

})



export default router;