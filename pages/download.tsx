import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import Layout from '@components/Layout';

import AndroidSVG from '@assets/svgs/android_robot_head.svg';
import AppleSVG from '@assets/svgs/apple.svg';
import LinuxSVG from '@assets/svgs/linux.svg';
import WindowsSVG from '@assets/svgs/windows.svg';

export default function Download(): ReactElement {
  const downloadLinkClasses = classNames(
    'text-lg font-semibold mr-4',
    'md:text-3xl'
  );
  const downloadSVGClasses = 'inline-block mx-3 -mt-2 fill-current';
  return (
    <Layout title="Download - Session Private Messenger">
      <section>
        <div
          className={classNames(
            'bg-primary text-gray-dark mx-auto text-center'
          )}
        >
          <p className={classNames('text-2xl font-light pt-20')}>
            Download Session for
          </p>
          <h2 className={classNames('text-5xl font-semibold my-4')}>Mobile</h2>
          <div className={classNames('px-28 mb-6', 'md:px-56', 'lg:hidden')}>
            <Image
              src="/assets/images/mockup-landing.png"
              alt="mobile app screenshot"
              width="150px"
              height="315px"
              layout="responsive"
            />
          </div>
          <div
            className={classNames(
              'flex flex-wrap justify-center items-center pb-12',
              'lg:hidden'
            )}
          >
            <Link href="/android">
              <a className={downloadLinkClasses}>
                <AndroidSVG
                  className={classNames(
                    downloadSVGClasses,
                    'w-6 h-6',
                    'md:w-8 md:h-8'
                  )}
                  title="Android logo"
                />
                <span>Android</span>
              </a>
            </Link>
            <Link href="https://github.com/loki-project/session-android/releases">
              <a className={downloadLinkClasses}>
                <AndroidSVG
                  className={classNames(
                    downloadSVGClasses,
                    'w-6 h-6',
                    'md:w-8 md:h-8'
                  )}
                  title="Android logo"
                />
                <span>APK</span>
              </a>
            </Link>
            <Link href="/iphone">
              <a className={downloadLinkClasses}>
                <AppleSVG
                  className={classNames(
                    downloadSVGClasses,
                    'w-4 h-4',
                    'md:w-6 md:h-6'
                  )}
                  title="Apple logo"
                />
                <span>iPhone</span>
              </a>
            </Link>
          </div>
        </div>
        <div
          className={classNames('bg-gray-dark text-white mx-auto text-center')}
        >
          <p className={classNames('text-2xl font-light pt-32')}>
            Download Session for
          </p>
          <h2 className={classNames('text-5xl font-semibold mt-4 mb-6')}>
            Desktop
          </h2>
          <div className={classNames('px-3 mb-6', 'md:mb-10', 'lg:hidden')}>
            <Image
              src="/assets/images/mockup-desktop.png"
              alt="desktop app screenshot"
              width="1600px"
              height="858px"
              layout="responsive"
            />
          </div>
          <div
            className={classNames(
              'flex flex-wrap justify-center items-center pb-12',
              'md:pb-32',
              'lg:hidden'
            )}
          >
            <Link href="/mac">
              <a className={downloadLinkClasses}>
                <AppleSVG
                  className={classNames(
                    downloadSVGClasses,
                    'w-4 h-4',
                    'md:w-6 md:h-6'
                  )}
                  title="Apple logo"
                />
                <span>Mac</span>
              </a>
            </Link>
            <Link href="/windows">
              <a className={downloadLinkClasses}>
                <WindowsSVG
                  className={classNames(
                    downloadSVGClasses,
                    'w-4 h-4',
                    'md:w-6 md:h-6'
                  )}
                  title="Windows logo"
                />
                <span>Windows</span>
              </a>
            </Link>
            <Link href="/linux">
              <a className={downloadLinkClasses}>
                <LinuxSVG
                  className={classNames(
                    downloadSVGClasses,
                    'w-5 h-5',
                    'md:w-7 md:h-7'
                  )}
                  title="Linux logo"
                />
                <span>Linux</span>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
