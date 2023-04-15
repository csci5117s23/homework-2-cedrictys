import '@/styles/globals.css'
import Head from "next/head"
import { ClerkProvider, UserButton } from '@clerk/nextjs'

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps} >
      <Head>
        <link rel="icon" href="/icon.png" />
        
      </Head>  
      <div className='header'>
        <div className='logopart'>
          <img src="/icon.png" className='icon'></img>
          To-do
        </div>
        <div className="center">
          <UserButton/>
        </div>
      </div>
        <Component {...pageProps} />
    </ClerkProvider>
  )
}
