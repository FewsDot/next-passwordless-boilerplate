import nodemailer from "nodemailer";

const { EMAIL_PROVIDER, EMAIL_USER, EMAIL_PASSWORD, ENVIRONMENT, URL_PROD, URL_DEV } = process.env;

const transporter = nodemailer.createTransport({
	service: EMAIL_PROVIDER,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASSWORD,
	},
});

const sendAuthMail = (type, email, authToken) => {
	const url = ENVIRONMENT === "PROD" ? URL_PROD : URL_DEV;
	const mailData = {
		from: EMAIL_USER,
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
