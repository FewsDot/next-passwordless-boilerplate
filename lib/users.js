const getUserInDB = (collection, userEmail) => {
	return new Promise((resolve, reject) => {
		collection.findOne({ email: userEmail }, (err, result) => {
			if (err) {
				return reject({
					status: "error",
					type: "dependence",
					lib: "MongoDB",
					message: err.errmsg,
				});
			}
			return resolve({
				status: "succes",
				data: result && result,
				message: `User ${result ? "" : "not"} exist in DB`,
			});
		});
	});
};

const createUser = (email, date) => ({
	email: email,
	verified: false,
	createdAt: date,
});

export { getUserInDB, createUser };
