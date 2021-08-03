import { isNil, test } from "ramda";

const regex = {
	email:
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	empty: /.*\S.*/,
};
const throwerError = (req, problem) => {
	throw { status: "error", message: `${req} is ${problem} !` };
};

const checkMethod = (method, allowed) => {
	return method != allowed ? throwerError(method, "forbidden") : true;
};

const checkEmail = (email) => {
	return !test(regex.email, email) ? throwerError(email, "not valid Format !") : true;
};

const checkExistence = (param, type) => {
	return isNil(param)
		? throwerError(type, "null, undefined !")
		: !test(regex.empty, param)
		? throwerError(type, "empty !")
		: true;
};

export { checkMethod, checkEmail, checkExistence };
