import { ReactElement } from 'react';
import classNames from 'classnames';

import Image from 'next/image';

import Layout from '@components/Layout';
import Headline from '@components/Headline';

export default function OpenGroup(): ReactElement {
  return (
    <section>
      <Layout title="Session | Open Group Channel | Privat Messenger">
        <div
          className={classNames(
            'container pt-6 pb-8 px-4 mx-auto text-center',
            'md:px-16 md:pb-24',
            'lg:pt-0'
          )}
        >
          <Headline
            color="gray-dark"
            showLine={false}
            classes={classNames(
              'font-extralight text-lg text-center -mr-4 mb-8',
              'lg:mt-4'
            )}
          >
            Session Open Group Channel
          </Headline>
          <h2
            className={classNames(
              'text-gray-dark text-4xl font-helvetica font-semibold mb-8'
            )}
          >
            Scan the QR code on Session to join Session's open group chat
          </h2>
          <div>
            <Image
              src="/assets/images/qr.png"
              alt="session open group qr code"
              width="170px"
              height="166px"
            />
          </div>
        </div>
      </Layout>
    </section>
  );
}
