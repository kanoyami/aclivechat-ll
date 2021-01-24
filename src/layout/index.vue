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
      style="border-right:1px solid rgb(253,76,91)"
    >
      <div class="logo-container">
        <router-link to="/">
          <img src="/static/img/logo.png" class="sidebar-logo" />
          <p class="sidebar-title">ACFUN直播弹幕</p>
        </router-link>
      </div>
      <div class="version">ll-version {{ VERSION }}</div>
      <div v-show="hasNewVersion" class="version-new">
        <a href="http://livesongs.sdrsks.com.cn/ll-aclivechat-latest.zip">
          新版本{{ REMOTE_VERSION }}发布啦，点击下载</a
        >
      </div>
      <sidebar />
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
      REMOTE_VERSION: "",
      isMobile: false,
      hideSidebar: true,
      hasNewVersion: false,
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
    const remoteVersion = await fetch(
      `http://livesongs.sdrsks.com.cn:5818/version`
    );
    const remoteVer = await remoteVersion.json();
    this.VERSION = ver.version;
    this.REMOTE_VERSION = remoteVer.version;
    this.hasNewVersion = this.compareVersion(remoteVer.version, ver.version);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.isMobile = document.body.clientWidth <= 992;
    },
    compareVersion(version1, version2) {
      var arr1 = version1.split(".");
      var arr2 = version2.split(".");
      var maxLen = arr1.length > arr2.length ? arr1.length : arr2.length;
      for (let i = 0; i < maxLen; i++) {
        var p1 = arr1[i] >> 0 || 0;
        var p2 = arr2[i] >> 0 || 0;
        if (p1 > p2) {
          return true;
        } else if (p1 < p2) {
          return false;
        }
      }
      return 0;
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
  padding-top: 5px;
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

.sidebar-container .version-new {
  height: 30px;
  background: #000;
  color: #fff;
  font-weight: 600;
  line-height: 30px;
  font-size: 12px;
  text-align: center;
}

.sidebar-container .version-new a:link {
  color: #fff;
}

.sidebar-container .is-horizontal {
  display: none;
}
</style>
