import { controlFindData, menuList } from '../router-data'

/**
 * 默认参数：path 路径：取默认值, permissionId 权限标识(必填), isBool true返回布尔值 false返回数据对象
 * 1、如果参数是字符串  字符串代表权限标识，其他值取的是默认值
 * 1.1 如果数据类型type 是5或者6 则是数据标签 自行判断显示
 * 返回显示字段的集合(,隔开的字符串)
 * 1.2 如果数据类型type 是3或者4 则是控件
 *  返回布尔值 true为存在 false为不存在
 * 2、如果参数是对象
 * 2.1 如果数据类型type 是5或者6 则是数据标签
 * 补充参数: prop table某一列属性值prop
 * prop有值且isBool为true(默认true) 返回布尔值 true为存在 false为不存在  建议使用(填写prop)
 * 如果prop无值或者isBool为false 返回显示字段的集合(,隔开的字符串)
 * 2.2 如果数据类型type 是3或者4 则是控件
 * isBool为true(默认true) 返回布尔值 true为存在 false为不存在  建议使用(填写prop)
 * isBool为false 返回该权限标识下全部数据，自行判断显示，或者使用相关名称和icon
 * 如果需要使用接口返回的icon和name 那isBool设置为false
 * 2.3 如果permissionId 不填 会返回该路径下的所有控件数据
 */
export const limitsMixin = {
  data() {
    return {
    }
  },
  methods: {
    controlLimits(parameter) {
      if (!menuList || (menuList && menuList.length === 0)) {
        return true
      }
      if (typeof (parameter) === 'object') {
        const hasPermissions = controlFindData({ ...parameter })
        if (Number(hasPermissions.type) === 5 || Number(hasPermissions.type) === 6) {
          const { prop, isBool = true } = parameter
          if (prop && isBool) {
            return hasPermissions.show_prop && hasPermissions.show_prop.includes(prop)
          } else {
            return hasPermissions.show_prop || ''
          }
        }
        return hasPermissions
      } else if (typeof (parameter) === 'string') {
        const hasPermissions = controlFindData({ permissionId: parameter })
        if (Number(hasPermissions.type) === 5 || Number(hasPermissions.type) === 6) {
          return hasPermissions.show_prop || ''
        }
        return hasPermissions
      } else {
        return false
      }
    }
  }
}

export default {

}
