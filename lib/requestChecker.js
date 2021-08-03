import { isNil, isEmpty, test, T, cond, always, propEq } from "ramda";

const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkMethod = cond([
	[propEq("method", "POST"), always({ status: "succes", message: `Post Method is valid !` })],
	[
		T,
		(req) => {
			throw { status: "error", message: `${req.method} is forbidden !` };
		},
	],
]);

const checkAllMethod = (request, allowed) => {
	const thrower = (req) => {
		throw { status: "error", message: `${req.method} is forbidden !` };
	};

	return request.method === allowed
		? { status: "succes", message: `${request.method} Method is valid !` }
		: thrower(request);
};

const checkAuth = cond([
	[
		isNil,
		() => {
			throw { status: "error", message: "Email is null or undefined !" };
		},
	],
	[
		isEmpty,
		() => {
			throw { status: "error", message: "Email is empty !" };
		},
	],
	[
		(email) => !test(emailRegex, email),
		() => {
			throw { status: "error", message: "Email is not valid Format !" };
		},
	],
	[T, (email) => ({ status: "succes", message: "Email is valid !", data: email })],
]);

export { checkMethod, checkAllMethod, checkAuth };
