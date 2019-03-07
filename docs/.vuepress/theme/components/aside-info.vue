<template>
    <aside class="site-bar">
        <div class="site-author">
            <img alt="author-Avatar" src="~@theme/images/aside.jpg" />
            <p class="description"></p>
            <ul class="link-of-author-motion">
                <li :key="i" @click="openPage(item.href)" v-for="(item, i) in hrefList">
                    <i :class="['iconfont', item.icon]"></i>
                    <span>{{ item.label }}</span>
                </li>
            </ul>
            <section class="site-state">
                <div class="site-item" @click="goArchives">
                    <span class="site-total">{{ logCount }}</span>
                    <span class="site-item-desc">日志</span>
                </div>
                <div class="site-item" @click="goCategories">
                    <span class="site-total">{{ classifyCount }}</span>
                    <span class="site-item-descl">分类</span>
                </div>
            </section>
        </div>
    </aside>
</template>

<script>
import classify from '@theme/mixins/classify';
export default {
    name: 'sidebar',
    props: {},
    mixins: [classify],
    data() {
        return {
            hrefList: [
                {
                    icon: 'icon-tubiao214',
                    label: '新浪微博',
                    href: 'http://www.baidu.com'
                },
                {
                    icon: 'icon-zhihu',
                    label: '知乎',
                    href: ''
                },
                {
                    icon: 'icon-QQ',
                    label: 'QQ',
                    href: ''
                },
                {
                    icon: 'icon-wo',
                    label: '关于我',
                    href: ''
                },
                {
                    icon: 'icon-github',
                    label: 'Github',
                    href: ''
                }
            ]
        };
    },
    computed: {
        front() {
            return this.$page.frontmatter;
        },

        nav() {
            return this.front.nav || [];
        }
    },
    methods: {
        handlerClick({ link = '' }) {
            if (/^http/.test(link)) {
                window.open(link);
            } else {
                this.$router.push(link);
            }
        },

        goCategories() {
            this.$router.push({ path: '/categories/' });
        },

        goArchives() {
            this.$router.push({ path: '/archives/' });
        },

        openPage(href) {
            window.open(href);
        }
    }
};
</script>
<style lang="scss" scoped>
@import '../../assets/icon/href/iconfont.css';
.site-bar {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: 'PingFang SC', 'Microsoft YaHei', Lato, sans-serif;
    width: 285px;
    background: white;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
    color: #555;
    .site-author {
        width: 100%;
        img {
            display: block;
            width: 100%;
        }
        p {
            font-size: 14px;
            font-weight: bolder;
        }
        ul {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding-left: 0;
            > li {
                position: relative;
                width: 40px;
                height: 40px;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                text-align: center;
                line-height: 40px;
                &:hover {
                    background: #97dffd;
                    color: #fff;
                    span {
                        opacity: 1;
                        transform: translate(-50%, -160%);
                    }
                }
                span {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -130%);
                    background: rgba(17, 17, 17, 0.7);
                    z-index: 10;
                    color: #fff;
                    font-size: 12px;
                    word-break: keep-all;
                    border-radius: 6px;
                    padding: 2px 4px;
                    box-sizing: border-box;
                    transition: all 0.18s ease 0.05s;
                    text-shadow: none;
                    opacity: 0;
                    line-height: 30px;
                }
            }
        }
        .site-state {
            display: flex;
            justify-content: center;
            .site-item {
                display: flex;
                flex-direction: column;
                color: #555;
                cursor: pointer;
                &:hover {
                    color: #222;
                }
                &:first-child {
                    margin-right: 10px;
                }
                &:last-child {
                    margin-left: 10px;
                }
                .site-total {
                    color: inherit;
                    text-align: center;
                }
                .site-item-desc {
                    color: #00a7e0;
                }
                .site-item-descl {
                    color: #ff3f1a;
                }
            }
        }
    }
    .description {
        text-align: center;
    }
}
</style>
