<template>
    <div class="post">
        <div class="container">
            <div class="post-container">
                <post-item :content="content" :key="index" class="post-item" v-for="(content,index) in currentItems"/>
            </div>
            <aside-info class="post-aside"></aside-info>
        </div>
        <div class="Pagetion">
            <el-pagination
                :current-page="currNum"
                :page-size="pageSize"
                :total="total"
                @current-change="currNum = arguments[0]"
                layout="prev, pager, next"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import postItem from '../components/post-item';
import asideInfo from '../components/aside-info';
export default {
    name: 'post',
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

    methods: {
        handlerClick(link) {
            this.$router.push(link);
        }
    },

    mounted() {}
};
</script>

<style lang="scss">
.post {
    box-sizing: border-box;
    .container{
      display: flex;
      .post-container{

      }
      .post-aside{
        position: unset;
        height: 350px;
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

