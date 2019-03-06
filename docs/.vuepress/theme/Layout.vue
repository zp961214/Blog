<template>
    <div class="theme-container">
        <nav-menu :class="{MenuHidden}"/>
        <mobileMenu/>
        <banner-section/>
        <page/>
        <v-footer></v-footer>
        <vue-progress-bar></vue-progress-bar>
    </div> 
</template>
<script>
import Page from '@theme/views/page.vue';
import NavMenu from '@theme/components/nav-menu.vue';
import mobileMenu from '@theme/components/mobile-menu';
import bannerSection from '@theme/components/banner-section';
import vFooter from '@theme/components/v-footer';
export default {
    name: 'Layout',
    components: {
        Page,
        NavMenu,
        mobileMenu,
        bannerSection,
        vFooter
    },
    data() {
        return {
            reSet: null,
            title: '',
            MenuHidden: false,
            scrollTop: 0
        };
    },
    mounted() {
        this.title = document.title;
        this.scrollTopInit();
        window.addEventListener('visibilitychange', this.visibilitychange);
        window.addEventListener('scroll', this.scrollHandle);
        import('../assets/js/mouseClick.js');
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandle);
        window.removeEventListener('visibilitychange', this.visibilitychange); 
    },
    created(){
       
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
        },
        scrollHandle() {
            const scrollTag = document.body.scrollTop ? document.body : document.documentElement;
            const { scrollTop } = scrollTag;
            this.MenuHidden = scrollTop > this.scrollTop;
            this.scrollTop = scrollTop;
        },
        scrollTopInit() {
            const scrollTag = document.body.scrollTop ? document.body : document.documentElement;
            this.scrollTop = scrollTag.scrollTop;
        }
    }
};
</script>
<style src="prismjs/themes/prism-tomorrow.css"></style>
<style lang="scss">
@import './styles/base.scss';
@import './styles/theme.scss';
</style>
<style lang="scss" scoped>
.theme-container {
    .MenuHidden {
        top:-60px;
        
    }
}
</style>

