import { ReactElement } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import Container from '@/components/Container';
import { Headline } from '@/components/ui';

export default function Features(): ReactElement {
  const headingClasses = classNames(
    'font-helvetica text-4xl font-semibold text-gray-dark mb-1'
  );
  const paragraphClasses = classNames(
    'text-gray-lighter font-light leading-6 mb-8',
    'md:mb-12'
  );
  return (
    <section className={classNames(' text-gray-dark')}>
      <Headline
        color="gray-dark"
        classes={classNames('text-lg font-semibold pt-16', 'lg:pt-20')}
        containerWidths={{
          sm: '10rem',
          md: '34rem',
          lg: '67rem',
        }}
      >
        Features
      </Headline>
      <Container
        heights={{
          sm: '100%',
          md: '100%',
          lg: '100vh - 12rem',
          xl: '100vh - 84px',
        }}
        classes={classNames(
          '2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center'
        )}
      >
        <div
          className={classNames(
            'lg:mx-auto lg:flex lg:justify-between lg:items-center lg:mt-24',
            '2xl:-mt-64 2xl:w-full'
          )}
        >
          <div
            className={classNames(
              'mx-auto mb-12 text-center px-4',
              'md:mb-16 md:px-24',
              'lg:hidden'
            )}
          >
            <Image
              src="/assets/images/mockup-landing.png"
              alt="mobile app screenshot"
              width="475px"
              height="1000px"
              layout="responsive"
            />
          </div>
          <div
            className={classNames(
              'px-3',
              'md:max-w-xl',
              'lg:max-w-sm lg:px-0 lg:-mt-8',
              '2xl:mt-0'
            )}
          >
            <h3 className={headingClasses}>Group chats</h3>
            <p className={paragraphClasses}>
              Talk to your friends or talk to the world. You decide. Closed
              groups let you talk to up to 100 friends at once, with the same
              encrypted protections as one-on-one chats. Got a bigger crowd? Use
              an open group to connect with as many people as you want.
            </p>
            <h3 className={headingClasses}>Voice messages</h3>
            <p className={paragraphClasses}>
              Sometimes, a text just isn’t enough. Voice messages let you send
              something a little more personal, so nothing gets lost in
              translation.
            </p>
            <h3 className={headingClasses}>Attachments</h3>
            <p className={paragraphClasses}>
              Don’t leak those docs. Send all your files, images, and
              attachments through a network that takes your privacy seriously.
            </p>
          </div>
          <div
            className={classNames('hidden w-full -mt-12 -mr-24', 'lg:block')}
          >
            <Image
              src="/assets/images/mockup-desktop.png"
              alt="desktop app screenshot"
              width="1600px"
              height="858px"
              layout="responsive"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
