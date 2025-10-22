import { defineConfig } from 'vitepress';
import react from '@vitejs/plugin-react';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Wuhu-React-ui',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件', link: '/markdown-examples' },
    ],
    sidebar: [
      {
        text: '组件',
        items: [
          { text: 'Layout(布局)', link: '/layout/index.md' },
          { text: 'Scrollbar(滚动条)', link: '/scrollbar/index.md' },
          { text: 'Ripple', link: '/ripple/index.md' },
          { text: 'LazyView', link: '/lazy-view/index.md' },
          { text: 'ResizeObserver', link: '/resize-observer/index.md' },
          { text: 'Verify(验证码)', link: '/verify/index.md' },
          { text: 'ContextMenu(上下文菜单)', link: '/context-menu/index.md' },
          { text: 'Highlight(高亮)', link: '/highlight/index.md' },
          { text: 'Splitter(分割器)', link: '/splitter/index.md' },
          { text: 'Time(相对时间)', link: '/time/index.md' },
          { text: 'CountDown(倒计时)', link: '/count-down/index.md' },
          { text: 'Copy(复制)', link: '/copy/index.md' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        stackblitz: {
          show: true,
        },
        codesandbox: {
          show: true,
        },
      }).use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [react(), groupIconVitePlugin()],
  },
});
