import { connectToDatabase } from "lib/mongodb";
import { pipeVerifyCheck, checkValidity } from "lib/requestChecker";
import { nowInTimestamp } from "lib/time";
import { getToken } from "lib/token";

const handler = async (req, res) => {
	const { db } = await connectToDatabase(); //Init DB
	const now = nowInTimestamp(); //Get actual Timestamp
	const { token } = req.query; //Get token from Request Query
	const method = req.method; //Get method from Request

	try {
		pipeVerifyCheck(method, "GET", token, "Token"); //Check Method & param
		const tokenFromDB = await getToken(db.collection("tokens"), token); //Check if Token exist
		const isValid = checkValidity(now, tokenFromDB); //Check Token validity

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
