<!--
 * @Date: 2021-01-31 18:17:14
 * @LastEditors: kanoyami
 * @LastEditTime: 2021-01-31 20:35:53
-->
<!--
 * @Date: 2021-01-24 00:10:15
 * @LastEditors: kanoyami
 * @LastEditTime: 2021-01-31 11:59:11
-->
<template>
  <div>
    <el-form label-width="150px">
      <el-form-item :label="$t('home.roomId')" prop="roomId">
        <el-input v-model.number="form.roomId" type="number" min="1"></el-input>
      </el-form-item>
      <el-form-item :label="`开始日期`">
        <el-date-picker
          v-model="starttime"
          type="date"
          placeholder="选择日期"
          align="right"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="`结束日期`">
        <el-date-picker
          v-model="endtime"
          type="date"
          placeholder="选择日期"
          align="right"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>

      <el-button type="primary" @click="getBarData">检索</el-button>
    </el-form>
    <v-chart :options="line" style="width:100%;height:600px" />
    <span>单位：CNY</span>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import * as chatConfig from "@/api/chatConfig";
import "echarts/lib/chart/line";
export default {
  components: {
    "v-chart": ECharts,
  },

  name: "Home",
  data() {
    const host =
      process.env.NODE_ENV === "development"
        ? "localhost:3378"
        : window.location.host;
    return {
      form: {
        roomId: parseInt(window.localStorage.roomId || "1"),
        ...chatConfig.getLocalConfig(),
      },
      line: {},
      host,
      starttime: "",
      endtime: "",
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getBarData();
  },
  methods: {
    getBarData() {
      fetch(
        `http://${this.host}/gift/totalByDate?roomId=${this.form.roomId}&start=${this.starttime}&end=${this.endtime}`
      )
        .then((r) => {
          return r.json();
        })
        .then((e) => {
          let barData = {
            title: {
              text: "礼物统计",
            },
            tooltip: {
              trigger: "axis",
            },
            xAxis: {
              type: "category",
              data: e.days,
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data:e.value,
                type: "line",
                label: {
                  show: true,
                  position: "inside",
                },
              },
            ],
          };
        
          this.line = barData;
        });
    },
  },
};
</script>
