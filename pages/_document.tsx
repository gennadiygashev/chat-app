import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Быстрый чат для общения с друзьями и коллегами" />
          <meta name="robots" content="index,follow" />
          <meta name="keywords" content="Чат, Общение, Быстро" />
          <meta charSet="utf-8" />        
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument