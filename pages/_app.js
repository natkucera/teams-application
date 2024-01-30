import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import RootLayout from "../components/Layout"

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <SessionProvider session={pageProps.session}>
      <RootLayout>
      <Component {...pageProps} />
      </RootLayout>
    </SessionProvider>
  )
}

export default MyApp