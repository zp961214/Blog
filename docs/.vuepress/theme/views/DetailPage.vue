<template>
    <div id="DetailPage">
        <div class="DetailPage-container">
            <h1 class="title">{{ this.$page.title }}</h1>
            <Content></Content>
        </div>
        <nav>
            <ul :class="{ affix }">
                <li v-for="(item, index) in headers" :class="{ activeCurrent: activeCurrent === index }" @click="scrollToView(item.slug)" :key="item.title">
                    {{ index + 1 + '.' + item.title }}
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import animate from '@assets/js/animate.js';
export default {
    name: 'DetailPage',
    data() {
        return {
            affix: false,
            activeCurrent: -1
        };
    },
    computed: {
        headers() {
            return this.$page.headers;
        },

        headers_ele() {
            return this.headers ? this.headers.map(v => this.getScrollTag(v.slug).el.offsetTop - 60) : null;
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
        },

        scrollHandle() {
            const { el, docScrollTag } = this.getScrollTag('nav', '');
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
    nav {
        margin: 0 0 0 25px;
        flex: 0 0 300px;
        ul {
            padding: 20px;
            background: #fff;
            border-radius: 5px;
            margin: 0;
            box-sizing: border-box;
            width: 100%;
            color: #555;
            font-size: 14px;
            background: #fff;
            box-shadow: initial;
            border-radius: initial;
            border-radius: 5px;
            height: max-content;
            z-index: 2;

            li {
                cursor: pointer;
                margin-bottom: 5px;
            }
            .activeCurrent {
                color: #fc6423;
            }
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
    }
}
</style>
