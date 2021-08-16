import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { IPost } from '@/types/cms';
import { PostList } from '@/components/posts';
import RichBody from '@/components/RichBody';
import { useScreen } from '@/contexts/screen';

interface Props {
  post: IPost;
  otherPosts: IPost[];
}

export default function Post(props: Props): ReactElement {
  const { isMobile, isTablet } = useScreen();
  const { post, otherPosts } = props;
  const {
    title,
    subtitle,
    author,
    tags,
    publishedDate,
    featureImage,
    fullHeader,
    description,
    body,
  } = post;
  const renderTags = (() => {
    return tags.map((tag, index) => {
      return (
        <span key={index}>
          <Link href={`/blog?tag=${tag}`}>
            <a className="transition-colors duration-300 hover:text-primary">
              {tag}
            </a>
          </Link>
          {index < tags.length - 1 && ', '}
        </span>
      );
    });
  })();
  return (
    <section>
      <div
        className={classNames(
          'mx-auto mt-12 mb-8',
          'md:pt-8',
          'lg:mt-0',
          !fullHeader && [
            'container max-w-6xl pt-6 px-6',
            'md:px-28',
            'lg:px-40',
          ]
        )}
      >
        {featureImage?.imageUrl && (
          <div
            className={classNames(
              'relative',
              fullHeader ? 'w-screen' : ['w-full h-48', 'md:h-80', 'lg:h-120']
            )}
          >
            {fullHeader ? (
              <Image
                src={`${featureImage?.imageUrl}${
                  isMobile ? '?w=300' : isTablet ? '?w=600' : ''
                }`}
                alt={featureImage?.description ?? title}
                width={featureImage?.width}
                height={featureImage?.height}
              />
            ) : (
              <Image
                src={`${featureImage?.imageUrl}${
                  isMobile ? '?w=300' : isTablet ? '?w=600' : ''
                }`}
                alt={featureImage?.description ?? title}
                layout="fill"
                className={classNames('object-cover')}
              />
            )}
          </div>
        )}
      </div>
      <div
        className={classNames(
          'container max-w-6xl pb-6 px-6 mx-auto text-gray break-words',
          'md:pb-8 md:px-28',
          'lg:mt-0 lg:px-40'
        )}
      >
        <h1 className={classNames('text-4xl font-bold leading-normal mb-1')}>
          {title}
        </h1>
        <p
          className={classNames(
            'font-mono font-normal text-sm mb-3',
            'lg:mb-8'
          )}
        >
          <span>{publishedDate}</span> / <span>{renderTags}</span>
        </p>
        <RichBody
          body={body}
          classes={classNames('text-sm text-gray font-light', 'lg:text-base')}
        />
      </div>
      <PostList
        posts={otherPosts}
        gridStyle={'tight'}
        hoverEffect={false}
        compact={true}
        classes={classNames('my-16', 'lg:mb-24')}
      />
    </section>
  );
}
