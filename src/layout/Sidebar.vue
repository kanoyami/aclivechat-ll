<!--
 * @Date: 2021-01-23 23:16:18
 * @LastEditors: kanoyami
 * @LastEditTime: 2021-01-23 23:21:50
-->
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu router :default-active="$route.path">
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>{{ $t("sidebar.home") }}
      </el-menu-item>
      <el-menu-item :index="$router.resolve({ name: 'lottoConfig' }).href">
        <i class="el-icon-goods"></i>弹幕抽奖姬
      </el-menu-item>
      <el-menu-item :index="$router.resolve({ name: 'stylegen' }).href">
        <i class="el-icon-brush"></i>{{ $t("sidebar.stylegen") }}
      </el-menu-item>
      <a href="/helper" target="_blank">
        <el-menu-item>
          <i class="el-icon-question"></i>{{ $t("sidebar.help") }}
        </el-menu-item>
      </a>
      <a href="https://github.com/kanoyami/aclivechat-node" target="_blank">
        <el-menu-item>
          <i class="el-icon-share"></i>{{ $t("sidebar.projectAddress") }}
        </el-menu-item>
      </a>
      <el-submenu index="null">
        <template slot="title">
          <i class="el-icon-chat-line-square"></i>Language
        </template>
        <el-menu-item
          v-for="{ locale, name } in [
            { locale: 'zh', name: '中文' },
            { locale: 'en', name: 'English' },
          ]"
          :key="locale"
          @click="onSelectLanguage(locale)"
          >{{ name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    onSelectLanguage(locale) {
      window.localStorage.lang = this.$i18n.locale = locale;
    }
  },
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
