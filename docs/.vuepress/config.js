module.exports = {
  title: 'Mr.zhangBlog',
  description: 'Just playing around',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {    
    repo:'zp961214/Blog', 
    nav: [ 
      { text: '首页', link: '/' }, 
      { text: '中文博客', link: '/cn_post/' },
      { text: '英文博客', link: '/en_post/' },
    ], 
    sidebar: {
      '/cn_post/': ['/web/','/web/first'],
      '/en_post/': ['/web/'] 
    },
    sidebarDepth: 2
  }, 
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'assets'
      }
    }
  }
}
