<template>
    <app-container>
        <div class="container-categories">
            <div class="main">
                <div class="title">
                    <h2></h2>
                    <span>分类</span>
                </div>
                <div class="container-list">
                    <ul v-for="(item, year) in items" :key="year">
                        <h2 class="year">{{ year }}</h2>
                        <li v-for="data in item" :key="data.key" @click="$router.push({ path: data.path })">
                            <span>{{ date(data) | format('MM-DD') }}</span> <span>{{ data.title }} </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </app-container>
</template>

<script>
import { format } from 'date-fns';
import appContainer from '@theme/components/app-container';

export default {
    name: 'archives',

    components: { appContainer },

    filters: {
        format(value, type) {
            return format(value, type);
        }
    },

    computed: {
        items() {
            const date = this.date;
            const is_post = new RegExp(`^/post/(.*)/.*`);
            const post = this.$site.pages.filter(v => is_post.test(v.path)).sort((a, b) => date(b) - date(a));
            return post.reduce((prev, current) => {
                const year = format(date(current), 'YYYY');
                if (!prev[year]) prev[year] = [];
                prev[year].push(current);
                return prev;
            }, {});
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
.container-categories {
    display: flex;
    position: relative;
    background: #fff;
    flex: 1;
    padding: 40px;
    max-width: 800px;
    box-sizing: border-box;
    border-radius: 5px;
    background: #fff;
    color: #555;
    .main {
        position: relative;
        margin-left: 60px;
        &::after {
            content: ' ';
            position: absolute;
            top: 12px;
            left: -15px;
            margin-left: -2px;
            width: 4px;
            height: calc(100% - 12px);
            background: #f5f5f5;
            z-index: 2;
        }
        .title {
            position: relative;
            display: flex;
            align-items: center;
            &::before {
                content: '';
                position: absolute;
                left: -$margin + 10px;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #bbb;
                z-index: 10;
            }
            span {
                color: #bbb;
                font-size: 14px;
                font-weight: 600;
                margin-left: 5px;
            }
        }
        .container-list {
            padding: 0;
            .year {
                position: relative;
                font-size: 20px;
                line-height: 20px;
                margin: 35px 0;
                &::before {
                    content: '';
                    position: absolute;
                    left: -$margin + 10px;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #bbb;
                    z-index: 10;
                }
            }
            ul {
                padding: 0;
                li {
                    position: relative;
                    cursor: pointer;
                    margin: 25px 0;
                    span {
                        font-size: 16px;
                        line-height: 16px;
                        &:first-child {
                            margin-right: 10px;
                            font-size: 14px;
                            line-height: 12px;
                            color: #00a7e0;
                        }
                    }
                    &::before {
                        @extend .year::before;
                        width: 6px;
                        height: 6px;
                    }
                }
            }
        }
    }
}
</style>
