import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import { SITE_LANGUAGE } from './consts'
import { GetElementUILang } from './utils/ellang'

const app = createApp(App)

app.use(router)

app.use(ElementPlus, {
  locale: GetElementUILang(SITE_LANGUAGE),
})

app.mount('#app')
