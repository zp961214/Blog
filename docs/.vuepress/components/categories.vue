<template>
    <div class="categories">
        <div class="container-categories">
            <h3 class="title">分类</h3>
            <div class="body">
                <div class="categories-count">
                    目前共计 5 个分类
                </div>
                <ul v-for="(value, key) in classifyObj" :key="key">
                    <li>
                        <span>{{ key | initialUpperCase }}</span>
                        <span>({{ value }})</span>
                    </li>
                </ul>
            </div>
        </div>
        <nav>
            <aside-info class="site-bar" />
        </nav>
    </div>
</template>

<script>
import asideInfo from '@theme/components/aside-info';
import classify from '@theme/mixins/classify';

export default {
    name: 'categories',

    mixins: [classify],

    components: {
        asideInfo
    },

    filters: {
        initialUpperCase(value) {
            return value.slice(0, 1).toLocaleUpperCase() + value.slice(1);
        }
    },
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
.categories {
    position: relative;
    margin: 0 auto;
    display: flex;
    padding: 0 35px;
    justify-content: space-between;
    .container-categories {
        background: #fff;
        flex: 1;
        padding: 40px;
        max-width: 800px;
        box-sizing: border-box;
        border-radius: 5px;
        background: #fff;
        color: #555;
        .title {
            color: #444;
            font-size: 25px;
            font-weight: 700;
            text-align: center;
            word-break: break-word;
            margin-bottom: 15px;
        }
        .body {
            .categories-count {
                text-align: center;
            }
            ul {
                li {
                    list-style: circle;
                    span {
                        &:first-child {
                            color: #ab3300;
                            &:hover {
                                color: #222;
                                cursor: pointer;
                            }
                        }
                        &:last-child {
                            color: #bbb;
                        }
                    }
                }
            }
        }
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
