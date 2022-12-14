import axios from 'axios'
let getToken = ''
let url = ''
const urldev = 'http://authorityapi.test.xq5.com'
const urlProd = 'https://authorityapi.xq5.com'
let routerMaps = [] // 路由映射地址
let originalData = [] // 原数据
export let menuList = [] // 菜单数据
let controlDataTagList = {} // 控件数据

const service = axios.create({
  headers: {}
})
// 响应拦截器
// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  async error => {
    const errorInfo = {
      errno: -1,
      errmsg: ''
    }
    if (!error.response) {
      errorInfo.errmsg = `${error.config.url}响应失败，请刷新浏览器重试。原因${error}`
    } else if (error.response.status === 401) {
      errorInfo.errmsg = `登录信息过期，跳转登录页401`
    } else {
      errorInfo.errmsg = `错误状态码：${error.response.status}`
    }
    return Promise.reject(errorInfo)
  }
)

/**
 *
 * @param token
 * @param platform_key  平台key
 * @param sub_id  子平台ID
 * @param routerUrl   映射地址
 * @param dataType  数据类型: 1-菜单数据，2-控件和数据标签数据 3-原始数据 4-All
 * @param env     测试：dev  正式：prod
 *  @param env_id   环境  省内环境：1 省外环境：2 新环境：3
 */
export function routerData({ token, platform_key, routerUrl, sub_id = 0, dataType = 1, env = 'dev', env_id = '1' }) {
  return new Promise((resolve, reject) => {
    if (token) {
      getToken = token
    }
    if (getToken.length === 0) {
      resolve({
        errno: 1,
        errmsg: 'token参数错误'
      })
    }
    const dataTypeList = {
      dev: urldev,
      prod: urlProd
    }
    url = (url && url.length !== 0) ? url : dataTypeList[env]

    routerMaps = routerUrl
    getMenuDataAndTag({ platform_key: platform_key, sub_id: sub_id, env_id: Number(env_id) }).then((data) => {
      menuList = data.menuData
      controlDataTagList = data.tagData
      console.log('menu and control', controlDataTagList, menuList)
      const dataTypeList = {
        1: menuList,
        2: controlDataTagList,
        3: originalData,
        4: { menuList, controlDataTagList }
      }
      resolve(dataTypeList[Number(dataType)] || dataTypeList[4])
    }).catch(errno => {
      resolve(errno)
    })
  })
}

function containsNumber(str) {
  for (let i = 0; i < 10; i++) {
    if (str.indexOf(i) !== -1) return true
  }
  return false
}

/**
 *
 * @param path router地址 默认是当前文件路径 如果路由带了id需要自行传path ,(是数字特殊处理，为了兼容老项目获取path)
 * @param permissionId  权限标识
 * @param isBool ture返回布尔值 false返回数据
 * @param return
 * 1、如果有permissionId，isBool为true 返回布尔值
 * 2、如果有permissionId，isBool为false 返回对象
 * 3、如果没有permissionId 返回数组
 */
