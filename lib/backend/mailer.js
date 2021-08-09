import nodemailer from "nodemailer";

const {
	EMAIL_SERVER_PORT,
	EMAIL_SERVER_HOST,
	EMAIL_SERVER_USER,
	EMAIL_SERVER_PASSWORD,
	EMAIL_FROM,
	ENVIRONMENT,
	URL_PROD,
	URL_DEV,
} = process.env;

const transporter = nodemailer.createTransport({
	port: EMAIL_SERVER_PORT,
	host: EMAIL_SERVER_HOST,
	auth: {
		user: EMAIL_SERVER_USER,
		pass: EMAIL_SERVER_PASSWORD,
	},
});

const sendAuthMail = (type, email, authToken) => {
	const url = ENVIRONMENT === "PROD" ? URL_PROD : URL_DEV;
	const mailData = {
		from: EMAIL_FROM,
		to: email,
		subject: `${type} on NPB !`,
		text: `Hello, you tried to ${type}. Please visit ${url}/verify?token=${authToken.token}`,
	};
	return new Promise((resolve, reject) => {
		transporter.sendMail(mailData, (err, info) => {
			if (err) {
				return reject({
					status: "Error",
					type: "Dependence",
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
