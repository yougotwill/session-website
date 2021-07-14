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
  return (
    <div className={classNames(`flex mr-4 text-${color}`, classes)}>
      {showLine && (
        <span
          className={classNames(
            `w-36 border-${color} border-t mt-2 mr-5 -ml-3`,
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
