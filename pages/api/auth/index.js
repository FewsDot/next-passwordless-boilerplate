import { connectToDatabase } from "lib/mongodb";
import { checkExistence, checkEmail, checkScript, checkMethod } from "lib/requestChecker";
import { getUser, createUser } from "lib/users";
import { nowInTimestamp } from "lib/time";
import { saveInDB } from "lib/database";
import { generateRandomToken } from "lib/token";
import { sendAuthMail } from "lib/mailer";

const handler = async (req, res) => {
	const { db } = await connectToDatabase(); //Init DB
	const now = nowInTimestamp(); //Get actual Timestamp
	const {
		body: { email },
		method,
	} = req; // Request destructuration
	//TODO: Create One Function for all checkings

	try {
		checkMethod(method, "POST");
		checkScript(email);
		checkExistence(email, "email");
		checkEmail(email);
		const user = await getUser(db.collection("users"), email); //Check If User
		const newUser = !user && (await saveInDB(db.collection("users"), createUser(email, now))); //If not Create New User
		const authToken = generateRandomToken(now, user ? user._id : newUser.insertedId); //Create Auth Token
		await saveInDB(db.collection("tokens"), authToken); //Save Token In DB
		await sendAuthMail(email, authToken); //Send Token To User
		res.status(200).json({
			type: user ? "SignIn" : "SignUp",
			message: "Please check your email",
		});
	} catch (error) {
		if (error.type === "dependence") {
			await saveInDB(db.collection("errors"), error); //Save dependence error in DB
			res.status(400).json({ error: "dependance error", message: "Error send to the webmaster." });
		}
		res.status(400).json(error);
	}
};

export default handler;
