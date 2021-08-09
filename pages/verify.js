import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const Verify = ({ token }) => {
	const [status, setStatus] = useState("");
	const [message, setMessage] = useState("");
	useEffect(() => {
		fetch(`/api/auth/verify?token=${token}`, {
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				setStatus(data.status);
				setMessage(data.message);
			});
	}, [token]);

	return (
		<div className={styles.container}>
			<Head>
				<title>NPB - Verify Auth</title>
				<meta
					name="Boilerplate of fullstack app with NextJs and authentication system passwordless based."
					content="NextJS Passwordless Boilerplate"
				/>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>NextJS Passwordless Boilerplate</h1>
				<h3>Verify Auth</h3>

				<p>{status}</p>
				<p>{message}</p>
				<Link href="/user">
					<a>See user data page</a>
				</Link>
			</main>
		</div>
	);
};

export async function getServerSideProps(context) {
	const token = context.query.token;

	return {
		props: {
			token,
		},
	};
}

export default Verify;
