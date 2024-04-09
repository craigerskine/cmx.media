// instant page
import 'instant.page';

// icons
import 'iconify-icon';

// color mode
const toggleColorMode = function() {
  // light
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-mode', 'light')
    return;
  }
  // dark
  document.documentElement.classList.add('dark');
  localStorage.setItem('color-mode', 'dark');
};

document.querySelectorAll('.color-mode').forEach(btn => {
  btn.addEventListener('click', toggleColorMode);
});

// twind
import { install, injectGlobal, autoDarkColor } from '@twind/core';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';

install({
  presets: [presetAutoprefix(), presetTailwind()],
  darkMode: 'class',
  darkColor: autoDarkColor,
  hash: false,
  theme: {
    extend: {
      colors: ({ theme }) => ({
        pri: theme('colors.zinc'),
        sec: theme('colors.stone'),
        acc: theme('colors.sky'),
      }),
      fontFamily: ({ theme }) => ({
        comic: ['Grandstander', ...theme('fontFamily.sans')],
      }),
      spacing: {
        18: '4.5rem',
        112: '28rem',
        120: '30rem',
      },
    },
  },
  rules: [
    [ 'bg-grid', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 6 6\' width=\'6\' height=\'6\' fill=\'rgba(128,128,128,.5)\'><path d=\'m0 0h1v1h1v1h1v1h1v-1h1v-1h1v1h-1v1h-1v1h1v1h1v1h-1v-1h-1v-1h-1v1h-1v1h-1v-1h1v-1h1v-1h-1v-1h-1v-1h-1z\' /></svg>")', } ],
    [ 'bg-close', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' width=\'1em\' height=\'1em\' fill=\'rgba(128,128,128,1)\'><g><path d=\'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z\' /></g></svg>")', } ],
  ],
});

injectGlobal`
  @layer base {
    [x-cloak] { @apply hidden; }
    .iconify { @apply block; }
  }
`

// alpine
import Alpine from 'alpinejs';
window.Alpine = Alpine;

Alpine.start();