import { ReactElement } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import redact from '@utils/redact';

interface Props {
  title: string;
  description?: string;
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
  // parent container must have 'flex' class
  return (
    <div
      className={classNames(
        'text-center text-2xl font-semibold leading-none p-3',
        classes
      )}
    >
      <div className={classNames('mb-5')}>
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          layout="responsive"
        />
      </div>
      <p className={classNames('')}>{title}</p>
      {/* redacted description only visible from tablet */}
    </div>
  );
}
