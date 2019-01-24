<template>
    <div>
        <div :class="['mobile-menu', { on: Istop }]">
            <a @click="value = true" class="menu-button"></a>
        </div>
        <div :class="['side-bar', { open: value }]">123123</div>
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
        Istop() {
            return this.scrollTop > 50;
        }
    },

    methods: {
        setScrollTop() {
            this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        },

        init() {
            let el = document.querySelector('.side-bar');
            this.bind(el, Handler => {
                document.removeEventListener('click', Handler);
                this.value = false;
            });
        },

        bind(el, cb) {
            var documentHandler = e => (el.contains(e.target) ? '' : cb(documentHandler));
            document.addEventListener('click', documentHandler);
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
    height: 40px;
    z-index: 6;
    display: none;
    .menu-button {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 50%;
        margin-top: -12px;
        left: 10px;
        background: url('../../assets/img/menu.png') center center no-repeat;
        background-size: 24px;
    }
}
.side-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 240px;
    background-color: #f9f9f9;
    height: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
    transform: translate(-280px, 0);
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
