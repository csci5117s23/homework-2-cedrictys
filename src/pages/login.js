import Head from "next/head"
import Link from "next/link"
import styles from '@/styles/Home.module.css'
import { ClerkProvider, SignUp, SignIn, SignedOut, SignedIn, UserProfile, UserButton} from '@clerk/clerk-react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <main className={styles.main}>
      <SignedIn
        afterSignInUrl="/todo"

        >
        
        
        </SignedIn>
        <SignedOut>
          <SignIn
            afterSignInUrl="/todo"
          />
        </SignedOut>
        </main>
    </>
  )
}



