<template>
  <div class="theme-container">
    <nav-menu/>
    <mobileMenu/>
    <banner-section/>
    <page/> 
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
<style lang="scss" scoped></style>
<style lang="scss">
@import './styles/base.scss';
@import './styles/theme.scss';
</style>
