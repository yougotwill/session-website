import { ReactElement } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import { fetchBlogEntries } from '@services/cms';

import { Layout } from '@components';
import { node } from 'prop-types';

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
        return (
          <iframe>
            src={node.data.target.fields.embedUrl}
            height="100%" width="100%" frameBorder="0" scrolling="no" title=
            {node.data.target.fields.title}
            allowFullScreen={true}
          </iframe>
        );
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      return (
        <img
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
        />
      );
    },
  },
};

export default function Blog(): ReactElement {
  fetchBlogEntries();
  return (
    <Layout title="Blog - Session Private Messenger">
      <section></section>
    </Layout>
  );
}
