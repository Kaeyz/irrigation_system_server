import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import db from "./config/database";

(async () => {
	
	const app = express();
	await db.connect();

	app.use(cors());
	app.use(helmet());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	
	routes(app);
	
	const port = process.env.PORT;
	
	app.listen(port, () => console.log(`server started at http://localhost:${port}`));
	
})();