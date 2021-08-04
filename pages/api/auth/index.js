import { connectToDatabase } from "lib/mongodb";
import { pipeAuthCheck } from "lib/requestChecker";
import { createUser } from "lib/users";
import { nowInTimestamp } from "lib/time";
import { saveInDB, getInDB } from "lib/database";
import { generateRandomToken } from "lib/token";
import { sendAuthMail } from "lib/mailer";

const handler = async (req, res) => {
	const { db } = await connectToDatabase(); //Init DB
	const now = nowInTimestamp(); //Get actual Timestamp
	const { email } = req.body; //Get email from Request Body
	const method = req.method; //Get method from Request

	try {
		pipeAuthCheck(method, "POST", email, "Email"); //Checking on Request
		const user = await getInDB(db.collection("users"), { email: email }); //Check If User
		const newUser = !user && (await saveInDB(db.collection("users"), createUser(email, now))); //If not Create New User
		const userID = user ? user._id : newUser.insertedId; //Get UserID
		const authToken = generateRandomToken(now, userID); //Create Auth Token
		await saveInDB(db.collection("tokens"), authToken); //Save Token In DB
		await sendAuthMail(email, authToken); //Send Token To User
		res.status(200).json({
			status: "Succes",
			type: user ? "SignIn" : "SignUp",
			message: "Please check your email",
		});
	} catch (error) {
		!error.type
			? res.status(400).json(error) //Return Normal Error
			: (await saveInDB(db.collection("errors"), { step: "Auth", timestamp: now, error }), //Save dependence error in DB
			  res
					.status(400)
					.json({ error: "Dependance error", message: "Error send to the webmaster." })); //Return Dependance Error
	}
};

export default handler;
