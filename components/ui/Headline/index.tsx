import { ReactElement } from 'react';
import classNames from 'classnames';

interface Props {
  color?: 'primary' | 'gray-dark';
  showLine?: boolean;
  classes?: string;
  children?: string;
}

export default function Headline(props: Props): ReactElement {
  const { color = 'primary', showLine = true, classes, children } = props;
  const colorClasses = [
    color === 'primary' && 'text-primary',
    color === 'gray-dark' && 'text-gray-dark',
  ];
  const borderClasses = [
    color === 'primary' && 'border-primary',
    color === 'gray-dark' && 'border-gray-dark',
  ];
  return (
    <div className={classNames(`flex mr-4`, colorClasses, classes)}>
      {showLine && (
        <span
          className={classNames(
            borderClasses,
            `border-t w-36 mt-2 mr-5 -ml-3`,
            'md:-ml-9',
            'lg:-ml-28'
          )}
        ></span>
      )}
      <span className={classNames(showLine ? 'w-1/2' : 'w-full')}>
        {children}
      </span>
    </div>
  );
}
