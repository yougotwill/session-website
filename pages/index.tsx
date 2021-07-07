import Layout from '@components/Layout';
import Hero from '@components/Hero';
import About from '@components/About';

export default function Home() {
  return (
    <div>
      <Layout
        title={'Session | Send Messages, Not Metadata. | Private Messenger'}
      >
        <Hero />
        <About />
      </Layout>
    </div>
  );
}
