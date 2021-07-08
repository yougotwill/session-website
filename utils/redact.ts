import classNames from 'classnames';

interface Props {
  redactColor: string;
  textColor: string;
}

export default function redact({ redactColor, textColor }: Props) {
  // parent container must have 'group' class
  return classNames(
    `bg-${redactColor} text-${redactColor} rounded-3xl p-1`,
    'transition-colors duration-1000',
    `group-hover:bg-transparent group-hover:text-${textColor} group-hover:duration-100`
  );
}
