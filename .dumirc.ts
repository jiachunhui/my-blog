import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'dist',
  themeConfig: {
    name: 'blog',
    nav:[{ title: '学习笔记', link: '/guide' },{ title: '收藏', link: '/favorites' }],
    showLineNum:true,
    footer:'技术支持 <a href="https://www.ccxcn.com">传诚信.网站建设</a>',
    socialLinks:{
      github:'https://www.ccxcn.com'
    }
  },
});
