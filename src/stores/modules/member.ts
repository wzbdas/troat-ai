import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemberStore = defineStore(
  'member',
  () => {
    // token
    const token = ref<string>('')

    // 设置token
    const setToken = (val: string) => {
      token.value = val
      // 同时也存储到本地
      uni.setStorageSync('token', val)
    }

    // 获取token
    const getToken = () => {
      // 如果 store 中没有，尝试从本地获取
      if (!token.value) {
        const localToken = uni.getStorageSync('token')
        if (localToken) {
          token.value = localToken
        }
      }
      return token.value
    }

    return {
      token,
      setToken,
      getToken
    }
  },
  {
    persist: {
      // 开启持久化
      enabled: true,
      // 自定义持久化参数
      storage: {
        // 修改为 uniapp 的同步存储
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  }
)