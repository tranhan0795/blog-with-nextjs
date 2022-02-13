import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import UserContextProvider from '../context/UserContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  )
}

export default MyApp
