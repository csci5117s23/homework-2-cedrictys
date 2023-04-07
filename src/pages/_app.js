import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return 
  <>
    <h1>Header row</h1>
    <Component {...pageProps} />
  </>
}
