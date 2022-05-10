import CustomHead from '@/components/CustomHead';
import Image from 'next/image';
import { METADATA } from '@/constants';
import { ReactElement } from 'react';

export default function HowToHelpPage(): ReactElement {
  return (
    <>
      <CustomHead title={'How you can help'} metadata={METADATA['HELP_PAGE']} />
      <Image
        src="/assets/images/help.png"
        alt="How you can help graphic"
        width={'1048px'}
        height={'2418px'}
      />
    </>
  );
}
