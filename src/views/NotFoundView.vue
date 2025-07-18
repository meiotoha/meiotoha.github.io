<script setup lang="ts">
import { inject } from 'vue'
import type Strings from '@/i18n/strings'
import { useRoute } from 'vue-router'
const route = useRoute()
const syslang: Strings = inject('syslang')!

const desc = syslang.formatError404NotFound(
  `<span style="color: #ffd54f;font-weight: 600;word-break: break-all;">${route.fullPath}</span>`,
)
</script>

<template>
  <div class="notfound-container">
    <div class="notfound-icon">😢</div>
    <h1 class="notfound-title">{{ syslang.ERROR_404_NOT_FOUND }}</h1>
    <p class="notfound-desc" v-html="desc"></p>
    <a class="notfound-back" href="/">{{ syslang.ERROR_404_RETURN_HOME }}</a>
  </div>
</template>

<style scoped lang="css">
.notfound-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px 16px;
  background: rgba(30, 34, 44, 0.85);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
}

.notfound-icon {
  font-size: 64px;
  margin-bottom: 18px;
}

.notfound-title {
  font-size: 2.2em;
  color: #ff6f6f;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: 2px;
}

.notfound-desc {
  font-size: 1.1em;
  color: #e0e0e0;
  margin-bottom: 24px;
}

.notfound-back {
  display: inline-block;
  padding: 8px 24px;
  background: #60a5fa;
  color: #fff;
  border-radius: 24px;
  font-size: 1em;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(96, 165, 250, 0.18);
  transition: background 0.2s;
}

.notfound-back:hover {
  background: #2563eb;
}
</style>
