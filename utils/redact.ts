import classNames from 'classnames';

interface Props {
  redactColor: string;
  textColor: string;
  animate?: boolean;
}

export default function redact({
  redactColor,
  textColor,
  animate = false,
}: Props) {
  // parent container must have 'group' class
  return classNames(
    `bg-${redactColor} text-${redactColor} rounded-3xl p-1`,
    `group-hover:bg-transparent group-hover:text-${textColor}`,
    animate ? 'transition-colors duration-1000 group-hover:duration-100' : ''
  );
}
