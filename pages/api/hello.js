import { pipe } from "ramda";
import { connectToDatabase } from "lib/mongodb";
import { checkAuth, checkMethod } from "lib/requestChecker";
import { getUserInDB, saveUserInDB } from "lib/users";
import { generateRandomToken, saveTokenInDB } from "lib/token";
import { sendAuthMail } from "lib/mailer";

const handler = async (req, res) => {
	const { db } = await connectToDatabase();
	const tokenCollection = db.collection("token");
	const usersCollection = db.collection("users");

	const bodyResult = checkAuth(req.body.email); // Check if email is valid
	const methodResult = checkMethod(req); // Check if method is valid

	const userExistResult = await getUserInDB(usersCollection, req.body.email); // Check if user exist in db
	const saveUserResult = await saveUserInDB(usersCollection, req.body.email); // Save User in DB
	const authToken = generateRandomToken(); // generate an object with token and validity
	const tokenResult = await saveTokenInDB(tokenCollection, authToken); // Save token in DB

	const sendByMailResult = await sendAuthMail(req.body.email, authToken.token);

	// Return api response
	res.status(200).json({
		meesage: bodyResult,
		method: methodResult,
		userExist: userExistResult,
		userSave: saveUserResult,
		token: tokenResult,
		sendMail: sendByMailResult,
	});
};

export default handler;
