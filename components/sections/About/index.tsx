import { ReactElement, useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import redact from '@/utils/redact';
import { useScreen } from '@/contexts/screen';

import Container from '@/components/Container';
import { Headline } from '@/components/ui';

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
        classes={classNames('text-lg font-semibold pt-16', 'lg:pt-20')}
        containerWidths={{
          sm: '10rem',
          md: '34rem',
          lg: '67rem',
        }}
      >
        What is Session?
      </Headline>
      {/* Full screen height - Headline height */}
      <Container
        heights={{
          sm: '100%',
          md: '100vh + 2rem',
          lg: '100vh + 2rem',
        }}
        classes={classNames(
          'flex flex-col justify-center items-center pb-48',
          'md:pb-0 md:-mt-24',
          'lg:-mt-32 lg:items-start'
        )}
      >
        <p
          className={classNames(
            'group text-white text-lg font-light leading-10 my-12',
            'md:text-4xl md:leading-relaxed md:ml-16',
            'lg:my-0 lg:ml-0 lg:max-w-2xl'
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
      </Container>
    </section>
  );
}
