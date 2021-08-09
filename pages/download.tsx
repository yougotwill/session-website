import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { Layout } from '@/components/ui';

import AndroidSVG from '@/assets/svgs/android_robot_head.svg';
import AppleSVG from '@/assets/svgs/apple.svg';
import LinuxSVG from '@/assets/svgs/linux.svg';
import WindowsSVG from '@/assets/svgs/windows.svg';
import METADATA from '@/constants/metadata';

export default function Download(): ReactElement {
  const panelClasses = classNames(
    'mx-auto text-center',
    'lg:w-1/2 lg:flex lg:flex-col'
  );
  const subtitleClasses = classNames('text-2xl font-light', 'lg:text-3xl');
  const linkContainerClasses = classNames(
    'flex flex-wrap justify-center items-center pb-12'
  );
  const downloadContainerClasses = classNames(
    'lg:py-2 lg:border-r lg:border-dashed'
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
      <section className={classNames('lg:flex lg:mb-4 lg:min-h-screen')}>
        <div
          className={classNames(
            panelClasses,
            'bg-primary text-gray-dark',
            'lg:mr-2 lg:items-end'
          )}
        >
          <div className={classNames('lg:w-1/2 lg:mr-8')}>
            <p className={classNames(subtitleClasses, 'pt-8')}>
              Download Session for
            </p>
            <h2 className={classNames('text-5xl font-semibold my-4')}>
              Mobile
            </h2>
            <div className={classNames('px-28 mb-6', 'md:px-56', 'lg:px-20')}>
              <Image
                src="/assets/images/mockup-landing.png"
                alt="mobile app screenshot"
                width="150px"
                height="315px"
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
            'lg:ml-2 lg:items-start'
          )}
        >
          <div
            className={classNames(
              'lg:w-1/2 lg:ml-8 lg:h-full lg:flex lg:flex-col lg:justify-between'
            )}
          >
            <p className={classNames(subtitleClasses, 'pt-32', 'lg:pt-8')}>
              Download Session for
            </p>
            <h2 className={classNames('text-5xl font-semibold mt-4 mb-6')}>
              Desktop
            </h2>
            <div
              className={classNames(
                'px-3 mb-6',
                'md:mb-10',
                'lg:px-0 lg:pt-24 lg:pb-20 lg:-mx-4'
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
                'lg:mt-1'
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
      </section>
    </Layout>
  );
}
