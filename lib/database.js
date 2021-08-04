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

const deleteAllInDB = (collection, data) => {
	return new Promise((resolve, reject) => {
		collection.deleteMany(data, (err, result) => {
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

const modifyInDB = (collection, data, action) => {
	return new Promise((resolve, reject) => {
		collection.updateOne(data, action, (err, result) => {
			return handleDBResponse(err, result, resolve, reject, { collection, data });
		});
	});
};

export { saveInDB, deleteAllInDB, getInDB, modifyInDB };
