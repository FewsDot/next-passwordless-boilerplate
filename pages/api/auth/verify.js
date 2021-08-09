import cookie from "cookie";
import { connectToDatabase } from "lib/backend/mongodb";
import { pipeCheck, checkValidity } from "lib/backend/requestChecker";

import { nowInTimestamp } from "lib/backend/time";
import { getInDB, deleteAllInDB, modifyInDB } from "lib/backend/database";
import { generateJWT } from "lib/backend/token";

const handler = async (req, res) => {
	const { db } = await connectToDatabase(); //Init DB
	const now = nowInTimestamp(); //Get actual Timestamp
	const { token } = req.query; //Get token from Request Query
	const method = req.method; //Get method from Request

	try {
		pipeCheck(method, "GET", token, "Token"); //Check Method & param
		const tokenFromDB = await getInDB(
			//Check if Token exist
			db.collection("tokens"),
			{ token: token },
			{ status: "Error", message: "Token Not Exist !" }
		);
		checkValidity(now, tokenFromDB); //Check Token validity
		const jwt = generateJWT(now, tokenFromDB.userID); //Create JWT
		await deleteAllInDB(db.collection("tokens"), {
			//Delete all token of user in the DB
			userID: tokenFromDB.userID,
		});
		// Update User to Verify if it's the first time
		tokenFromDB.type === "SignUp" &&
			(await modifyInDB(
				db.collection("users"),
				{ _id: tokenFromDB.userID },
				{ $set: { verified: true } }
			));
		res.setHeader(
			"Set-Cookie",
			cookie.serialize("authorization", `Bearer ${jwt}`, {
				maxAge: 60,
				sameSite: "strict",
				path: "/",
				httpOnly: true,
				//secure : true
			})
		); //Send JWT
		res.status(200).json({
			//Return Succes
			status: "Succes",
			message: "You are Authenticated, You can now acces app !",
		});
	} catch (error) {
		!error.type
			? res.status(400).json(error) //Return Normal Error
			: (await saveInDB(db.collection("errors"), { step: "Verify", timestamp: now, error }), //Save dependence error in DB
			  res
					.status(400)
					.json({ error: "Dependance error", message: "Error send to the webmaster." })); //Return Dependance Error
	}
};

export default handler;
