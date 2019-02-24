<template>
    <div class="categories">
        <div class="container-categories">
            <h3 class="title">分类</h3>
            <div class="body">
                <div class="categories-count">
                    目前共计 5 个分类
                </div>
                <ul>
                    <li></li>
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
export default {
    name: 'categories',
    components: {
        asideInfo
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
    width: 1100px;
    display: flex;
    justify-content: space-between;
    .container-categories {
        background: #fff;
        flex: 1;
        padding: 40px;
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
