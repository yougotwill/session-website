import Layout from '@components/Layout';
import Hero from '@components/Hero';
import About from '@components/About';
import Benefits from '@components/Benefits';
import Features from '@components/Features';
import EmailSignup from '@components/EmailSignup';

export default function Home() {
  return (
    <div>
      <Layout
        title={'Session | Send Messages, Not Metadata. | Private Messenger'}
      >
        <Hero />
        <About />
        <Benefits />
        <Features />
        <EmailSignup />
      </Layout>
    </div>
  );
}
