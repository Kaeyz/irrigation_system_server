import { Express } from "express";

export default (app: Express): Express => {	
	
	app.get("/data", (req, res) => {
		const { sensorId, moistureValue } = req.query;
		const data = { sensorId, moistureValue };
		return res.status(200).json({ statusCode: 200, data, message: "data logged successfully" });
	});

	app.get("/", (req, res) => res.status(200).json({ message: "App is live" }));
	app.use("*", (req, res) => res.status(404).json({ message: "Invalid route" }));
	return app;
};