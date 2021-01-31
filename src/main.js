import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import ECharts from 'vue-echarts'
import {
  Aside, Autocomplete, Badge, Button, Col, ColorPicker, Container, Divider, Form, FormItem, Image,
  DatePicker, Table, TableColumn,
  Input, Main, Menu, MenuItem, Message, Row, Scrollbar, Slider, Submenu, Switch, TabPane, Tabs, Tooltip, Select, Option, RadioGroup, Radio
} from 'element-ui'
import axios from 'axios'
import AsyncComputed from 'vue-async-computed'

import App from './App.vue'
import Layout from './layout'
import Home from './views/Home.vue'
import StyleGenerator from './views/StyleGenerator'
import Room from './views/Room.vue'
import NotFound from './views/NotFound.vue'
import Lotto from './views/Lotto.vue'
import lottoConfig from './views/LottoConfig.vue'
import totalLine from './views/gifts/totalLine.vue';
import daliyTotal from './views/gifts/daliyTotal.vue';
import giftTotal from './views/gifts/giftTotal.vue';


import zh from './lang/zh'
import en from './lang/en'
import '../theme/index.css'
if (process.env.NODE_ENV === 'development') {
  // 开发时使用localhost:3378
  axios.defaults.baseURL = 'http://localhost:3378'
}

Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(AsyncComputed)
// 初始化element
Vue.use(Aside)
Vue.use(Autocomplete)
Vue.use(Badge)
Vue.use(Button)
Vue.use(Col)
Vue.use(ColorPicker)
Vue.use(Container)
Vue.use(Divider)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Image)
Vue.use(Input)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Row)
Vue.use(Scrollbar)
Vue.use(Slider)
Vue.use(Submenu)
Vue.use(Switch)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(Select)
Vue.use(RadioGroup)
Vue.use(Option)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
Vue.component('v-chart', ECharts)
Vue.prototype.$message = Message

Vue.config.ignoredElements = [
  /^yt-/
]

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: 'stylegen', name: 'stylegen', component: StyleGenerator },
        { path: 'lottoConfig', name: 'lottoConfig', component: lottoConfig },
        { path: 'daliyTotal', name: 'daliyTotal', component: daliyTotal },
        { path: 'giftTotal', name: 'giftTotal', component: giftTotal },
        { path: 'totalLine', name: 'totalLine', component: totalLine }
      ]
    },
    { path: '/room/:roomId', name: 'room', component: Room },
    { path: '/lotto/:roomId', name: 'lotto', component: Lotto },
    { path: '*', component: NotFound }
  ]
})

let locale = window.localStorage.lang
if (!locale) {
  let lang = navigator.language
  if (lang.startsWith('zh')) {
    locale = 'zh'
  } else {
    locale = 'en'
  }
}
const i18n = new VueI18n({
  locale,
  fallbackLocale: 'en',
  messages: {
    zh, en
  }
})

new Vue({
  render: h => h(App),
  router,
  i18n
}).$mount('#app')
