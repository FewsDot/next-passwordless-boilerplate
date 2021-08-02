import { nanoid } from "nanoid";

const generateRandomToken = (now) => ({
	token: nanoid(24),
	validity: now + parseInt(process.env.EXPIRATION_SHORT), //15min
});

export { generateRandomToken };
