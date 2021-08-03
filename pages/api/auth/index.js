import { connectToDatabase } from "lib/mongodb";
import { checkExistence, checkEmail, checkScript, checkMethod } from "lib/requestChecker";
import { getUserInDB, createUser } from "lib/users";
import { nowInTimestamp } from "lib/time";
import { saveInDB } from "lib/database";
import { generateRandomToken } from "lib/token";
import { sendAuthMail } from "lib/mailer";

const handler = async (req, res) => {
	const { db } = await connectToDatabase();
	const tokensCollection = db.collection("tokens");
	const usersCollection = db.collection("users");
	const errorsCollection = db.collection("errors");
	const now = nowInTimestamp();

	try {
		checkMethod(req.method, "POST");
		checkScript(req.body.email);
		checkExistence(req.body.email, "email");
		checkEmail(req.body.email);

		const { email } = req.body;
		const authToken = generateRandomToken(now);
		const isUserExist = await getUserInDB(usersCollection, email);
		!isUserExist.data && (await saveInDB(usersCollection, createUser(email, now)));
		await saveInDB(tokensCollection, authToken);
		await sendAuthMail(email, authToken);

		res.status(200).json({ status: "succes", message: "Please check you mail !" });
	} catch (error) {
		if (error.type === "dependence") {
			await saveInDB(errorsCollection, error);
			res.status(400).json({ error: "dependance error", message: "Error send to the webmaster." });
		}
		res.status(400).json(error);
	}
};

export default handler;
