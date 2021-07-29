import { nanoid } from "nanoid";
import { isNil, always, ifElse } from "ramda";

const generateRandomToken = () => ({
	token: nanoid(24),
	validity: Math.round(new Date().getTime() / 1000) + parseInt(process.env.EXPIRATION_SHORT), //15min
});

const saveTokenInDB = async (collection, authToken) => {
	const { token, validity } = authToken;
	const getResult = await collection.insertOne(authToken);

	const buildResponse = ifElse(
		isNil,
		() => {
			throw { status: "error", message: "Problem with saving auth token in DB !" };
		},
		always({
			status: "succes",
			message: `${token} saved in DB  and valid until ${validity}!`,
			data: token,
		})
	);

	return buildResponse(getResult.insertedId);
};

export { generateRandomToken, saveTokenInDB };
