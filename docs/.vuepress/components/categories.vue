<template>
    <div class="categories">
        <div class="container-categories">
            <categories-desc v-if="isDesc" />
            <categories-base v-else />
        </div>

        <nav>
            <aside-info class="site-bar" />
        </nav>
    </div>
</template>

<script>
import asideInfo from '@theme/components/aside-info';
import categoriesBase from '@theme/components/categories/categories-base';
import categoriesDesc from '@theme/components/categories/categories-desc';
import classify from '@theme/mixins/classify';
import animate from '@assets/js/animate.js';

export default {
    name: 'categories',
    mixins: [classify],
    components: {
        asideInfo,
        categoriesBase,
        categoriesDesc
    },

    filters: {},
    data() {
        return {};
    },
    computed: {
        isDesc() {
            const { type } = this.$route.query;
            const classify_keys = Object.keys(this.classifyObj);
            return classify_keys.some(v => v === type);
        }
    },
    mounted() {
        this.scrollToView('categories', '.');
    },
    methods: {
        getScrollTag(id, Selector = '#') {
            const el = document.querySelector(Selector + id);
            const docScrollTag = document.body.scrollTop ? document.body : document.documentElement;
            return { el, docScrollTag };
        },

        scrollToView(id, Selector, offset = 0) {
            const { el, docScrollTag } = this.getScrollTag(id, Selector);
            console.log(el.offsetTop);
            animate(docScrollTag, { scrollTop: el.offsetTop - offset });
        }
    },
    watch: {
        isDesc() {
            this.scrollToView('categories', '.');
        }
    }
};
</script>
<style lang="scss" scoped>
.categories {
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 0 35px;
    .container-categories {
        background: #fff;
        flex: 1;
        padding: 40px;
        max-width: 800px;
        box-sizing: border-box;
        border-radius: 5px;
        background: #fff;
        color: #555;
    }
    nav {
        margin: 0 0 0 25px;
        .site-bar {
            position: static;
            left: unset;
            top: unset;
            transform: none;
        }
    }
}
</style>
