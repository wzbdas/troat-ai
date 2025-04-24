<template>
  <view class="active-container">
    <!-- 活动列表 -->
    <view class="active-list">
      <view v-for="(item, index) in activeList" :key="index" class="active-item">
        <image 
  :src="item.image || '/static/zximgh5/default.jpg'" 
  class="active-image" 
  mode="aspectFill"
  @error="handleImageError(index)"
/>
        <view class="active-content">
          <text class="active-title" @tap="goToDetail(item)">{{ item.title }}</text>
          <text class="active-desc">{{ item.context }}</text>
          <view class="active-info">
            <view class="info-item">
              <text class="label">地点：</text>
              <text>{{ item.local }}</text>
            </view>
            <view class="info-item">
              <text class="label">时间：</text>
              <text>{{ formatDate(item.startTime) }} - {{ formatDate(item.endTime) }}</text>
            </view>
          </view>
        </view>

        <!-- <button 
      class="join-btn" 
      :class="{ 'joined': item.isJoin }"
      @click="handleJoin(item)"
    >
      {{ item.isJoin ? '已参与' : '立即参与' }}
    </button> -->
      </view>
    </view>
    <!-- 加载状态 -->
    <view v-if="loading" class="loading">加载中...</view>
    <view v-if="!hasMore" class="no-more">没有更多活动了~</view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getActiveList } from '../../servers/star'

const activeList = ref([])
const loading = ref(false)
const hasMore = ref(true)

// 获取活动列表
const fetchActiveList = async () => {
  try {
    loading.value = true
    const res = await getActiveList()
    if (res.data.code === 200) {
      // 处理图片路径
      activeList.value = res.data.data.map(item => ({
        ...item,
        image: item.image ? `http://localhost:3000${item.image}` : '/static/zximgh5/default.jpg'
      }))
      hasMore.value = res.data.data.length > 0
    }
  } catch (error) {
    console.error('获取活动列表失败:', error)
    uni.showToast({
      title: '获取活动列表失败',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

// // 添加参与状态检查函数
// const checkJoinStatus = async (activeId: number) => {
//   try {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
//     if (!userInfo || !userInfo.id) return false

//     const res = await uni.request({
//       url: `http://localhost:3000/zactive/isJoin`,
//       method: 'GET',
//       data: {
//         reagisnId: userInfo.id, 
//         activeId
//       }
//     })

//     // 正确处理返回数据
//     if (res.statusCode === 200 && res.data && res.data.code === 200) {
//       return res.data.data?.isJoin || false
//     }
//     return false
//   } catch (error) {
//     console.error('检查参与状态失败:', error)
//     return false
//   }
// }

// 添加图片加载错误处理
const handleImageError = (index: number) => {
  if (activeList.value[index]) {
    activeList.value[index].image = '/static/zximgh5/default.jpg'
  }
}

// // 添加参与活动处理函数
// const handleJoin = async (item: any) => {
//   const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
//   console.log('页面加载时的用户信息:', userInfo)

//   try {
//     const res = await uni.request({
//       url: 'http://localhost:3000/zactive/joinActive',
//       method: 'POST',
//       data: {
//         reagisnId: userInfo.id, // 使用userInfo中的id
//         activeId: item.id
//       }
//     })

//     if (res.data.code === 200) {
//       // 更新活动状态
//       item.isJoin = true
//       uni.showToast({
//         title: '参与成功',
//         icon: 'success'
//       })
//     } else {
//       uni.showToast({
//         title: res.data.msg || '参与失败',
//         icon: 'none'
//       })
//     }
//   } catch (error) {
//     console.error('参与活动失败:', error)
//     uni.showToast({
//       title: '参与失败',
//       icon: 'none'
//     })
//   }
// }

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}.${date.getDate()}`
}



onMounted(() => {
 
  fetchActiveList()
})

const goToDetail = (item) => {
  uni.navigateTo({
    url: `/pages/star/activexq?id=${item.id}&title=${encodeURIComponent(item.title)}&context=${encodeURIComponent(item.context)}&image=${encodeURIComponent(item.image)}&startTime=${encodeURIComponent(item.startTime)}&endTime=${encodeURIComponent(item.endTime)}&local=${encodeURIComponent(item.local)}`
  })
}

</script>

<style scoped>
.active-container {
  padding: 20rpx;
  background: #f5f5f5;
  min-height: 100vh;
}

.active-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.active-item {
  background: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  display: flex;
  gap: 20rpx;
}

.active-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
  flex-shrink: 0;
}

.active-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.active-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}

.active-title:active {
  opacity: 0.7;
}

.active-desc {
  font-size: 28rpx;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.active-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #666;
}

.label {
  color: #999;
  margin-right: 8rpx;
}

.join-btn {
  align-self: flex-end;
  margin-top: 12rpx;
  padding: 12rpx 32rpx;
  background: #8957e5;
  color: #fff;
  border-radius: 30rpx;
  font-size: 26rpx;
  border: none;
}

.join-btn.joined {
  background: #ccc;
}

.loading, .no-more {
  text-align: center;
  padding: 20rpx;
  color: #999;
  font-size: 24rpx;
}
</style>