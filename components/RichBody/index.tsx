import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types';
import EmbedContent from '@/components/EmbedContent';

interface Props {
  body: Document;
  classes?: string; // e.g. general font styles (color, size, weight, etc.)
}

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => (
      <span>
        <strong>{text}</strong>
      </span>
    ),
    [MARKS.ITALIC]: (text) => (
      <span>
        <em>{text}</em>
      </span>
    ),
    [MARKS.UNDERLINE]: (text) => (
      <span className={classNames('underline')}>{text}</span>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className={classNames('leading-relaxed pb-6')}>{children}</p>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className={classNames('text-2xl leading-snug mb-5', 'lg:text-3xl')}>
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
      const asset = node.data.target.fields;
      if (!asset.file) {
        // embedded link
        return (
          <figure>
            <EmbedContent data={asset.data} />
            {asset.caption && (
              <figcaption className={classNames('pb-4')}>
                <em>{asset.caption}</em>
              </figcaption>
            )}
          </figure>
        );
      } else {
        // embedded media
        const media = asset.file.fields;
        const url = media.file.url.replace('//', 'https://');
        switch (media.file.contentType) {
          case 'image/jpeg':
            const imageWidth = media.file.details.image.width;
            const imageHeight = media.file.details.image.height;
            return (
              <figure className={classNames('text-center mb-8', 'lg:px-24')}>
                <Image
                  src={url}
                  alt={asset.title}
                  width={imageWidth}
                  height={imageHeight}
                />
                {asset.caption && (
                  <figcaption className="mt-1">
                    <em>
                      <Link href={asset.sourceUrl}>
                        <a
                          className={classNames(
                            'text-primary-dark font-extralight'
                          )}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {asset.caption}
                        </a>
                      </Link>
                    </em>
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      }
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <Link href={node.data.uri}>
        <a
          className={classNames('text-primary-dark font-extralight')}
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      </Link>
    ),
  },
};

export default function RichBody(props: Props): ReactElement {
  const { body, classes } = props;
  const richBody = documentToReactComponents(body, options);
  return <div className={classNames(classes)}>{richBody}</div>;
}
