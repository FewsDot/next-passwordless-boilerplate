const saveInDB = (collection, data) => {
	return new Promise((resolve, reject) => {
		collection.insertOne(data, (err, result) => {
			return err
				? reject({
						status: "error",
						type: "dependence",
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

export { saveInDB };
