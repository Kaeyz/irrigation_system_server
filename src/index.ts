import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";

dotenv.config({ path: ".env" });

(async () => {
	
	const app = express();

	app.use(cors());
	app.use(helmet());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	
	routes(app);
	
	const port = process.env.PORT;
	
	app.listen(port, () => {
		console.log(`server started at http://localhost:${port}`);
	});

})();