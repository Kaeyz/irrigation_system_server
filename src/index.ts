import * as dotenv from "dotenv";
import express from "express";

dotenv.config({ path: ".env"});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.get( "/", ( req, res ) => {
	return res.send("Welcome to irrigation server");
});

app.post("/data", (req, res) => {
	// save to a database;
	console.log({ body: req.body });
	return res.status(200).json({ statusCode: 200, data: req.body, message: "data logged successfully" });
});

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
}); 