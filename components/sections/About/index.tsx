import { ReactElement, useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import redact from '@/utils/redact';
import { useScreen } from '@/contexts/screen';

import Container from '@/components/Container';
import { Headline } from '@/components/ui';
import { VideoPlayerProps } from '@/components/VideoPlayer';

// optimise build sizes by loading dynamically
const DynamicVideoPlayer = dynamic(() => import('@/components/VideoPlayer'));

export default function About(): ReactElement {
  const textRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useScreen();
  const redactedOptions = {
    redactColor: 'primary',
    textColor: 'white',
    animate: true,
    classes: 'p-1',
  };
  const [redactedClasses, setRedactedClasses] = useState(
    redact(redactedOptions)
  );
  const videoProps: VideoPlayerProps = {
    hasQualityLevels: true,
    poster: '/assets/videos/this-is-session/thumbnail.webp',
    sources: [
      {
        src: '/assets/videos/this-is-session/1080p.mp4',
        type: 'video/mp4',
        label: '1080p',
      },
      {
        src: '/assets/videos/this-is-session/720p.mp4',
        type: 'video/mp4',
        label: '720p',
        selected: true,
      },
      {
        src: '/assets/videos/this-is-session/480p.mp4',
        type: 'video/mp4',
        label: '480p',
      },
      {
        src: '/assets/videos/this-is-session/360p.mp4',
        type: 'video/mp4',
        label: '360p',
      },
      {
        src: '/assets/videos/this-is-session/240p.mp4',
        type: 'video/mp4',
        label: '240p',
      },
      {
        src: '/assets/videos/this-is-session/144p.mp4',
        type: 'video/mp4',
        label: '144p',
      },
    ],
  };

  useEffect(() => {
    if (isMobile || isTablet) {
      const onScroll = () => {
        const scrollEffectStart =
          textRef.current?.offsetTop! - textRef.current?.scrollHeight! - 28;
        const scrollEffectStop = textRef.current?.offsetTop! - 28;

        if (
          window.scrollY >= scrollEffectStart &&
          window.scrollY < scrollEffectStop
        ) {
          setRedactedClasses(redact({ ...redactedOptions, disabled: true }));
        }
        if (
          window.scrollY < scrollEffectStart ||
          window.scrollY >= scrollEffectStop
        ) {
          setRedactedClasses(redact(redactedOptions));
        }
      };
      document.addEventListener('scroll', onScroll);
      return () => {
        document.removeEventListener('scroll', onScroll);
      };
    }
  }, [isMobile, isTablet]);
  return (
    <section className="text-white bg-gray-dark">
      <Headline
        classes={classNames('text-lg font-bold pt-16', 'lg:pt-20')}
        containerWidths={{
          sm: '10rem',
          md: '34rem',
          lg: '67rem',
        }}
      >
        <h2>What is Session?</h2>
      </Headline>
      {/* Full screen height - Headline height */}
      <Container
        heights={{
          sm: '100%',
          md: '100vh + 2rem',
          lg: '100vh + 2rem',
        }}
        classes={classNames(
          'flex flex-col justify-center items-center pb-24',
          'md:pb-0 md:-mt-24',
          'lg:items-start',
          'xl:-mt-16',
          '2xl:-mt-24'
        )}
      >
        <p
          className={classNames(
            'group text-white text-lg font-light leading-10 mt-12 mb-20',
            'md:text-4xl md:leading-relaxed md:ml-16',
            'lg:mt-0 lg:ml-0 lg:max-w-2xl',
            'xl:mb-8',
            '2xl:mb-20'
          )}
          ref={textRef}
        >
          Session is an <span className={redactedClasses}>end-to-end</span>{' '}
          encrypted messenger that minimises{' '}
          <span className={redactedClasses}>sensitive</span> metadata,{' '}
          <span className={redactedClasses}>designed and built</span> for people
          who want <span className={redactedClasses}>absolute</span> privacy and
          freedom from <span className={redactedClasses}>any form of</span>{' '}
          surveillance.
        </p>
        <DynamicVideoPlayer {...videoProps} />
      </Container>
    </section>
  );
}
