import '../styles/globals.css'
import Layout from '../components/Layout'
import {SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  return(
     <SessionProvider session={session}>
      <RecoilRoot>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </RecoilRoot>
     </SessionProvider>
  )
}

export default MyApp
