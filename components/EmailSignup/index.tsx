import { ReactElement } from 'react';
import classNames from 'classnames';

import Button from '@components/Button';
import GroupNotice from '@components/GroupNotice';

export default function EmailSignup(): ReactElement {
  return (
    <>
      <GroupNotice classes={'md:hidden'} />
      <section
        className={classNames(
          'bg-primary text-gray-dark py-6 px-8',
          'md:py-12 md:px-10',
          'lg:py-24 lg:px-48'
        )}
      >
        <h3
          className={classNames(
            'text-xl font-bold leading-none mb-2',
            'lg:text-3xl lg:mb-0'
          )}
        >
          Friends don’t let friends use compromised messengers.
        </h3>
        <p
          className={classNames(
            'font-light leading-none mb-4',
            'md:mb-8',
            'lg:text-xl'
          )}
        >
          Sign up to the mailing list and start taking action!
        </p>
        {/* TODO functionality */}
        <form>
          <input
            type="email"
            className={classNames(
              'block w-5/6 mb-3 text-sm border border-black rounded-sm bg-primary',
              'md:w-1/2',
              'lg:w-2/5',
              'placeholder-black placeholder-opacity-60'
            )}
            name="email"
            placeholder="Your Email"
          />
          <Button
            bgColor="black"
            textColor="primary"
            size="small"
            shape="semiround"
            fontWeight="light"
            hoverEffect={false}
          >
            Sign up
          </Button>
        </form>
      </section>
    </>
  );
}
