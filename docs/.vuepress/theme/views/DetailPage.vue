<template>
    <div id="DetailPage">
        <div class="container">
            <h1 class="title">{{ this.$page.title }}</h1>
            <Content></Content>
        </div>
        <nav>
            <ul :class="{ affix }">
                <li v-for="(item, index) in headers" @click="scrollToView(item.slug)" :key="item.title">{{ index + 1 + '.' + item.title }}</li>
            </ul>
        </nav>
    </div>
</template>

<script>
import animate from '../../assets/js/animate.js';
export default {
    name: 'DetailPage',
    data() {
        return {
            affix: false
        };
    },
    computed: {
        headers() {
            return this.$page.headers;
        }
    },
    methods: {
        scrollToView(id, Selector = '#') {
            const el = document.querySelector(Selector + id);
            const scrollTag = document.body.scrollTop ? document.body : document.documentElement;
            animate(scrollTag, { scrollTop: el.offsetTop - 72 });
        },
        scrollHandle() {
            const scrollTag = document.body.scrollTop ? document.body : document.documentElement;
            const { scrollTop } = scrollTag;
            this.affix = scrollTop > 547;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandle);
        this.scrollToView('title', '.');
    },
    beforeDestory() {
        window.removeEventListener('scroll', this.scrollHandle);
    }
};
</script>
<style lang="scss" scoped>
#DetailPage {
    display: flex;
    width: 1100px;
    margin: 0 auto;
    .container {
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
        }
    }
    .affix {
        position: fixed;
        width: 300px;
        top: 120px;
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
