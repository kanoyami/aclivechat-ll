<!--
 * @Date: 2021-01-23 23:16:18
 * @LastEditors: kanoyami
 * @LastEditTime: 2021-02-17 22:31:31
-->
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu router :default-active="$route.path">
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>{{ $t("sidebar.home") }}
      </el-menu-item>
      <el-menu-item :index="$router.resolve({ name: 'stylegen' }).href">
        <i class="el-icon-brush"></i>{{ $t("sidebar.stylegen") }}
      </el-menu-item>
            <el-submenu index="nul1">
        <template slot="title">
          <i class="el-icon-s-tools"></i>工具集
        </template>
      <el-menu-item :index="$router.resolve({ name: 'lottoConfig' }).href">
        <i class="el-icon-goods"></i>弹幕抽奖姬
      </el-menu-item>
      <el-menu-item :index="$router.resolve({ name: 'songOrderConfig' }).href">
        <i class="el-icon-headset"></i>点歌姬
      </el-menu-item>
      </el-submenu>

      <el-submenu index="nul2">
        <template slot="title">
          <i class="el-icon-chat-line-square"></i>礼物统计
        </template>
        <el-menu-item
          v-for="{ pathName, name } in [
            { pathName: 'daliyTotal', name: '时间统计柱状图' },
            { pathName: 'totalLine', name: '多日趋势折线图' },
            { pathName: 'giftTotal', name: '礼物详细' },
          ]"
          :key="pathName"
          :index="$router.resolve({ name: pathName}).href"
          >{{ name }}</el-menu-item
        >
      </el-submenu>
      <a href="https://www.acfun.cn/a/ac21341940" target="_blank">
        <el-menu-item>
          <i class="el-icon-question"></i>{{ $t("sidebar.help") }}
        </el-menu-item>
      </a>
      <a href="https://github.com/kanoyami/aclivechat-node" target="_blank">
        <el-menu-item>
          <i class="el-icon-share"></i>{{ $t("sidebar.projectAddress") }}
        </el-menu-item>
      </a>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style>
.el-scrollbar {
  height: 100%;
}

.scrollbar-wrapper {
  background: white;
  overflow-x: hidden !important;
}

.scrollbar-wrapper .el-menu {
  border: none;
}
</style>
