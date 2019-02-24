<template>
    <div class="component-home">
        <aside-info />
    </div>
</template>

<script>
import asideInfo from '@theme/components/aside-info.vue';
export default {
    name: 'archives',
    components: { asideInfo }
};
</script>

<style lang="scss" scoped>
.component-home {
    width: 100%;
    height: 100%;
}
</style>
