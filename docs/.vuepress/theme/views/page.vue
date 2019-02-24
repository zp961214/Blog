<template>
    <div class="page-main">
        <Content v-if="isNav"></Content>
        <detail-page v-else></detail-page>
    </div>
</template>
<script>
import DetailPage from '@theme/views/DetailPage';
export default {
    name: 'page',
    components: { DetailPage },
    data() {
        return {};
    },
    computed: {
        isArchives() {
            return this.$route.path === '/archives/';
        },
        componentId() {
            return this.nav.filter(v => v.link === this.nowPath)[0].title;
        },
        nav() {
            return this.$site.themeConfig.nav;
        },
        isNav() {
            return this.nav.some(v => v.link === this.nowPath);
        },
        nowPath() {
            return this.$page.path;
        }
    },
    created() {
        console.log(this.$router);
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
