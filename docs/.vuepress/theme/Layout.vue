<template>
  <div
    class="theme-container"
  >
    <nav-menu ></nav-menu>
    <div class="page-main">
      <page></page>
    </div>
  </div>
</template>
<script>
import Page from "./components/page.vue";
import NavMenu from "./components/nav-menu.vue";
import cursor from "./images/cursor.png";
export default {
  name:'Layout',
  components: {
    Page,
    NavMenu
  },
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
.theme-container {
  background-image: radial-gradient(
    ellipse farthest-corner at 50% 0,
    #6df297 0%,
    #9cffb8 100%
  );

  height: 100%;
}
</style>
<style lang="scss">
@import "./styles/base.scss";
@import "./styles/theme.scss";
</style>
