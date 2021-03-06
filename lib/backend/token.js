import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

const generateRandomToken = (now, userID, type) => ({
	token: nanoid(24),
	type: type,
	validity: now + parseInt(process.env.EXPIRATION_SHORT), //15min
	userID: userID,
});

const generateJWT = (now, userID) => {
	return jwt.sign(
		{
			exp: now + parseInt(process.env.EXPIRATION_LONG), // 4h
			userID,
		},
		process.env.JWT_SECRET
	);
};

export { generateRandomToken, generateJWT };
