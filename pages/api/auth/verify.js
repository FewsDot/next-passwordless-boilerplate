import { connectToDatabase } from "lib/mongodb";

const handler = async (req, res) => {
	const { db } = await connectToDatabase();
	const tokensCollection = db.collection("tokens");
	const now = nowInTimestamp();

	// TODO - FAIRE SYSTEME DE VERIF DU TOKEN
	try {
		res.status(200).json({ status: "succes", message: "Token verified" });
	} catch (error) {
		res.status(400).json(error);
	}
};

export default handler;
