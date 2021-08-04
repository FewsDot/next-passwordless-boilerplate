import { nanoid } from "nanoid";

const generateRandomToken = (now, userID) => ({
	token: nanoid(24),
	validity: now + parseInt(process.env.EXPIRATION_SHORT), //15min
	userID: userID,
});

export { generateRandomToken };
