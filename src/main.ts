
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  // 创建 Pinia 实例
  const pinia = Pinia.createPinia()
  // 将 Pinia 安装到 app 中
  app.use(pinia)
  
  return {
    app,
    Pinia // 导出 Pinia
  }
}
