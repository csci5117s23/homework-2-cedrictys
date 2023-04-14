import '@/styles/globals.css'
import Head from "next/head"
import { ClerkProvider, SignUp, SignIn, SignedOut, SignedIn, UserButton } from '@clerk/nextjs'


export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps} >
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>
        <img src="/logo.png"></img>
      
        <Component {...pageProps} />
    </ClerkProvider>
  )
}
