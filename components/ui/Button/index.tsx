import { ReactElement } from 'react';
import classNames from 'classnames';

interface Props {
  bgColor?: 'primary' | 'black' | 'none';
  textColor?: 'primary' | 'black';
  size?: 'small' | 'medium' | 'large';
  shape?: 'round' | 'semiround' | 'square';
  fontWeight?: 'light' | 'semibold';
  animate?: boolean;
  hoverEffect?: boolean;
  classes?: string;
  children?: string;
  onClick?(): any;
}

export default function Button(props: Props): ReactElement {
  const {
    bgColor = 'primary',
    textColor = 'black',
    fontWeight = 'semibold',
    size = 'medium',
    shape = 'round',
    animate = false,
    hoverEffect = true,
    classes,
    children,
    onClick,
  } = props;
  // See Gotchas in README
  const bgClasses = [
    bgColor === 'primary' && 'bg-primary',
    bgColor === 'black' && 'bg-black',
    bgColor === 'none' && 'bg-transparent',
  ];
  const textClasses = [
    textColor === 'primary' && 'text-primary',
    textColor === 'black' && 'text-black',
  ];
  const hoverClasses = [
    bgColor === 'primary' && 'hover:bg-black hover:text-primary',
    bgColor === 'black' && 'hover:bg-primary hover:text-black',
    (hoverEffect || animate) && 'transition-colors duration-300',
  ];
  const sizeClasses = [
    size === 'small' && 'text-sm py-1 px-7',
    size === 'medium' && 'py-2 px-7',
  ];
  const shapeClasses = [
    shape === 'round' && 'rounded-3xl',
    shape === 'semiround' && 'rounded-lg',
    shape === 'square' && 'rounded-sm',
  ];
  const fontClasses = [
    fontWeight === 'light' && 'font-light',
    fontWeight === 'semibold' && 'font-semibold',
  ];

  return (
    <button
      className={classNames(
        bgClasses,
        textClasses,
        hoverEffect && hoverClasses,
        sizeClasses,
        shapeClasses,
        fontClasses,
        classes
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
