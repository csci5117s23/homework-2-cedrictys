import Link from "next/link";
import styles from '@/styles/Home.module.css'
import { SignedOut, SignedIn} from '@clerk/nextjs'

export default function Custom404() {
  return (
    <main className={styles.main404}>
      <h2 style={{marginBottom: '0'}}>404</h2>
      <h4 style={{marginTop: '0', margin: '0'}}>Not Found</h4>
      <p>The requested URL could not be found on this server.</p>
      <SignedIn>
        <button className={styles.button}><Link href="/todos" style={{ textDecoration: 'none', color: 'black' }}>To-do</Link></button>
      </SignedIn>
      <SignedOut>
        <button className={styles.button}><Link href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</Link></button>
      </SignedOut>
    </main>
  );
}
