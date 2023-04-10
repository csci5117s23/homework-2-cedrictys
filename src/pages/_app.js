import '@/styles/globals.css'
import Image from "next/image"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Image
        src="/logo.png"
        alt="logo"
        width={800}
        height={100}
      />
        
      <Component {...pageProps} />
    </>
  )
}
