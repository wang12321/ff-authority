<template>
  <div v-if="isShowMenu()" style="float: left; width: 70px;height: 100%;line-height: 56px;color: #fff">
    <el-popover
        placement="bottom"
        width="300"
        trigger="click"
    >
      <el-tree
          :key="treeKey"
          ref="treeMenu"
          style="max-height: 300px;overflow: auto"
          :data="menuDataList"
          show-checkbox
          node-key="route_data"
          :props="defaultProps"
          @check="handleCheckChange"
      />
      <div style="padding-top: 5px;text-align: center">
        <el-button type="primary" size="mini" @click="onSaveMenu">确定</el-button>
      </div>

      <el-button slot="reference" type="text" style="color: #fff">菜单上报</el-button>
    </el-popover>
  </div>
</template>

<script>
/**
 * @author FF
 * @date 2022-09-07
 * @Description: 菜单上报组件 只能配置自动路由插件一起使用
 * parameter:token 和 平台标识 platform_key
 * menuList: 自动路由生成的router文件数据
 */
import { dateAndTimestampConversion, setMenuImportJson, menuList } from '../router-data'
export default {
  name: 'Index',
  props: {
    parameter: {
      type: Object,
      default: () => ({
        token: '',
        platform_key: ''
      })
    },
    menuList: {
      type: Array,
      default: () => ([])
    },
    defaultProps: {
      type: Object,
      default: () => ({
        children: 'children',
        label: 'name'
      })
    }
  },
  data() {
    return {
      treeKey: 1,
      saveMenuList: []
    }
  },
  computed: {
    menuDataList() {
      return this.onMenuDataList(this.menuList)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.resetChecked()
    })
  },
  methods: {
    isShowMenu() {
      console.log('process.env.NODE_ENV', process.env.NODE_ENV)
      if (!menuList || (menuList && menuList.length === 0)) {
        return process.env.NODE_ENV === 'development'
      }
      return false
    },
    onSaveMenu() {
      this.$confirm('此操作属于一次性初始化菜单配置，请再次确认！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setMenuImportJson({ ...this.parameter, tree_data: this.saveMenuList }).then(res => {
          this.$message({
            message: res.errmsg,
            type: res && Number(res.errno) === 0 ? 'success' : 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    onMenuDataList(data, children = false) {
      const treeList = []
      data.forEach(item => {
        if (item.name !== 'reference-template') {
          const tmp = {
            icon: item.meta.icon || 'form',
            is_out_link: false,
            name: item.meta.title || item.name,
            route_data: item.path.indexOf('/') === 0 ? item.path.slice(1, item.path.length) : item.path,
            showtime: dateAndTimestampConversion(item.meta.newTime || '0000-00-00') / 1000 || 0,
            status: 1,
            type: !children ? 1 : 2
          }
          if (item.children && !(item.children.length === 1 && item.children[0].name + 'p' === item.name)) {
            this.$set(tmp, 'children', this.onMenuDataList(item.children, true))
          }
          treeList.push(tmp)
        }
      })
      return treeList
    },
    resetChecked() {
      if (this.$refs.treeMenu) {
        this.$refs.treeMenu.setCheckedNodes(this.menuDataList)
        this.handleCheckChange()
      }
    },
    handleCheckChange() {
      // const valueModel = this.$refs.treeMenu.getCheckedNodes(false, true)
      const valueModel = this.$refs.treeMenu.getCheckedKeys().concat(this.$refs.treeMenu.getHalfCheckedKeys())
      this.saveMenuList = this.onSaveMenuList(this.menuDataList, valueModel)
    },
    onSaveMenuList(data, valueModel) {
      const treeList = []
      data.forEach(item => {
        if (valueModel.includes(item.route_data)) {
          const tmp = {
            ...item
          }
          if (item.children && item.children.length !== 0) {
            this.$set(tmp, 'children', this.onSaveMenuList(item.children, valueModel))
          }
          treeList.push(tmp)
        }
      })
      return treeList
    }
  }
}
</script>
