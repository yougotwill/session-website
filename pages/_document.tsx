import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <link
            key="rss-feed"
            rel="alternative"
            type="application/rss+xml"
            title="RSS feed for just-be.dev"
            href="/feed"
          />
          <link
            key="atom-feed"
            rel="alternative"
            type="application/atom+xml"
            title="Atom feed for just-be.dev"
            href="/feed/atom"
          />
          <link
            key="json-feed"
            rel="alternative"
            type="application/feed+json"
            title="JSON feed for just-be.dev"
            href="/feed/json"
          />
        </Head>
        <body className="selection:bg-primary">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
