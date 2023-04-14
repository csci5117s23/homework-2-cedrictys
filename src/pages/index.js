import Head from "next/head"
import Link from "next/link"
import styles from '@/styles/Home.module.css'
import { ClerkProvider, SignUp, SignIn, SignedOut, SignedIn, UserButton } from '@clerk/nextjs'


export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.main}>
        <br></br>
        Welcome to the to-do list,
        <br></br>
        personalize for you.
        <br></br>
        <SignedIn>
          <button className={styles.login}><Link href="/todo">Go to the Todo page</Link></button>
        </SignedIn>
        <SignedOut>
          <button className={styles.login}><Link href="/login">Login to the app</Link></button>
        </SignedOut>
      </main>
    </>
  )
}
