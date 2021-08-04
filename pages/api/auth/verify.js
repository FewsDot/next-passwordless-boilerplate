import { connectToDatabase } from "lib/mongodb";
import { pipeVerifyCheck } from "lib/requestChecker";
import { nowInTimestamp } from "lib/time";
import { getToken } from "lib/token";

const handler = async (req, res) => {
	const { db } = await connectToDatabase();
	const now = nowInTimestamp(); //Get actual Timestamp
	const { token } = req.query;
	const method = req.method;

	try {
		pipeVerifyCheck(method, "GET", token, "token"); //Check Method & param

		const tokenFromDB = await getToken(db.collection("tokens"), token); //Check If Token exist

		//Check token validity
		//Create JWT
		//Send JWT
		res.status(200).json({
			status: "succes",
			now: now,
			method: method,
			tokenFromRequest: token,
			tokenFromDB: tokenFromDB,
		});
	} catch (error) {
		res.status(400).json(error);
	}
};

export default handler;
