<!--
 * @Date: 2021-02-17 22:13:31
 * @LastEditors: kanoyami
 * @LastEditTime: 2021-02-18 01:16:52
-->
<template>
  <el-row style="background:white;height:100%;overflow-y: scroll;">
    <el-alert title="弹幕输入#点歌 歌名 进行点歌，例如：#点歌 我会自己上厕所" type="info"> </el-alert>
    <el-col :span="12">
      <h3 style="margin-left:24px">未唱歌曲</h3>

      <el-container style="background:white;height:100%">
        <el-main>
          <el-card
            v-for="item in songOrderList"
            :key="item.songName"
            class="box-card"
            shadow="hover"
          >
            <div class="clearfix">
              <span>{{ item.songName }}</span>
              <el-button
                style="float: right; padding: 3px 0;color:rgb(103,194,58)"
                type="text"
                @click="song(item.songName, 1)"
                >已唱</el-button
              >
              <el-button
                style="float: right; padding: 3px 8px"
                type="text"
                @click="song(item.songName, 0)"
                >摸了</el-button
              >
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-col>
    <el-col :span="12">
      <h3>已过歌曲</h3>

      <el-tag
        v-for="item in songList"
        :key="item.songName"
        :type="item.type === 1 ? 'success' : ''"
        style="margin-right:4px;margin-top:4px"
        >{{ item.songName }}</el-tag
      >
    </el-col>
  </el-row>
</template>

<script>
import {} from "@/utils";
import _ from "lodash";
const COMMAND_HEARTBEAT = 0;
const COMMAND_JOIN_ROOM = 1;
const COMMAND_ADD_TEXT = 2;
export default {
  name: "点歌",
  components: {},
  data() {
    return {
      websocket: null,
      retryCount: 0,
      keywords: "#点歌 ",
      serverHeartbeatTime: 0, //服务器返回心跳的时间
      clientHeartbeatTime: 0, //客户端发送心跳的时间
      noHeartbeatCount: 0, //丢失心跳次数
      isDestroying: false,
      isfirstLoad: true,
      heartbeatTimerId: null,
      // interval: 0,
      songOrderList: [],
      songList: [],
    };
  },
  computed: {},
  created() {
    this.wsConnect();
    // 提示用户已加载
    this.$message({
      message: "Loaded",
      duration: "500",
    });
  },
  beforeDestroy() {
    this.isDestroying = true;
    this.websocket.close();
  },
  methods: {
    song(name, type) {
      _.remove(this.songOrderList, function(n) {
        return n.songName == name;
      });
      this.songList.push({ songName: name, type });
    },
    wsConnect() {
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      // 开发时使用localhost:12450
      const host =
        process.env.NODE_ENV === "development"
          ? "localhost:3378"
          : window.location.host;
      const url = `${protocol}://${host}/chat`;
      this.websocket = new WebSocket(url);
      this.websocket.onopen = this.onWsOpen;
      this.websocket.onclose = this.onWsClose;
      this.websocket.onmessage = this.onWsMessage;
    },
    sendHeartbeat() {
      if (this.websocket.readyState === 1) {
        this.websocket.send(
          JSON.stringify({
            cmd: COMMAND_HEARTBEAT,
          })
        );
      }
      this.clientHeartbeatTime = Date.now();

      if (this.clientHeartbeatTime - this.serverHeartbeatTime > 10 * 1000) {
        window.console.log(this.clientHeartbeatTime - this.serverHeartbeatTime);
        window.console.log(`无心跳 ${++this.noHeartbeatCount}`);
      } else {
        this.noHeartbeatCount = 0;
      }
      if (this.noHeartbeatCount > 2) {
        window.console.log(`无心跳重连`);
        this.websocket.close();
      }
    },
    onWsOpen() {
      this.retryCount = 0;
      this.noHeartbeatCount = 0;
      this.serverHeartbeatTime = Date.now();
      this.heartbeatTimerId = window.setInterval(this.sendHeartbeat, 5 * 1000);
      this.websocket.send(
        JSON.stringify({
          cmd: COMMAND_JOIN_ROOM,
          data: {
            roomId: parseInt(this.$route.params.roomId),
            isfirstLoad: this.isfirstLoad,
            version: this.VERSION,
          },
        })
      );
    },
    onWsClose() {
      if (this.heartbeatTimerId) {
        window.clearInterval(this.heartbeatTimerId);
        this.heartbeatTimerId = null;
      }
      if (this.isDestroying) {
        return;
      }
      window.console.log(`掉线重连中 ${++this.retryCount}`);
      if (this.retryCount > 1) {
        this.isfirstLoad = false;
      }
      this.wsConnect();
    },
    onWsMessage(event) {
      const { cmd, data } = JSON.parse(event.data);
      let index = -1;
      switch (cmd) {
        case COMMAND_HEARTBEAT:
          this.serverHeartbeatTime = Date.now();
          break;
        case COMMAND_ADD_TEXT:
          index = data.content.indexOf(this.keywords);
          if (index === -1) return;
          if (
            !_.find(this.songOrderList, {
              songName: data.content.substr(index + 4),
            })
          )
            this.songOrderList.push({
              songName: data.content.substr(index + 4),
            });

          // this.songOrderList = _.uniqBy(this.songOrderList, "songName");

          break;
        default:
          break;
      }
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin-bottom: 8px;
}
</style>
