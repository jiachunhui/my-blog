import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'dist',
  themeConfig: {
    name: '小辉',
    nav:[{ title: '学习笔记', link: '/guide' },{ title: '收藏', link: '/favorites' },{ title: '在线工具', link: '/tools' }],
    showLineNum:true,
    footer:'技术支持 <a href="https://www.ccxcn.com">传诚信.网站建设</a> QQ:306727208 Email:wo@ccxcn.com',
    socialLinks:{
      github:'https://www.ccxcn.com'
    }
  },
});
