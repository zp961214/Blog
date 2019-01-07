<template>
  <div class="component-home">
    <aside class="aside">
      <div class="aside-header">
        <img
          src="../images/avatar.jpg"
          alt=""
        >
        <p class="description">让我试试</p>
        <ul>
          <li><i class="iconfont icon-tubiao214"></i><span>新浪微博</span></li>
          <li><i class="iconfont icon-zhihu"></i><span>知乎</span></li>
          <li><i class="iconfont icon-QQ"></i><span>QQ</span></li>
          <li><i class="iconfont icon-wo"></i><span>关于我</span></li>
          <li><i class="iconfont github"></i><span>Github</span></li>
        </ul>
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
@import "../../assets/icon/href/iconfont.css";
.aside {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: "PingFang SC", "Microsoft YaHei", Lato, sans-serif;
  width: 285px;
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
    p {
      font-size: 14px;
      font-weight: bolder;
    }
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-left: 0;
      > li {
        position: relative;
        width: 30px;
        height: 30px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        &:hover {
          span {
            opacity: 1;
            color: #fff;
          }
        }
        span {
          position: absolute;
          left: 50%;
          top: 0;
          margin-left:-15px; 
          background: rgba(40, 42, 44, 0.6);
          z-index: 10;
          font-size: 12px;
          word-break: keep-all;
          border-radius: 6px;
          padding: 2px 4px;
          box-sizing: border-box;
          opacity: 0;
          transition: all 0.18s ease-out 0.18s;
          text-shadow: none;
        }

        > i {
        }
      }
    }
  }
  .description {
    text-align: center;
  }
}
</style>







