import classNames from 'classnames';

interface Props {
  redactColor: string;
  textColor: string;
  animate?: boolean;
  classes?: string;
}

export default function redact({
  redactColor,
  textColor,
  animate = false,
  classes,
}: Props) {
  // See Gotchas in README
  const redactClasses = [
    'text-transparent',
    redactColor === 'primary' && 'bg-primary text-primary',
    redactColor === 'gray-dark' && 'bg-gray-dark text-gray-dark',
    redactColor === 'white' && 'bg-white text-white',
  ];
  const hoverClasses = [
    'group-hover:bg-transparent',
    textColor === 'primary' && 'group-hover:text-primary',
    textColor === 'black' && 'group-hover:text-black',
    textColor === 'white' && 'group-hover:text-white',
  ];
  // parent container must have 'group' class
  return classNames(
    'rounded-3xl',
    redactClasses,
    hoverClasses,
    animate && 'transition-colors duration-1000 group-hover:duration-100',
    classes
  );
}
