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
            reSet: null,
            title: ''
        };
    },
    mounted() {
        this.title = document.title;
        window.addEventListener('visibilitychange', this.visibilitychange);
       import('../assets/js/mouseClick.js')

    },
    methods: {
        visibilitychange() {
            document.hidden ? this.pageHidden() : this.pageShow();
        },
        pageHidden() {
            clearTimeout(this.reSet);
            document.title = '(˘•ω•˘)喔噢，页面不见啦';
        },
        pageShow() {
            clearTimeout(this.reSet);
            document.title = 'φ(>ω<*)咦，又好啦';
            this.reSet = setTimeout(this.reSetTitle, 2500);
        },
        reSetTitle() {
            document.title = this.title;
        }
    }
};
</script>
<style src="prismjs/themes/prism-tomorrow.css"></style>
<style lang="scss">
@import './styles/base.scss';
@import './styles/theme.scss';
</style>
