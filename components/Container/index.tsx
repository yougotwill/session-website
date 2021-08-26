import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { useScreen } from '@/contexts/screen';

export interface IContainerSizes {
  small: string;
  medium: string;
  large: string;
  huge?: string;
  enormous?: string;
}

interface Props {
  id?: string;
  heights?: IContainerSizes;
  fullWidth?: boolean;
  classes?: string;
  children: ReactNode;
}

export default function Container(props: Props): ReactElement {
  const { id, heights, fullWidth = false, classes, children } = props;
  const { isSmall, isMedium, isLarge, isHuge, isEnormous } = useScreen();
  const height: string | undefined = (() => {
    if (isSmall) return heights?.small;
    if (isMedium) return heights?.medium;
    if (isLarge) return heights?.large;
    if (isHuge) return heights?.huge ?? heights?.large;
    if (isEnormous) return heights?.enormous ?? heights?.large;
  })();
  return (
    <div
      id={id}
      className={classNames(
        'mx-auto',
        !fullWidth && [
          'container max-w-6xl p-6',
          'md:p-12',
          'lg:py-0 lg:px-10',
        ],
        classes
      )}
      // mobile safari needs style props to be explicitly undefined if not used
      style={{ height: height ? `calc(${height})` : undefined }}
    >
      {children}
    </div>
  );
}
