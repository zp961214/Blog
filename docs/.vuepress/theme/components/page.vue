<template>
  <div>
    <Home v-if="$route.path==='/'"></Home>
    <Post v-if="isPost"></Post>
    <Content v-else />
  </div>
</template>
<script>
import Home from "./Home.vue";
import Post from "./Post.vue";
export default {
  components: { Home, Post },
  data() {
    return {};
  },
  computed: {
    isPost() {
      return this.$route.path === "/post/";
    },
    componentId() {
      return this.nav.filter(v => v.link === this.nowPath)[0].title;
    },
    nav() {
      return this.$site.themeConfig.nav;
    },
    nowPath() {
      return this.$page.path;
    }
  },
  created() {
    console.log(1);
  }
};
</script>
<style lang="scss" scoped>
</style>

