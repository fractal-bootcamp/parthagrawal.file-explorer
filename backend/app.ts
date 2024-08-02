import express from "express";
import cors from "cors";
import userRouter from "./lib/controllers/users/controller";
import s3Router from "./lib/controllers/s3/controller";

const app = express();

app.use(
	cors()
);

app.use(express.json());

app.use("/api", userRouter);
app.use("/file", s3Router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
	res.send('Hello World!')
})

export default app;
