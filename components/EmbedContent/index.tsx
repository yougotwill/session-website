import { ReactElement, useEffect, useRef } from 'react';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import classNames from 'classnames';

import { isEmbeded } from '@/services/noembed';

interface Props {
  // url: string;
  data: any;
  classes?: string;
}

export default function EmbedContent(props: Props): ReactElement {
  const { data, classes } = props;
  const htmlRef = useRef<HTMLDivElement>(null);
  // let content: IEmbeded;
  useEffect(() => {
    //   (async () => {
    //     const content = await fetchContent(url);
    if (null !== htmlRef.current) {
      htmlRef.current.innerHTML = DOMPurify.sanitize(data.html);
    }
    //   })();
  }, []);
  return isEmbeded(data) ? (
    <div className={classNames('embed-content', classes)} ref={htmlRef}></div>
  ) : (
    <Link href={data.url}>
      <a>
        <div className={classNames('embed-content', classes)}>
          {data.image && <img src={data.image} />}
          <p>{data.title}</p>
          {data.description && <p>{data.description}</p>}
        </div>
      </a>
    </Link>
  );
}
