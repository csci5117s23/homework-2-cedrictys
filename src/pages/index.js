import Head from "next/head"
import Link from "next/link"
import styles from '@/styles/Home.module.css'
import { SignedOut, SignedIn} from '@clerk/nextjs'


export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.main}>
        Welcome to the to-do list,
        <br></br>
        personalize for you.
        <br></br>
        <SignedIn>
          <button className={styles.button}><Link href="/todo" style={{ textDecoration: 'none', color: 'black' }}>To-do</Link></button>
        </SignedIn>
        <SignedOut>
          <button className={styles.button}><Link href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</Link></button>
        </SignedOut>
      </main>
    </>
  )
}
