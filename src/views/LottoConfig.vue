<template>
  <el-form :model="form" ref="form" label-width="150px">
      <h3>输入房间号进入抽奖姬</h3>
    <el-form-item :label="$t('home.roomId')" required prop="roomId">
      <el-input v-model.number="form.roomId"  type="number" min="1"></el-input>
    </el-form-item>
    <el-button type="primary" :disabled="!roomUrl" @click="enterRoom">进入</el-button>
  </el-form>
</template>

<script>
import _ from "lodash";

import * as chatConfig from "@/api/chatConfig";

export default {
  name: "LottoConfig",
  data() {
    return {
      serverConfig: {
        enableTranslate: true,
      },
      form: {
        roomId: parseInt(window.localStorage.roomId || "1"),
        ...chatConfig.getLocalConfig(),
      },
    };
  },
  computed: {
    roomUrl() {
      if (this.form.roomId === "") {
        return "";
      }
      let resolved = this.$router.resolve({
        name: "lotto",
        params: { roomId: this.form.roomId },
      });
      return `${window.location.protocol}//${window.location.host}${resolved.href}`;
    },
  },
  watch: {
    roomUrl: _.debounce(function() {
      window.localStorage.roomId = this.form.roomId;
      chatConfig.setLocalConfig(this.form);
    }, 500),
  },
  methods: {
    enterRoom() {
      window.open(
        this.roomUrl,
        `lotto ${this.form.roomId}`,
        "menubar=0,location=0,scrollbars=0,toolbar=0,width=600,height=600"
      );
    },
  },
};
</script>
