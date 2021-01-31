<!--
 * @Date: 2021-01-31 18:17:14
 * @LastEditors: kanoyami
 * @LastEditTime: 2021-01-31 21:22:25
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

      <el-button type="primary" @click="getData">检索</el-button>
      <el-button type="primary" @click="download">导出</el-button>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="time" sortable label="时间" width="180">
      </el-table-column>
      <el-table-column prop="senderUid" label="Uid" width="180">
      </el-table-column>
      <el-table-column prop="senderNickName" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="type" sortable label="类型"> </el-table-column>
      <el-table-column prop="num" label="数量"> </el-table-column>
      <el-table-column prop="price" sortable label="总价"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as chatConfig from "@/api/chatConfig";
import "echarts/lib/chart/bar";
import json2csv from "json2csv";
export default {
  components: {},

  name: "Home",
  data() {
    const host =
      process.env.NODE_ENV === "development"
        ? "localhost:3378"
        : window.location.host;
    return {
      starttime: "",
      endtime: "",
      tableData: [],
      form: {
        roomId: parseInt(window.localStorage.roomId || "1"),
        ...chatConfig.getLocalConfig(),
      },
      host,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      fetch(
        `http://${this.host}/gift/all?roomId=${this.form.roomId}&start=${this.starttime}&end=${this.endtime}`
      )
        .then((r) => {
          return r.json();
        })
        .then((e) => {
          this.tableData = e;
        });
    },
    download() {
      const result = json2csv.parse(this.tableData, {
        fields: [
          { label: "时间", value: "time" },
          { label: "Uid", value: "senderUid" },
          { label: "昵称", value: "senderNickName" },
          { label: "类型", value: "type" },
          { label: "数量", value: "num" },
          { label: "总价", value: "price" },
        ],
      });

      var csvContent = "data:text/csv;charset=utf-8,\uFEFF" + result;
      //使用a标签的download属性实现下载功能
      var link = document.createElement("a");
      link.href = encodeURI(csvContent);
      link.download = `export.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>
