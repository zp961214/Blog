<template>
    <div class="post">
        <div class="container">
            <div class="wrapper-container">
                <div class="post-container">
                    <post-item :content="content" :key="content.key" class="post-item" v-for="content in currentItems" />
                </div>
                <div class="site-info">
                    <aside-info :class="['post-aside', { affix }]" />
                </div>
            </div>
        </div>
        <div class="Pagetion">
            <pagination :current-page="currNum" :page-size="pageSize" :total="total" @current-change="currentChange" layout="prev, pager, next" />
        </div>
    </div>
</template>

<script>
import postItem from '@theme/components/post-item';
import asideInfo from '@theme/components/aside-info';
import pagination from '@theme/components/pagination';
import animate from '@assets/js/animate.js';
export default {
    name: 'Home',
    components: { postItem, asideInfo, pagination },
    data() {
        return {
            currNum: 1,
            pageSize: 5,
            affix: false
        };
    },

    computed: {
        items() {
            const is_post = new RegExp(`^/post/(.*)/.*.html$`);
            const post = this.$site.pages.filter(v => is_post.test(v.path)).sort((a, b) => b.lastUpdated - a.lastUpdated);
            return post.map(v => ((v.classify = v.path.replace(is_post, '$1')), v));
        },

        total() {
            return this.items.length || 0;
        },

        currentItems() {
            const { items, currNum, pageSize } = this;
            const start = (currNum - 1) * pageSize;
            return items.slice(start, start + pageSize);
        }
    },

    methods: {
        handlerClick(link) {
            this.$router.push(link);
        },

        currentChange(e) {
            this.scrollToView('page-main', '.');
            setTimeout(() => (this.currNum = e), 500);
        },

        getScrollTag(id, Selector = '#') {
            const el = document.querySelector(Selector + id);
            const docScrollTag = document.body.scrollTop ? document.body : document.documentElement;
            return { el, docScrollTag };
        },

        scrollToView(id, Selector, offset = 0) {
            const { el, docScrollTag } = this.getScrollTag(id, Selector);
            animate(docScrollTag, { scrollTop: el.offsetTop - offset });
        },

        scrollHandle() {
            const { el, docScrollTag } = this.getScrollTag('post', '.');
            const { scrollTop } = docScrollTag;
            this.affix = scrollTop > el.offsetTop - 20;
        }
    },

    mounted() {
        this.scrollToView('post', '.', 30);
        window.addEventListener('scroll', this.scrollHandle);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandle);
    }
};
</script>

<style lang="scss" scoped>
$asideWidth: 285px;
.post {
    box-sizing: border-box;
    .container {
        width: 1100px;
        margin: 0 auto;
        &::after {
            content: '';
            display: block;
            clear: both;
        }
        .wrapper-container {
            .post-container {
                float: left;
                max-width: 800px;
                padding: 0 35px;
                box-sizing: border-box;
                width: calc(100% - #{$asideWidth});
            }
            .site-info {
                float: left;
                width: $asideWidth;
                .post-aside {
                    position: static;
                    left: unset;
                    top: 0;
                    right: 0;
                    height: max-content;
                    box-sizing: border-box;
                    transform: translate(0, 0);
                }
                .affix {
                    position: fixed;
                    top: 20px;
                    right: unset;
                    left: unset;
                }
            }
        }
    }
}
@media screen and (max-width: 1116px) {
    .post {
        box-sizing: border-box;
        .container {
            width: auto;
            margin: 0 auto;
            .wrapper-container {
                .post-container {
                    padding: 0;
                    width: 100%;
                    .post-item {
                        padding: 40px 20px;
                    }
                }
            }
        }
        .site-info {
            display: none;
        }
    }
}
@media screen and (max-width: 1116px) and (min-width: 800px) {
    .post {
        box-sizing: border-box;
        .container {
            width: 800px;
            margin: 0 auto;
        }
    }
}
</style>
<style lang="scss">
.Pagetion {
    display: flex;
    justify-content: center;
}
</style>
