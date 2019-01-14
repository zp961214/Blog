<template>
  <header class="nav-menu">
    <div class="site-desc">
      <a class="logo" /></a>
      <span class="author-name">Valor Eyo</span>
    </div>

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
      this.$router.push({ path: item.link });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.nav-menu {
    background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 8px #f0f1f2;
  color: #000;
  padding: 10px 2%;
  box-sizing: border-box;
  .site-desc {
    position: absolute;
    top: 50%;
    left: 40px;
    margin-top: -15px;
    .logo {
      float: left;
      width: 30px;
      height: 30px;
      background: url("../../public/logo.png") center center no-repeat;
      background-size: 30px;
      margin-right: 16px;
    }
    .author-name {
      font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
      color:#2c3e50;
      line-height: 30px;
      font-size: 18px;
    }
  }
  ul {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 10px 0;
    box-sizing: border-box;
    li {
      margin-right: 1.5rem;
      font-size: 14px;
      line-height: 14px;
      padding-bottom: 3px;
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
<style lang="scss" scoped>
@media screen and (max-width: 900px) {
  .nav-menu{ 
    display: none;
  }
}
</style>

