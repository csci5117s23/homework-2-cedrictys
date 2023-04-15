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
          <button className={styles.button}><Link href="/todo">To-do</Link></button>
        </SignedIn>
        <SignedOut>
          <button className={styles.button}><Link href="/login">Login</Link></button>
        </SignedOut>
      </main>
    </>
  )
}
