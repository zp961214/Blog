<template>
  <header class="nav-menu">
    <ul>
      <li
        :class="{active:active(item)}"
        v-for="item in nav"
        :key="item.text"
        @click="RouterTo(item)"
      >{{item.text}}</li>
    </ul>
  </header>
</template>
<script>
export default {
  computed: {
    nav() {
      return this.$site.themeConfig.nav;
    },
    pagePath() {
      return this.$page.path;
    }
  },
  methods: {
    active(item) {
      return this.pagePath === item.link;
    },
    RouterTo(item) {
      this.$router.push({path:item.link});
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.nav-menu {
  width: auto;
  background: #fff;
  border-bottom: 1px solid #ccc;
  padding: 0 2%;
  ul {
    display: flex;
    justify-content: flex-end;
    li {
      margin-right: 1.5rem;
      font-size: 14.4px;
      &:hover {
        border-bottom: 2px solid #46bd87;
        margin-bottom: -2px;
      }
    }
    .active {
      border-bottom: 2px solid #46bd87;
      margin-bottom: -2px;
    }
  }
}
</style>

