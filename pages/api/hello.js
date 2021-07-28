import {} from "ramda";
import { checkAuth, checkMethod } from "lib/requestChecker";
import { generateRandomToken, saveTokenInDB } from "lib/token";

// SIDES EFFECTS
const authToken = generateRandomToken();

export default function handler(req, res) {
	// 1 - Recoit un input, le verifie, et retourne un objet
	const bodyResult = checkAuth(req.body.email);
	const methodResult = checkMethod(req);

	// 2 - Genere un token d'authentification
	// 3

	res.status(200).json({ response: bodyResult, method: methodResult, authToken });
}
