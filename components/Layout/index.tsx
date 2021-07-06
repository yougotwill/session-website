import { ReactElement, ReactNode } from 'react';
import Nav from '@components/Nav';

interface Props {
  title: string;
  children: ReactNode;
  props?: any;
}

export default function Layout({
  title,
  children,
  ...props
}: Props): ReactElement {
  return (
    <>
      <title>{title}</title>
      <Nav />
      {children}
    </>
  );
}
