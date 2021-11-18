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


app.get("/data", (req, res) => {
	// save to a database;

	const { sensorId, moistureValue } = req.query;

	const data = { sensorId, moistureValue };
	console.log(data);
	return res.status(200).json({ statusCode: 200, data, message: "data logged successfully" });
});

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
}); 