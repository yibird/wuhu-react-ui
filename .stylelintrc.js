/** @type {import('stylelint').Config} */
module.exports = {
  customSyntax: 'postcss-less',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-less',
    'stylelint-config-recess-order',
  ],
  plugins: ['@stylistic/stylelint-plugin'],
  rules: {
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    // Less 特定规则
    // 'less/color-no-invalid-hex': true,
    // 'less/function-calc-no-unspaced-operator': true,
    // 'less/function-linear-gradient-no-nonstandard-direction': true,

    // 自定义规则
    'at-rule-no-unknown': null,

    // 选择器规则
    'selector-class-pattern': null,
    'selector-id-pattern': null,

    // 颜色规则
    'color-named': 'never',
    'color-hex-length': 'short',

    // 字体规则
    'font-family-name-quotes': 'always-where-recommended',

    // 函数规则
    'function-url-quotes': 'always',

    // 数值规则
    'number-leading-zero': 'never',
    'number-no-trailing-zeros': true,

    // 字符串规则
    'string-quotes': false,

    // 长度规则
    'length-zero-no-unit': true,

    // 单位规则
    'unit-allowed-list': [
      'px',
      '%',
      'em',
      'rem',
      's',
      'ms',
      'deg',
      'vh',
      'vw',
      'vmin',
      'vmax',
      'fr',
    ],

    // 属性规则
    'property-no-vendor-prefix': true,

    // 声明规则
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-trailing-semicolon': 'always',

    // 块规则
    'block-no-empty': true,
    'block-opening-brace-space-before': 'always',

    // 选择器规则
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-list-comma-newline-after': 'always',

    // 媒体特性规则
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',

    // 注释规则
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands'],
      },
    ],

    // 规则规则
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],

    // @stylistic 插件规则
    '@stylistic/indentation': 2,
    '@stylistic/block-opening-brace-newline-after': 'always-multi-line',
    '@stylistic/block-closing-brace-newline-before': 'always-multi-line',
  },
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    '**/*.json',
    'dist/**',
    'node_modules/**',
    'coverage/**',
  ],
};
