const getUser = (collection, userEmail) => {
	return new Promise((resolve, reject) => {
		collection.findOne({ email: userEmail }, (err, result) => {
			return err
				? reject({
						status: "error",
						type: "dependence",
						lib: "MongoDB",
						message: err.errmsg,
				  })
				: result
				? resolve(result)
				: resolve(null);
		});
	});
};

const createUser = (email, date) => ({
	email: email,
	verified: false,
	createdAt: date,
});

export { getUser, createUser };
