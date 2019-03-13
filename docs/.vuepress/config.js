const path = require('path');
const resolve = (...arg) => path.resolve(...arg);
module.exports = {
    title: 'Hi,valor',
    description: 'Just playing around',
    head: [['link', { rel: 'icon', href: '/logo.png' }], ['mate', { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1' }]],
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'hi,valor',
            description: 'Web Front-End Blog by valor'
        }
    },
    themeConfig: {
        repo: 'zp961214/Blog',
        nav: [
            { text: '首页', link: '/', title: 'Home' },
            { text: '归档', link: '/archives/', title: 'Archives' },
            { text: '分类', link: '/categories/', title: 'categories', hide: true },
            { text: '打赏', link: '/tip/', title: 'tip' }
        ],
        sidebar: {
            '/archives/': ['/web/', '/web/first']
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
    base: '/',
    configureWebpack: {
        resolve: {
            alias: {
                '@theme': resolve(__dirname, 'theme'),
                '@': resolve(__dirname),
                '@assets': resolve(__dirname, 'assets')
            }
        }
    },
    markdown: {
        anchor: {
            level: [1, 2, 3, 4, 5, 6],
            permalinkSymbol: '#'
        }
    },
    plugins: {
        '@vuepress/clean-urls': {},
        '@vuepress/medium-zoom': {},
        '@vuepress/nprogress': {},
        '@vuepress/search': {
            searchMaxSuggestions: 10
        },
        '@vuepress/google-analytics': {
            ga: 'UA-126621569-1'
        }
    }
};
