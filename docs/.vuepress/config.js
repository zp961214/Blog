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
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        serviceWorker: {
            updatePopup: {
                message: '发现有新的内容更新',
                buttonText: '更新'
            }
        }
    },
    base: '/test/'
    // locales: {
    //     '/': {
    //         lang: 'zh-CN'
    //     },
    //     '/post/': {
    //         lang: 'zh-CN'
    //     }
    // }
};
