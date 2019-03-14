<template>
    <header class="nav-menu">
        <div class="blur-mask"></div>
        <div class="nav-mask"></div>
        <div class="site-desc">
            <a class="logo"></a>
            <span class="author-name">Valor Eyo</span>
        </div>
        <ul>
            <SearchBox />
            <li :key="item.text" @click="RouterTo(item)" v-for="item in nav">{{ item.text }}</li>
        </ul>
    </header>
</template>
<script>
import SearchBox from '@SearchBox';
export default {
    components: { SearchBox },
    computed: {
        nav() {
            return this.$site.themeConfig.nav.filter(v => v.hide === undefined);
        },

        pagePath() {
            return this.$page.path;
        }
    },
    methods: {
        active(item) {
            return this.pagePath === item.link;
        },

        RouterTo(item) {
            this.$router.push({ path: item.link });
        }
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.nav-menu {
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;

    color: #222;
    box-sizing: border-box;
    line-height: 40px;
    transition: all 1s;
    z-index: 6;
    .blur-mask {
        background: url('../images/bg_mask.jpg');
        background-position: 50% 50%;
        background-repeat: no-repeat;
        // background: rgba(255, 255, 255, 0.4);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        filter: blur(20px);
        z-index: -1;
    }
    .nav-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: hsla(0, 0%, 100%, 0.4);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    .site-desc {
        display: flex;
        position: absolute;
        top: 0;
        left: 40px;
        margin-top: 0;
        .logo {
            float: left;
            align-self: center;
            width: 23px;
            height: 23px;
            background: url('../../public/logo.png') center center no-repeat;
            background-size: 23px;
            margin-right: 16px;
            margin-bottom: 3px;
        }
        .author-name {
            font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
            color: #2c3e50;
            font-size: 18px;
        }
    }
    ul {
        float: right;
        display: flex;
        height: 100%;
        justify-content: flex-end;
        margin: 0;
        margin-right: 15px;
        box-sizing: border-box;
        background: hsla(0, 0%, 100%, 0);
        li {
            padding: 0 7px;
            font-size: 14px;
            line-height: 40px;
            z-index: 2;
            color: #222;

            &:hover {
                cursor: pointer;
                background: rgba(255, 255, 255, 0.3);
            }
        }
        // .active {
        //     border-bottom: 2px solid #46bd87;
        //     margin-bottom: -2px;
        // }
    }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: 900px) {
    .nav-menu {
        display: none;
    }
}
</style>
<style lang="scss">
.nav-menu {
    .search-box {
        display: flex;
        align-self: center;
        input {
            height: 1.5rem;
            line-height: 1.5rem;
            background-position: 0.6rem 0.4rem;
            background-size: 0.85rem;
        }
    }
}
</style>
