const saveInDB = (collection, data) => {
	return new Promise((resolve, reject) => {
		collection.insertOne(data, (err, result) => {
			if (err) {
				return reject({
					status: "error",
					type: "dependence",
					lib: "MongoDB",
					message: err.errmsg,
				});
			}
			return resolve({ status: "succes", message: "Data Save in DB !", result });
		});
	});
};

export { saveInDB };
