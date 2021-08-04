const handleDBResponse = (err, result, resolve, reject, data, errorHandler) => {
	return err
		? reject({
				status: "Error",
				type: "Dependence",
				lib: "MongoDB",
				message: err.errmsg,
				dataInEntrance: data,
		  })
		: result
		? resolve(result)
		: errorHandler
		? reject(errorHandler)
		: resolve(null);
};

const saveInDB = (collection, data) => {
	return new Promise((resolve, reject) => {
		collection.insertOne(data, (err, result) => {
			return handleDBResponse(err, result, resolve, reject, { collection, data });
		});
	});
};

const getInDB = (collection, data, explicitError = null) => {
	return new Promise((resolve, reject) => {
		collection.findOne(data, (err, result) => {
			return handleDBResponse(err, result, resolve, reject, { collection, data }, explicitError);
		});
	});
};

export { saveInDB, getInDB };
