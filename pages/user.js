import Head from "next/head";
import styles from "../styles/Home.module.css";

const User = ({ data }) => {
	const { status = "", userFromDB = {}, message = "" } = data;

	return (
		<div className={styles.container}>
			<Head>
				<title>NPB - User data Protected</title>
				<meta
					name="Boilerplate of fullstack app with NextJs and authentication system passwordless based."
					content="NextJS Passwordless Boilerplate"
				/>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>NextJS Passwordless Boilerplate</h1>
				<h3>User Data</h3>
				<h6>Provide user data if your JWT is valid</h6>

				<p>{status}</p>
				{status === "Succes" ? (
					<>
						<p>{userFromDB._id}</p>
						<p>{userFromDB.email}</p>
						<p>{userFromDB.createdAt}</p>
					</>
				) : (
					<>
						<p>{message}</p>
					</>
				)}
			</main>
		</div>
	);
};

export async function getServerSideProps(context) {
	const tokenFromCookies = context.req.cookies;
	const { NEXT_PUBLIC_ENVIRONMENT, NEXT_PUBLIC_URL_PROD, NEXT_PUBLIC_URL_DEV } = process.env;
	const urlToFetch =
		NEXT_PUBLIC_ENVIRONMENT === "PROD" ? NEXT_PUBLIC_URL_PROD : NEXT_PUBLIC_URL_DEV;
	const res = await fetch(`${urlToFetch}/api/user`, {
		headers: tokenFromCookies,
	});
	const data = await res.json();

	return {
		props: {
			data,
		},
	};
}

export default User;