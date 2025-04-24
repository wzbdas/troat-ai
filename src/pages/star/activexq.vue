<template>
    <view class="detail-container">
        <view class="waterfall-wrapper">
            <view class="waterfall-item">
                <image :src="detailData.image" class="detail-image" mode="widthFix" />
                <text class="detail-title">{{ detailData.title }}</text>
                <view class="info-section">
                    <view class="info-item">
                        <text class="label">地点：</text>
                        <text>{{ detailData.local }}</text>
                    </view>
                    <view class="info-item">
                        <text class="label">时间：</text>
                        <text>{{ formatDate(detailData.startTime) }} - {{ formatDate(detailData.endTime) }}</text>
                    </view>
                </view>
                <view class="detail-text">{{ detailData.context }}</view>
                <button class="join-btn" :class="{ 'joined': isJoin }" @tap="handleJoin">
                    {{ isJoin ? '已参与' : '立即参与' }}
                </button>
            </view>
        </view>
    </view>
</template>



<script setup>
import { ref, onMounted } from 'vue'

const detailData = ref({})
const isJoin = ref(false)  // 添加 isJoin 状态

// 检查参与状态
const checkJoinStatus = async (activeId) => {
    try {
        const userInfo = process.env.TARO_ENV === 'h5' ? 
            localStorage.getItem('userInfo') : 
            uni.getStorageSync('userInfo')
        const user = userInfo ? JSON.parse(userInfo) : null
        if (!user || !user.id) return false

        const res = await uni.request({
            url: `http://localhost:3000/zactive/isJoin`,
            method: 'GET',
            data: {
                reagisnId: user.id,
                activeId
            }
        })

        return res.data?.code === 200 && res.data?.data?.isJoin || false
    } catch (error) {
        console.error('检查参与状态失败:', error)
        return false
    }
}

// 参与活动
const handleJoin = async () => {
    try {
        const userInfo = process.env.TARO_ENV === 'h5' ? 
            localStorage.getItem('userInfo') : 
            uni.getStorageSync('userInfo')
        const user = userInfo ? JSON.parse(userInfo) : null
        
        if (!user || !user.id) {
            uni.showToast({
                title: '请先登录',
                icon: 'none'
            })
            // 可以添加跳转到登录页面的逻辑
            // uni.navigateTo({ url: '/pages/login/login' })
            return
        }

        const res = await uni.request({
            url: 'http://localhost:3000/zactive/joinActive',
            method: 'POST',
            data: {
                reagisnId: user.id,
                activeId: detailData.value.id
            }
        })

        if (res.data.code === 200) {
            isJoin.value = true
            uni.showToast({
                title: '参与成功',
                icon: 'success'
            })
        } else if (res.data.code === 400) {
            uni.showToast({
                title: '您已参加此活动',
                icon: 'none'
            })
        } else {
            uni.showToast({
                title: res.data.msg || '参与失败',
                icon: 'none'
            })
        }
    } catch (error) {
        console.error('参与活动失败:', error)
        uni.showToast({
            title: '参与失败',
            icon: 'none'
        })
    }
}

onMounted(async () => {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const options = currentPage.$page?.options

    if (options) {
        detailData.value = {
            id: options.id,
            title: decodeURIComponent(options.title || ''),
            context: decodeURIComponent(options.context || ''),
            image: decodeURIComponent(options.image || ''),
            startTime: decodeURIComponent(options.startTime || ''),
            endTime: decodeURIComponent(options.endTime || ''),
            local: decodeURIComponent(options.local || '')
        }
        // 检查参与状态
        isJoin.value = await checkJoinStatus(options.id)
    }
})

// 格式化日期
const formatDate = (dateStr) => {
    if (!dateStr) return ''
    try {
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) return dateStr
        return `${date.getMonth() + 1}月${date.getDate()}日`
    } catch (error) {
        console.error('日期格式化失败:', error)
        return dateStr
    }
}
</script>



<style scoped>
.detail-container {
    padding: 20rpx;
    background: #f5f5f5;
    min-height: 100vh;
}

.waterfall-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10rpx;
}

.waterfall-item {
    width: calc(50% - 20rpx);
    margin-bottom: 20rpx;
    background: #fff;
    border-radius: 12rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
}

/* H5端适配 */
@media screen and (max-width: 768px) {
    .waterfall-item {
        width: 100%;
    }
}

.detail-image {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12rpx 12rpx 0 0;
}

.detail-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    padding: 20rpx;
    display: block;
}

.info-section {
    padding: 0 20rpx;
}

.info-item {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #666;
    margin-bottom: 10rpx;
}

.label {
    color: #999;
    margin-right: 10rpx;
}

.detail-text {
    font-size: 28rpx;
    color: #333;
    line-height: 1.6;
    padding: 20rpx;
    background: #f9f9f9;
    margin: 10rpx 20rpx;
    border-radius: 8rpx;
}

.join-btn {
    width: calc(100% - 40rpx);
    margin: 20rpx;
    padding: 20rpx 0;
    background: #8957e5;
    color: #fff;
    border-radius: 40rpx;
    font-size: 28rpx;
    text-align: center;
    border: none;
}

.join-btn.joined {
    background: #ccc;
}
</style>