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
  // parent container must have 'group' class
  return classNames(
    `bg-${redactColor} text-${redactColor} rounded-3xl`,
    `group-hover:bg-transparent group-hover:text-${textColor}`,
    animate ? 'transition-colors duration-1000 group-hover:duration-100' : '',
    classes
  );
}