let pathOld = ''
let controlData = {}
export function controlFindData({ path = '', permissionId = '', isBool = true }) {
  const hash = window.location.hash.replace(/#/g, '')
  path = path.length === 0 ? (hash.indexOf('?') > 0 ? hash.substring(0, hash.indexOf('?')) : hash || window.location.pathname) : path
  // 如果路由绑定了动态ID
  // 需要过滤ID
  const regExp = new RegExp(/^(\-|\+)?\d+(\.\d+)?$/)
  if (containsNumber(path)) {
    const pathList = path.split('/')
    const newPathList = pathList.filter((item) => {
      return item && !regExp.test(item)
    })
    path = newPathList ? '/' + newPathList.join('/') : path
  }
  if (pathOld !== path) {
    const dataList = controlDataTagList[path] || []
    controlData = onControlFindDataObj(dataList)
    pathOld = path
  }
  if (permissionId.length !== 0) {
    const controlObj = controlData[permissionId] || {}
    if (Number(controlObj.type) === 5 || Number(controlObj.type) === 6) {
      return controlObj
    }
    return isBool ? Object.keys(controlObj).length !== 0 : controlObj
  } else {
    return controlData
  }
}
function onControlFindDataObj(data, dataObj = {}) {
  data.forEach(item => {
    if (item.permission_id) {
      dataObj[item.permission_id] = item
      if (item.children && item.children.length !== 0) {
        onControlFindDataObj(item.children, dataObj)
      }
    }
  })
  return dataObj
}
// 递归查找 -- 不用
// eslint-disable-next-line no-unused-vars
function onControlFindData(data, permissionId, dataObj = []) {
  data.forEach(item => {
    if (item.permission_id === permissionId) {
      dataObj.push(item)
    } else {
      if (item.children && item.children.length !== 0) {
        onControlFindData(item.children, permissionId, dataObj)
      }
    }
  })
  return dataObj
}
const getMenuDataAndTag = (params) => {
  return new Promise((resolve, reject) => {
    service.defaults.headers.common['x-xq5-jwt'] = getToken
    service.get(`${url}/v1/web/menu`, { params: params }).then(res => {
      if (res && res.data && Number(res.errno) === 0) {
        originalData = res.data || []
        // type: 1: 菜单 ，2:控件和数据标签
        const menuData = generateAsyncRouter(originalData, 1)
        const tagData = generateAsyncRouter(originalData, 2)
        resolve({ menuData, tagData })
      } else {
        reject({
          errno: res.errno || 1,
          errmsg: res.errmsg || 'Error'
        })
      }
    }).catch(errno => {
      reject(errno)
    })
  })
}

// 映射服务器返回菜单与本地component
function generateAsyncRouter(serverRouterMap, type = 1, children = false) {
  const menuList = []
  switch (type) {
    case 1:
    case '1':
      serverRouterMap.forEach(item => {
        if ((Number(item.type) === 1 || Number(item.type) === 2) && Number(item.status) === 1) {
          const isParent = item.children && item.children.length > 0
          const isChildrenMenu = (isParent && (item.children && item.children.filter(item => item.type === 2).length !== 0))
          const parent = generateRouter(item, children ? isChildrenMenu : true, children)
          if (isChildrenMenu) {
            parent.children = generateAsyncRouter(item.children, type, true) || []
          } else if (!children) {
            parent.children = [generateRouter(item, isParent ? (item.children && item.children.filter(item => item.type === 2).length !== 0) : false, children)]
          }
          menuList.push(parent)
        }
      })
      return menuList
    case 2:
    case '2':
      return generateControlAndDataTag(serverRouterMap)
    default:
      return []
  }
}

const generateRouter = (item, isParent, children) => ({
  path: !item.is_out_link ? ((isParent || !children) ? (item.route_data.indexOf('/') === 0 ? item.route_data : `/${item.route_data}`) : item.route_data || '') : item.route_data,
  name: !item.is_out_link ? (isParent ? item.route_data + 'p' : item.route_data || '') : item.route_data,
  alwaysShow: false,
  meta: { title: item.name, icon: item.icon, id: item.menu_id, newTime: item.showtime ? dateAndTimestampConversion(item.showtime) : '', noCache: false },
  component: !item.is_out_link ? (isParent && !children ? routerMaps['Layout'] : routerMaps[(item.route_data.indexOf('/') === 0 ? item.route_data.slice(1, item.route_data.length) : item.route_data)] || '') : item.route_data
})

const generateControlAndDataTag = (serverRouterMap, routerUrl = '', controlList = {}) => {
  serverRouterMap.forEach(item => {
    const isParent = item.children && item.children.length > 0
    let parent = {}
    let routerUrlStr = routerUrl
    if ((Number(item.type) !== 1 && Number(item.type) !== 2) && Number(item.status) === 1) {
      parent = dataControlAndDataTag(serverRouterMap)
      controlList[routerUrl] = parent
    } else if ((Number(item.type) === 1 || Number(item.type) === 2) && Number(item.status) === 1) {
      routerUrlStr += !item.is_out_link ? (item.route_data.indexOf('/') === 0 ? item.route_data : `/${item.route_data}`) : item.route_data
      if (isParent) {
        generateControlAndDataTag(item.children, routerUrlStr, controlList)
      }
    }
  })
  return controlList
}

function dataControlAndDataTag(data) {
  const treeList = []
  data.forEach(item => {
    let tmp = {}
    if ((Number(item.type) === 3 || Number(item.type) === 4)) {
      tmp = {
        name: item.name,
        icon: item.icon,
        type: item.type,
        permission_id: item.route_data
      }
    } else if ((Number(item.type) === 5 || Number(item.type) === 6)) {
      tmp = {
        name: item.name,
        backend_api: item.backend_api,
        type: item.type,
        data_labels: item.data_labels,
        backend_api_method: item.backend_api_method,
        permission_id: item.route_data,
        show_prop: item.fields
      }
    }
    if (item.children) {
      tmp.children = dataControlAndDataTag(item.children)
    }
    treeList.push(tmp)
  })
  return treeList
}

export function getSubPlatformData({ token, platform_key = '', env = 'dev', env_id = '1' }) {
  return new Promise((resolve, reject) => {
    if (token) {
      getToken = token
    }
    if (getToken.length === 0) {
      resolve({
        errno: 1,
        errmsg: 'token参数错误'
      })
    }
    const dataTypeList = {
      dev: urldev,
      prod: urlProd
    }
    url = (url && url.length !== 0) ? url : dataTypeList[env]

    service.defaults.headers.common['x-xq5-jwt'] = getToken
    service.get(`${url}/v1/web/sub_platform`, { params: { platform_key: platform_key, env_id: Number(env_id) }}).then(res => {
      if (res && res.data && Number(res.errno) === 0) {
        resolve(res.data)
      } else {
        resolve({
          errno: res.errno || 1,
          errmsg: res.errmsg || 'Error'
        })
      }
    }).catch(errno => {
      resolve(errno)
    })
  })
}

export function setMenuImportJson({ token, platform_key = '', env_id = '1', tree_data = [] }) {
  return new Promise((resolve, reject) => {
    if (token) {
      getToken = token
    }
    if (getToken.length === 0) {
      resolve({
        errno: 1,
        errmsg: 'token参数错误'
      })
    }
    const dataTypeList = {
      dev: urldev,
      prod: urlProd
    }
    url = (url && url.length !== 0) ? url : dataTypeList['dev']

    service.defaults.headers.common['x-xq5-jwt'] = getToken
    service.post(`${url}/v1/web/import_json`, { platform_key: platform_key, env_id: Number(env_id), tree_data: tree_data }).then(res => {
      if (res && Number(res.errno) === 0) {
        resolve({
          errno: 0,
          errmsg: res.errmsg || '上传成功'
        })
      } else {
        resolve({
          errno: res.errno || 1,
          errmsg: res.errmsg || 'Error'
        })
      }
    }).catch(errno => {
      resolve(errno)
    })
  })
}

/**
 * 时间戳和日期相互转换
 * @param {number|string}  time 时间戳或日期（日期示例:2022-08-10或者2022/08/10 16:37:51）
 * @param {boolean} isDisplayDate  是否仅展示年月日 默认true
 * @returns {string|number}
 * @example
 * dateAndTimestampConversion(1660120671762) // '2022-08-10'
 * dateAndTimestampConversion(1660120671762,false) // '2022-08-10 16:37:51'
 * dateAndTimestampConversion('2022-08-10 16:37:51') // 1660120671000
 * dateAndTimestampConversion('2022/08/10 16:37:51') // 1660120671000
 */
export function dateAndTimestampConversion(time, isDisplayDate = true) {
  const timeType = Object.prototype.toString.call(time)
  if (timeType !== '[object Number]' && timeType !== '[object String]') {
    throw new Error('参数应为数字或字符串类型')
  }
  const isTimeTypeIsNum = timeType === '[object Number]'
  if (isTimeTypeIsNum && String(time).length !== 10 && String(time).length !== 13) {
    throw new Error('时间戳位数应为10位数或13位数')
  }
  if (!isTimeTypeIsNum && time.length !== 10 && time.length !== 19) {
    throw new Error('日期位数应为10位数或19位数')
  }
  if (String(time).includes('-') || String(time).includes('/')) {
    const timeTransition = time.replace(/-/g, '/')
    return (new Date(timeTransition).getTime())
  } else {
    const now = new Date(String(time).length === 10 ? (Number(time) * 1000) : Number(time))
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const date = now.getDate().toString().padStart(2, '0')
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const second = now.getSeconds().toString().padStart(2, '0')
    if (isDisplayDate) {
      return `${year}-${month}-${date}`
    } else {
      return `${year}-${month}-${date} ${hours}:${minutes}:${second}`
    }
  }
}
