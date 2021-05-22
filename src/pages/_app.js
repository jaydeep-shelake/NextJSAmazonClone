import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import Header from '../component/Header/Header';
const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      {/*Header*/}
      <Header/>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
