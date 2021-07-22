import { ReactElement, useEffect, useRef } from 'react';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import classNames from 'classnames';

import { IEmbed, INoembed, isNoembed } from '@/services/embed';

interface Props {
  content: IEmbed | INoembed;
  classes?: string;
}

export default function EmbedContent(props: Props): ReactElement {
  const { content, classes } = props;
  const htmlRef = useRef<HTMLDivElement>(null);
  if (isNoembed(content)) {
    useEffect(() => {
      if (null !== htmlRef.current) {
        htmlRef.current.innerHTML = DOMPurify.sanitize(content.html);
      }
    }, []);
    return (
      <div className={classNames('embed-content', classes)} ref={htmlRef}></div>
    );
  } else {
    return (
      <Link href={content.url}>
        <a>
          <div className={classNames('embed-content', classes)}>
            {content.image && <img src={content.image} />}
            <p>{content.title}</p>
            {content.description && <p>{content.description}</p>}
          </div>
        </a>
      </Link>
    );
  }
}
