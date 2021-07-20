import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';

import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import {
  BLOCKS,
  Document,
  Heading2,
  Heading3,
  Heading4,
  Hyperlink,
  MARKS,
  OrderedList,
  Text,
} from '@contentful/rich-text-types';

interface Props {
  body: Document;
}

interface RenderProps {
  children?: ReactNode;
}

function Bold({ children }: RenderProps) {
  return <span className={classNames('text-bold')}>{children}</span>;
}

function Paragraph({ children }: RenderProps) {
  return <p className={classNames('')}>{children}</p>;
}

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
  },
};

export default function RichBody(props: Props): ReactElement {
  const { body } = props;
  const richBody = documentToReactComponents(body, options);
  return <div>{richBody}</div>;
}
