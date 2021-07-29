import { pipe } from "ramda";
import { connectToDatabase } from "lib/mongodb";
import { checkAuth, checkMethod } from "lib/requestChecker";
import { getUserInDB, saveUserInDB } from "lib/users";
import { generateRandomToken, saveTokenInDB } from "lib/token";
import { sendAuthMail } from "lib/mailer";

const handler = async (req, res) => {
	const { db } = await connectToDatabase();
	const tokenCollection = db.collection("token");
	const usersCollection = db.collection("users");
	{
		//TODO : Tenter de creer une pipe en lui passant req en fonction pour qu'elle check auth et method)
		/*
			Check if method is valid
				- Error ? => return message from api
				- Succes ? => 
			Check if email is valid							
				- Error ? => return message from api
				- Succes ? => 
			Create and save token in DB
				- Error ? => return message from api
				- Succes ? => 
			Check if user exist in db
				- Error ? => Save User In DB
												- Error ? => return message from api
												- Succes ? => Send Mail To user
																					-
				- Succes ? =>  Send Mail To user

			

 */
	}
	const bodyResult = checkAuth(req.body.email); // Check if email is valid
	const methodResult = checkMethod(req); // Check if method is valid
	const userExistResult = await getUserInDB(usersCollection, req.body.email); // Check if user exist in db
	const saveUserResult = await saveUserInDB(usersCollection, req.body.email); // Save User in DB
	const authToken = generateRandomToken(); // Generate an object with token and validity
	const tokenResult = await saveTokenInDB(tokenCollection, authToken); // Save token in DB
	const sendByMailResult = await sendAuthMail(req.body.email, authToken.token); // Send Mail to User

	// Return api response
	res.status(200).json({
		meesage: bodyResult,
		method: methodResult,
		userExist: userExistResult,
		userSave: saveUserResult,
		token: tokenResult,
		sendMail: sendByMailResult,
	});
};

export default handler;
