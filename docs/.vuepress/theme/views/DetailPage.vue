<template>
    <div id="DetailPage">
        <!-- <div class="DetailPage-container">
            <div class="DetailPage-wrapper">
                <h1 class="title">{{ this.$page.title }}</h1>
                <Content></Content>
            </div>
            <section class="section-wrapper">
                <div :class="[{ affix }, 'container-section']">
                    <div class="section-title" v-show="headers">
                        <span
                            :class="{ sectionActive: sectionActive === item }"
                            :key="item"
                            @click="changeSection(item)"
                            v-for="item in ['文章目录', '文章站点']"
                            v-text="item"
                        />
                    </div>
                    <ul ref="a" v-if="headers">
                        <li
                            :class="{ activeCurrent: activeCurrent === index }"
                            :key="item.title"
                            @click="scrollToView(item.slug)"
                            v-for="(item, index) in headers"
                        >
                            {{ index + 1 + '. ' + item.title }}
                        </li>
                    </ul>
                    <div ref="b" :class="[{ asideShow: !headers }, 'aside-container']"><aside-info class="side-bar"></aside-info></div>
                </div>
            </section>
        </div> -->
        <app-container>
            <h1 class="title">{{ this.$page.title }}</h1>
            <Content></Content>
        </app-container>
        <div class="disqus-wrapper">
            <div id="disqus_thread"></div>
        </div>
    </div>
</template>

<script>
import DisqusJS from 'disqusjs';
import animate from '@assets/js/animate.js';
import appContainer from '@theme/components/app-container';

export default {
    name: 'DetailPage',
    components: { appContainer },
    data() {
        return {
            affix: false,
            activeCurrent: -1,
            sectionActive: '文章目录'
        };
    },
    computed: {
        headers() {
            return this.$page.headers;
        },

        headers_ele() {
            return this.headers ? this.headers.map(v => this.getScrollTag(v.slug).el.offsetTop - 60) : null;
        },
        is_menu_show() {
            return this.headers && this.sectionActive === '文章目录';
        },

        is_asideInfo_show() {
            return !this.headers || this.sectionActive === '文章站点';
        }
    },
    methods: {
        getScrollTag(id, Selector = '#') {
            const el = document.querySelector(Selector + id);
            const docScrollTag = document.body.scrollTop ? document.body : document.documentElement;
            return { el, docScrollTag };
        },

        scrollToView(id, Selector, offset = 0) {
            const { el, docScrollTag } = this.getScrollTag(id, Selector);
            animate(docScrollTag, { scrollTop: el.offsetTop - offset });
        }
    },

    mounted() {
        new DisqusJS({
            shortname: 'izp-me',
            siteName: 'izp.me',
            identifier: document.location.origin + document.location.pathname + document.location.search,
            url: document.location.origin + document.location.pathname + document.location.search,
            api: 'https://disqus.skk.moe/disqus/',
            apikey: 'HplZkNQIgZwjGaxqaWErD6XyEl0hzqnV08qqfG8dhTCQRWUK6glTCw8vz12pMCM3',
            admin: 'valor_coc',
            adminLabel: ''
        });
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandle);
    }
};
</script>
<style lang="scss" scoped>
#DetailPage {
    .DetailPage-container {
        display: flex;
        width: 1200px;
        margin: 0 auto;
        padding: 0 35px;
        box-sizing: border-box;
        .DetailPage-wrapper {
            width: 100%;
            padding: 40px;
            box-sizing: border-box;
            border-radius: 5px;
            background: #fff;
            color: #34495e;
            .title {
                font-size: 25px;
                text-align: center;
                margin-bottom: 18px;
            }
        }
        .section-wrapper {
            position: relative;
            flex: 0 0 300px;
            margin: 0 0 0 25px;
            height: max-content;
            background: #fff;
            border-radius: 5px;
            .container-section {
                .section-title {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                    span {
                        margin: 0 5px;
                        padding-bottom: 4px;
                        box-sizing: border-box;
                        &:hover {
                            cursor: pointer;
                            color: #fc6423;
                        }
                    }
                    .sectionActive {
                        opacity: 1;
                        color: #fc6423;
                        border-bottom: 1px solid #fc6423;
                    }
                }
                ul {
                    padding: 20px;
                    margin: 0;
                    box-sizing: border-box;
                    width: 100%;
                    color: #555;
                    font-size: 14px;
                    box-shadow: initial;
                    border-radius: initial;
                    border-radius: 5px;
                    z-index: 2;
                    li {
                        cursor: pointer;
                        margin-bottom: 5px;
                    }
                    .activeCurrent {
                        color: #fc6423;
                    }
                }
                .aside-container {
                    display: none;
                    .side-bar {
                        position: unset;
                        top: 20px;
                        right: unset;
                        left: unset;
                        transform: translate(0, 0);
                    }
                }
                .asideShow {
                    display: block;
                }
            }
            .affix {
                position: fixed;
                width: 300px;
                top: 20px;
                background: #fff;
                border-radius: 5px;
            }
        }
    }
    .disqus-wrapper {
        width: 1200px;
        margin: 50px auto 0;
        #disqus_thread {
            width: calc(1200px - 403px);
            margin-left: 40px;
            padding: 40px;
            box-sizing: border-box;
            border-right: 5px;
            background: #fff;
        }
    }
}
@media screen and (max-width: 1216px) {
    #DetailPage {
        .DetailPage-container {
            width: auto;
            padding: 0;
            .DetailPage-wrapper {
                padding: 40px 20px;
            }
            .section-wrapper {
                display: none;
            }
        }
        .disqus-wrapper {
            width: auto;
            #disqus_thread {
                width: 100%;
                margin-left: 0;
            }
        }
    }
}
@media screen and (max-width: 1216px) and (min-width: 800px) {
    #DetailPage {
        .DetailPage-container {
            width: 800px;
            padding: 0;
            .section-wrapper {
                display: none;
            }
        }
        .disqus-wrapper {
            width: 800px;
        }
    }
}
</style>
<style lang="scss">
#DetailPage {
    .content {
    }
    img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
        max-width: 400px;
    }
}
</style>
<style src="disqusjs/dist/disqusjs.css"></style>
