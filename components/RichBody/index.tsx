import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types';
/* eslint-disable react/display-name */
import { Children, ReactElement, cloneElement, ReactNode } from 'react';
import {
  Options,
  documentToReactComponents,
} from '@contentful/rich-text-react-renderer';
import { hasLocalID, isLocal } from '@/utils/links';
import { direction } from 'direction';
import Link from 'next/link';
import SHORTCODES from '@/constants/shortcodes';
import classNames from 'classnames';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { renderEmbeddedEntry } from '@/services/render';
import { renderShortcode } from '@/utils/shortcodes';

interface Props {
  body: Document;
  headingClasses?: string; // custom h1-h4 styles
  classes?: string; // custom styles for regular text (color, font weight, etc.)
}

interface DirectionObject {
  props: { dir: string; children: any };
}

export default function RichBody(props: Props): ReactElement {
  const { body, headingClasses, classes } = props;

  const onDirection = (obj: DirectionObject) => {
    if (obj?.props?.dir) {
      return obj.props.dir;
    } else if (typeof obj?.props?.children === 'string') {
      return direction(obj?.props?.children);
    } else {
      onDirection(obj?.props?.children);
    }
  };

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text: any) => {
        return (
          <span dir={direction(text)}>
            <strong dir={direction(text)} className="font-bold">
              {text}
            </strong>
          </span>
        );
      },
      [MARKS.ITALIC]: (text: any) => (
        <span>
          <em dir={direction(text)} className="italic">
            {text}
          </em>
        </span>
      ),
      [MARKS.UNDERLINE]: (text: any) => (
        <span dir={direction(text)} className={classNames('underline')}>
          {text}
        </span>
      ),
      [MARKS.CODE]: (text) => (
        <code className={classNames('font-mono tracking-wide')}>{text}</code>
      ),
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children: any) => {
        const url =
          node.data.uri.indexOf('://getsession.org') >= 0
            ? node.data.uri.split('://getsession.org')[1]
            : node.data.uri;
        return (
          <Link href={url} scroll={!isLocal(node.data.uri)}>
            <a
              dir={direction(children)}
              aria-label={'Read more about this link'}
              className={classNames('text-primary-dark')}
              target={
                isLocal(node.data.uri) || url !== node.data.uri
                  ? '_self'
                  : '_blank'
              }
              rel="noreferrer"
            >
              {children}
            </a>
          </Link>
        );
      },
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        return renderEmbeddedEntry({ node, isInline: true });
      },
      [BLOCKS.PARAGRAPH]: (node, children: any) => {
        let hasImage = false;
        Children.map(children, (child: any) => {
          if (child.type === 'figure') {
            hasImage = true;
            return;
          }
        });
        if (hasImage) {
          return (
            <span
              dir={direction(children)}
              className={classNames('leading-relaxed pb-6')}
            >
              {children}
            </span>
          );
        }
        const plaintext = documentToPlainTextString(node);
        const isShortcode = SHORTCODES.REGEX.test(plaintext);
        if (isShortcode) {
          return renderShortcode(plaintext);
        } else {
          return (
            <p
              dir={
                typeof children[0] === 'object'
                  ? onDirection(children[0])
                  : direction(children)
              }
              className={classNames('leading-relaxed pb-6')}
            >
              {children}
            </p>
          );
        }
      },
      [BLOCKS.HEADING_1]: (node, children: any) => (
        <h1
          dir={direction(children)}
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
      [BLOCKS.HEADING_2]: (node, children: any) => (
        <h2
          dir={direction(children)}
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
      [BLOCKS.HEADING_3]: (node, children: any) => (
        <h3
          dir={direction(children)}
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
      [BLOCKS.HEADING_4]: (node, children: any) => (
        <h4
          dir={direction(children)}
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
      [BLOCKS.OL_LIST]: (node, children: any) => {
        return (
          <ol dir={direction(children)} className="pb-5 ml-10 list-decimal">
            {children}
          </ol>
        );
      },
      [BLOCKS.UL_LIST]: (node, children: any) => {
        return (
          <ul dir={direction(children)} className="pb-5 ml-10 list-disc">
            {children}
          </ul>
        );
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
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        return renderEmbeddedEntry({ node });
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        return renderEmbeddedEntry({ node });
      },
    },
  };

  const richBody = documentToReactComponents(body, options);
  return <div className={classNames('rich-content', classes)}>{richBody}</div>;
}
