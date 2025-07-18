<template>
  <img
    :src="iconSrc"
    :alt="iconType"
    :class="['icon', `icon-${iconType}`]"
    :style="{ width: size, height: size }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import githubIcon from '@/assets/icons/github.svg'
import emailIcon from '@/assets/icons/email.svg'

interface Props {
  iconType: string
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '24px',
})

const iconMap = {
  github: githubIcon,
  email: emailIcon,
}

const iconSrc = computed(() => {
  return iconMap[props.iconType as keyof typeof iconMap] || ''
})
</script>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  filter: invert(1);
}

.icon-github:hover,
.icon-email:hover {
  filter: invert(0.8);
  transition: filter 0.3s ease;
}
</style>
