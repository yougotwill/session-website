import { ReactElement } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import redact from '@utils/redact';

interface Props {
  title: string;
  description?: string[];
  image: string;
  imageAlt: string;
  imageWidth: string;
  imageHeight: string;
  classes?: string;
}

export default function Card(props: Props): ReactElement {
  const {
    title,
    description,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    classes,
  } = props;
  const redactedClasses = redact({
    redactColor: 'gray-dark',
    textColor: 'gray-dark',
  });
  const renderDescription = (() => {
    return description?.map((line) => {
      return (
        <p className={classNames('text-sm leading-loose -mx-3 mb-1')}>
          <span className={classNames(redactedClasses)}>{line}</span>
        </p>
      );
    });
  })();
  // parent container must have 'flex' class
  return (
    <div
      className={classNames(
        'text-center text-2xl font-semibold leading-none p-3',
        'lg:text-3xl',
        classes
      )}
    >
      <div className={classNames('mb-5', 'md:px-16', 'lg:px-20')}>
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          layout="responsive"
        />
      </div>
      <p className={classNames('md:mb-5')}>{title}</p>
      <div className={classNames('group')}>{renderDescription}</div>
    </div>
  );
}
