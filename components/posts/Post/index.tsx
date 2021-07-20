import { ReactElement } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { IPost } from '@/types/cms';
import { PostList } from '@/components/posts';
import RichBody from '@/components/RichBody';

interface Props {
  post: IPost;
  otherPosts: IPost[];
}

export default function Post(props: Props): ReactElement {
  const { post, otherPosts } = props;
  const {
    title,
    subtitle,
    author,
    tags,
    publishedDate,
    featureImage,
    description,
    body,
  } = post;
  return (
    <section>
      <div
        className={classNames(
          'container max-w-6xl p-6 mx-auto mt-12',
          'md:py-8',
          'lg:mt-0 lg:px-16'
        )}
      >
        <div className={classNames('text-gray', 'md:px-24')}>
          {featureImage?.imageUrl && (
            <div
              className={classNames(
                'relative w-full h-48 mb-8',
                'md:h-80 md:px-16',
                'lg:h-120 lg:px-20'
              )}
            >
              <Image
                src={featureImage?.imageUrl}
                alt={featureImage?.description ?? title}
                layout="fill"
                className={classNames('object-cover')}
              />
            </div>
          )}
          <h1 className={classNames('text-4xl font-bold leading-normal mb-1')}>
            {title}
          </h1>
          <p
            className={classNames(
              'font-mono font-normal text-sm mb-1',
              'md:mb-3',
              'lg:mb-8'
            )}
          >
            {publishedDate} / **tags here**
          </p>
          <RichBody body={body} />
        </div>
      </div>
      <PostList
        posts={otherPosts}
        gridStyle={'tight'}
        hoverEffect={false}
        showDescription={false}
        classes={classNames('my-16', 'lg:mb-24')}
      />
    </section>
  );
}
