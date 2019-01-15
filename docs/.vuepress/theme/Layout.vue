<template>
  <div class="theme-container">
    <nav-menu></nav-menu>
    <mobileMenu></mobileMenu>
    <banner-section></banner-section>
    <div class="page-main">
      <page></page>
    </div>
  </div>
</template> 
<script>
import Page from './views/page.vue';
import NavMenu from './components/nav-menu.vue';
import mobileMenu from './components/mobile-menu';
import bannerSection from './components/banner-section';
import cursor from './images/cursor.png';
export default {
  name: 'Layout',
  components: {
    Page,
    NavMenu,
    mobileMenu,
    bannerSection
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.page-main {
  background: #efefef;
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
  .page-main {
    padding-top: 40px;
  }
}
</style>
<style lang="scss">
@import './styles/base.scss';
@import './styles/theme.scss';
</style>
