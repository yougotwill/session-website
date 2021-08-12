import { ReactElement } from 'react';
import classNames from 'classnames';
import { IContainerSizes } from '@/components/Container';
import { useScreen } from '@/contexts/screen';

interface Props {
  color?: 'primary' | 'gray-dark';
  containerWidths?: IContainerSizes;
  classes?: string;
  children?: string;
}

export default function Headline(props: Props): ReactElement {
  const { color = 'primary', containerWidths, classes, children } = props;
  const { isMobile, isTablet, isDesktop, isMonitor } = useScreen();
  const containerWidth: string | undefined = (() => {
    if (isMobile) return containerWidths?.sm;
    if (isTablet) return containerWidths?.md;
    if (isDesktop || isMonitor) return containerWidths?.lg;
  })();
  const colorClasses = [
    color === 'primary' && 'text-primary',
    color === 'gray-dark' && 'text-gray-dark',
  ];
  const borderClasses = [
    color === 'primary' && 'border-primary',
    color === 'gray-dark' && 'border-gray-dark',
  ];
  return (
    <div className={classNames('flex items-start', classes)}>
      <div
        className={classNames(`border-t mt-2 ml-3`, borderClasses)}
        style={{
          width: isMobile
            ? `calc((100vw - ${containerWidth}))`
            : `calc((100vw - ${containerWidth}) / 2)`,
        }}
      ></div>
      <div className={'mx-6'}>
        <div
          className={classNames('md:mx-auto', colorClasses)}
          style={{ width: `calc(${containerWidth})` }}
        >
          {children}
        </div>
      </div>
      <div
        className={classNames(`hidden mt-2 mr-3`, 'md:block')}
        style={{ width: `calc((100vw - ${containerWidth}) / 2)` }}
      ></div>
    </div>
  );
}
