import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { IJwtPayload } from "../component/user/userInterface";
import keys from "./keys";

const utils = {

	isEmpty: (value: unknown): boolean =>
		value === undefined || value === null ||
		(typeof value === "object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0),

	validateIsEmpty: (value: unknown): string => !utils.isEmpty(value) ? `${value}` : "",

	hashValue: (value: string): Promise<string> => {
		return new Promise((resolve, reject) => {
			bcryptjs.genSalt(10, (err, salt) => {
				if (err) return reject(err);
				bcryptjs.hash(value, salt, (err, hash) => {
					if (err) return reject(err);
					return resolve(hash);
				});
			});
		});
	},

	compareHash: (hash: string, value: string): Promise<boolean | Error> => {
		return new Promise((resolve, reject) => {
			bcryptjs.compare(value, hash)
				.then((isMatch: boolean) => resolve(isMatch))
				.catch((err: Error) => reject(err));
		});
	},

	generateLoginToken: (payload: IJwtPayload): Promise<string> => {
		return new Promise((resolve, reject) => {
			jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
				if (err) return reject(err);
				return resolve(token);
			});
		});
	},

	getRandomToken: (size: number) => crypto.randomBytes(size).toString("hex"),

};

export default Object.freeze(utils);