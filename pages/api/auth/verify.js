import { connectToDatabase } from "lib/mongodb";
import { checkAllMethod } from "lib/requestChecker";
const handler = async (req, res) => {
	const { db } = await connectToDatabase();

	try {
		//Check Method & param
		const resultOfCheckingMethod = checkAllMethod(req, "GET");

		//Check if token is in db
		//Check token validity
		//Create JWT
		//Send JWT
		res.status(200).json({ status: "succes", resultOfCheckingMethod });
	} catch (error) {
		res.status(400).json(error);
	}
};

export default handler;
