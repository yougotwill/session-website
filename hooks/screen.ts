import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import { UI } from '@/constants';

export function useScreenSize() {
  const { width } = useWindowSize();

  // Mobile first
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMonitor, setIsMonitor] = useState(false);

  useEffect(() => {
    const _isMobile = width <= UI.MOBILE_BREAKPOINT;
    const _isTablet =
      width > UI.MOBILE_BREAKPOINT && width <= UI.TABLET_BREAKPOINT;
    const _isDesktop =
      width > UI.TABLET_BREAKPOINT && width < UI.MONITOR_BREAKPOINT;
    const _isMonitor = width >= UI.MONITOR_BREAKPOINT;

    if (isMobile !== _isMobile) setIsMobile(_isMobile);
    if (isTablet !== _isTablet) setIsTablet(_isTablet);
    if (isDesktop !== _isDesktop) setIsDesktop(_isDesktop);
    if (isMonitor !== _isMonitor) setIsMonitor(_isMonitor);
  }, [width]);

  return { width, isMobile, isTablet, isDesktop, isMonitor };
}
