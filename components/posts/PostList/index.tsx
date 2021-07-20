import { ReactElement } from 'react';
import classNames from 'classnames';

import { IPost } from '@/types/cms';
import { generateRoute } from '@/services/cms';
import { Headline } from '@/components/ui';
import { PostCard } from '@/components/cards';

interface Props {
  posts: IPost[];
  gridStyle?: 'tight' | 'relaxed';
  hoverEffect?: boolean;
  showDescription?: boolean;
  classes?: string;
}

export default function PostList(props: Props): ReactElement {
  const {
    posts,
    gridStyle = 'relaxed',
    hoverEffect,
    showDescription,
    classes,
  } = props;
  const cardClasses = classNames(
    'md:w-1/2 mb-5',
    'lg:w-1/3 lg:max-w-sm lg:px-3'
  );
  const gridClasses = [
    gridStyle === 'tight' && 'lg:max-w-screen-lg',
    gridStyle === 'relaxed' && 'lg:max-w-screen-xl',
  ];
  return (
    <div className={classNames('mt-8', 'md:mt-0', classes)}>
      <Headline
        color={'gray-dark'}
        classes={classNames(
          'font-mono text-sm mx-6 mb-10',
          'md:mx-12 md:mt-8 md:mb-10',
          'lg:mx-32 lg:my-12'
        )}
      >
        More posts
      </Headline>
      <div
        className={classNames(
          'container flex flex-wrap justify-center max-w-screen-md mx-auto',
          'md:justify-start',
          'lg:px-24',
          gridClasses
        )}
      >
        {posts?.map((post) => {
          return (
            <PostCard
              route={generateRoute(post.slug)}
              hoverEffect={hoverEffect}
              showDescription={showDescription}
              classes={classNames(cardClasses)}
              key={post.id}
              {...post}
            />
          );
        })}
      </div>
    </div>
  );
}
