<template>
  <div>
    <h1>置顶时间表：</h1>
    <p>1 * 计算汇率 元 - 0 分钟 （蓝）</p>
    <p>2 * 计算汇率 元 - 0 分钟 （浅蓝）</p>
    <p>5 * 计算汇率 元 - 2 分钟 （绿）</p>
    <p>10 * 计算汇率 元 - 5 分钟 （黄）</p>
    <p>20 * 计算汇率 元 - 10 分钟 （橙）</p>
    <p>50 * 计算汇率 元 - 30 分钟 （品红）</p>
    <p>100 * 计算汇率 元 - 60 分钟 （红）</p>
    <p>
      --------------------------------------------------------------------------------------------------------
    </p>
    <h1>{{ $t("help.help") }}</h1>
    <p>{{ $t("help.p1") }}</p>
    <p>
      <el-image src="/static/img/tutorial/tutorial-1.png"></el-image>
    </p>
    <p>{{ $t("help.p2") }}</p>
    <p>
      <el-image src="/static/img/tutorial/tutorial-2.png"></el-image>
    </p>
    <p>{{ $t("help.p3") }}</p>
    <p>
      <el-image src="/static/img/tutorial/tutorial-3.png"></el-image>
    </p>
    <p>{{ $t("help.p4") }}</p>
    <p>
      <el-image src="/static/img/tutorial/tutorial-4.png"></el-image>
    </p>
    <p>{{ $t("help.p5") }}</p>
    <p>
      <el-image src="/static/img/tutorial/tutorial-5.png"></el-image>
    </p>
    <p>{{ $t("help.p6") }}</p>
    <p>
      <el-image src="/static/img/tutorial/tutorial-6.png"></el-image>
    </p>
    <p>
      <br />--------------------------------------------------------------------------------------------------------
    </p>
    <p>
      修改自<a href="https://github.com/xfgryujk/blivechat"
        >xfgryujk/blivechat</a
      >
    </p>
    <p>
      前端fork from<a href="https://github.com/ShigemoriHakura/aclivechat">
        ShigemoriHakura/aclivechat</a
      >
      <a href="https://www.acfun.cn/u/35119946" target="_blank">茂森白咲</a>
    </p>

    <p>GPL-3.0 License</p>
    <p>感谢<a href=" https://github.com/orzogc/"> Orzogct</a>的原版解析</p>
    <p>Special thanks to <a href="https://www.acfun.cn/u/8500263">猫猫子neneko.</a>感谢你的测试体验。</p>
  </div>
</template>

<script>
export default {
  name: "Help",
};
</script>
