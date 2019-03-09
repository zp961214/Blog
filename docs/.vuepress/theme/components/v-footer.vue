<template>
    <div class="v-footer">
        <div class="contaienr">
            <p><span>© 2019 valor</span> | <a :href="ncSa" target="_blank">CC BY-NC-SA 4.0</a></p>
            <p>Powered by <a :href="Vuepress" target="_blank">VuePress</a>| Theme By valor</p>
            <p>Deployed on ubuntu server | Made with by valor</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-footer',
    data() {
        return {
            ncSa: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh',
            Vuepress: 'https://vuepress.vuejs.org/'
        };
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
.v-footer {
    width: 100%;
    padding-top: 20px;
    color: #99a2aa;
    font-size: 12px;
    background: #f6f9fa;
    text-align: center;
    .contaienr {
        margin: 0 auto;
    }
}
</style>
