import { Layout } from '@/components/ui';
import { Hero, About, Benefits, Features } from '@/components/sections';

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
      </Layout>
    </div>
  );
}
