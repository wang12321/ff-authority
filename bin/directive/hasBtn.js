import { controlFindData } from '../router-data'

/**
 * 默认参数：path 路径：取默认值, permissionId 权限标识(必填), isBool true返回布尔值 false返回数据对象
 * 使用所有el-button 标签
 * permissionId: 权限标识
 */
export default {
  inserted(el, binding, vnode) {
    if (typeof (binding.value) === 'object') {
      const hasPermissions = controlFindData({ ...binding.value })
      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      } else if (binding.value['isBool'] && !binding.value['isBool']) {
        el.innerText = hasPermissions['name']
      }
    } else if (typeof (binding.value) === 'string') {
      if (binding.value) {
        const hasPermissions = controlFindData({ permissionId: binding.value })
        if (!hasPermissions) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    }
  }
}
