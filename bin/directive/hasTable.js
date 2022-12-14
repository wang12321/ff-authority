import { controlFindData } from '../router-data'

/**
 * 默认参数：path 路径：取默认值, permissionId 权限标识(必填), isBool true返回布尔值 false返回数据对象
 * 封装的table,根据json生成表格--适用 不适用未封装的el-table
 * columnKey: 表头数据字段  默认tableColumn
 * prop: 某一列的属性值 默认prop
 * permissionId: 权限标识
 */
export default {
  inserted(el, binding, vnode) {
    if (typeof (binding.value) === 'object' && Object.prototype.hasOwnProperty.call(binding.value, 'permissionId') && binding.value.permissionId !== '') {
      const { columnKey = 'tableColumn', columnProp = 'prop' } = binding.value
      const hasPermissions = controlFindData({ ...binding.value, isBool: false })
      if (hasPermissions && hasPermissions.show_prop && Object.prototype.hasOwnProperty.call(vnode.context, columnKey)) {
        vnode.context[columnKey] = vnode.context[columnKey].filter(item => hasPermissions.show_prop && hasPermissions.show_prop.includes(item[columnProp]))
      } else {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else if (typeof (binding.value) === 'string') {
      const hasPermissions = controlFindData({ permissionId: binding.value, isBool: false })
      if (hasPermissions && Object.prototype.hasOwnProperty.call(vnode.context, 'tableColumn')) {
        if (hasPermissions.show_prop && hasPermissions.show_prop.length !== 0) {
          vnode.context['tableColumn'] = vnode.context['tableColumn'].filter(item => hasPermissions.show_prop.includes(item['prop']))
        }
      } else {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
