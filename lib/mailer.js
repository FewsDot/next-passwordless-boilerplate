import nodemailer from "nodemailer";

const {
	EMAIL_SERVER_PORT,
	EMAIL_SERVER_USER,
	EMAIL_SERVER_PASSWORD,
	EMAIL_SERVER_HOST,
	EMAIL_FROM,
} = process.env;

const transporter = nodemailer.createTransport({
	port: EMAIL_SERVER_PORT,
	host: EMAIL_SERVER_HOST,
	auth: {
		user: EMAIL_SERVER_USER,
		pass: EMAIL_SERVER_PASSWORD,
	},
});

const sendToken = (email, token) => {
	const mailData = {
		from: EMAIL_FROM,
		to: email,
		subject: `Signin with token ${token}`,
		text: "Hello, you tried to signin",
	};

	return transporter.sendMail(mailData);
};

export { sendToken };
