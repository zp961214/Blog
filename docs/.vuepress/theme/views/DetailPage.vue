<template>
    <div id="DetailPage">
        <div class="container">
            <h1 class="title">{{ this.$page.title }}</h1>
            <Content></Content>
        </div>
        <nav>
            <ul>
                <li v-for="(item, index) in headers" @click="scrollToView(item.title)" :key="item.title">{{ index + 1 + '.' + item.title }}</li>
            </ul>
        </nav>
    </div>
</template>

<script>
import animate from '../../assets/js/animate.js';
export default {
    name: 'DetailPage',
    data() {
        return {};
    },
    computed: {
        headers() {
            return this.$page.headers;
        }
    },
    methods: {
        scrollToView(id) {
            const el = document.querySelector('#' + id);
            const scrollTag = document.body.scrollTop ? document.body : document.documentElement;
            animate(scrollTag, { scrollTop: el.offsetTop - 60 });
        }
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
        margin-left: 25px;
        background: #fff;
        border-radius: 5px;
        padding: 20px;
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
        flex: 0 0 300px;
        ul {
            li {
                cursor: pointer;
                margin-bottom: 5px;
            }
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
    }
}
</style>
