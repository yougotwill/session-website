import { ReactElement } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { IPost } from '@/types/cms';

interface Props extends IPost {
  classes?: string;
}

export default function ArticleCard(props: Props): ReactElement {
  const {
    title,
    description,
    subtitle,
    featureImage,
    publishedDate,
    author,
    slug,
    classes,
  } = props;
  // parent container must have 'flex' class
  return (
    <div
      className={classNames(
        'text-gray-dark leading-none p-3',
        'lg:text-3xl',
        classes
      )}
    >
      {featureImage?.imageUrl && (
        <div
          className={classNames('relative w-full h-60 md:px-16', 'lg:px-20')}
        >
          <Image
            src={featureImage?.imageUrl}
            alt={featureImage?.description ?? title}
            layout="fill"
            className="object-cover rounded-lg cursor-pointer"
          />
        </div>
      )}
      <h3 className={classNames('text-2xl font-semibold mb-3')}>{title}</h3>
      <p
        className={classNames(
          'text-gray-lightest text-xs font-extralight mb-1'
        )}
      >
        {publishedDate}
      </p>
      <p className={classNames('text-sm font-light')}>{description}</p>
    </div>
  );
}
