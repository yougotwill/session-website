import { ReactElement } from 'react';
import classNames from 'classnames';

import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types';

interface Props {
  body: Document;
}

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => (
      <span className={classNames('font-bold')}>{text}</span>
    ),
    [MARKS.ITALIC]: (text) => (
      <span className={classNames('italic')}>{text}</span>
    ),
    [MARKS.UNDERLINE]: (text) => (
      <span className={classNames('underline')}>{text}</span>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p
        className={classNames(
          'text-gray text-sm font-light leading-relaxed mb-6',
          'lg:text-base'
        )}
      >
        {children}
      </p>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2
        className={classNames(
          'text-gray text-2xl font-light leading-snug mb-5',
          'lg:text-3xl'
        )}
      >
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
    [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
    [BLOCKS.OL_LIST]: (node, children) => {
      return <ol className="list-decimal">{children}</ol>;
    },
    [BLOCKS.UL_LIST]: (node, children) => {
      return <ul className="list-disc">{children}</ul>;
    },
    [BLOCKS.LIST_ITEM]: (node, children) => {
      return <li>{children}</li>;
    },
    // TODO style quote and cititation
    // [BLOCKS.QUOTE]: (node, children) => <h4>{children}</h4>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        className={classNames('text-primary-dark font-extralight')}
        href={node.data.uri}
        target="_blank"
        rel="noreferrer"
      >
        {/* might need to change to plain text */}
        {children}
      </a>
    ),
  },
};

export default function RichBody(props: Props): ReactElement {
  const { body } = props;
  const richBody = documentToReactComponents(body, options);
  return <div>{richBody}</div>;
}
