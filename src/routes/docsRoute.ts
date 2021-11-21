import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { docsConfig } from "../docs";

const setupDocs = (app: Express) => {
	const swaggerHtml = swaggerUi.generateHTML(docsConfig);
	app.use("/docs", swaggerUi.serveFiles(docsConfig));
	app.get("/docs", (req: Request, res: Response) => { res.send(swaggerHtml); });
};

export default Object.freeze(setupDocs);