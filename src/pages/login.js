import styles from '@/styles/Home.module.css'
import {SignIn} from '@clerk/nextjs'


export default function Home() {
	return (
		<>
			<div className={styles.login}>
				<SignIn></SignIn>
			</div>
		</>
		)
	}