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
        pri: theme('colors.gray'),
        sec: theme('colors.sky'),
      }),
      fontFamily: ({ theme }) => ({
        sans: 'Asap,'+ theme('fontFamily.sans'),
      }),
      spacing: {
        18: '4.5rem',
        112: '28rem',
        120: '30rem',
      },
    },
  },
  rules: [
    [ 'bg-grid', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 6 6\' width=\'6\' height=\'6\' fill=\'rgb(128,128,128)\'><path d=\'m6 5v1h-1v-1zm-4 0v1h-1v-1zm3-1v1h-1v-1zm-2 0v1h-1v-1zm1-1v1h-1v-1zm-1-1v1h-1v-1zm2 0v1h-1v-1zm-3-1v1h-1v-1zm4 0v1h-1v-1zm-5-1v1h-1v-1z\' /></svg>")', } ],
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