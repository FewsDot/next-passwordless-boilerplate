import nodemailer from "nodemailer";
import { ifElse, isEmpty, always } from "ramda";

const transporter = nodemailer.createTransport({
	port: process.env.EMAIL_SERVER_PORT,
	host: process.env.EMAIL_SERVER_HOST,
	auth: {
		user: process.env.EMAIL_SERVER_USER,
		pass: process.env.EMAIL_SERVER_PASSWORD,
	},
});

const sendAuthMail = async (email, token) => {
	const mailData = {
		from: process.env.EMAIL_FROM,
		to: email,
		subject: `Signin with token ${token}`,
		text: "Hello, you tried to signin",
	};

	const getResult = await transporter.sendMail(mailData);

	const buildResponse = ifElse(
		isEmpty,
		() => {
			throw { status: "error", message: "Problem with Sending Mail !" };
		},
		always({ status: "succes", message: `Email send at ${email}` })
	);

	return buildResponse(getResult.accepted);
};

export { sendAuthMail };
