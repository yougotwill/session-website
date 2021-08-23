import { useRouter } from 'next/router';
import classNames from 'classnames';

import { Layout } from '@/components/ui';
import Container from '@/components/Container';

export default function RedirectPage() {
  const router = useRouter();
  return (
    <Layout title="Redirecting">
      <section>
        <Container
          heights={{
            sm: '100vh - 108px',
            md: '50vh',
            lg: '40vh',
            xl: '50vh',
          }}
          classes={classNames(
            'py-16 px-2 mx-auto text-center',
            'md:flex md:flex-col md:justify-center md:items-center'
          )}
        >
          <h1 className={classNames('text-5xl font-semibold mb-8')}>
            Redirecting...
          </h1>
          <p
            className={classNames(
              'text-gray text-xl font-medium',
              'lg:text-2xl'
            )}
          >
            Click{' '}
            <button
              className="font-semibold text-primary-dark"
              onClick={() => router.back()}
            >
              here
            </button>{' '}
            to return to the previous page.
          </p>
        </Container>
      </section>
    </Layout>
  );
}
