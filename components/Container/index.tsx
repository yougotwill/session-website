import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { useScreen } from '@/contexts/screen';

export interface IContainerSizes {
  sm: string;
  md: string;
  lg: string;
  xl?: string;
}

interface Props {
  id?: string;
  heights?: IContainerSizes;
  classes?: string;
  children: ReactNode;
}

export default function Container(props: Props): ReactElement {
  const { id, heights, classes, children } = props;
  const { isSmall, isMedium, isLarge, isHuge, isEnormous } = useScreen();
  const height: string | undefined = (() => {
    if (isSmall) return heights?.sm;
    if (isMedium) return heights?.md;
    if (isLarge) return heights?.lg;
    if (isHuge || isEnormous) return heights?.xl ?? heights?.lg;
  })();
  return (
    <div
      id={id}
      className={classNames(
        'container mx-auto max-w-6xl p-6',
        'md:p-12',
        'lg:py-0 lg:px-10',
        classes
      )}
      // mobile safari needs style props to be explicitly undefined if not used
      style={{ height: height ? `calc(${height})` : undefined }}
    >
      {children}
    </div>
  );
}
