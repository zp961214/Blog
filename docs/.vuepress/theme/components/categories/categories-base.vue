<template>
    <div class="categories-base">
        <h3 class="title">分类</h3>
        <div class="body">
            <div class="categories-count">
                目前共计 5 个分类
            </div>
            <ul v-for="(value, key) in classifyObj" :key="key">
                <li>
                    <span @click="routerGo(key)">{{ key | initialUpperCase }}</span>
                    <span>({{ value }})</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import classify from '@theme/mixins/classify';
export default {
    name: 'categories-base',

    mixins: [classify],

    components: {},

    filters: {
        initialUpperCase(value) {
            return value.slice(0, 1).toLocaleUpperCase() + value.slice(1);
        }
    },
    data() {
        return {};
    },
    methods: {
        routerGo(key) {
            this.$router.push({ query: { type: key } });
        }
    },
    created() {}
};
</script>
<style lang="scss" scoped>
.categories-base {
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
</style>
