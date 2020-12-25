<template>
  <div style="margin:10px">
    <el-form label-width="150px">
      <h3>抽奖姬 in {{ $route.params.roomId }}</h3>
      <el-form-item :label="`关键字`" prop="keywords">
        <el-input
          ref="keywordsInput"
          type="string"
          v-model="keywords"
          style="width: calc(100% - 8em); margin-right: 1em;"
        ></el-input>
      </el-form-item>
      <el-button type="primary" :disabled="start" @click="handleStart"
        >开始</el-button
      >
      <el-button type="primary" :disabled="!start" @click="handleLottery"
        >结束</el-button
      >
      <h3>结果</h3>
      <p>恭喜：{{ winner.nickname }} id:{{ winner.userId }}</p>
    </el-form>

    <div>
      <table>
        <thead>
          <tr>
            <th>昵称</th>
            <th>uid</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in danmukuArr" :key="item.id - Math.random() * 200">
            <td>{{ item.authorName }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {} from "@/utils";

const COMMAND_HEARTBEAT = 0;
const COMMAND_JOIN_ROOM = 1;
const COMMAND_ADD_TEXT = 2;

function arrCompose(arr) {
  const unique = {};
  arr.forEach((item) => {
    unique[JSON.stringify(item)] = item;
  });
  arr = Object.keys(unique).map(function(u) {
    return JSON.parse(u);
  });
  return arr;
}

export default {
  name: "Lotto",
  components: {},
  data() {
    return {
      websocket: null,
      retryCount: 0,
      keywords: "",
      serverHeartbeatTime: 0, //服务器返回心跳的时间
      clientHeartbeatTime: 0, //客户端发送心跳的时间
      noHeartbeatCount: 0, //丢失心跳次数
      winner: { nickname: "", userId: "" },
      isDestroying: false,
      isfirstLoad: true,
      heartbeatTimerId: null,
      uid: "",
      content: "",
      start: false,
      interval: 0,
      danmukuArr: [],
      lottoArr: [],
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
    handleStart() {
      this.start = true;
      this.winner = { nickname: "", userId: "" };
    },
    handleLottery() {
      this.start = false;
      const lotteries = arrCompose(this.lottoArr);
      window.console.log(lotteries);
      const n = Math.floor((Math.random() * 10000000000) % lotteries.length);
      clearInterval(this.interval);
      this.lottoArr = [];
      this.winner = lotteries[n];
      window.console.log(this.winner);
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
      switch (cmd) {
        case COMMAND_HEARTBEAT:
          this.serverHeartbeatTime = Date.now();
          break;
        case COMMAND_ADD_TEXT:
          if (this.start) {
            window.console.log(data);
            if (this.danmukuArr.length > 12) this.danmukuArr = [];
            if (data.content.indexOf(this.keywords) === -1) return;
            this.danmukuArr.push(data);
            this.lottoArr.push({ userId: data.id, nickname: data.authorName });
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>
