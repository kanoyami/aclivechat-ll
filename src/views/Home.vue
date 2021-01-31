<!--
 * @Date: 2021-01-24 00:10:15
 * @LastEditors: kanoyami
 * @LastEditTime: 2021-01-31 21:30:07
-->
<template>
  <el-form
    :model="form"
    ref="form"
    label-width="150px"
    :rules="{
      roomId: [
        { required: true, message: $t('home.roomIdEmpty'), trigger: 'blur' },
        {
          type: 'integer',
          min: 1,
          message: $t('home.roomIdInteger'),
          trigger: 'blur',
        },
      ],
      followText: [
        {
          required: true,
          message: $t('home.textEmpty'),
          trigger: 'blur, change',
        },
      ],
      joinText: [
        {
          required: true,
          message: $t('home.textEmpty'),
          trigger: 'blur, change',
        },
      ],
      quitText: [
        {
          required: true,
          message: $t('home.textEmpty'),
          trigger: 'blur, change',
        },
      ],
      loveText: [
        {
          required: true,
          message: $t('home.textEmpty'),
          trigger: 'blur, change',
        },
      ],
    }"
  >
    <el-tabs>
      <el-tab-pane :label="$t('home.general')">
        <el-form-item :label="`联动模式`">
          <el-switch v-model="muti_room"></el-switch>
        </el-form-item>

        <div v-for="(item, i) in roomIDs" v-bind:key="i">
          <el-form-item :label="$t('home.roomId')" required prop="roomId">
            <el-input
              v-model.number="roomIDs[i]"
              type="number"
              min="1"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button :disabled="!muti_room" type="secondary" @click="addRoom"
            >增加房间</el-button
          >
          <el-button :disabled="!muti_room" type="danger" @click="rmRoom"
            >删除房间</el-button
          >
        </el-form-item>
        <el-form-item :label="`礼物统计`">
          <el-switch v-model="form.giftCount"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.showDanmaku')">
          <el-switch v-model="form.showDanmaku"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.showEqualMedal')">
          <el-switch v-model="form.showEqualMedal"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.showFollow')">
          <el-switch v-model="form.showFollow"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.followText')">
          <el-input
            v-model="form.followText"
            type="textarea"
            :rows="1"
            :placeholder="$t('home.followTextDefault')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('home.showJoin')">
          <el-switch v-model="form.showJoin"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.joinText')">
          <el-input
            v-model="form.joinText"
            type="textarea"
            :rows="1"
            :placeholder="$t('home.joinTextDefault')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('home.showQuit')">
          <el-switch v-model="form.showQuit"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.quitText')">
          <el-input
            v-model="form.quitText"
            type="textarea"
            :rows="1"
            :placeholder="$t('home.quitTextDefault')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('home.showLove')">
          <el-switch v-model="form.showLove"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.loveText')">
          <el-input
            v-model="form.loveText"
            type="textarea"
            :rows="1"
            :placeholder="$t('home.loveTextDefault')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('home.showJoinGroup')">
          <el-switch v-model="form.showJoinGroup"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.joinGroupText')">
          <el-input
            v-model="form.joinGroupText"
            type="textarea"
            :rows="1"
            :placeholder="$t('home.joinGroupTextDefault')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('home.showGift')">
          <el-switch v-model="form.showGift"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.showGiftPrice')">
          <el-switch v-model="form.showGiftPrice"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.showACCoinInstead')">
          <el-switch v-model="form.showACCoinInstead"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.showGiftPngInstead')">
          <el-switch v-model="form.showGiftPngInstead"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.mergeSimilarDanmaku')">
          <el-switch v-model="form.mergeSimilarDanmaku"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.mergeSimilarOther')">
          <el-switch v-model="form.mergeSimilarOther"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.mergeGift')">
          <el-switch v-model="form.mergeGift"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.minGiftPrice')">
          <el-input
            v-model.number="form.minGiftPrice"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('home.exchangeRate')">
          <el-input
            v-model.number="form.exchangeRate"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('home.maxNumber')">
          <el-input
            v-model.number="form.maxNumber"
            type="number"
            min="1"
          ></el-input>
        </el-form-item>
      </el-tab-pane>

      <el-tab-pane :label="`弹幕姬账号`">
        <span
          >用于登录弹幕姬的账号，推荐使用小号,可以设置多组账号，每次会随机使用一个</span
        >
        <el-form-item :label="`使用DD账号登录`">
          <el-switch v-model="login"></el-switch>
        </el-form-item>
        <div v-for="(item, i) in loginInfo" v-bind:key="i">
          <el-form-item :label="`用户名`">
            <el-input
              :disabled="!login"
              v-model="item.username"
              type="text"
              :placeholder="`acfun账户`"
            ></el-input>
          </el-form-item>
          <el-form-item :label="`密码`">
            <el-input
              :disabled="!login"
              v-model="item.password"
              type="password"
              :placeholder="`密码`"
            ></el-input>
          </el-form-item>
        </div>
        <el-button :disabled="!login" type="secondary" @click="addAccount"
          >增加账号</el-button
        >
        <el-button :disabled="!login" type="danger" @click="delAccount"
          >删除账号</el-button
        >
        <el-button type="primary" @click="submitAccount">提交</el-button>
      </el-tab-pane>

      <el-tab-pane :label="$t('home.block')">
        <el-form-item :label="$t('home.giftDanmaku')">
          <el-switch v-model="form.blockGiftDanmaku"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('home.blockKeywords')">
          <el-input
            v-model="form.blockKeywords"
            type="textarea"
            :rows="5"
            :placeholder="$t('home.onePerLine')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('home.blockUsers')">
          <el-input
            v-model="form.blockUsers"
            type="textarea"
            :rows="5"
            :placeholder="$t('home.onePerLine')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('home.blockMedalLevel')">
          <el-slider
            v-model="form.blockMedalLevel"
            show-input
            :min="0"
            :max="20"
          ></el-slider>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>

    <el-divider></el-divider>
    <el-form-item :label="`弹幕姬置顶`">
      <el-switch v-model="alwaysTop"></el-switch>
    </el-form-item>
    <el-form-item :label="`兼容直播助手模式`">
      <el-switch v-model="form.cAcfunHelper"></el-switch>
    </el-form-item>
    <el-form-item :label="`弹幕姬窗口高度`">
      <el-input
        v-model="windowHeight"
        type="number"
        :placeholder="`高度`"
      ></el-input>
    </el-form-item>
    <el-form-item :label="`弹幕姬窗口宽度`">
      <el-input
        v-model="windowWidth"
        type="number"
        :placeholder="`宽度`"
      ></el-input>
    </el-form-item>
    <el-form-item :label="`锁定窗口`">
      <el-switch v-model="lockedRoom"></el-switch>
    </el-form-item>
    <el-form-item :label="$t('home.roomUrl')">
      <el-input
        ref="roomUrlInput"
        readonly
        :value="roomUrl"
        style="width: calc(100% - 8em); margin-right: 1em;"
      ></el-input>
      <el-button type="primary" @click="copyUrl">{{
        $t("home.copy")
      }}</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="!roomUrl" @click="enterRoom">{{
        $t("home.enterRoom")
      }}</el-button>
      <el-button type="primary" @click="exportConfig">{{
        $t("home.exportConfig")
      }}</el-button>
      <el-button type="primary" @click="importConfig">{{
        $t("home.importConfig")
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import _ from "lodash";
import download from "downloadjs";

import { mergeConfig } from "@/utils";
import * as chatConfig from "@/api/chatConfig";

export default {
  name: "Home",
  data() {
    return {
      serverConfig: {
        enableTranslate: true,
      },
      lockedRoom: false,
      windowWidth: parseInt(window.localStorage.windowWidth || "360"),
      windowHeight: parseInt(window.localStorage.windowHeight || "800"),
      alwaysTop: true,
      form: {
        roomId: parseInt(window.localStorage.roomId || "1"),
        ...chatConfig.getLocalConfig(),
      },
      roomIDs: [parseInt(window.localStorage.roomId || "1")],
      login: false,
      loginInfo: [],
      muti_room: false,
    };
  },
  computed: {
    roomUrl() {
      if (this.form.roomId === "") {
        return "";
      }
      let query = { ...this.form };
      delete query.roomId;
      if (query.followText === "") {
        query.followText = this.$t("home.followTextDefault");
      }
      if (query.joinText === "") {
        query.joinText = this.$t("home.joinTextDefault");
      }
      if (query.quitText === "") {
        query.quitText = this.$t("home.quitTextDefault");
      }
      if (query.loveText === "") {
        query.loveText = this.$t("home.loveTextDefault");
      }
      if (query.joinGroupText === "") {
        query.joinGroupText = this.$t("home.joinGroupTextDefault");
      }
      let resolved = this.$router.resolve({
        name: "room",
        params: { roomId: this.roomIDs.join(":") },
        query,
      });
      return `${window.location.protocol}//${window.location.host}${resolved.href}`;
    },
  },
  watch: {
    roomUrl: _.debounce(function() {
      window.localStorage.roomId = this.roomIDs[0];
      chatConfig.setLocalConfig(this.form);
    }, 500),
    windowHeight: _.debounce(function() {
      window.localStorage.windowHeight = this.windowHeight;
      chatConfig.setLocalConfig(this.form);
    }, 500),
    windowWidth: _.debounce(function() {
      window.localStorage.windowWidth = this.windowWidth;
      chatConfig.setLocalConfig(this.form);
    }, 500),
    lockedRoom: _.debounce(function() {
      window.ipcRenderer.send("lockView", {
        type: "livechat",
        option: {
          locked: this.lockedRoom,
        },
      });
    }, 500),
    alwaysTop: _.debounce(function() {
      window.ipcRenderer.send("alwaysTop", {
        type: "livechat",
        option: {
          alwaysTop: this.alwaysTop,
        },
      });
    }, 500),
  },
  mounted() {
    this.removeCss("http://localhost:3378/upload/config/dd.css");
    this.updateServerConfig();
  },
  methods: {
    removeCss(href) {
      let links = document.getElementsByTagName("link");
      for (var i = 0; i < links.length; i++) {
        if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
          links[i].parentNode.removeChild(links[i]);
        }
      }
    },
    addRoom() {
      this.roomIDs.push(0);
    },
    rmRoom() {
      this.roomIDs.pop();
    },
    submitAccount() {
      if (this.loginInfo.length === 0) return alert("至少需要一个账号");
      let reqBody = "";
      if (this.login && this.loginInfo != []) {
        reqBody = JSON.stringify({ accounts: this.loginInfo });
      }
      const host =
        process.env.NODE_ENV === "development"
          ? "localhost:3378"
          : window.location.host;
      fetch(`http://${host}/add_account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: reqBody,
      })
        .then(function(data) {
          // return data.text();
          return data.json();
        })
        .then(function(data) {
          if (data.iRet === 0) {
            alert("设置成功");
          }
        });
    },
    addAccount() {
      this.loginInfo.push({ username: "", password: "" });
    },
    delAccount() {
      this.loginInfo.pop();
    },
    async updateServerConfig() {
      const host =
        process.env.NODE_ENV === "development"
          ? "localhost:3378"
          : window.location.host;

      fetch(`http://${host}/logininfo`)
        .then(function(data) {
          // return data.text();
          return data.json();
        })
        .then((data) => {
          if (data.length > 0) {
            this.loginInfo = data;
            this.login = true;
          }
        });
    },
    enterRoom() {
      window.ipcRenderer.send("openView", {
        type: "livechat",
        url: this.roomUrl,
        option: {
          alwaysTop: this.alwaysTop,
          width: this.windowWidth,
          height: this.windowHeight,
          cAcfunHelper: this.form.cAcfunHelper,
        },
      });
    },
    copyUrl() {
      this.$refs.roomUrlInput.select();
      document.execCommand("Copy");
    },
    exportConfig() {
      let cfg = mergeConfig(this.form, chatConfig.DEFAULT_CONFIG);
      download(
        JSON.stringify(cfg, null, 2),
        "aclivechat.json",
        "application/json"
      );
    },
    importConfig() {
      let input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json";
      input.onchange = () => {
        let reader = new window.FileReader();
        reader.onload = () => {
          let cfg;
          try {
            cfg = JSON.parse(reader.result);
          } catch (e) {
            this.$message.error(this.$t("home.failedToParseConfig") + e);
            return;
          }
          cfg = mergeConfig(cfg, chatConfig.DEFAULT_CONFIG);
          this.form = { roomId: this.form.roomId, ...cfg };
        };
        reader.readAsText(input.files[0]);
      };
      input.click();
    },
  },
};
</script>

<style scoped>
.el-form {
  max-width: 800px;
}
</style>
