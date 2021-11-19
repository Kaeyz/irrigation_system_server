import swaggerJsDoc from "swagger-jsdoc";
import { resolve } from "path";
import keys from "../config/keys";

const docsConfig = swaggerJsDoc({
	swaggerDefinition: {
		openapi: "3.0.0",
		servers: [{url: `${keys.host}`}],
		info: {
			title: "Api docs for IP_28 irrigation server",
			description: `Base Url: ${keys.host}`,
			contact: { name: "Kaeyz", email: "kolagbele@gmail.com" },
			version: "1.0.0"
		}},
	apis: [resolve(__dirname, "./**/*.js")],
});

export default Object.freeze(docsConfig);