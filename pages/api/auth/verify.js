import { connectToDatabase } from "lib/mongodb";
import { checkExistence, checkMethod } from "lib/requestChecker";
const handler = async (req, res) => {
	const { db } = await connectToDatabase();

	try {
		//Check Method & param
		const resultOfCheckingMethod = checkMethod(req.method, "GET");
		const resultOfCheckingToken = checkExistence(req.query.token, "token");

		//Check if token is in db
		//Check token validity
		//Create JWT
		//Send JWT
		res.status(200).json({
			status: "succes",
			methodChecked: resultOfCheckingMethod,
			tokenCheked: resultOfCheckingToken,
			token: req.query.token,
		});
	} catch (error) {
		res.status(400).json(error);
	}
};

export default handler;
