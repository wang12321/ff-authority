import hasBtn from './hasBtn'
import hasTable from './hasTable'

const directives = {
  hasBtn, hasTable
}
// 批量注册指令
export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  }
}
