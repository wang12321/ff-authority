import Vue from 'vue'
import Directive from './directive' // base on element-ui
Vue.use(Directive)

import { limitsMixin } from './mixin'
// 全局混入
Vue.mixin(limitsMixin)

import './sidebar/variables.scss'
import './sidebar/sidebar.scss'

// 引入
import Sidebar from './sidebar'
// 注册为全局组件
Vue.component('Sidebar', Sidebar)

// 引入
import ffButton from './ffButton'
// 注册为全局组件
Vue.component('ffButton', ffButton)

// 引入
import menuImport from './menuImport'
// 注册为全局组件
Vue.component('menuImport', menuImport)
