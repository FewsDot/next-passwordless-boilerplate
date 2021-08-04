import { connectToDatabase } from "lib/mongodb";
import { pipeVerifyCheck, throwerError } from "lib/requestChecker";
import { nowInTimestamp } from "lib/time";
import { getToken, checkValidity } from "lib/token";

const handler = async (req, res) => {
	const { db } = await connectToDatabase();
	const now = nowInTimestamp(); //Get actual Timestamp
	const { token } = req.query;
	const method = req.method;

	try {
		pipeVerifyCheck(method, "GET", token, "Token"); //Check Method & param

		const tokenFromDB = await getToken(db.collection("tokens"), token); //Check If Token exist
		const isValid = checkValidity(now, tokenFromDB.validity, () =>
			throwerError(token, "Is expired! Please retry to auth")
		);
		//Check token validity
		//Create JWT
		//Send JWT
		res.status(200).json({
			status: "Succes",
			now: now,
			method: method,
			tokenFromRequest: token,
			tokenFromDB: tokenFromDB,
			isValid: isValid,
		});
	} catch (error) {
		res.status(400).json(error);
	}
};

export default handler;
