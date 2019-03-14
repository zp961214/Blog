<template>
    <div class="app-container">
        <div class="app-container-container">
            <div class="app-container-wrapper">
                <slot />
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
                    <div ref="b" :class="[{ asideShow: !headers }, 'aside-container']"><aside-info class="side-bar" /></div>
                </div>
            </section>
        </div>
        <div class="footer-section">
            <div class="footer-wrapper">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script>
import animate from '@assets/js/animate.js';
import asideInfo from '@theme/components/aside-info';
export default {
    name: 'app-container',
    components: { asideInfo },
    data() {
        return {
            affix: false,
            activeCurrent: -1,
            sectionActive: '文章目录'
        };
    },
    /** 文章有目录时的逻辑 */
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
        changeSection(item) {
            this.sectionActive = item;
            const { a, b } = this.$refs;
            const time = 200;
            const type = [{ opacity: 0.5 }, time];
            if (this.is_menu_show) {
                animate(a, ...type, () => this.cb(a, 'block', time));
                animate(b, ...type, () => this.cb(b, 'none', time));
            } else {
                animate(a, ...type, () => this.cb(a, 'none', time));
                animate(b, ...type, () => this.cb(b, 'block', time));
            }
        },

        cb(el, type, time) {
            if (type === 'block') (el.style.display = 'block'), animate(el, { opacity: 1 }, time);
            if (type === 'none') (el.style.display = 'none'), animate(el, { opacity: 0 }, time);
        },

        handlerClick(link) {
            this.$router.push(link);
        },

        getScrollTag(id, Selector = '#') {
            const el = document.querySelector(Selector + id);
            const docScrollTag = document.body.scrollTop ? document.body : document.documentElement;
            return { el, docScrollTag };
        },

        scrollToView(id, Selector, offset = 0) {
            const { el, docScrollTag } = this.getScrollTag(id, Selector);
            animate(docScrollTag, { scrollTop: el.offsetTop - offset });
        },

        scrollHandle() {
            const { el, docScrollTag } = this.getScrollTag('app-container', '.');
            const { scrollTop } = docScrollTag;
            this.affix = scrollTop > el.offsetTop - 20;
            if (this.headers_ele) this.asideHandle(scrollTop);
            else return;
        },

        asideHandle(scrollTop) {
            const [first] = this.headers_ele;
            if (scrollTop > first) {
                const list = this.headers_ele.filter(v => scrollTop > v);
                this.activeCurrent = list.length - 1;
            } else this.activeCurrent = -1;
        }
    },

    mounted() {
        this.refresh_scroll ? '详情页刷新保留滚动条位置' : this.scrollToView('app-container', '.', 30);
        window.addEventListener('scroll', this.scrollHandle);
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandle);
    }
};
</script>
<style lang="scss" scoped>
.app-container {
    .app-container-container {
        display: flex;
        width: 1200px;
        margin: 0 auto;
        padding: 0 35px;
        box-sizing: border-box;
        .app-container-wrapper {
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
    .footer-section {
        width: 1200px;
        margin: 50px auto 0;
        .footer-wrapper {
            width: calc(1200px - 403px);
            margin-left: 40px;

            border-right: 5px;
            background: #fff;
        }
    }
}
@media screen and (max-width: 1316px) {
    .app-container {
        .app-container-container {
            width: auto;
            padding: 0;
            .app-container-wrapper {
                padding: 40px 20px;
            }
            .section-wrapper {
                display: none;
            }
        }
        .footer-section {
            width: auto;
            .footer-wrapper {
                width: 100%;
                margin-left: 0;
            }
        }
    }
}
@media screen and (max-width: 1316px) and (min-width: 800px) {
    .app-container {
        .app-container-container {
            width: 800px;
            padding: 0;
            .section-wrapper {
                display: none;
            }
        }
        .footer-section {
            width: 800px;
        }
    }
}
</style>
