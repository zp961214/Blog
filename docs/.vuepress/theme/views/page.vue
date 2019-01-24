<template>
    <div class="page-main">
        <Home v-if="$route.path === '/'"></Home>
        <Post v-if="isPost"></Post>
        <Content v-else />
    </div>
</template>
<script>
import Home from './Home.vue';
import Post from './Post.vue';
export default {
    name: 'page',
    components: { Home, Post },
    data() {
        return {};
    },
    computed: {
        isPost() {
            return this.$route.path === '/post/';
        },
        componentId() {
            return this.nav.filter(v => v.link === this.nowPath)[0].title;
        },
        nav() {
            return this.$site.themeConfig.nav;
        },
        nowPath() {
            return this.$page.path;
        }
    },
    created() {
        console.log(1);
    }
};
</script>
<style lang="scss" scoped>
.page-main {
    background: #efefef;
    box-sizing: border-box;
    padding-top: 60px;
    .theme-container {
        // background-image: radial-gradient(
        //   ellipse farthest-corner at 50% 0,
        //   #6df297 0%,
        //   #9cffb8 100%
        // );
        height: 100%;
    }
}

@media screen and (max-width: 900px) {
    .page-main {
        padding-top: 40px;
    }
}
</style>
