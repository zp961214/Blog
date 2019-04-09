const path = require('path');
const resolve = (...arg) => path.resolve(...arg);
module.exports = {
    base: '/',
    title: 'Hi,valor',
    description: 'Just playing around',
    theme: 'lovely',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['mate', { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1' }]
    ],
    locales: { '/': { lang: 'zh-CN', title: 'hi,valor', description: '前端萌新 技术博客 valor' } },
    themeConfig: {
        useDefaultNav: false,
        // avatar: 'logo.png',
        bannertext: ['你好呀', 'valor'],
        bannerPic: 'bg1.jpg',
        asideLink: [
            'https://weibo.com/u/2525995803?is_all=1',
            'https://www.zhihu.com/people/bao-da-ren-95-17/activities',
            'https://twitter.com/szuZ482ZPfAcnGR',
            '/tip/',
            'https://github.com/zp961214'
        ],
        DisqusJS: {
            shortname: 'izp-me',
            siteName: 'izp.me',
            api: 'https://disqus.skk.moe/disqus/',
            apikey: 'HplZkNQIgZwjGaxqaWErD6XyEl0hzqnV08qqfG8dhTCQRWUK6glTCw8vz12pMCM3',
            admin: 'valor_coc',
            adminLabel: ''
        },
        nav: [
            { text: '首页', link: '/', title: 'Home' },
            { text: '归档', link: '/archives/', title: 'Archives' },
            { text: '分类', link: '/categories/', title: 'categories', hide: true },
            { text: '打赏', link: '/tip/', title: 'tip' },
            { text: '友链', link: '/friend/', title: 'friend' },
            { text: '留言板', link: '/comment/', title: 'comment' }
        ],
        lastUpdated: 'Last Updated'
        // serviceWorker: {
        //     updatePopup: {
        //         message: '发现有新的内容更新',
        //         buttonText: '更新'
        //     }
        // }
    },

    configureWebpack: {
        resolve: {
            alias: {
                // '@theme': resolve(__dirname, 'theme'),
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
    }
};
