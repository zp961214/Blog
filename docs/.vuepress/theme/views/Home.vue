<template>
  <div class="component-home">
    <side-bar></side-bar>
  </div>
</template>

<script>
import sideBar from '../components/side-bar';
export default {
  name: "Home",
  components:{sideBar}
};
</script>

<style lang="scss" scoped>
.component-home{
  width: 100%;
  height: 100%;
}
</style>







