import { ReactElement, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import Container from '@/components/Container';
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
    <Layout title="Open Group Channel" metadata={METADATA.OPEN_GROUP_PAGE}>
      <section>
        <Headline
          color="gray-dark"
          classes={classNames(
            'font-mono py-8 justify-center',
            'md:text-lg md:mx-0 md:justify-start',
            'lg:pt-4 lg:pb-16'
          )}
          containerWidths={{
            sm: '100%',
            md: '34rem',
            lg: '62rem',
          }}
        >
          Session Open Group Channel
        </Headline>
        <Container
          classes={classNames(
            'text-center pt-0 px-4 pb-12',
            'md:pt-4 md:pb-16',
            'lg:pb-16'
          )}
        >
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
        </Container>
      </section>
    </Layout>
  );
}
