import { saveInDB } from "lib/database";
import { nowInTimestamp } from "lib/time";
import { pipeBearerCheck } from "lib/requestChecker";

const handler = async (req, res) => {
	try {
		const { authorization } = req.headers; //Get JWT from Request Header
		pipeBearerCheck(authorization, "Bearer Token"); // Check If JWT exist and is not expired.

		res.status(200).json({
			status: "Succes",
			now: nowInTimestamp(),
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
