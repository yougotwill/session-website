import { ReactElement } from 'react';
import classNames from 'classnames';

interface Props {
  color?: 'primary' | 'inverted' | 'minimal';
  classes?: string;
  shape?: 'round' | 'square';
  children?: string;
  onClick?(): any;
}

export default function Button(props: Props): ReactElement {
  const {
    color = 'primary',
    shape = 'round',
    classes,
    children,
    onClick,
  } = props;
  const btnClasses = classNames(
    `py-2 text-black px-7 bg-${color}`,
    'transition-colors duration-300',
    `hover:bg-black hover:text-${color}`
  );
  const shapeClasses =
    shape === 'round' ? 'rounded-3xl font-semibold' : 'rounded-sm';

  return (
    <button
      className={classNames(btnClasses, shapeClasses, classes)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
