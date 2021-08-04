import { connectToDatabase } from "lib/mongodb";
import { pipeAuthCheck } from "lib/requestChecker";
import { getUser, createUser } from "lib/users";
import { nowInTimestamp } from "lib/time";
import { saveInDB } from "lib/database";
import { generateRandomToken } from "lib/token";
import { sendAuthMail } from "lib/mailer";

const handler = async (req, res) => {
	const { db } = await connectToDatabase(); //Init DB
	const now = nowInTimestamp(); //Get actual Timestamp
	const { email } = req.body;
	const method = req.method;

	try {
		pipeAuthCheck(method, "POST", email, "email"); //Checking on Request
		const user = await getUser(db.collection("users"), email); //Check If User
		const newUser = !user && (await saveInDB(db.collection("users"), createUser(email, now))); //If not Create New User
		const userID = user ? user._id : newUser.insertedId; //Get UserID
		const authToken = generateRandomToken(now, userID); //Create Auth Token
		await saveInDB(db.collection("tokens"), authToken); //Save Token In DB
		await sendAuthMail(email, authToken); //Send Token To User
		res.status(200).json({
			status: "succes",
			type: user ? "SignIn" : "SignUp",
			message: "Please check your email",
		});
	} catch (error) {
		!error.type
			? res.status(400).json(error) //Return Normal Error
			: (await saveInDB(db.collection("errors"), { step: "auth", timestamp: now, error }), //Save dependence error in DB
			  res
					.status(400)
					.json({ error: "dependance error", message: "Error send to the webmaster." }));
	}
};

export default handler;
