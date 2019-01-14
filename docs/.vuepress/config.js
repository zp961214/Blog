module.exports = {
  title: 'Hi,valor',
  description: 'Just playing around',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
    repo: 'zp961214/Blog',
    nav: [{ text: '首页', link: '/', title: 'Home' }, { text: '中文博客', link: '/post/', title: 'Post' }],
    sidebar: {
      '/post/': ['/web/', '/web/first']
    },
    sidebarDepth: 2
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    },
    '/post/': {
      lang: 'zh-CN'
    }
  },
  configureWebpack: {
    resolve: {
      alias: { '@alias': 'assets' }
    }
  }
};
