const createUser = (email, date) => ({
	email: email,
	verified: false,
	createdAt: date,
});

export { createUser };
