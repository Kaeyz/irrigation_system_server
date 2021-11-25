import { Express } from "express";
import basicAuth from "express-basic-auth";
import deviceRoutes from "../component/device/deviceRoutes";
import userRoutes from "../component/user/userRoutes";
import keys from "../config/keys";
import docsRoute from "./docsRoute";

const { serverPassword, serverUsername } = keys;

const getUnauthorizedResponse = (req:  basicAuth.IBasicAuthedRequest) => {
	return req.auth ? "Invalid Auth Credentials" : "No auth credentials provided";
};

export default (app: Express): Express => {

	app.get("/data", (req, res) => {
		const { sensorId, moistureValue } = req.query;
		const data = { sensorId, moistureValue };
		return res.status(200).json({ statusCode: 200, data, message: "data logged successfully" });
	});

	app.use(basicAuth({
		users: { [serverUsername]:serverPassword },
		challenge: true,
		unauthorizedResponse: getUnauthorizedResponse
	}));

	app.use("/users", userRoutes);
	app.use("/devices", deviceRoutes);
	
	docsRoute(app);

	app.get("/", (req, res) => res.status(200).json({ message: "App is live" }));
	app.use("*", (req, res) => res.status(404).json({ message: "Route does not exist" }));
	return app;
};