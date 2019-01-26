<template>
    <div class="theme-container">
        <nav-menu />
        <mobileMenu />
        <banner-section />
        <page />
    </div>
</template>
<script>
import Page from './views/page.vue';
import NavMenu from './components/nav-menu.vue';
import mobileMenu from './components/mobile-menu';
import bannerSection from './components/banner-section';
import cursor from './images/cursor.png';

export default {
    name: 'Layout',
    components: {
        Page,
        NavMenu,
        mobileMenu,
        bannerSection
    },
    data() {
        return {};
    },
    created() {
        window.addEventListener('visibilitychange', this.visibilitychange);
    },
    methods: {
        visibilitychange() {
            document.hidden ? this.pageHidden() : this.pageShow();
        },
        pageHidden() {
            document.title = '(˘•ω•˘)喔噢，页面不见啦';
        },
        pageShow() {
            document.title = 'φ(>ω<*)咦，又好啦';
            setTimeout(() => {
                document.title = 'hi,valor';
            }, 2500);
        }
    }
};
</script>
<style lang="scss">
@import './styles/base.scss';
@import './styles/theme.scss';
</style>
