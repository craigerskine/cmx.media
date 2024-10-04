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
        comic: ['Sofia Sans', ...theme('fontFamily.sans')],
      }),
      spacing: {
        18: '4.5rem',
        112: '28rem',
        120: '30rem',
      },
    },
  },
  rules: [
    ['text-wrap-(unset|wrap|nowrap|balance|pretty)', 'textWrap'],
    ['bg-gradient-radial', 'bg-[radial-gradient(closest-side,var(--tw-gradient-stops))]'],
    ['bg-gradient-conic', 'bg-[conic-gradient(from_180deg,var(--tw-gradient-stops))]'],
    [ 'btn', 'py-[.75em] px-[1em] max-w-[18rem] leading-tight truncate inline-flex items-center justify-center gap-2.5 rounded-[.3em] motion-safe:(transition)' ],
    [ 'btn-ghost', 'bg-transparent hover:(bg-pri-500/20)' ],
    [ 'btn-square', 'p-0 w-[2.75em] h-[2.75em]' ],
    [ 'btn-circle', 'p-0 w-[2.75em] h-[2.75em] rounded-full' ],
    [ 'bg-grid', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 6 6\' width=\'6\' height=\'6\' fill=\'rgba(128,128,128,.5)\'><path d=\'m0 0h1v1h1v1h1v1h1v-1h1v-1h1v1h-1v1h-1v1h1v1h1v1h-1v-1h-1v-1h-1v1h-1v1h-1v-1h1v-1h1v-1h-1v-1h-1v-1h-1z\' /></svg>")', } ],
    [ 'bg-close', { 'background-image': 'url("data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' width=\'1em\' height=\'1em\' fill=\'rgba(128,128,128,1)\'><g><path d=\'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z\' /></g></svg>")', } ],
  ],
});

injectGlobal`
  @layer base {
    [x-cloak] { @apply hidden; }
    :focus-visible { @apply outline-(4 double current offset-4) rounded-sm; }
    .toggle {
      @apply
      [--handleoffset:1em]
      [--togglehandleborder:0_0]
      [--handleoffsetcalculator:calc(var(--handleoffset)*_-1)]
      border-(1 current)
      w-[2em]
      h-[1em]
      bg-white
      text-pri-500
      block
      shrink-0
      cursor-pointer
      rounded-full
      shadow-[var(--handleoffsetcalculator)_0_0_2px_currentColor_inset,0_0_0_2px_currentColor_inset,var(--togglehandleborder)]
      [&:checked]:(text-acc-400 [--handleoffsetcalculator:var(--handleoffset)])
      [&:disabled]:(bg-pri-500/50 cursor-not-allowed opacity-50)
      motion-safe:(transition)
      appearance-none;
    }
    .iconify { @apply block; }
    .tippy-box[data-state="hidden"] { @apply opacity-0 translate-y-1; }
    [data-tippy-root] { @apply max-w-[calc(100vw-10px)]; }
    .tippy-box { @apply bg-black text-(white xs) font-semibold relative outline-0 opacity-100 rounded translate-y-0 motion-safe:(transition duration-75); }
    .tippy-box[data-placement^="top"] > .tippy-arrow { @apply bottom-0 before:(bottom-[-7px] left-0 border-(t-[8px] r-[8px] b-0 l-[8px] t-[initial])) origin-top; }
    .tippy-box[data-placement^="bottom"] > .tippy-arrow { @apply top-0 before:(top-[-7px] left-0 border-(t-0 r-[8px] b-[8px] l-[8px] b-[initial])) origin-bottom; }
    .tippy-box[data-placement^="left"] > .tippy-arrow {@apply right-0 before:(right-[-7px] border-(t-[8px] r-0 b-[8px] l-[8px] l-[initial])) origin-left; }
    .tippy-box[data-placement^="right"] > .tippy-arrow { @apply left-0 before:(left-[-7px] border-(t-[8px] r-[8px] b-[8px] l-0 r-[initial]) origin-right); }
    .tippy-arrow { @apply w-4 h-4 text-black absolute before:(content-[''] absolute border-(transparent solid)); }
    .tippy-content { @apply py-1 px-2 relative z-[1]; }
  }
`

// alpine
import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import tippy from 'tippy.js';

document.addEventListener('alpine:init', () => {
  Alpine.data('app', function() {
    return {
      comicData: [],
      slugify(text) {
        return text?.toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace('.', '-')
          .replace('&', '-and-')
          .normalize('NFKD')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '') || ''
      },
    }
  });
  // tooltip
  // magic: @focus="$tooltip('some tooltip')"
  Alpine.magic('tooltip', el => message => {
    let instance = tippy(el, { content: message })
    instance.show()
  });
  // directive: x-tooltip="'some tooltip'"
  Alpine.directive('tooltip', (el, { expression }, { evaluate }) => {
    tippy(el, { content: evaluate(expression) })
  });
});

//Alpine.plugin();
window.Alpine = Alpine;
Alpine.plugin([persist]);
Alpine.start();
