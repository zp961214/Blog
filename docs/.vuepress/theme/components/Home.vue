<template>
  <div class="component-home">
    <aside class="aside">
      <div class="aside-header">
        <img
          src="../images/avatar.jpg"
          alt=""
        >
        <p>让我试试</p>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    front() {
      return this.$page.frontmatter;
    },

    nav() {
      return this.front.nav || [];
    }
  },
  methods: {
    handlerClick({ link = "" }) {
      if (/^http/.test(link)) {
        window.open(link);
      } else {
        this.$router.push(link);
      }
    }
  }
};
</script>

<style lang="scss">
.aside {
  position: fixed;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  font-family: "PingFang SC","Microsoft YaHei",Lato,sans-serif;
  width: 255px;
  background: white;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  color: #555;
  .aside-header {
    width: 100%;
    img {
      display: block;
      width: 100%;
    }
    p{
      font-size:14px;
      font-weight: bolder;
    }
  }
}
</style>







