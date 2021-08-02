const getUserInDB = (collection, userEmail) => {
	return new Promise((resolve, reject) => {
		collection.findOne({ email: userEmail }, (err, result) => {
			if (err) {
				return reject({
					status: "error",
					message: err.errmsg,
				});
			}
			resolve({
				status: "succes",
				data: result && result,
				message: `User ${result ? "" : "not"} exist in DB`,
			});
		});
	});
};

const saveUserInDB = (collection, userEmail) => {
	const userToInsert = {
		email: userEmail,
		verified: false,
		createdAt: Math.round(new Date().getTime() / 1000),
	};
	return new Promise((resolve, reject) => {
		collection.insertOne(userToInsert, (err) => {
			if (err) {
				return reject({
					status: "error",
					message: err.errmsg,
				});
			}
			resolve("User add in DB");
		});
	});
};

export { getUserInDB, saveUserInDB };
