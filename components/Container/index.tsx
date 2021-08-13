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
  const { isMobile, isTablet, isDesktop, isMonitor } = useScreen();
  const height: string | undefined = (() => {
    if (isMobile) return heights?.sm;
    if (isTablet) return heights?.md;
    if (isDesktop) return heights?.lg;
    if (isMonitor) return heights?.xl ?? heights?.lg;
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
      style={{ height: height && `calc(${height})` }}
    >
      {children}
    </div>
  );
}
