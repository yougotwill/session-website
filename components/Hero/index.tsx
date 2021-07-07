import { ReactElement } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import AndroidSVG from '@assets/svgs/android_robot_head.svg';
import AppleSVG from '@assets/svgs/apple.svg';
import DesktopSVG from '@assets/svgs/desktop.svg';

export default function Hero(): ReactElement {
  const headingClasses = 'text-5xl font-semibold text-gray-dark';
  const downloadLinkClasses = 'text-3xl font-semibold text-primary mb-7';
  const downloadSVGClasses = 'inline-block mx-3 -mt-2 fill-current';
  return (
    <section>
      <h2 className={headingClasses}>Send</h2>
      <h2 className={headingClasses}>Messages,</h2>
      <h2 className={headingClasses}>Not Metadata.</h2>
      <div className={classNames('flex flex-col mt-7', 'lg:hidden')}>
        <Link href="https://getsession.org/android">
          <a className={downloadLinkClasses}>
            <AndroidSVG
              className={classNames(downloadSVGClasses, 'w-8 h-8')}
              title="Android logo"
            />
            <span>Android</span>
          </a>
        </Link>
        <Link href="https://github.com/loki-project/session-android/releases">
          <a className={downloadLinkClasses}>
            <AndroidSVG
              className={classNames(downloadSVGClasses, 'w-8 h-8')}
              title="Android logo"
            />
            <span>APK</span>
          </a>
        </Link>
        <Link href="https://getsession.org/iphone">
          <a className={downloadLinkClasses}>
            <AppleSVG
              className={classNames(downloadSVGClasses, 'w-6 h-6')}
              title="Apple logo"
            />
            <span>iPhone</span>
          </a>
        </Link>
        <Link href="https://getsession.org/download">
          <a className={downloadLinkClasses}>
            <DesktopSVG
              className={classNames(downloadSVGClasses, 'w-7 h-7')}
              title="computer"
            />
            <span>Desktop</span>
          </a>
        </Link>
      </div>
      <Link href="/download">
        <a className="hidden lg:block">
          <button
            className={classNames(
              'py-2 mt-4 blur-2xlfont-semibold text-black px-10 bg-primary rounded-sm',
              'transition-colors duration-300',
              'hover:bg-black hover:text-primary'
            )}
          >
            Download
          </button>
        </a>
      </Link>
    </section>
  );
}
