import { ReactElement, useEffect, useRef } from 'react';
import classNames from 'classnames';
import DOMPurify from 'dompurify';

import { IEmbeded, convertContent, fetchContent } from '@/services/noembed';

interface Props {
  url: string;
  classes?: string;
}

export default function EmbedContent(props: Props): ReactElement {
  const { url, classes } = props;
  const htmlRef = useRef<HTMLDivElement>(null);
  let content: IEmbeded;
  useEffect(() => {
    (async () => {
      const data = await fetchContent(url);
      content = convertContent(data);
      if (null !== htmlRef.current) {
        htmlRef.current.innerHTML = DOMPurify.sanitize(content.html);
      }
    })();
  }, []);
  return <div className={classNames(classes)} ref={htmlRef}></div>;
}
