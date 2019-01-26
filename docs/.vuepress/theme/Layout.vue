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

export default {
    name: 'Layout',
    components: {
        Page,
        NavMenu,
        mobileMenu,
        bannerSection
    },
    data() {
        return {
            reSet: null
        };
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
            clearTimeout(this.reSet);
            document.title = 'φ(>ω<*)咦，又好啦';
            this.reSet = setTimeout(this.reSetTitle, 2500);
        },
        reSetTitle() {
            document.title = 'hi,valor';
        }
    }
};
</script>
<style lang="scss">
@import './styles/base.scss';
@import './styles/theme.scss';
</style>
<style src="./styles/styles/theme.styl" lang="stylus"></style>
