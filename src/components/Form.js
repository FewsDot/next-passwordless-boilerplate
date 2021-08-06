import styles from "styles/Home.module.css";

const Form = () => {
	const registerUser = async (event) => {
		event.preventDefault(); // don't redirect the page
		const res = await fetch("http://localhost:3000/api/auth", {
			body: JSON.stringify({
				email: event.target.email.value,
			}),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});

		const result = await res.json();

		console.log("result after submitting :");
		console.log(result);
	};

	return (
		<form className={styles.form} onSubmit={registerUser}>
			<label htmlFor="email">Email</label>
			<input
				style={{ width: "340px", height: "64px" }}
				required
				id="email"
				type="email"
				pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
				placeholder="Please, type your email to Login or Sign Up"
			/>
			<button type="submit">Authenticate</button>
		</form>
	);
};

export default Form;
