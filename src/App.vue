<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue'
import FooterCom from './components/FooterCom.vue'
import { ElContainer, ElHeader, ElMain, ElFooter } from 'element-plus'
import { provide } from 'vue'
import { GetSysLang } from './utils/i18n'
import { SITE_LANGUAGE } from './consts'

const syslang = GetSysLang(SITE_LANGUAGE)

provide('syslang', syslang)
</script>

<template>
  <div class="common-layout">
    <ElContainer>
      <ElHeader>
        <NavMenu />
      </ElHeader>
      <ElMain>
        <RouterView />
      </ElMain>
      <ElFooter>
        <FooterCom />
      </ElFooter>
    </ElContainer>
  </div>
</template>

<style scoped lang="css">
.common-layout {
  height: 100%;
  background-color: #1a1a1a;
  color: #e0e0e0;
}

.common-layout .el-header {
  background-color: #2d2d2d;
  color: white;
  padding: 0px;
  height: 60px;
  border-bottom: 1px solid #404040;
}

.common-layout .el-main {
  padding: 10px;
  min-height: calc(100vh - 100px);
  background-color: #1a1a1a;
  /* Adjust for header and footer height */
}

.common-layout .el-footer {
  color: #b0b0b0;
  text-align: center;
  padding: 0;
  height: 40px;
  background-color: #2d2d2d;
}

.common-layout .el-aside {
  width: 250px;
  background-color: #252525;
  border-right: 1px solid #404040;
}

.common-layout .el-main {
  background-color: #1a1a1a;
  color: #e0e0e0;
}
</style>
