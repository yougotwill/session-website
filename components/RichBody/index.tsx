/* eslint-disable react/display-name */
import { cloneElement, Children, ReactElement } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { isLocal, hasLocalID } from '@/utils/links';
import { renderEmbeddedEntry } from '@/services/render';

interface Props {
  body: Document;
  headingClasses?: string; // custom h1-h4 styles
  classes?: string; // custom styles for regular text (color, font weight, etc.)
}

export default function RichBody(props: Props): ReactElement {
  const { body, headingClasses, classes } = props;
  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span>
          <strong className="font-bold">{text}</strong>
        </span>
      ),
      [MARKS.ITALIC]: (text) => (
        <span>
          <em className="italic">{text}</em>
        </span>
      ),
      [MARKS.UNDERLINE]: (text) => (
        <span className={classNames('underline')}>{text}</span>
      ),
      [MARKS.CODE]: (text) => (
        <code className={classNames('font-mono tracking-wide')}>{text}</code>
      ),
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => (
        <Link href={node.data.uri} scroll={!isLocal(node.data.uri)}>
          <a
            aria-label={'Read more about this link'}
            className={classNames('text-primary-dark font-extralight')}
            target={isLocal(node.data.uri) ? '_self' : '_blank'}
            rel="noreferrer"
          >
            {children}
          </a>
        </Link>
      ),
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        return renderEmbeddedEntry({ node, isInline: true });
      },
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={classNames('leading-relaxed pb-6')}>{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1
          id={hasLocalID(node)}
          className={classNames(
            'text-3xl leading-snug mb-5',
            'lg:text-5xl',
            headingClasses
          )}
        >
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2
          id={hasLocalID(node)}
          className={classNames(
            'text-2xl leading-snug mb-5',
            'lg:text-3xl',
            headingClasses
          )}
        >
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3
          id={hasLocalID(node)}
          className={classNames(
            'text-xl leading-snug mb-2',
            'lg:text-2xl',
            headingClasses
          )}
        >
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4
          id={hasLocalID(node)}
          className={classNames(
            'text-md leading-snug mb-2',
            'lg:text-xl',
            headingClasses
          )}
        >
          {children}
        </h4>
      ),
      [BLOCKS.HR]: (node, children) => (
        <hr className={classNames('border-gray-300 w-24 mx-auto pb-6')} />
      ),
      [BLOCKS.OL_LIST]: (node, children) => {
        return <ol className="pb-5 ml-10 list-decimal">{children}</ol>;
      },
      [BLOCKS.UL_LIST]: (node, children) => {
        return <ul className="pb-5 ml-10 list-disc">{children}</ul>;
      },
      [BLOCKS.LIST_ITEM]: (node, children) => {
        const renderChildren = Children.map(children, (child: any) => {
          if (child.type === 'p') {
            const newProps = {
              ...child.props,
              className: 'leading-relaxed pb-1',
            };
            return cloneElement(child, newProps);
          }
        });
        return <li>{renderChildren}</li>;
      },
      [BLOCKS.QUOTE]: (node, children) => (
        <div
          className={classNames(
            'border-gray-100 border-l-6 py-6 px-4 mb-6 ml-10 mr-4'
          )}
        >
          <blockquote
            className={classNames(
              'text-base text-black italic -mb-6',
              'lg:text-lg'
            )}
          >
            {children}
          </blockquote>
        </div>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        return renderEmbeddedEntry({ node });
      },
    },
  };

  const richBody = documentToReactComponents(body, options);
  return <div className={classNames(classes)}>{richBody}</div>;
}
