import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const Verify = ({ token }) => {
	const [status, setStatus] = useState("");
	const [message, setMessage] = useState("");

	const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
	const URL_PROD = process.env.NEXT_PUBLIC_URL_PROD;
	const URL_DEV = process.env.NEXT_PUBLIC_URL_DEV;
	const urlToFetch = ENVIRONMENT === "PROD" ? URL_PROD : URL_DEV;

	useEffect(() => {
		-fetch(`${urlToFetch}/api/auth/verify?token=${token}`, {
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				setStatus(data.status);
				setMessage(data.message);
			});
	}, []);

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
				<h6> Please wait...</h6>

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
