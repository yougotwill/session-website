import Image from 'next/image';
import { ReactElement } from 'react';

export default function HowToHelpPage(): ReactElement {
  return (
    <Image
      src="/assets/images/help.png"
      alt="How you can help graphic"
      width={'1048px'}
      height={'2418px'}
    />
  );
}
