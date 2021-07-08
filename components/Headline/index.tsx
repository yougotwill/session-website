import { ReactElement } from 'react';
import classNames from 'classnames';

interface Props {
  color?: 'primary' | 'gray-dark';
  classes?: string;
  children?: string;
}

export default function Headline(props: Props): ReactElement {
  const { color = 'primary', classes, children } = props;
  return (
    <div
      className={classNames(
        `flex mt-8 mb-20 pr-4 text-${color} text-lg font-medium`,
        'md:mb-16',
        'lg:mt-4',
        classes
      )}
    >
      <span
        className={classNames(
          `w-36 border-${color} border-t mt-2 mr-5 -ml-3`,
          'md:-ml-9',
          'lg:-ml-28'
        )}
      ></span>
      <span className="w-1/2">{children}</span>
    </div>
  );
}
