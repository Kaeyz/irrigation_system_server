import { JwtFromRequestFunction, Strategy, StrategyOptions } from "passport-jwt";
import { PassportStatic } from "passport";
import { IJwtPayload } from "../component/user/userInterface";
import userService from "../component/user/userService";
import keys from "./keys";

export const passportConfig = (passport: PassportStatic) => {

	const tokenExtractor: JwtFromRequestFunction = (req) => {
		let token = null;
		if (req && req.headers.token) {
			token = String(req.headers.token);
		}
		return token;
	};

	const opts: StrategyOptions = {
		jwtFromRequest: tokenExtractor,
		secretOrKey: keys.secretOrKey
	};

	passport.use(new Strategy(opts, (jwt_payload: IJwtPayload, done) => {
		userService.getLoggedInUser(jwt_payload._id)
			.then(user => {
				if (!user) return done(null, false);
				return done(null, user);
			})
			.catch(() => {
				throw new Error("Passport initialization failed");
			});
	}));
};
