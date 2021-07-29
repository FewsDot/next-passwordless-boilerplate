import { isNil, always, ifElse } from "ramda";

const getUserInDB = async (collection, userEmail) => {
	const getResult = await collection.findOne({ email: userEmail });
	const buildResponse = ifElse(
		isNil,
		always({ message: "User not exist in DB", auth: "signup" }),
		always({ message: `User exist in DB`, auth: "signin" })
	);

	return buildResponse(getResult);
};

const saveUserInDB = async (collection, userEmail) => {
	const userToInsert = {
		email: userEmail,
		verified: false,
		createdAt: Math.round(new Date().getTime() / 1000),
	};

	const getResult = await collection.insertOne(userToInsert);

	const buildResponse = ifElse(
		isNil,
		() => {
			throw { status: "error", message: "Problem with saving user in DB !" };
		},
		always({
			status: "succes",
			message: `${userEmail} saved in DB  !`,
		})
	);

	return buildResponse(getResult.insertedId);
};

export { getUserInDB, saveUserInDB };
