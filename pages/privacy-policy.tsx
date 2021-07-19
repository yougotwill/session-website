import { ReactElement } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import Layout from '@components/layout';
import { Headline } from '@components/ui';

export default function PrivacyPolicy(): ReactElement {
  const headingClasses = classNames('text-gray text-2xl font-medium mt-6');
  return (
    <Layout title="Privacy Policy - Session">
      <section>
        <div
          className={classNames(
            'container pt-6 pb-24 px-4 mx-auto',
            'md:p-12',
            'lg:pt-0 lg:pb-32'
          )}
        >
          <Headline
            color="gray-dark"
            classes={classNames(
              'font-helvetica font-extralight mb-6',
              'md:mb-16',
              'lg:mt-4'
            )}
          >
            Session Legal
          </Headline>
          <div
            className={classNames(
              'text-sm text-gray-lighter font-helvetica font-extralight leading-loose',
              'lg:text-base lg:max-w-screen-md lg:mx-auto'
            )}
          >
            <h1
              className={classNames(
                'text-gray text-3xl font-medium',
                'lg:text-5xl'
              )}
            >
              Session Privacy Policy
            </h1>
            <p>
              Session is underpinned by our privacy principles that intend to
              protect and defend your personal identity and information and the
              privacy of your communications at all times.
            </p>
            <br />
            <h2 className={headingClasses}>1.0 Session App</h2>
            <p>
              The Session App is designed to never know who you are, who you are
              talking to, or the contents of your communications (text messages,
              audio, video, images).
            </p>
            <br />
            <p>
              The Session App does not collect or share your information. That’s
              our policy in a nutshell.
            </p>
            <br />
            <p>
              The Session App or its associated software doesn’t store any
              identifying information about your device, such as your IP address
              or your user agent (browser, device type). We don’t store or
              collect any information which could be used to track you.
            </p>
            <br />
            <p>
              This means we don’t need your phone number, e-mail, or any
              information tied to your real identity to create a Session
              account. There are no special settings you need to set to be
              private. Session is preservices your privacy by default.
            </p>
            <br />
            <h2 className={headingClasses}>2.0 Session Website</h2>
            <p>
              The Session Website never attempts to link your usage of the
              website to your real identity or create a user profile based on
              your activity.
            </p>
            <br />
            <p>
              The Session Website features an opt-in form that lets you
              subscribe to our email newsletter that is operated using the third
              party Campaign Monitor email newsletter platform. If you choose to
              subscribe, your e-mail will be stored by Campaign Monitor, under
              their Terms of Use and Privacy Policy. However, if you unsubscribe
              from our mailing list, your email will be deleted.
            </p>
            <br />
            <p>
              To ensure that the opt-in form works effectively, a small cookie
              is used. The form is embedded into WordPress – the platform we use
              to manage the website, and it is not possible to disable this
              cookie. This cookie (fca_eoi_pagecount) is not used by us to track
              your use of the Session website or other websites, or to track
              your online activities in any way.
            </p>
            <br />
            <p>
              We will never share or sell your personal details, including your
              email address, and will only use your email address to communicate
              our newsletters with you.
            </p>
            <br />
            <p>
              We use Cloudflare services in order to serve the Session website.
              Cloudflare keeps logs about web requests for the Session website,
              which can be stored for up to 7 days.
            </p>
            <br />
            <h2 className={headingClasses}>3.0 Other Privacy Issues</h2>
            <p>
              You should be aware that the Google Play and the App Store may
              collect information and share information about you when you
              download Session for your Android or iOS device.
            </p>
            <br />
            <p>
              To download Session as privately as possible, it is recommended
              that you utilise a privacy-preserving VPN or download Session from
              platforms that do not keep user analytic data.
            </p>
            <br />
            <p>
              If you use Session on your Android or iOS phone, Google or Apple
              might store information about how you use the app. They may record
              when the app is closed, opened, how long you use it for, crash
              logs, and your device model. This user analytics data could also
              be associated with your Google or Apple account, and it is shared
              with us through the app store dashboard. This is a limitation of
              mobile operating systems, and applies to all apps used on your
              device. We do not share any of your information with Apple and
              Google, and any analytics data that is shared with us is not sold
              or shared with anyone else. If required, please read the Apple or
              Google’s privacy policies. If you’re using iOS, check out Apple’s
              App Store Review Guidelines. For Android, read the User Data
              section of Google’s Developer Policy Center.
            </p>
            <br />
            <h2 className={headingClasses}>Any more questions?</h2>
            <p>
              This is the way the Session app and website treat your privacy. If
              you would like more information, have suggestions about how we can
              better protect your privacy, or just want to say hello — please
              send us an email at{' '}
              <Link href="mailto:team@oxen.io">
                <a className={classNames('font-semibold')}>team@oxen.io</a>
              </Link>
              {'.'}
            </p>
            <br />
          </div>
        </div>
      </section>
    </Layout>
  );
}
