<template>
    <div class="post">
        <div class="container">
            <div class="post-container">
                <post-item v-for="(content, index) in currentItems" :key="index" :content="content" class="post-item" />
            </div>
            <aside-info class="post-aside" />
        </div>
        <div class="Pagetion">
            <el-pagination :current-page="currNum" :page-size="pageSize" :total="total" layout="prev, pager, next" @current-change="currNum = arguments[0]" />
        </div>
    </div>
</template>

<script>
import postItem from '../components/post-item';
import asideInfo from '../components/aside-info';
export default {
    name: 'Post',
    components: { postItem, asideInfo },
    data() {
        return {
            currNum: 1,
            pageSize: 5
        };
    },

    computed: {
        path() {
            return this.$page.path;
        },
        items() {
            const is_post = new RegExp('^' + this.path + '.*(.html)$');
            return this.$site.pages.filter(v => is_post.test(v.path));
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

    mounted() {},

    methods: {
        handlerClick(link) {
            this.$router.push(link);
        }
    }
};
</script>

<style lang="scss">
.post {
    box-sizing: border-box;
    .container {
        position: relative;
        display: flex;
        justify-content: center;
        .post-container {
            max-width: 800px;
            padding: 0 35px;
        }
        .post-aside {
            position: static;
            left: unset;
            top: 0;
            right: 0;
            height: 350px;
            box-sizing: border-box;
            transform: translate(0, 0);
        }
    }
}
</style>
<style lang="scss" scoped>
.Pagetion {
    display: flex;
    justify-content: center;
}
</style>
