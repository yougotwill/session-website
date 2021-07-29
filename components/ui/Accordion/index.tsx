import { ReactElement, useState, useRef, useEffect } from 'react';
import { Document } from '@contentful/rich-text-types';
import classNames from 'classnames';

import PlusSVG from '@/assets/svgs/plus.svg';
import MinusSVG from '@/assets/svgs/minus.svg';

import RichBody from '@/components/RichBody';

interface Props {
  question: string;
  answer: Document;
  expand?: boolean;
  classes?: string;
}

export default function Accordion(props: Props): ReactElement {
  const { question, answer, expand, classes } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState('0px');
  const content = useRef<HTMLDivElement>(null);
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    setHeight(isExpanded ? '0px' : `${content?.current?.scrollHeight}px`);
  };
  const svgClasses = classNames('w-3 h-3 fill-current mb-1 mr-2');
  useEffect(() => {
    if (expand) handleExpand();
  }, [expand]);
  return (
    <div
      className={classNames(
        'border-l border-r border-gray-300 text-sm',
        'first:border-t',
        classes
      )}
    >
      <div
        className={classNames(
          'bg-gray-100 text-gray-dark py-2 px-4 font-semibold border-gray-300 border-b',
          'lg:text-base'
        )}
        onClick={handleExpand}
      >
        <PlusSVG
          className={classNames(svgClasses, isExpanded ? 'hidden' : 'inline')}
          title="expand"
        />
        <MinusSVG
          className={classNames(svgClasses, isExpanded ? 'inline' : 'hidden')}
          title="close"
        />
        {question}
      </div>
      <div
        className={classNames(
          'font-light leading-loose px-4 overflow-hidden',
          'transition-all ease-in-out duration-500',
          isExpanded && 'border-gray-300 border-b'
        )}
        ref={content}
        style={{ maxHeight: height }}
      >
        <RichBody
          body={answer}
          classes={classNames(
            'text-sm text-gray font-light py-2',
            'lg:text-base'
          )}
        />
      </div>
    </div>
  );
}
