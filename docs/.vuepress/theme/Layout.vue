<template>
  <div class="theme-container">
    <nav-menu></nav-menu>
    <mobileMenu></mobileMenu>
    <div class="page-main">
      <page></page>
    </div>
  </div>
</template>
<script>
import Page from "./components/page.vue";
import NavMenu from "./components/nav-menu.vue";
import mobileMenu from "./components/mobile-menu";
import cursor from "./images/cursor.png";
export default { 
  name: "Layout",
  components: {
    Page,
    NavMenu,
    mobileMenu
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.page-main {
  background: #EFEFEF;
  box-sizing: border-box;
  padding-top: 60px;
  .theme-container {
    // background-image: radial-gradient(
    //   ellipse farthest-corner at 50% 0,
    //   #6df297 0%,
    //   #9cffb8 100%
    // );
    height: 100%;
  }
}
@media screen and (max-width: 900px) {
    .page-main{
      padding-top: 40px;
    }
}
</style>
<style lang="scss">
@import "./styles/base.scss";
@import "./styles/theme.scss";
</style>
