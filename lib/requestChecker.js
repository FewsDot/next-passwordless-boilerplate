import { isNil, isEmpty, test, T, cond, always, propEq } from "ramda";

const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkAuth = cond([
	[isNil, always({ AuthStatus: "error", AuthMessage: "Email is null or undefined !" })],
	[isEmpty, always({ AuthStatus: "error", AuthMessage: "Email is empty !" })],
	[
		(email) => !test(emailRegex, email),
		always({ AuthStatus: "error", AuthMessage: "Email is not valid Format !" }),
	],
	[T, (email) => ({ AuthStatus: "succes", AuthMessage: "Email is valid !", data: email })],
]);

const checkMethod = cond([
	[
		propEq("method", "POST"),
		always({ MethodStatus: "succes", MethodMessage: "Method is valid !" }),
	],
	[T, (req) => ({ MethodStatus: "error", MethodMessage: `${req.method} is forbidden !` })],
]);

export { checkAuth, checkMethod };
