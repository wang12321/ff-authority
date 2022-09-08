<template>
  <span v-show="hasPerms()">
    <el-button
      style="margin-right: 10px"
      v-bind="$attrs"
      :type="type"
      :icon="buttonData.icon "
      v-on="$listeners"
      @click="handleClick"
    >
      {{ buttonData.name }}
    </el-button>
  </span>
</template>

<script>
/**
 * @author FF
 * @date 2022-09-06
 * @Description: 权限控制按钮
 */
export default {
  name: 'Index',
  props: {
    permissionId: { // 按钮权限标识，外部使用者传入
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      buttonData: {}

    }
  },
  mounted() {
  },
  methods: {
    handleClick() {
      this.$emit('click', {})
    },
    hasPerms() {
      if (this.permissionId && this.permissionId.length !== 0) {
        this.buttonData = this.controlLimits({ permissionId: this.permissionId, isBool: false })
        if (this.buttonData && Object.keys(this.buttonData).length !== 0) {
          return true
        }
        return false
      }
      return false
    }
  }
}
</script>

