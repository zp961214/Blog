<template>
    <div class="categories-desc">
        <div class="container">
            <div class="main">
                <div class="title">
                    <h2>{{ type | initialUpperCase }}</h2>
                    <span>分类</span>
                </div>
                <ul>
                    <li v-for="item in items" :key="item.key" @click="$router.push({ path: item.path })">
                        <span>{{ date(item) | format('YYYY-MM-DD') }}</span> <span>{{ item.title }} </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns';
export default {
    name: 'categories-desc',
    data() {
        return {};
    },

    filters: {
        initialUpperCase(value) {
            return value.slice(0, 1).toLocaleUpperCase() + value.slice(1);
        },

        format(value, type) {
            return format(value, type);
        }
    },

    computed: {
        items() {
            const date = this.date;
            const is_post = new RegExp(`^/post/(.*)/.*`);
            const post = this.$site.pages.filter(v => is_post.test(v.path)).sort((a, b) => date(b) - date(a));
            return post.map(v => ((v.classify = v.path.replace(is_post, '$1')), v));
        },

        type() {
            return this.$route.query.type;
        }
    },
    methods: {
        date(ele) {
            return ele.lastUpdated ? ele.lastUpdated : ele.frontmatter.date;
        }
    }
};
</script>
<style lang="scss" scoped>
$margin: 25px;
.categories-desc {
    .container {
        display: flex;
        position: relative;
        &::after {
            content: ' ';
            position: absolute;
            top: 12px;
            left: 0;
            margin-left: -2px;
            width: 4px;
            height: calc(100% - 12px);
            background: #f5f5f5;
            z-index: 2;
        }
        .main {
            margin-left: $margin;
            .title {
                position: relative;
                display: flex;
                align-items: center;
                &::before {
                    content: '';
                    position: absolute;
                    left: -$margin;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #bbb;
                    z-index: 10;
                }
                span {
                    color: #bbb;
                    font-size: 16px;
                    font-weight: 600;
                    margin-left: 5px;
                }
            }
            ul {
                padding: 0;
                li {
                    position: relative;
                    cursor: pointer;
                    margin-bottom: 15px;
                    span {
                        &:first-child {
                            font-size: 12px;
                            color: skyblue;
                        }
                    }
                    &::before {
                        content: '';
                        position: absolute;
                        left: -$margin;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        background: #bbb;
                        z-index: 10;
                    }
                }
            }
        }
    }
}
</style>
