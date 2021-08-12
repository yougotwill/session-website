// https://tailwindcss.com/docs/responsive-design
import tailwindConfig from '@/tailwind.config.js';

function makeNumber(input: string) {
  return Number(input.split('px')[0]);
}

const UI = {
  MOBILE_BREAKPOINT: makeNumber(tailwindConfig.theme.screens.sm),
  TABLET_BREAKPOINT: makeNumber(tailwindConfig.theme.screens.md),
  DESKTOP_BREAKPOINT: makeNumber(tailwindConfig.theme.screens.lg),
  MONITOR_BREAKPOINT: makeNumber(tailwindConfig.theme.screens['2xl']),
};

export default UI;
