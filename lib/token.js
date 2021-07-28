import { nanoid } from "nanoid";

const generateRandomToken = () => nanoid(24);

const saveTokenInDB = () => {};

export { generateRandomToken, saveTokenInDB };
