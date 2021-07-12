import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import redact from '@utils/redact';

import FacebookSVG from '@assets/svgs/facebook.svg';
import TwitterSVG from '@assets/svgs/twitter.svg';
import GithubSVG from '@assets/svgs/github.svg';

export default function Footer(): ReactElement {
  const redactedClasses = redact({
    redactColor: 'primary',
    textColor: 'white',
    animate: true,
    classes: 'py-0.5 py-1',
  });
  return (
    <footer className={classNames('bg-gray-dark text-primary-dark')}>
      <div
        className={classNames(
          'flex flex-wrap pt-6 pb-4 px-8 border-b border-primary border-dashed',
          'md:pb-8'
        )}
      >
        <div className={classNames('flex flex-col w-1/2 mb-4', 'md:w-1/4')}>
          <h3
            className={classNames(
              'text-white uppercase text-xl font-semibold mb-2'
            )}
          >
            About
          </h3>
          <Link href="/assets/downloads/Session-Whitepaper.pdf">
            <a
              className={classNames(
                'text-sm font-light',
                'transition-colors duration-300',
                'hover:text-white'
              )}
              target="_blank"
            >
              Whitepaper
            </a>
          </Link>
          <Link href="/privacy-policy">
            <a
              className={classNames(
                'text-sm font-light',
                'transition-colors duration-300',
                'hover:text-white'
              )}
            >
              Privacy Policy
            </a>
          </Link>
          <Link href="/terms-of-service">
            <a
              className={classNames(
                'text-sm font-light',
                'transition-colors duration-300',
                'hover:text-white'
              )}
            >
              Terms of Service
            </a>
          </Link>
          <Link href="/blog">
            <a
              className={classNames(
                'text-sm font-light',
                'transition-colors duration-300',
                'hover:text-white'
              )}
            >
              Blog
            </a>
          </Link>
          <Link href="/faq">
            <a
              className={classNames(
                'text-sm font-light',
                'transition-colors duration-300',
                'hover:text-white'
              )}
            >
              FAQ
            </a>
          </Link>
        </div>
        <div className={classNames('flex flex-col w-1/2 mb-4', 'md:w-1/4')}>
          <h3
            className={classNames(
              'text-white uppercase text-xl font-semibold mb-2'
            )}
          >
            Company
          </h3>
          <Link href="https://optf.ngo/">
            <a
              className={classNames(
                'text-sm font-light',
                'transition-colors duration-300',
                'hover:text-white'
              )}
              target="_blank"
            >
              OPTF
            </a>
          </Link>
          <Link href="https://oxen.io/">
            <a
              className={classNames(
                'text-sm font-light',
                'transition-colors duration-300',
                'hover:text-white'
              )}
              target="_blank"
            >
              Oxen
            </a>
          </Link>
          <Link href="https://lokinet.org/">
            <a
              className={classNames(
                'text-sm font-light',
                'transition-colors duration-300',
                'hover:text-white'
              )}
              target="_blank"
            >
              Lokinet
            </a>
          </Link>
          <Link href="/assets/downloads/Session-Brandmarks.zip">
            <a
              className={classNames(
                'text-sm font-light',
                'transition-colors duration-300',
                'hover:text-white'
              )}
            >
              Media Kit
            </a>
          </Link>
          <Link href="https://optf.ngo/transparency/">
            <a
              className={classNames(
                'text-sm font-light',
                'transition-colors duration-300',
                'hover:text-white'
              )}
              target="_blank"
            >
              Transparency Report
            </a>
          </Link>
        </div>
        <div className={classNames('w-1/2 mb-4', 'md:w-1/4')}>
          <h3
            className={classNames(
              'text-white uppercase text-xl font-semibold mb-2'
            )}
          >
            Socials
          </h3>
          <div className={classNames('flex')}>
            <Link href="https://optf.ngo/transparency/">
              <a
                className={classNames(
                  'text-primary',
                  'transition duration-300',
                  'hover:text-white'
                )}
                target="_blank"
              >
                <FacebookSVG
                  className={classNames(
                    'fill-current w-7 h-7 mr-1',
                    'hover:animate-push'
                  )}
                  title="facebook logo"
                />
              </a>
            </Link>
            <Link href="https://optf.ngo/transparency/">
              <a
                className={classNames(
                  'text-primary',
                  'transition duration-300',
                  'hover:text-white'
                )}
                target="_blank"
              >
                <TwitterSVG
                  className={classNames(
                    'fill-current w-7 h-7 mr-1',
                    'hover:animate-push'
                  )}
                  title="twitter logo"
                />
              </a>
            </Link>
            <Link href="https://optf.ngo/transparency/">
              <a
                className={classNames(
                  'text-primary',
                  'transition duration-300',
                  'hover:text-white'
                )}
                target="_blank"
              >
                <GithubSVG
                  className={classNames(
                    'fill-current w-7 h-7 mr-1',
                    'hover:animate-push'
                  )}
                  title="github logo"
                />
              </a>
            </Link>
          </div>
        </div>
        <div className={classNames('flex flex-col w-1/2 mb-4', 'md:w-1/4')}>
          <h3
            className={classNames(
              'text-white uppercase text-xl font-semibold mb-2'
            )}
          >
            Contact
          </h3>
          <Link href="mailto:support@getsession.org">
            <a
              className={classNames(
                'text-primary text-sm font-light',
                'transition-colors duration-300',
                'hover:text-white'
              )}
            >
              support@getsession.org
            </a>
          </Link>
        </div>
      </div>
      <div
        className={classNames('py-6 px-8', 'md:p-10 md:w-full md:max-w-3xl')}
      >
        <Image
          src="/assets/images/logo-white.png"
          alt="session logo"
          width="120px"
          height="26px"
        />
        <p
          className={classNames(
            'group text-white text-sm font-extralight leading-6 tracking-wide',
            'md:text-md'
          )}
        >
          Session is an <span className={redactedClasses}>end-to-end</span>{' '}
          encrypted messenger that removes{' '}
          <span className={redactedClasses}>sensitive</span> metadata
          collection,
          <br className={classNames('hidden', 'md:inline')} />{' '}
          <span className={redactedClasses}>and is designed</span> for people
          who want privacy and freedom from{' '}
          <span className={redactedClasses}>any forms of</span> surveillance.
        </p>
      </div>
    </footer>
  );
}
