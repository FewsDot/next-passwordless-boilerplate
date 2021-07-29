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
	let history = [];

	try {
		checkMethod(req);
		checkAuth(req.body.email);
		await getUserInDB(usersCollection, req.body.email); // Check if user exist in db
		const authToken = generateRandomToken(); // Generate an object with token and validity
		await saveTokenInDB(tokenCollection, authToken); // Save token in DB
		await sendAuthMail(req.body.email, authToken.token); // Send Mail to User
		res
			.status(200)
			.json({ process: "finish", status: "succes", message: "Please, check your mails" });
	} catch (error) {
		res.status(400).json({ error: error });
	}
};

export default handler;
