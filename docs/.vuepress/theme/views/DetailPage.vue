<template>
    <div id="DetailPage">
        <div class="DetailPage-container">
            <h1 class="title">{{ this.$page.title }}</h1>
            <Content></Content>
        </div>
        <section>
            <div class="section-title" v-show="headers">
                <span
                    :class="{ sectionActive: sectionActive === item }"
                    :key="item"
                    @click="changeSection(item)"
                    v-for="item in ['文章目录', '文章站点']"
                    v-text="item"
                />
            </div>
            <ul :class="{ affix }" ref="a" v-if="headers">
                <li :class="{ activeCurrent: activeCurrent === index }" :key="item.title" @click="scrollToView(item.slug)" v-for="(item, index) in headers">
                    {{ index + 1 + '. ' + item.title }}
                </li>
            </ul>
            <div class="aside-container" ref="b" :class="{ asideShow: !headers }"><aside-info class="side-bar"></aside-info></div>
        </section>
    </div>
</template>

<script>
import animate from '@assets/js/animate.js';
import asideInfo from '@theme/components/aside-info';
export default {
    name: 'DetailPage',
    components: { asideInfo },
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
            const { el, docScrollTag } = this.getScrollTag('section', '');
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
        window.addEventListener('scroll', this.scrollHandle);
        this.scrollToView('page-main', '.', 70);
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandle);
    }
};
</script>
<style lang="scss" scoped>
#DetailPage {
    display: flex;
    width: 1100px;
    margin: 0 auto;
    .DetailPage-container {
        padding: 40px;
        box-sizing: border-box;
        border-radius: 5px;
        background: #fff;
        color: #555;
        .title {
            font-size: 25px;
            text-align: center;
            margin-bottom: 18px;
        }
    }
    section {
        position: relative;
        margin: 0 0 0 25px;
        flex: 0 0 300px;
        background: #fff;
        border-radius: 5px;
        height: max-content;
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
