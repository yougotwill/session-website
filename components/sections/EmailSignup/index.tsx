import { ReactElement, useState, useRef, FormEventHandler } from 'react';
import classNames from 'classnames';

import { Button } from '@/components/ui';
import { GroupNotice } from '@/components/sections';

export default function EmailSignup(): ReactElement {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState('');
  const handleSubscription: FormEventHandler = async (event) => {
    event.preventDefault();
    let response;
    try {
      response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      response = error;
    }
    switch (response?.status) {
      case 201:
        setEmail('');
        if (null !== buttonRef.current) {
          buttonRef.current.innerText = 'Signed up ✓';
        }
        break;
      case 400:
      default:
        if (null !== buttonRef.current) {
          buttonRef.current.innerText = 'Signup failed ✗';
        }
        break;
    }
  };
  return (
    <>
      <GroupNotice classes={'md:hidden'} />
      <section
        id="signup"
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
        <form onSubmit={handleSubscription}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classNames(
              'block w-5/6 mb-3 text-sm border border-black rounded-sm bg-primary',
              'md:w-1/2',
              'lg:w-2/5',
              'placeholder-black placeholder-opacity-60'
            )}
            required
          />
          <Button
            bgColor="black"
            textColor="primary"
            size="small"
            shape="semiround"
            fontWeight="light"
            hoverEffect={false}
            type={'submit'}
            reference={buttonRef}
          >
            Sign up
          </Button>
        </form>
      </section>
    </>
  );
}
