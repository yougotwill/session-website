import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { Layout } from '@/components/ui';
import Container from '@/components/Container';

import AndroidSVG from '@/assets/svgs/android_robot_head.svg';
import AppleSVG from '@/assets/svgs/apple.svg';
import LinuxSVG from '@/assets/svgs/linux.svg';
import WindowsSVG from '@/assets/svgs/windows.svg';
import METADATA from '@/constants/metadata';

export default function Download(): ReactElement {
  const panelClasses = classNames(
    'mx-auto text-center',
    'lg:w-1/2 lg:flex lg:flex-col lg:pb-16'
  );
  const subtitleClasses = classNames('text-2xl font-light', 'lg:text-3xl');
  const linkContainerClasses = classNames(
    'flex flex-wrap justify-center items-center pb-12'
  );
  const downloadContainerClasses = classNames(
    'pb-2 lg:py-2 lg:border-r lg:border-dashed'
  );
  const downloadLinkClasses = classNames(
    'text-lg font-semibold rounded-3xl py-1 mr-4',
    'md:text-3xl',
    'lg:pr-2 lg:ml-2',
    'transition-colors duration-300'
  );
  const downloadSVGClasses = 'inline-block mx-3 -mt-2 fill-current';
  return (
    <Layout title="Download" metadata={METADATA.DOWNLOAD_PAGE}>
      <section>
        <Container
          heights={{
            sm: '100%',
            md: '100%',
            lg: '100%',
            xl: '100%',
          }}
          classes={classNames(
            'px-0 py-0',
            'md:px-0 md:py-0',
            'lg:-mt-4 lg:mb-4 lg:pl-0 lg:pr-0 lg:flex lg:max-w-none',
            '2xl: mt-0'
          )}
        >
          <div
            className={classNames(
              panelClasses,
              'bg-primary text-gray-dark min-h-screen',
              'lg:mr-2 lg:justify-between lg:items-end lg:min-h-full'
            )}
          >
            <div
              className={classNames(
                'lg:w-3/4 lg:mr-8 lg:flex lg:flex-col lg:justify-between',
                'xl:w-7/12',
                '2xl:w-1/2 2xl:mr-24'
              )}
            >
              <p
                className={classNames(
                  subtitleClasses,
                  'pt-20',
                  'lg:pt-20',
                  'xl:pt-8',
                  '2xl:pt-20'
                )}
              >
                Download Session for
              </p>
              <h2 className={classNames('text-5xl font-semibold my-4')}>
                Mobile
              </h2>
              <div
                className={classNames(
                  'px-24 mb-6',
                  'md:px-56',
                  'lg:px-0 lg:w-1/2 lg:mx-auto'
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
              <div className={classNames(linkContainerClasses)}>
                <div
                  className={classNames(
                    downloadContainerClasses,
                    'lg:border-gray-dark'
                  )}
                >
                  <Link href="/android">
                    <a
                      className={classNames(
                        downloadLinkClasses,
                        'lg:hover:bg-gray-dark lg:hover:text-primary'
                      )}
                    >
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
                </div>
                <div
                  className={classNames(
                    downloadContainerClasses,
                    'lg:border-gray-dark'
                  )}
                >
                  <Link href="/apk">
                    <a
                      className={classNames(
                        downloadLinkClasses,
                        'lg:hover:bg-gray-dark lg:hover:text-primary'
                      )}
                    >
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
                </div>
                <div>
                  <Link href="/iphone">
                    <a
                      className={classNames(
                        downloadLinkClasses,
                        'lg:hover:bg-gray-dark lg:hover:text-primary'
                      )}
                    >
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
            </div>
          </div>
          <div
            className={classNames(
              panelClasses,
              'bg-gray-dark text-white',
              'lg:ml-2 lg:justify-between lg:items-start'
            )}
          >
            <div
              className={classNames(
                'lg:w-3/4 lg:ml-8 lg:h-full lg:flex lg:flex-col lg:justify-between',
                'xl:w-7/12',
                '2xl:w-1/2 2xl:ml-24'
              )}
            >
              <p
                className={classNames(
                  subtitleClasses,
                  'pt-32',
                  'lg:pt-20',
                  'xl:pt-8',
                  '2xl:pt-20'
                )}
              >
                Download Session for
              </p>
              <h2
                className={classNames(
                  'text-5xl font-semibold mt-4 mb-6',
                  'lg:mb-auto'
                )}
              >
                Desktop
              </h2>
              <div
                className={classNames(
                  'px-3 mb-6',
                  'md:mb-10',
                  'lg:px-0 lg:mt-4 lg:mb-auto'
                )}
              >
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
                  linkContainerClasses,
                  'md:pb-32',
                  'lg:pb-12'
                )}
              >
                <div
                  className={classNames(
                    downloadContainerClasses,
                    'lg:border-white'
                  )}
                >
                  <Link href="/mac">
                    <a
                      className={classNames(
                        downloadLinkClasses,
                        'lg:hover:bg-white lg:hover:text-gray-dark'
                      )}
                    >
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
                </div>
                <div
                  className={classNames(
                    downloadContainerClasses,
                    'lg:border-white'
                  )}
                >
                  <Link href="/windows">
                    <a
                      className={classNames(
                        downloadLinkClasses,
                        'lg:hover:bg-white lg:hover:text-gray-dark'
                      )}
                    >
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
                </div>
                <div>
                  <Link href="/linux">
                    <a
                      className={classNames(
                        downloadLinkClasses,
                        'lg:hover:bg-white lg:hover:text-gray-dark'
                      )}
                    >
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
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
