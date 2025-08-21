import '../styles/globals.css'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/admin/health').catch(() => {});
  }, [])
  return <Component {...pageProps} />
}
