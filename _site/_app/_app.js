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
    [ 'bg-grid', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 4\' width=\'4\' height=\'4\'><rect x=\'0\' y=\'0\' width=\'2\' height=\'2\' fill=\'rgba(5,5,5,.33)\'></rect></svg>")', } ],
  ],
});

injectGlobal({
  // global
  '[x-cloak]': { '@apply': 'hidden', },
  '.label': { '@apply': 'pb-1 border(b-2 current)' },
  '.label:before': { '@apply': 'mr-2 pb-1 text([11px] current) tracking-normal leading-none font-bold uppercase', 'content': 'attr(data-label)' },
});

import Alpine from 'alpinejs';
window.Alpine = Alpine;

Alpine.start();