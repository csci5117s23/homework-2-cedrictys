import Head from "next/head"
import Link from "next/link"
import styles from '@/styles/Home.module.css'


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
        <button className={styles.login}><Link href="/login">Login to the app</Link></button>
      </main>
    </>
  )
}
