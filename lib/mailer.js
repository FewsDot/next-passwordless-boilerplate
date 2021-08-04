import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	port: process.env.EMAIL_SERVER_PORT,
	host: process.env.EMAIL_SERVER_HOST,
	auth: {
		user: process.env.EMAIL_SERVER_USER,
		pass: process.env.EMAIL_SERVER_PASSWORD,
	},
});

const sendAuthMail = (email, authToken) => {
	const mailData = {
		from: process.env.EMAIL_FROM,
		to: email,
		subject: `Signin with token ${authToken.token}`,
		text: "Hello, you tried to signin",
	};
	return new Promise((resolve, reject) => {
		transporter.sendMail(mailData, (err, info) => {
			if (err) {
				return reject({
					status: "error",
					type: "dependence",
					lib: "Nodemailer",
					message: err,
					dataInEntrance: { email, authToken },
				});
			}
			return resolve(info);
		});
	});
};

export { sendAuthMail };
