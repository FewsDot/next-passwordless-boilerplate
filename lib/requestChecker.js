import { isNil, isEmpty, test, T, cond, always, propEq } from "ramda";

const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkAuth = cond([
	[isNil, always({ status: "error", message: "Email is null or undefined !" })],
	[isEmpty, always({ status: "error", message: "Email is empty !" })],
	[
		(email) => !test(emailRegex, email),
		always({ status: "error", message: "Email is not valid Format !" }),
	],
	[T, (email) => ({ status: "succes", message: "Email is valid !", data: email })],
]);

const checkMethod = cond([
	[
		propEq("method", "POST"),
		(req) => ({ status: "succes", message: `${req.method} Method is valid !`, data: req.method }),
	],
	[T, (req) => ({ status: "error", message: `${req.method} is forbidden !` })],
]);

export { checkAuth, checkMethod };
