import { useScreenSize } from '@/hooks/screen';
import { ReactElement, ReactNode, createContext, useContext } from 'react';

interface IScreen {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMonitor: boolean;
}

const ScreenContext = createContext<IScreen>({
  width: 0,
  isMobile: true,
  isTablet: false,
  isDesktop: false,
  isMonitor: false,
});

export function useScreen() {
  return useContext(ScreenContext);
}

interface Props {
  children: ReactNode;
}
export function ScreenProvider(props: Props): ReactElement {
  const { children } = props;

  const value: IScreen = useScreenSize();

  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
}
