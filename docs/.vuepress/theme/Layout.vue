<template>
  <div
    class="theme-container"
    
  >
    <nav-menu></nav-menu>
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
  components: {
    Page,
    NavMenu
  },
  data() {
    return {
      // cursor
    };
  },
  mounted() {
    console.log(this.$site, "site");
    console.log(this.$page, "page");
  }
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
