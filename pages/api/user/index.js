import { saveInDB } from "lib/database";
import { pipeBearerCheck, throwerError } from "lib/requestChecker";
import jwt from "jsonwebtoken";

const checkJWT = (token) => {
	const formatted = token.split(" ")[1];
	return jwt.verify(formatted, process.env.JWT_SECRET, (err, decoded) => {
		return err ? throwerError(err.name, err.message) : decoded;
	});
};

const handler = async (req, res) => {
	try {
		//TODO Check if User is Auth for returning password secret

		const { authorization } = req.headers;
		pipeBearerCheck(authorization, "Bearer Token");
		const decodedToken = checkJWT(authorization);

		console.log("decodedToken : ");
		console.log(decodedToken);

		res.status(200).json({
			status: "Succes",
			decodedToken,
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
