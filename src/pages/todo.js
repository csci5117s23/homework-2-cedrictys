import Head from "next/head"
import Link from "next/link"
import styles from '@/styles/Home.module.css'


export default function Home() {
    return (
        <>
            <Head>
                <title>Todo</title>
            </Head>
            <main className={styles.main}>
                <div>
                    <h1>To-do List</h1>
                    <a>help here</a>
                </div>
            </main>
        </>
        )
    }
    