<template>
    <app-container>
        <categories-desc v-if="isDesc" />
        <categories-base v-else />
    </app-container>
</template>

<script>
import classify from '@theme/mixins/classify';
import appContainer from '@theme/components/app-container';
import categoriesBase from '@theme/components/categories/categories-base';
import categoriesDesc from '@theme/components/categories/categories-desc';

export default {
    name: 'categories',
    mixins: [classify],
    components: {
        categoriesBase,
        categoriesDesc,
        appContainer
    },

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

    mounted() {},

    methods: {},

    watch: {
        isDesc() {
            this.scrollToView('categories', '.');
        }
    }
};
</script>
<style lang="scss" scoped>
// .categories {
//     position: relative;
//     margin: 0 auto;
//     display: flex;
//     justify-content: center;
//     padding: 0 35px;
//     .container-categories {
//         background: #fff;
//         flex: 1;
//         padding: 40px;
//         max-width: 800px;
//         box-sizing: border-box;
//         border-radius: 5px;
//         background: #fff;
//         color: #555;
//     }
//     nav {
//         margin: 0 0 0 25px;
//         .site-bar {
//             position: static;
//             left: unset;
//             top: unset;
//             transform: none;
//         }
//     }
// }
</style>
