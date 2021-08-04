import { nanoid } from "nanoid";

const generateRandomToken = (now, userID) => ({
	token: nanoid(24),
	validity: now + parseInt(process.env.EXPIRATION_SHORT), //15min
	userID: userID,
});

const getToken = (collection, token) => {
	return new Promise((resolve, reject) => {
		collection.findOne({ token: token }, (err, result) => {
			return err
				? reject({
						status: "error",
						type: "dependence",
						lib: "MongoDB",
						message: err.errmsg,
						dataInEntrance: { collection, token },
				  })
				: result
				? resolve(result)
				: reject({
						status: "error",
						message: "Token Not Exist anymore ! Please retry authentication.",
				  });
		});
	});
};

export { generateRandomToken, getToken };
