import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { IPost } from '@/types/cms';

interface Props extends IPost {
  route: string;
  featured?: boolean;
  hoverEffect?: boolean;
  showDescription?: boolean;
  classes?: string;
}

export default function PostCard(props: Props): ReactElement {
  const {
    title,
    description,
    subtitle,
    featureImage,
    publishedDate,
    author,
    slug,
    route,
    featured,
    hoverEffect = !featured,
    showDescription = true,
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
        <Link href={route} passHref>
          <div
            className={classNames(
              'relative overflow-hidden w-full h-60 mb-4',
              'md:px-16',
              'lg:px-20',
              featured && 'md:w-1/2 md:mr-4 lg:mr-3 lg:w-3/5 lg:h-96',
              hoverEffect && 'rounded-lg'
            )}
          >
            <Image
              src={`${featureImage?.imageUrl}${featured ? '?w=700' : '?w=400'}`}
              alt={featureImage?.description ?? title}
              layout="fill"
              className={classNames(
                'object-cover cursor-pointer rounded-lg',
                hoverEffect &&
                  'transition transform scale-105 duration-300 hover:filter hover:blur-xs'
              )}
            />
          </div>
        </Link>
      )}
      <div
        className={classNames(featured && 'md:w-1/2 md:ml-4 lg:ml-3 lg:w-2/5')}
      >
        <Link href={route} passHref>
          <h3
            className={classNames(
              'cursor-pointer text-2xl font-semibold mb-3',
              featured &&
                'font-bold text-3xl mt-8 md:text-4xl md:-mt-1 lg:leading-tight'
            )}
          >
            {title}
          </h3>
        </Link>
        <p
          className={classNames(
            'text-gray-lightest text-xs font-helvetica font-extralight'
          )}
        >
          {publishedDate}
        </p>
        {showDescription && (
          <p
            className={classNames(
              'text-sm font-light',
              featured && 'md:text-base md:leading-normal'
            )}
          >
            {description}
          </p>
        )}
        {featured && (
          <Link href={route}>
            <a
              className={classNames(
                'block text-primary-dark text-xs font-extralight mt-4'
              )}
            >
              Read More »
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
