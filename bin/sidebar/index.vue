<template>
  <div class="has-logo">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    routes: {
      type: Array,
      default: () => ([])
    },

    variables: {
      type: Object,
      default: () => ({
        menuBg: '#304156',
        menuText: '#fff',
        menuActiveText: '#409eff'
      })
    }
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, name } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return name
    }
  }
}
</script>
