<template>
  <div>
      <img :src="`/static/img/stepimg/${imgSrc}.png`" style="width:50%">
  </div>
</template>

<script>
import {} from "@/utils";

const COMMAND_HEARTBEAT = 0;
const COMMAND_JOIN_ROOM = 1;
const COMMAND_ADD_ADD_STEP = 12;


export default {
  name: "showGiftCalc",
  components: {},
  data() {
    return {
      imgSrc:1,
      websocket: null,
      retryCount: 0,
      keywords: "",
      serverHeartbeatTime: 0, //服务器返回心跳的时间
      clientHeartbeatTime: 0, //客户端发送心跳的时间
      noHeartbeatCount: 0, //丢失心跳次数
      winners: [],
      isDestroying: false,
      isfirstLoad: true,
      heartbeatTimerId: null,
      uid: "",
      content: "",
      start: false,
      // interval: 0,
      danmukuArr: [],
      lottoArr: [],
      dd_nums: 1,
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
        case COMMAND_ADD_ADD_STEP:
            window.console.log(data)
            this.imgSrc = data.step;
          break;
        default:
          break;
      }
    },
  },
};
</script>
