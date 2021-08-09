import { ReactElement, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import { Button, Headline, Layout } from '@/components/ui';
import METADATA from '@/constants/metadata';

export default function OpenGroup(): ReactElement {
  const openGroupURL =
    'http://116.203.70.33/session?public_key=a03c383cf63c3c4efe67acc52112a6dd734b3a946b9545f488aaa93da7991238'; // TODO move into constants
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    if (isCopied) {
      setIsCopied(false);
      return;
    }
    if (typeof window !== 'undefined') {
      // https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(openGroupURL)
          .then(() => setIsCopied(true))
          .catch((e) => alert(e.message));
      } else {
        let textArea = document.createElement('textarea');
        textArea.value = openGroupURL;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const copySuccess = document.execCommand('copy');
        copySuccess ? setIsCopied(true) : alert('Copy Failed');
        textArea.remove();
      }
    }
  };
  return (
    <section>
      <Layout title="Open Group Channel" metadata={METADATA.OPEN_GROUP_PAGE}>
        <div
          className={classNames(
            'container pt-6 pb-8 px-4 mx-auto text-center',
            'md:px-16 md:pb-16',
            'lg:pt-0'
          )}
        >
          <Headline
            color="gray-dark"
            hideLineOnMobile={true}
            classes={classNames(
              'text-lg font-mono -mr-4 mb-8',
              'md:mt-4',
              'lg:mt-4 lg:mb-16'
            )}
          >
            Session Open Group Channel
          </Headline>
          <h2
            className={classNames(
              'text-gray-dark text-2xl font-helvetica font-semibold mb-8',
              'md:text-4xl'
            )}
          >
            Scan this QR code on Session to join our open group chat
          </h2>
          <div className={classNames('mx-auto mb-8')}>
            <Image
              src="/assets/images/qr-code.png"
              alt="session open group qr code"
              width="208px"
              height="208px"
              priority={true}
            />
          </div>
          <p className={classNames('text-gray-dark')}>
            Otherwise you can click the button below and copy our group chat URL
            to your clipboard.
          </p>
          <Button
            bgColor={isCopied ? 'black' : 'primary'}
            textColor={isCopied ? 'primary' : 'black'}
            animate={true}
            hoverEffect={false}
            classes={classNames('w-40 px-0 mt-8')}
            onClick={handleCopy}
          >
            {isCopied ? 'Copied!' : 'Copy URL'}
          </Button>
        </div>
      </Layout>
    </section>
  );
}
