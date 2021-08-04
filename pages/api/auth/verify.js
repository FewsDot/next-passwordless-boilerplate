import { connectToDatabase } from "lib/mongodb";
import { pipeVerifyCheck, checkValidity } from "lib/requestChecker";
import { nowInTimestamp } from "lib/time";
import { getInDB } from "lib/database";
import { generateJWT } from "lib/token";

const handler = async (req, res) => {
	const { db } = await connectToDatabase(); //Init DB
	const now = nowInTimestamp(); //Get actual Timestamp
	const { token } = req.query; //Get token from Request Query
	const method = req.method; //Get method from Request

	try {
		pipeVerifyCheck(method, "GET", token, "Token"); //Check Method & param
		const tokenFromDB = await getInDB(
			//Check if Token exist
			db.collection("tokens"),
			{ token: token },
			{ status: "Error", message: "Token Not Exist !" }
		);
		checkValidity(now, tokenFromDB); //Check Token validity
		const jwt = generateJWT(now, tokenFromDB.userID); //Create JWT
		//TODO: Delete alla token of user in the DB
		res.setHeader("Authorization", "Bearer " + jwt); //Send JWT
		res.status(200).json({
			//Return Succes
			status: "Succes",
			message: "You are Authenticated, You can now acces app !",
		});
	} catch (error) {
		res.status(400).json(error); //Return Normal Error
	}
};

export default handler;
