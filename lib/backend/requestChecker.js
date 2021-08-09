import { isNil, test, contains } from "ramda";
import jwt from "jsonwebtoken";

const regex = {
	email:
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	empty: /.*\S.*/,
	script: /<.*?script.*\/?>/gi,
	bearer: /Bearer\s((.*)\.(.*)\.(.*))/,
};

const throwerError = (req, problem) => {
	throw { status: "Error", message: `${req} is ${problem} !` };
};

const checkMethod = (method, allowed) => {
	return method != allowed ? throwerError(method, "forbidden") : true;
};

const checkEmail = (email) => {
	return !test(regex.email, email) ? throwerError(email, "not valid Format !") : true;
};
const checkScript = (param) => {
	return test(regex.script, param) ? throwerError(param, "is not Allowed !") : true;
};

const checkExistence = (param, type) => {
	return isNil(param)
		? throwerError(type, "null, undefined !")
		: !test(regex.empty, param)
		? throwerError(type, "empty !")
		: true;
};
const checkValidity = (now, token) => {
	return now >= token.validity ? throwerError(token.token, "expired! Please retry to auth") : true;
};

const checkJWT = (token) => {
	const formattedToken = token.includes("Bearer=") ? token.split("=")[1] : token;

	return jwt.verify(formattedToken, process.env.JWT_SECRET, (err, decoded) => {
		return err ? throwerError("JWT : ", err.message) : decoded;
	});
};

const pipeCheck = (methodToCheck, methodAllowed, userInput, type) => {
	checkMethod(methodToCheck, methodAllowed);
	checkScript(userInput);
	checkExistence(userInput, type);
	if (type === "Email") {
		checkEmail(userInput);
	} else if (type === "Bearer Token") {
		return checkJWT(userInput);
	}
};

export { checkValidity, pipeCheck };
