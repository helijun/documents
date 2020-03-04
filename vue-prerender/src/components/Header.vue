<template>
  <div
    class="components-header"
    :style="{background: `rgba(45,62,80, ${headerRgba})`, opacity: `${headerOpacity}`}"
  >
    <header>
      <a class="bike-title" href="//www.helijun.com.cn">微人类</a>
      <el-menu :default-active="activeIndex" mode="horizontal">
        <!-- <el-menu-item index="1">
          <a href="//www.helijun.com.cn">首页</a>
        </el-menu-item>-->
        <el-menu-item index="2">
          <a href="//www.helijun.com.cn/wiki" target="_blank">wiki</a>
        </el-menu-item>
        <el-menu-item index="3">
          <a href="./blogs/index.html" target="_blank">博客</a>
        </el-menu-item>
        <el-menu-item index="4">
          <a href="./life/index.html" target="_blank">感悟</a>
        </el-menu-item>
        <el-menu-item index="5">
          <a href="http://www.xiami.com/collect/162245539" target="_blank">民谣</a>
        </el-menu-item>
        <el-menu-item index="6">
          <a href="./book/index.html" target="_blank">书单</a>
        </el-menu-item>
        <el-menu-item index="7">
          <a
            href="http://tieba.baidu.com/p/3279735352?pid=57042307869&cid=0#57042307869"
            target="_blank"
          >骑行</a>
        </el-menu-item>
        <el-submenu index="7">
          <template slot="title">其他</template>
          <el-menu-item index="7-2">
            <a href="./video/index.html" target="_blank">1. 电影&电视剧</a>
          </el-menu-item>
          <!-- <el-menu-item index="2-3">
                        <a href="https://github.com/helijun/react-learn" target="_blank">3. React学习</a>
          </el-menu-item>-->
          <el-menu-item index="7-4">
            <a href="https://www.cnblogs.com/liliangel/p/10191690.html" target="_blank">2. 最新文章</a>
          </el-menu-item>
          <el-menu-item index="7-5">
            <a href="./life/穷忙的2018.html" target="_blank">3. 穷忙的2018</a>
          </el-menu-item>
        </el-submenu>
      </el-menu>

      <div class="mobile-menu" @click="handleMobileMenuClick">
        <i class="iconfont icon-ego-caidan"></i>
      </div>
      <div class="mobile-menu-content" @click="handleMobileMenuClick" v-show="mobileMenuShow"></div>
      <div class="main" ref="mobileMenuMain">
        <a href="https://www.helijun.com.cn/wiki/#/README">2. 个人书单</a>
        <a href="https://www.helijun.com.cn/wiki/#/book/README">2. 个人书单</a>
        <a href="https://www.helijun.com.cn/wiki/#/video/README">3. 电影&电视剧</a>
        <!-- <a href="https://github.com/helijun/react-learn">3. React学习</a> -->
        <a href="https://www.cnblogs.com/liliangel/p/10598442.html">4. 最新文章</a>
        <a href="https://www.helijun.com.cn/wiki/#/life/2018/跌宕的2019">5. 跌宕的2019</a>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      activeIndex: "1",
      mobileMenuShow: false
    };
  },
  props: {
    headerRgba: {
      type: Number,
      default: 0
    },
    headerOpacity: {
      type: Number,
      default: 1
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleMobileMenuClick() {
      this.mobileMenuShow = !this.mobileMenuShow;
      setTimeout(() => {
        this.$refs.mobileMenuMain.style.transform =
          "translate3d(100%, 0px, 0px)";

        console.log("this.mobileMenuShow", this.mobileMenuShow);
        if (!this.mobileMenuShow) {
          this.$refs.mobileMenuMain.style.transform =
            "translate3d(500%, 0px, 0px)";
        }
      }, 10);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/index.scss";

.common-width {
  margin: 0 auto !important;
  width: 1200px !important;
}
.components-header {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 60px;
  color: #666;
  background-color: transparent;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media #{$media} and ($media-max-width: $max-width-768) {
    padding: 0 50px;
    }
}
header {
  @extend .components-header;
  @extend .common-width;

  .bike-title {
    margin-top: 10px;
    color: #f8f8f8;
    font-weight: 600;
    font-size: 20px;

    @media #{$media} and ($media-max-width: $max-width-768) {
      font-size: torem(26px);
      position: relative;
      left: -2.8%;
      margin-top: torem(-10px);
    }
  }
  a:focus {
    outline: thin dotted #fff;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
  a:hover {
    color: #fff;
  }
  .el-menu {
    @media #{$media} and ($media-max-width: $max-width-768) {
      display: none;
    }
  }
  .el-menu.el-menu--horizontal {
    border: 0;
  }

  .mobile-menu {
    display: none;

    @media #{$media} and ($media-max-width: $max-width-768) {
      display: inherit;
      width: 100px;
      position: absolute;
      left: 28%;
      top: 14px;
      color: white;
    }

    .icon-ego-caidan {
      font-size: 20px;
    }
  }

  .mobile-menu-content {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
  .main {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    height: 100%;
    width: 50%;
    padding: 40px 20px;
    z-index: 2;
    transition: all 0.5s;
    transform: translate3d(500%, 0px, 0px);

    a {
      display: block;
      text-align: left;
      color: #666;
      padding-top: 10px;
    }
  }

  ul {
  }
}
.el-menu {
  background-color: transparent;
}

.el-menu--horizontal {
  li {
    color: #fff;

    &:hover {
      color: #e4e7ed !important;
    }
  }
}
/deep/ .el-menu--horizontal > .el-submenu .el-submenu__title {
  color: #fff;
  border: 0;

  &:hover {
    color: #e4e7ed;
    background-color: transparent !important;
  }
}
.el-dropdown-menu__item--divided:before,
.el-menu,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: transparent !important;
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: #fff;
  border: 0;
}
.el-submenu__title {
  background-color: transparent !important;
  &:hover {
    background-color: transparent !important;
  }
}
.el-menu--popup {
  a {
    color: #666;
    &:hover {
      color: #999;
    }
  }
}
</style>
