// .lintstagedrc.js
/** @type {import('lint-staged').UserConfig} */
export default {
  // 'packages/**/*.{less,css}': ['stylelint --fix'],
  'packages/**/*.{js,ts,jsx,tsx,json,md,html}': ['biome format --write'],
  'packages/**/*.{ts,tsx}': ['biome check --write'],
};
