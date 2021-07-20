import { ReactElement } from 'react';
import { IPost } from '@/types/cms';

export default function Article(props: IPost): ReactElement {
  const {
    title,
    subtitle,
    author,
    tags,
    publishedDate,
    featureImage,
    description,
    body,
  } = props;
  return (
    <section>
      <h1>{title}</h1>
      {/* <h2>{subtitle}</h2>
      <h3>
        {author?.name} - {publishedDate}
      </h3> */}
      {/* Rich body stuff here */}
      {/* <div>{body}</div> */}
    </section>
  );
}
