<template>
  <div class="component-home">
    <aside-info></aside-info>
  </div>
</template>

<script>
import asideInfo from '../components/aside-info.vue';
export default {
  name: "Home",
  components:{asideInfo}
};
</script>

<style lang="scss" scoped>
.component-home{
  width: 100%;
  height: 100%;
}
</style>







