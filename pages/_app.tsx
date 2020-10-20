import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import type { AppProps } from 'next/app'
import store from '../store/store'
import '../styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
)

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {}
  return { pageProps: pageProps }
}

const makeStore = () => store

export default withRedux(makeStore)(MyApp)
