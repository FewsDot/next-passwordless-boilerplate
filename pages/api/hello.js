import { connectToDatabase } from "lib/mongodb";
import { checkAuth, checkMethod } from "lib/requestChecker";
import { generateRandomToken, saveTokenInDB } from "lib/token";

// SIDES EFFECTS

const handler = async (req, res) => {
	//Destructure db
	const { db } = await connectToDatabase();
	const collectionToken = db.collection("token");

	// 1 - Recoit un input, le verifie, et retourne un objet
	const bodyResult = checkAuth(req.body.email);
	const methodResult = checkMethod(req);

	// 2 - Genere un token d'authentification
	const authToken = generateRandomToken();

	// 3 - Sauvegarde le token en base de donnée
	const tokenResult = await saveTokenInDB(collectionToken, authToken);

	res.status(200).json({ response: bodyResult, method: methodResult, token: tokenResult });
};

export default handler;
