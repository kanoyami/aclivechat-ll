<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-form label-width="150px" size="mini">
        <h3>自定义字体</h3>

        <el-form-item :label="`字体文件`">
          <el-input
            :value="fontFile"
            v-model="fontFile"
            name="font"
            type="file"
            accept=".ttf,"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendFontFile">配置</el-button>
        </el-form-item>
        <span
          >配置后在字体选择的地方，输入userdefine选择自己的字体。请注意字体的商业使用许可！</span
        >
        <h3>{{ $t("stylegen.outlines") }}</h3>
        <el-form-item :label="$t('stylegen.showOutlines')">
          <el-switch v-model="form.showOutlines"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.outlineSize')">
          <el-input
            v-model.number="form.outlineSize"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.outlineColor')">
          <el-color-picker v-model="form.outlineColor"></el-color-picker>
        </el-form-item>

        <h3>{{ $t("stylegen.avatars") }}</h3>
        <el-form-item :label="$t('stylegen.showAvatars')">
          <el-switch v-model="form.showAvatars"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.avatarSize')">
          <el-input
            v-model.number="form.avatarSize"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>

        <h3>{{ $t("stylegen.pop") }}</h3>
        <el-form-item :label="$t('stylegen.popUseDefault')">
          <el-switch v-model="form.popUseDefault"></el-switch>
        </el-form-item>
        <el-form-item :label="`预设模板`">
          <el-select
            :default-first-option="true"
            :disabled="form.popUseDefault"
            v-model="form.popTmpl"
          >
            <el-option :label="`模板1`" :value="`tmpl0`" />
            <el-option :label="`南绾`" :value="`tmpl1`" />
            <el-option :label="`自定义`" :value="`custom`" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('stylegen.popBorder')">
          <el-color-picker
            show-alpha
            v-model="form.popBorder"
          ></el-color-picker>
        </el-form-item>
        <el-form-item :label="`边框样式`">
          <el-select
            :default-first-option="true"
            :disabled="form.popUseDefault"
            v-model="form.popBorderType"
          >
            <el-option :label="`实线`" :value="`solid`" />
            <el-option :label="`虚线`" :value="`dashed`" />
            <el-option :label="`点状`" :value="`dotted`" />
             <el-option :label="`双实线`" :value="`double`" />
          </el-select>
        </el-form-item>
        <el-form-item :label="`倒角尺寸`">
          <el-input
            v-model.number="form.popRadius"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.popBorderWidth')">
          <el-input
            v-model.number="form.popBorderWidth"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.popBackgroundColor')">
          <el-color-picker
            show-alpha
            v-model="form.popBackgroundColor"
          ></el-color-picker>
        </el-form-item>

        <h3>{{ $t("stylegen.userMark") }}</h3>
        <el-form-item :label="$t('stylegen.showUserMark')">
          <el-switch v-model="form.showUserMark"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.font')">
          <el-autocomplete
            v-model="form.userMarkFont"
            :fetch-suggestions="getFontSuggestions"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('stylegen.fontSize')">
          <el-input
            v-model.number="form.userMarkFontSize"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.lineHeight')">
          <el-input
            v-model.number="form.userMarkLineHeight"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.normalColor')">
          <el-color-picker v-model="form.userMarkColor"></el-color-picker>
        </el-form-item>

        <h3>{{ $t("stylegen.medal") }}</h3>
        <el-form-item :label="$t('stylegen.showMedalName')">
          <el-switch v-model="form.showMedalName"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.font')">
          <el-autocomplete
            v-model="form.medalNameFont"
            :fetch-suggestions="getFontSuggestions"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('stylegen.fontSize')">
          <el-input
            v-model.number="form.medalNameFontSize"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.lineHeight')">
          <el-input
            v-model.number="form.medalNameLineHeight"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="`${$t('stylegen.normalColor')} - LV1`">
          <el-color-picker v-model="form.medalNameColorLV1"></el-color-picker>
        </el-form-item>
        <el-form-item :label="`${$t('stylegen.normalColor')} - LV2`">
          <el-color-picker v-model="form.medalNameColorLV2"></el-color-picker>
        </el-form-item>
        <el-form-item :label="`${$t('stylegen.normalColor')} - LV3`">
          <el-color-picker v-model="form.medalNameColorLV3"></el-color-picker>
        </el-form-item>
        <el-form-item :label="`${$t('stylegen.normalColor')} - LV4`">
          <el-color-picker v-model="form.medalNameColorLV4"></el-color-picker>
        </el-form-item>
        <el-form-item :label="`${$t('stylegen.normalColor')} - LV5`">
          <el-color-picker v-model="form.medalNameColorLV5"></el-color-picker>
        </el-form-item>

        <el-form-item :label="$t('stylegen.showMedalLevel')">
          <el-switch v-model="form.showMedalLevel"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.font')">
          <el-autocomplete
            v-model="form.medalLevelFont"
            :fetch-suggestions="getFontSuggestions"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('stylegen.fontSize')">
          <el-input
            v-model.number="form.medalLevelFontSize"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.lineHeight')">
          <el-input
            v-model.number="form.medalLevelLineHeight"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="`${$t('stylegen.normalColor')} - LV1`">
          <el-color-picker v-model="form.medalLevelColorLV1"></el-color-picker>
        </el-form-item>
        <el-form-item :label="`${$t('stylegen.normalColor')} - LV2`">
          <el-color-picker v-model="form.medalLevelColorLV2"></el-color-picker>
        </el-form-item>
        <el-form-item :label="`${$t('stylegen.normalColor')} - LV3`">
          <el-color-picker v-model="form.medalLevelColorLV3"></el-color-picker>
        </el-form-item>
        <el-form-item :label="`${$t('stylegen.normalColor')} - LV4`">
          <el-color-picker v-model="form.medalLevelColorLV4"></el-color-picker>
        </el-form-item>
        <el-form-item :label="`${$t('stylegen.normalColor')} - LV5`">
          <el-color-picker v-model="form.medalLevelColorLV5"></el-color-picker>
        </el-form-item>

        <h3>{{ $t("stylegen.userNames") }}</h3>
        <el-form-item :label="$t('stylegen.font')">
          <el-autocomplete
            v-model="form.userNameFont"
            :fetch-suggestions="getFontSuggestions"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('stylegen.fontSize')">
          <el-input
            v-model.number="form.userNameFontSize"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.lineHeight')">
          <el-input
            v-model.number="form.userNameLineHeight"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.normalColor')">
          <el-color-picker v-model="form.userNameColor"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.ownerColor')">
          <el-color-picker v-model="form.ownerUserNameColor"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.moderatorColor')">
          <el-color-picker
            v-model="form.moderatorUserNameColor"
          ></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.memberColor')">
          <el-color-picker v-model="form.memberUserNameColor"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.showBadges')">
          <el-switch v-model="form.showBadges"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.showColon')">
          <el-switch v-model="form.showColon"></el-switch>
        </el-form-item>

        <h3>{{ $t("stylegen.messages") }}</h3>
        <el-form-item :label="$t('stylegen.font')">
          <el-autocomplete
            v-model="form.messageFont"
            :fetch-suggestions="getFontSuggestions"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('stylegen.fontSize')">
          <el-input
            v-model.number="form.messageFontSize"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.lineHeight')">
          <el-input
            v-model.number="form.messageLineHeight"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.color')">
          <el-color-picker v-model="form.messageColor"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.joinColor')">
          <el-color-picker v-model="form.messageJoinColor"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.quitColor')">
          <el-color-picker v-model="form.messageQuitColor"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.followColor')">
          <el-color-picker v-model="form.messageFollowColor"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.loveColor')">
          <el-color-picker v-model="form.messageLoveColor"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.joinGroupColor')">
          <el-color-picker
            v-model="form.messageJoinGroupColor"
          ></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.onNewLine')">
          <el-switch v-model="form.messageOnNewLine"></el-switch>
        </el-form-item>

        <h3>{{ $t("stylegen.time") }}</h3>
        <el-form-item :label="$t('stylegen.showTime')">
          <el-switch v-model="form.showTime"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.font')">
          <el-autocomplete
            v-model="form.timeFont"
            :fetch-suggestions="getFontSuggestions"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('stylegen.fontSize')">
          <el-input
            v-model.number="form.timeFontSize"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.lineHeight')">
          <el-input
            v-model.number="form.timeLineHeight"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.color')">
          <el-color-picker v-model="form.timeColor"></el-color-picker>
        </el-form-item>

        <h3>{{ $t("stylegen.scAndNewMember") }}</h3>
        <el-form-item :label="$t('stylegen.firstLineFont')">
          <el-autocomplete
            v-model="form.firstLineFont"
            :fetch-suggestions="getFontSuggestions"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('stylegen.firstLineFontSize')">
          <el-input
            v-model.number="form.firstLineFontSize"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.firstLineLineHeight')">
          <el-input
            v-model.number="form.firstLineLineHeight"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.firstLineColor')">
          <el-color-picker v-model="form.firstLineColor"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.secondLineFont')">
          <el-autocomplete
            v-model="form.secondLineFont"
            :fetch-suggestions="getFontSuggestions"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('stylegen.secondLineFontSize')">
          <el-input
            v-model.number="form.secondLineFontSize"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.secondLineLineHeight')">
          <el-input
            v-model.number="form.secondLineLineHeight"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.secondLineColor')">
          <el-color-picker v-model="form.secondLineColor"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.scContentLineFont')">
          <el-autocomplete
            v-model="form.scContentFont"
            :fetch-suggestions="getFontSuggestions"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('stylegen.scContentLineFontSize')">
          <el-input
            v-model.number="form.scContentFontSize"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.scContentLineLineHeight')">
          <el-input
            v-model.number="form.scContentLineHeight"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.scContentLineColor')">
          <el-color-picker v-model="form.scContentColor"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('stylegen.showNewMemberBg')">
          <el-switch v-model="form.showNewMemberBg"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.showScTicker')">
          <el-switch v-model="form.showScTicker"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.showScContent')">
          <el-switch v-model="form.showScContent"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.showOtherThings')">
          <el-switch v-model="form.showOtherThings"></el-switch>
        </el-form-item>

        <h3>{{ $t("stylegen.animation") }}</h3>
        <el-form-item :label="$t('stylegen.animateIn')">
          <el-switch v-model="form.animateIn"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.fadeInTime')">
          <el-input
            v-model.number="form.fadeInTime"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.animateOut')">
          <el-switch v-model="form.animateOut"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.animateOutWaitTime')">
          <el-input
            v-model.number="form.animateOutWaitTime"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.fadeOutTime')">
          <el-input
            v-model.number="form.fadeOutTime"
            type="number"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('stylegen.slide')">
          <el-switch v-model="form.slide"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('stylegen.reverseSlide')">
          <el-switch v-model="form.reverseSlide"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="playAnimation">{{
            $t("stylegen.playAnimation")
          }}</el-button>
        </el-form-item>

        <h3>{{ $t("stylegen.result") }}</h3>
        <el-form-item label="CSS">
          <el-input
            v-model="result"
            ref="result"
            type="textarea"
            :rows="20"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="copyResult">{{
            $t("stylegen.copy")
          }}</el-button>
          <el-button @click="resetConfig">{{
            $t("stylegen.resetConfig")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12">
      <div ref="exampleContainer" id="example-container">
        <div id="fakebody">
          <chat-renderer ref="renderer" :css="exampleCss"></chat-renderer>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import _ from "lodash";
import * as stylegen from "./stylegen";
import * as fonts from "./fonts";
import ChatRenderer from "@/components/ChatRenderer";
import * as constants from "@/components/ChatRenderer/constants";

let time = new Date();
let textMessageTemplate = {
  id: 0,
  addTime: time,
  type: constants.MESSAGE_TYPE_TEXT,
  avatarUrl: "https://tx-free-imgs.acfun.cn/style/image/defaultAvatar.jpg",
  time: time,
  authorName: "",
  authorType: constants.AUTHRO_TYPE_NORMAL,
  content: "",
  userMark: "",
  medal: { UperID: "35119946", ClubName: "炖猫人", Level: "1" },
  privilegeType: 0,
  repeated: 1,
  translation: "",
};
let joinMessageTemplate = {
  id: 0,
  addTime: time,
  type: constants.MESSAGE_TYPE_JOIN,
  avatarUrl: "https://tx-free-imgs.acfun.cn/style/image/defaultAvatar.jpg",
  time: time,
  authorName: "",
  authorType: constants.AUTHRO_TYPE_NORMAL,
  content: "",
  privilegeType: 0,
  repeated: 1,
  translation: "",
};
let quitMessageTemplate = {
  id: 0,
  addTime: time,
  type: constants.MESSAGE_TYPE_QUIT,
  avatarUrl: "https://tx-free-imgs.acfun.cn/style/image/defaultAvatar.jpg",
  time: time,
  authorName: "",
  authorType: constants.AUTHRO_TYPE_NORMAL,
  content: "",
  privilegeType: 0,
  repeated: 1,
  translation: "",
};
let followMessageTemplate = {
  id: 0,
  addTime: time,
  type: constants.MESSAGE_TYPE_FOLLOW,
  avatarUrl: "https://tx-free-imgs.acfun.cn/style/image/defaultAvatar.jpg",
  time: time,
  authorName: "",
  authorType: constants.AUTHRO_TYPE_NORMAL,
  content: "",
  privilegeType: 0,
  repeated: 1,
  translation: "",
};
/*let legacyPaidMessageTemplate = {
  id: 0,
  addTime: time,
  type: constants.MESSAGE_TYPE_MEMBER,
  avatarUrl: 'https://tx-free-imgs.acfun.cn/style/image/defaultAvatar.jpg',
  time: time,
  authorName: '',
  title: 'NEW MEMBER!',
  content: ''
}*/
let joinGroupMessageTemplate = {
  id: 0,
  addTime: time,
  type: constants.MESSAGE_TYPE_JOIN_GROUP,
  avatarUrl: "https://tx-free-imgs.acfun.cn/style/image/defaultAvatar.jpg",
  time: time,
  authorName: "",
  content: "",
};
let paidMessageTemplate = {
  id: 0,
  addTime: time,
  type: constants.MESSAGE_TYPE_SUPER_CHAT,
  avatarUrl: "https://tx-free-imgs.acfun.cn/style/image/defaultAvatar.jpg",
  authorName: "",
  price: 0,
  time: time,
  content: "",
  translation: "",
};
let loveMessageTemplate = {
  id: 0,
  addTime: time,
  type: constants.MESSAGE_TYPE_LOVE,
  avatarUrl: "https://tx-free-imgs.acfun.cn/style/image/defaultAvatar.jpg",
  time: time,
  authorName: "",
  title: "点赞",
  content: "",
};
let nextId = 0;
const EXAMPLE_MESSAGES = [
  {
    ...textMessageTemplate,
    id: (nextId++).toString(),
    authorName: "令和唯一",
    userMark: "开发者",
    content: "8888888888",
    repeated: 12,
  },
  {
    ...textMessageTemplate,
    id: (nextId++).toString(),
    authorName: "test",
    authorType: constants.AUTHRO_TYPE_MEMBER,
    content: "草",
    privilegeType: 3,
    repeated: 3,
    medal: { UperID: "35119946", ClubName: "炖猫人", Level: "5" },
  },
  {
    ...textMessageTemplate,
    id: (nextId++).toString(),
    authorName: "admin房管",
    authorType: constants.AUTHRO_TYPE_ADMIN,
    userMark: "权限狗",
    content: "哈哈哈哈哈",
    medal: { UperID: "35119946", ClubName: "炖猫人", Level: "8" },
  },
  {
    ...textMessageTemplate,
    id: (nextId++).toString(),
    authorName: "DD头子",
    authorType: constants.AUTHRO_TYPE_ADMIN,
    userMark: "DD",
    content:
      "yooooyooooyooooyooooyooooyooooyooooyooooyooooyooooyooooyooooyoooo",
    medal: { UperID: "35119946", ClubName: "DDKing", Level: "10" },
  },
  {
    ...joinMessageTemplate,
    id: (nextId++).toString(),
    authorName: "蜜汁主播",
    authorType: constants.AUTHRO_TYPE_OWNER,
    content: "加入直播间",
    userMark: "",
    medal: { UperID: "35119946", ClubName: "炖猫人", Level: "15" },
  },
  {
    ...quitMessageTemplate,
    id: (nextId++).toString(),
    authorName: "无常猴",
    authorType: constants.AUTHRO_TYPE_MEMBER,
    content: "离开直播间",
  },
  {
    ...followMessageTemplate,
    id: (nextId++).toString(),
    authorName: "AVI猴",
    authorType: constants.AUTHRO_TYPE_MEMBER,
    content: "关注直播间",
  },
  {
    ...loveMessageTemplate,
    id: (nextId++).toString(),
    authorName: "某只猫",
    authorType: constants.AUTHRO_TYPE_MEMBER,
    content: "点亮爱心",
  },
  /*{
    ...legacyPaidMessageTemplate,
    id: (nextId++).toString(),
    authorName: '日日老师',
    content: '欢迎 日日老师!'
  },*/
  {
    ...joinGroupMessageTemplate,
    id: (nextId++).toString(),
    authorName: "腹肌",
    content: "加入了守护团",
  },
  /*
  {
    ...paidMessageTemplate,
    id: (nextId++).toString(),
    authorName: '大狐狸',
    price: 2,
    content: '快乐水 x 2'
  },
  {
    ...paidMessageTemplate,
    id: (nextId++).toString(),
    authorName: '大猫狐',
    price: 5,
    content: '快乐水 x 5'
  },
  {
    ...paidMessageTemplate,
    id: (nextId++).toString(),
    authorName: '大狸猫',
    price: 10,
    content: '快乐水 x 10'
  },
  {
    ...paidMessageTemplate,
    id: (nextId++).toString(),
    authorName: '大猫头鹰',
    price: 20,
    content: '快乐水 x 20'
  },
  {
    ...paidMessageTemplate,
    id: (nextId++).toString(),
    authorName: '小猫猫',
    price: 50,
    content: '快乐水 x 50'
  },*/
  {
    ...paidMessageTemplate,
    id: (nextId++).toString(),
    authorName: "DD头子",
    price: 288800,
    content: "猴岛 x 100",
  },
  {
    ...textMessageTemplate,
    id: (nextId++).toString(),
    authorName: "主播",
    authorType: constants.AUTHRO_TYPE_OWNER,
    userMark: "超级厉害",
    content: "老板大气，老板身体健康",
  },
  {
    ...paidMessageTemplate,
    id: (nextId++).toString(),
    authorName: "指定单推人",
    price: 30,
    content: "我单推业界！",
  },
];

export default {
  name: "StyleGenerator",
  components: {
    ChatRenderer,
  },
  data() {
    let stylegenConfig = stylegen.getLocalConfig();
    const userFontsList = [];
    let result = stylegen.getStyle(userFontsList, stylegenConfig);
    const host =
      process.env.NODE_ENV === "development"
        ? "localhost:3378"
        : window.location.host;
    return {
      FONTS: [...fonts.LOCAL_FONTS, ...fonts.NETWORK_FONTS],
      fontFile: null,
      form: { ...stylegenConfig },
      result,
      host,
      exampleCss: result.replace(/^body\b/gm, "#fakebody"),
      userFontsList,
    };
  },
  props: {},

  computed: {
    computedResult() {
      return stylegen.getStyle(this.userFontsList, this.form);
    },
  },
  watch: {
    computedResult: _.debounce(function(val) {
      this.result = val;
      stylegen.setLocalConfig(this.form);
    }, 500),
    result(val) {
      this.exampleCss = val.replace(/^body\b/gm, "#fakebody");
    },
  },
  async mounted() {
    this.$refs.renderer.addMessages(EXAMPLE_MESSAGES);
    const fontsRet = await fetch(`http://${this.host}/fonts_list`);
    const fonts = await fontsRet.json();
    fonts.forEach((element) => {
      this.FONTS.push(element.name);
    });
    this.userFontsList = fonts;
    this.result = stylegen.ejectFont(fonts, this.result);
    let observer = new MutationObserver(() =>
      this.$refs.renderer.scrollToBottom()
    );
    observer.observe(this.$refs.exampleContainer, { attributes: true });
  },
  methods: {
    sendFontFile() {
      let fontFileObj = document.getElementsByName("font")[0].files[0];
      let formData = new FormData();
      formData.append("file", fontFileObj);

      fetch(`http://${this.host}/font_upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(() => {
          alert("配置成功");
          window.location.reload();
        });
    },
    getFontSuggestions(query, callback) {
      let res = this.FONTS.map((font) => {
        return { value: font };
      });

      if (query) {
        query = query.toLowerCase();
        res = res.filter(
          (font) => font.value.toLowerCase().indexOf(query) !== -1
        );
      }
      window.console.log(res);
      callback(res);
    },
    playAnimation() {
      this.$refs.renderer.clearMessages();
      this.$nextTick(() => this.$refs.renderer.addMessages(EXAMPLE_MESSAGES));
    },
    copyResult() {
      this.$refs.result.select();
      document.execCommand("Copy");
    },
    resetConfig() {
      this.form = { ...stylegen.DEFAULT_CONFIG };
    },
  },
};
</script>

<style scoped>
.el-form {
  max-width: 800px;
}

#example-container {
  position: fixed;
  top: 30px;
  left: calc(210px + 40px + (100vw - 210px - 40px) / 2);
  width: calc((100vw - 210px - 40px) / 2 - 40px - 30px);
  height: calc(100vh - 110px);

  background-color: #444;
  background-image: -moz-linear-gradient(45deg, #333 25%, transparent 25%),
    -moz-linear-gradient(-45deg, #333 25%, transparent 25%),
    -moz-linear-gradient(45deg, transparent 75%, #333 75%),
    -moz-linear-gradient(-45deg, transparent 75%, #333 75%);
  background-image: -webkit-gradient(
      linear,
      0 100%,
      100% 0,
      color-stop(0.25, #333),
      color-stop(0.25, transparent)
    ),
    -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.25, #333), color-stop(0.25, transparent)),
    -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, #333)),
    -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, #333));

  -moz-background-size: 32px 32px;
  background-size: 32px 32px;
  -webkit-background-size: 32px 32px;

  background-position: 0 0, 16px 0, 16px -16px, 0px 16px;

  padding: 25px;

  resize: both;
  overflow: hidden;
}

.app-wrapper.mobile #example-container {
  display: none;
}

#fakebody {
  outline: 1px #999 dashed;
  height: 100%;
}
</style>
