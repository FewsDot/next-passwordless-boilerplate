import { connectToDatabase } from "lib/mongodb";
import { checkAuth, checkMethod } from "lib/requestChecker";
import { getUserInDB, saveUserInDB } from "lib/users";
import { generateRandomToken, saveTokenInDB } from "lib/token";
import { sendAuthMail } from "lib/mailer";

const handler = async (req, res) => {
	const { db } = await connectToDatabase();
	const tokenCollection = db.collection("token");
	const usersCollection = db.collection("users");

	try {
		checkMethod(req);
		checkAuth(req.body.email);
		const { email } = req.body;
		const authToken = generateRandomToken();
		const isUserExist = await getUserInDB(usersCollection, email);
		!isUserExist.data && (await saveUserInDB(usersCollection, email));
		await saveTokenInDB(tokenCollection, authToken);
		await sendAuthMail(email, authToken.token);

		res.status(200).json({ status: "succes", message: "Please check you mail" });
	} catch (error) {
		res.status(400).json({ error: error });
		//TODO: Creer fonction qui  sauvegarde l'erreur dans la bdd
	}
};

export default handler;
