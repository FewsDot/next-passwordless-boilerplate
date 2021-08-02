import { nanoid } from "nanoid";

const generateRandomToken = () => ({
	token: nanoid(24),
	validity: Math.round(new Date().getTime() / 1000) + parseInt(process.env.EXPIRATION_SHORT), //15min
});

const saveTokenInDB = (collection, authToken) => {
	return new Promise((resolve, reject) => {
		collection.insertOne(authToken, (err) => {
			if (err) {
				return reject({
					status: "error",
					message: err.errmsg,
				});
			}
			resolve("Token add in DB");
		});
	});
};

export { generateRandomToken, saveTokenInDB };
