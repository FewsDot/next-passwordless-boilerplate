import { connectToDatabase } from "lib/mongodb";
import { checkAuth, checkMethod } from "lib/requestChecker";
import { generateRandomToken, saveTokenInDB } from "lib/token";
import { sendAuthMail } from "lib/mailer";

const handler = async (req, res) => {
	const { db } = await connectToDatabase();
	const collectionToken = db.collection("token");

	const bodyResult = checkAuth(req.body.email); // Check if email is valid
	const methodResult = checkMethod(req); // Check if method is valid
	const authToken = generateRandomToken(); // generate an object with token and validity
	const tokenResult = await saveTokenInDB(collectionToken, authToken); // Save token in DB
	const sendByMailResult = await sendAuthMail(req.body.email, authToken.token);

	// Return api response
	res.status(200).json({
		response: bodyResult,
		method: methodResult,
		token: tokenResult,
		sendMail: sendByMailResult,
	});
};

export default handler;
