import Head from "next/head";
import styles from "../styles/Home.module.css";
import Form from "src/components/Form";

export default function Home() {
	const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
	const URL_PROD = process.env.NEXT_PUBLIC_URL_PROD;
	const URL_DEV = process.env.NEXT_PUBLIC_URL_DEV;
	const urlToFetch = ENVIRONMENT === "PROD" ? URL_PROD : URL_DEV;

	return (
		<div className={styles.container}>
			<Head>
				<title>NextJS Passwordless Boilerplate</title>
				<meta
					name="Boilerplate of fullstack app with NextJs and authentication system passwordless based."
					content="NextJS Passwordless Boilerplate"
				/>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>NextJS Passwordless Boilerplate</h1>
				<Form url={urlToFetch} />
			</main>
		</div>
	);
}
