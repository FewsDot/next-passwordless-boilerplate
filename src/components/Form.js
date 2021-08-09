import styles from "styles/Home.module.css";
import { useState } from "react";

const Form = () => {
	const [status, setStatus] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const registerUser = async (event) => {
		setIsLoading(true);
		event.preventDefault(); // don't redirect the page
		const res = await fetch("/api/auth", {
			body: JSON.stringify({
				email: event.target.email.value,
			}),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		const result = await res.json();
		setIsLoading(false);
		setStatus(result.status);
		setMessage(result.message);
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
			{isLoading ? (
				<>
					<p>Loading...</p>
				</>
			) : (
				<>
					<p>{status}</p>
					<p>{message}</p>
				</>
			)}
		</form>
	);
};

export default Form;
