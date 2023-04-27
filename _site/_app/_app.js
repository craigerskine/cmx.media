import 'instant.page';

import 'iconify-icon';

import { install, injectGlobal } from '@twind/core';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';

install({
  presets: [presetAutoprefix(), presetTailwind()],
  darkMode: 'class',
  hash: false,
  theme: {
    extend: {
      colors: ({ theme }) => ({
        pri: theme('colors.slate'),
        sec: theme('colors.sky'),
      }),
      fontFamily: ({ theme }) => ({
        sans: 'Outfit,'+ theme('fontFamily.sans'),
      }),
    },
  },
  rules: [
    [ 'writing-vertical-rl', { 'writing-mode': 'vertical-rl' } ],
    [ 'bg-grid', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 6 6\' width=\'6\' height=\'6\' fill=\'currentColor\'><path d=\'m6 5v1h-1v-1zm-4 0v1h-1v-1zm3-1v1h-1v-1zm-2 0v1h-1v-1zm1-1v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm-3-1v1h-1v-1zm4 0v1h-1v-1zm-5-1v1h-1v-1z\' /></svg>")', } ],
  ],
});

injectGlobal`
  @layer base {
    [x-cloak] { @apply hidden; }
    .label { @apply pb-1 border-(b-2 current); }
    .label:before {
      @apply mr-2 pb-1 text-([11px] current) tracking-normal leading-none font-bold uppercase;
      content: attr(data-label);
    }
  }
`

import Alpine from 'alpinejs';
window.Alpine = Alpine;

Alpine.start();