import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Hello World!');
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.send(`Hello World! ${id}`);
});

export default router;