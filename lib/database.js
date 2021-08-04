import { throwerError } from "lib/requestChecker";

const saveInDB = (collection, data) => {
	return new Promise((resolve, reject) => {
		collection.insertOne(data, (err, result) => {
			return err
				? reject({
						status: "Error",
						type: "Dependence",
						lib: "MongoDB",
						message: err.errmsg,
						dataInEntrance: { collection, data },
				  })
				: result
				? resolve(result)
				: resolve(null);
		});
	});
};

const handleDBResponse = (err, result, errorHandler) => {
	return new Promise((resolve, reject) => {
		return err
			? reject({
					status: "Error",
					type: "Dependence",
					lib: "MongoDB",
					message: err.errmsg,
					dataInEntrance: { collection, token },
			  })
			: result
			? resolve(result)
			: errorHandler
			? reject(errorHandler)
			: resolve(null);
	});
};

const getToken = (collection, token) => {
	return new Promise((resolve, reject) => {
		collection.findOne({ token: token }, (err, result) => {
			return err
				? reject({
						status: "Error",
						type: "Dependence",
						lib: "MongoDB",
						message: err.errmsg,
						dataInEntrance: { collection, token },
				  })
				: result
				? resolve(result)
				: reject({
						status: "Error",
						message: "Token Not Exist anymore ! Please retry authentication.",
				  });
		});
	});
};

const getUser = (collection, userEmail) => {
	return new Promise((resolve, reject) => {
		collection.findOne({ email: userEmail }, (err, result) => {
			return err
				? reject({
						status: "Error",
						type: "Dependence",
						lib: "MongoDB",
						message: err.errmsg,
						dataInEntrance: { collection, userEmail },
				  })
				: result
				? resolve(result)
				: resolve(null);
		});
	});
};

export { saveInDB };
