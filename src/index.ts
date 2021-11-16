import * as dotenv from "dotenv";
import express from "express";

dotenv.config({ path: ".env"});
const app = express();

const port = process.env.PORT;

app.get( "/", ( req, res ) => {
	return res.send("Welcome to irrigation place");
});

app.post("/data", (req, res) => {
  return res.status(200).json({statusCode: 200, data: req.body});
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});