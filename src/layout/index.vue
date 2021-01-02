<template>
  <el-container class="app-wrapper" :class="{ mobile: isMobile }">
    <div
      v-show="isMobile && !hideSidebar"
      class="drawer-bg"
      @click="hideSidebar = true"
    ></div>
    <el-aside
      width="230px"
      class="sidebar-container"
      :class="{ 'hide-sidebar': hideSidebar }"
    >
      <div class="logo-container">
        <router-link to="/">
          <img src="/static/img/logo.png" class="sidebar-logo" />
          <p class="sidebar-title">ACFUN直播弹幕</p>
        </router-link>
      </div>
      <div class="version">ll-version {{ VERSION }}</div>
      <sidebar></sidebar>
    </el-aside>
    <el-main>
      <el-button
        v-show="isMobile"
        class="menu-button"
        icon="el-icon-s-unfold"
        @click="hideSidebar = false"
      ></el-button>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-main>
  </el-container>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import * as chatConfig from "@/api/chatConfig";

export default {
  name: "Layout",
  components: {
    Sidebar,
  },
  data() {
    return {
      VERSION: chatConfig.VERSION,
      isMobile: false,
      hideSidebar: true,
    };
  },
  async created() {
    window.addEventListener("resize", this.onResize);
    const host =
      process.env.NODE_ENV === "development"
        ? "localhost:3378"
        : window.location.host;
    const str = await fetch(`http://${host}/version`);
    const ver = await str.json();
    this.VERSION = ver.version;
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.isMobile = document.body.clientWidth <= 992;
    },
  },
};
</script>

<style>
html {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", "微软雅黑", Arial, sans-serif;
}

html,
body,
#app,
.app-wrapper,
.sidebar-container {
  height: 100%;
}

body {
  margin: 0;
}

a,
a:focus,
a:hover {
  text-decoration: none;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-container {
  overflow: hidden;
}

.app-wrapper.mobile .sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  transition-duration: 0.3s;
  z-index: 1001;
}

.app-wrapper.mobile .sidebar-container.hide-sidebar {
  pointer-events: none;
  transition-duration: 0.3s;
  transform: translate3d(-230px, 0, 0);
}

.sidebar-container .logo-container {
  padding-top:5px;
  width: 100%;
  background: #fd4c5b;
  text-align: center;
}

.sidebar-container .logo-container .sidebar-logo {
  height: 20px;
}

.sidebar-container .logo-container .sidebar-title {
  display: block;
  margin: 0;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
}

.sidebar-container .version {
  height: 30px;
  background: #fd4c5b;
  color: #fff;
  font-weight: 600;
  line-height: 30px;
  font-size: 12px;
  text-align: right;
}

.sidebar-container .is-horizontal {
  display: none;
}
</style>
