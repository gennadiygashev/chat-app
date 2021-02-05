import type { AppProps } from 'next/app'
import { wrapper } from '../redux/store'
import '../styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {}
  return { pageProps: pageProps }
}

export default wrapper.withRedux(MyApp)
