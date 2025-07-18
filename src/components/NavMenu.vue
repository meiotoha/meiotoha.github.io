<script setup lang="ts">
import { ElMenu, ElMenuItem } from 'element-plus'
import { inject } from 'vue'
import type Strings from '@/i18n/strings'

const syslang: Strings = inject('syslang')!
</script>

<template>
  <ElMenu
    mode="horizontal"
    :default-active="$route.path"
    :router="true"
    class="nav-menu"
    :ellipsis="false"
  >
    <ElMenuItem index="/">
      <img src="@/assets/logo.svg" style="max-height: 60px; width: 120px" alt="Logo" class="logo" />
    </ElMenuItem>
    <ElMenuItem index="/"> {{ syslang.NAV_HOME }} </ElMenuItem>
    <ElMenuItem index="/articles"> {{ syslang.NAV_ARTICLES }} </ElMenuItem>
    <ElMenuItem index="/tags"> {{ syslang.NAV_TAGS }} </ElMenuItem>
    <ElMenuItem index="/about"> {{ syslang.NAV_ABOUT }} </ElMenuItem>
  </ElMenu>
</template>

<style scoped lang="css">
.router-link {
  margin: 0 10px;
  text-decoration: none;
  color: white;
}

/* 去除首页 logo 的选中效果 */
.el-menu--horizontal > .el-menu-item:nth-child(1).is-active {
  background-color: transparent !important;
  border-bottom: none !important;
  color: inherit !important;
}

.el-menu--horizontal > .el-menu-item:nth-child(1):hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* 更强力地去除底部边框 */
.el-menu--horizontal > .el-menu-item:nth-child(1)::after {
  display: none !important;
}

.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
  border-bottom: none !important;
}

.el-menu--horizontal > .el-menu-item:nth-child(1):focus {
  background-color: transparent !important;
  border-bottom: none !important;
}
</style>
