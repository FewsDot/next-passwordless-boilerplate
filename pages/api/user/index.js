import { connectToDatabase } from "lib/backend/mongodb";
import { ObjectId } from "mongodb";
import { getInDB } from "lib/backend/database";
import { pipeCheck } from "lib/backend/requestChecker";

const handler = async (req, res) => {
	const { db } = await connectToDatabase(); //Init DB
	const method = req.method; //Get method from Request
	const authorization = req.headers.authorization; //Get JWT from Request Header

	try {
		const { userID } = pipeCheck(method, "GET", authorization, "Bearer Token"); // Check If JWT exist and is not expired.
		const userFromDB = await getInDB(
			//Get User info from DB
			db.collection("users"),
			{ _id: ObjectId(userID) },
			{ status: "Error", message: "User Not Exist !" }
		);

		res.status(200).json({
			status: "Succes",
			userFromDB,
		});
	} catch (error) {
		!error.type
			? res.status(400).json(error) //Return Normal Error
			: (await saveInDB(db.collection("errors"), { step: "getUserAuth", timestamp: now, error }), //Save dependence error in DB
			  res
					.status(400)
					.json({ error: "Dependance error", message: "Error send to the webmaster." })); //Return Dependance Error
	}
};

export default handler;
