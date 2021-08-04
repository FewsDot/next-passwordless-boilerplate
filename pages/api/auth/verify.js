import { connectToDatabase } from "lib/mongodb";
import { pipeVerifyCheck } from "lib/requestChecker";
import { nowInTimestamp } from "lib/time";

const handler = async (req, res) => {
	const { db } = await connectToDatabase();
	const now = nowInTimestamp(); //Get actual Timestamp
	const { token } = req.query;
	const method = req.method;

	try {
		pipeVerifyCheck(method, "GET", token, "token"); //Check Method & param

		//TODO: Check if token is in db

		//Check token validity
		//Create JWT
		//Send JWT
		res.status(200).json({
			status: "succes",
			now: now,
			method: method,
			token: token,
		});
	} catch (error) {
		res.status(400).json(error);
	}
};

export default handler;
