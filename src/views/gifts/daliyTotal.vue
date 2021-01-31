<!--
 * @Date: 2021-01-31 18:17:14
 * @LastEditors: kanoyami
 * @LastEditTime: 2021-01-31 20:38:21
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
      <el-form-item :label="`开始时间`">
        <el-date-picker
          v-model="starttime"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="`结束时间`">
        <el-date-picker
          v-model="endtime"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>

      <el-button type="primary" @click="getBarData">检索</el-button>
    </el-form>
    <v-chart :options="bar" style="width:100%;height:600px" />
    <span>总计:{{ total }} CNY</span>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import * as chatConfig from "@/api/chatConfig";
import "echarts/lib/chart/bar";
import _ from "lodash";
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
      total: 0,
      bar: {
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "bar",
          },
        ],
      },
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
        `http://${this.host}/gift/totalDaliy?roomId=${this.form.roomId}&start=${this.starttime}&end=${this.endtime}`
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
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: function(params) {
                var tar = params[1];
                return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
              },
            },
            xAxis: {
              type: "category",
              data: [],
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: [],
                type: "bar",
                label: {
                  show: true,
                  position: "inside",
                },
              },
            ],
          };
          const { typeCollection, allTotalRMB } = e;
          _.forEach(typeCollection, (v, k) => {
            barData.xAxis.data.push(k);
            barData.series[0].data.push(v);
          });
          this.total = allTotalRMB;
          this.bar = barData;
        });
    },
  },
};
</script>
