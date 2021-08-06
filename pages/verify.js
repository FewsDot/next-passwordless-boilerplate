import Head from "next/head";
import styles from "../styles/Home.module.css";

const Verify = () => {
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
			</main>
		</div>
	);
};

export default Verify;
