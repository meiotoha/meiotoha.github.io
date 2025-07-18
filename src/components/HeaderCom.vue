<script setup lang="ts">
import { ElPageHeader, ElTooltip } from 'element-plus'

defineProps<{
  title: string
  desc?: string
}>()

const goBack = () => {
  console.log('goBack called')
  if (window.history.length > 1) {
    window.history.back()
    return
  }
  window.location.href = '/'
}
</script>

<template>
  <ElPageHeader class="page-header" @back="goBack">
    <template #content>
      <ElTooltip placement="top" :content="title">
        <span class="text-large font-600 mr-3 primay"> {{ title }}</span>
      </ElTooltip>
    </template>
    <template v-if="desc" #extra>
      <ElTooltip placement="top" :content="desc">
        <span class="secondary" style="">{{ desc }}</span>
      </ElTooltip>
    </template>
  </ElPageHeader>
</template>

<style scoped lang="css">
.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #404040;
}

.page-header h1 {
  font-size: 2.5em;
  color: #f0f0f0;
  margin-bottom: 10px;
}

.page-header p {
  color: #b0b0b0;
  font-size: 1.1em;
}

.page-header .primay {
  font-size: 16px;
  color: var(--el-text-color-primary);
  display: inline-block;
  text-overflow: ellipsis;
  max-width: calc(100vw - 300px);
  overflow: hidden;
  white-space: nowrap;
  vertical-align: middle;
}

.page-header .secondary {
  font-size: 12px;
  color: var(--el-text-color-regular);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  width: 90px;
  vertical-align: middle;
}
</style>
