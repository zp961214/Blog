<template>
    <div class="theme-container">
        <nav-menu :class="{ MenuHidden }" />
        <mobileMenu />
        <banner-section />
        <page />
        <v-footer></v-footer>
        <vue-progress-bar></vue-progress-bar>
        <div :class="['back-to-top', { canBackTop }]" @click="backTop">
            <i class="fa fa-arrow-up"></i>
        </div>
    </div>
</template>
<script>
import Page from '@theme/views/page.vue';
import NavMenu from '@theme/components/nav-menu.vue';
import mobileMenu from '@theme/components/mobile-menu';
import bannerSection from '@theme/components/banner-section';
import vFooter from '@theme/components/v-footer';
import animate from '@assets/js/animate.js';
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
            scrollTop: 0,
            canBackTop: false
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
    created() {},
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
            const { el, docScrollTag } = this.getScrollTag('page-main', '.');
            const { scrollTop } = docScrollTag;
            this.MenuHidden = scrollTop > this.scrollTop;
            this.canBackTop = scrollTop > el.offsetTop - 20;
            this.scrollTop = scrollTop;
        },

        getScrollTag(id, Selector = '#') {
            const el = document.querySelector(Selector + id);
            const docScrollTag = document.body.scrollTop ? document.body : document.documentElement;
            return { el, docScrollTag };
        },

        backTop() {
            const { docScrollTag } = this.getScrollTag();
            animate(docScrollTag, { scrollTop: 0 });
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
        top: -60px;
    }
    .back-to-top {
        cursor: pointer;
        position: fixed;
        right: 50px;
        top: -900px;
        z-index: 2;
        width: 70px;
        height: 900px;
        background: url('~@theme/images/scroll.png');
        transition: all 0.5s ease-in-out;
        opacity: 1;
    }
    .canBackTop {
        top: -11px;
    }
}
</style>
