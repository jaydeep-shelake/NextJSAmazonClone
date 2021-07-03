import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import Header from '../component/Header/Header';
import Head from 'next/head'
import {Provider as AuthProvider} from 'next-auth/client'
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider  session={pageProps.session}>
          <Head>
          {/* <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/> */}
          </Head>
    <Provider store={store}>
      {/*Header*/}
      <Header/>
      <Component {...pageProps} />
    </Provider>
    </AuthProvider>
  )
}

export default MyApp
