<template>
    <div>
        <div :class="['mobile-menu', { on: Istop }]">
            <span @click.stop="value = true" class="menu-button"></span>
            <span class="title">Hi,Valor</span>
        </div>
        <div :class="['side-bar', { open: value }]" @click.stop>
            <div class="link-container"><a target="_blank" href="https://github.com/zp961214" type="_blank" class="repo-link">Github</a></div>

            <img src="~@theme/images/head.jpg" alt="" />
            <ul>
                <li :key="item.text" :class="{ active: active(item) }" @click="RouterTo(item)" v-for="item in nav">{{ item.text }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'mobile-menu',
    data() {
        return {
            scrollTop: null,
            value: false
        };
    },

    computed: {
        nav() {
            return this.$site.themeConfig.nav.filter(v => v.hide === undefined);
        },

        Istop() {
            return this.scrollTop > 50;
        }
    },

    methods: {
        active(item) {
            const { link } = item;
            return this.$route.path === link;
        },

        RouterTo(item) {
            this.$router.push({ path: item.link });
            this.value = false;
        },

        setScrollTop() {
            this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        },

        init() {
            document.addEventListener('click', e => {
                console.log(e);
                this.value = false;
            });
        }
    },

    mounted() {
        window.addEventListener('scroll', this.setScrollTop);
        this.init();
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.setScrollTop);
    },
    watch: {
        value(val) {
            if (val) this.init();
        }
    }
};
</script>
<style lang="scss" scoped>
.mobile-menu {
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 46px;
    z-index: 10;
    display: none;
    .menu-button {
        width: 36px;
        height: 36px;
        position: absolute;
        z-index: 12;
        top: 50%;
        margin-top: -18px;
        left: 10px;
        background: url('../../assets/img/menu.png') center center no-repeat;
        background-size: 24px;
        margin-left: 0;
    }
    span {
        float: left;
        font-size: 1.2rem;
        font-weight: 600;
        margin-left: 60px;
        line-height: 46px;
    }
}
.side-bar {
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 16;
    width: 240px;
    background-color: #f9f9f9;
    height: calc(100% - 46px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
    transform: translate(-280px, 0);
    .link-container {
        padding-bottom: 10px;
        box-sizing: border-box;
        a {
            box-sizing: border-box;
            padding: 0.5rem 0 0.5rem 1.5rem;
        }
    }
    img {
        display: block;
        width: 100px;
        margin: 0 auto;
        border-radius: 50%;
    }
    ul {
        text-align: center;
        padding: 0;
        li {
            margin: 6px 0;
        }
        .active {
            color: #3eaf7c;
        }
    }
}
.open {
    transform: translate(0, 0);
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: 900px) {
    .mobile-menu {
        display: block;
    }
}
</style>
