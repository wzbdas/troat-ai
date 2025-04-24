<template>
  <view class="recharge">
    <!-- 余额展示 -->
    <view class="balance">
      <text class="label">余额</text>
      <text class="amount">100星币</text>
    </view>

    <!-- 充值金额选择 -->
    <view class="recharge-amount">
      <text class="title">充值金额</text>
      <view class="amount-grid">
        <view 
          class="amount-item" 
          :class="{ active: selectedAmount === item.coins }"
          v-for="item in amountList" 
          :key="item.coins"
          @tap="selectAmount(item.coins)"
        >
          <text class="coins">{{item.coins}}星币</text>
          <text class="price">¥ {{item.price}}</text>
        </view>
      </view>
    </view>

    <!-- 充值说明 -->
    <view class="notice">
      <text class="notice-title">星币充值</text>
      <text class="notice-text">星币充值不可退还，请务必注意。</text>
      <text class="notice-text">首次登录会赠送500星币，每日登录也会赠送50星币。</text>
    </view>

    <!-- 支付按钮 -->
    <button class="pay-btn" @click="handlePay">支付</button>

    <!-- 添加支付弹窗 -->
    <view class="pay-popup" v-if="showPayPopup">
      <view class="pay-mask" @tap="cancelPay"></view>
      <view class="pay-container">
        <view class="pay-header">
          <text class="pay-title">确认支付</text>
          <text class="pay-close" @tap="cancelPay">×</text>
        </view>
        <view class="pay-content">
          <view class="pay-amount">¥ {{selectedPrice}}</view>
          <view class="pay-desc">{{selectedAmount}}星币</view>
          <view class="pay-method">
            <!-- 使用文字代替图标 -->
            <text class="pay-icon-text">微</text>
            <text class="pay-text">微信支付</text>
          </view>
          <button class="pay-confirm-btn" @tap="confirmPay">立即支付</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

// 基础URL
const baseURL = 'https://api.example.com' // 替换为你的实际API地址

// 用户余额
const balance = ref(600)

// 充值金额列表
const amountList = [
  { coins: 1800, price: '18' },
  { coins: 6800, price: '68' },
  { coins: 9800, price: '98' },
  { coins: 16800, price: '168' },
  { coins: 24800, price: '248' },
  { coins: 38800, price: '388' }
]

// 选中的充值金额
const selectedAmount = ref(1800)

// 选择充值金额
const selectAmount = (amount: number) => {
  selectedAmount.value = amount
}

// 支付弹窗显示状态
const showPayPopup = ref(false)

// 获取选中金额对应的价格
const selectedPrice = computed(() => {
  const item = amountList.find(item => item.coins === selectedAmount.value)
  return item ? item.price : '0'
})

// 获取用户余额
/*const getUserBalance = async () => {
  try {
    const res = await uni.request({
      url: `${baseURL}/users/balance`,
      method: 'GET'
    });
    
    if (res.data && res.data.code === 200) {
      balance.value = res.data.data.balance || 0
    }
  } catch (error) {
    console.error('获取余额失败:', error);
    uni.showToast({
      title: '获取余额失败',
      icon: 'none'
    })
  }
}*/

// 处理支付
const handlePay = () => {
  showPayPopup.value = true
}

// 取消支付
const cancelPay = () => {
  showPayPopup.value = false
}

// 确认支付
const confirmPay = async () => {
  uni.showLoading({
    title: '支付中...'
  })
  
  // 模拟支付过程
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '支付成功',
      icon: 'success'
    })
    
    showPayPopup.value = false
    
    // 延迟返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 2000)
}

// 页面加载时获取余额
onMounted(() => {
  // getUserBalance()
})
</script>

<style scoped>
.recharge {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2vh 4vw;
}

.balance {
  background: white;
  padding: 4vh;
  border-radius: 2vw;
  margin-bottom: 2vh;
}

.label {
  font-size: 0.9rem;
  color: #666;
}

.amount {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1vh;
}

.recharge-amount {
  background: white;
  padding: 4vh 4vw;
  border-radius: 2vw;
}

.title {
  font-size: 1rem;
  margin-bottom: 3vh;
  display: block;
}

.amount-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3vw;
}

.amount-item {
  background: #fff1f5;
  border-radius: 2vw;
  padding: 3vh 4vw;
  text-align: center;
  border: 1px solid transparent;
}

.amount-item.active {
  border-color: #FF69B4;
  background: #fff;
}

.coins {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 1vh;
}

.price {
  color: #666;
  font-size: 0.9rem;
}

.notice {
  margin: 4vh 0;
  padding: 0 2vw;
}

.notice-title {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 2vh;
}

.notice-text {
  display: block;
  color: #666;
  font-size: 0.8rem;
  line-height: 1.6;
}

.pay-btn {
  position: fixed;
  bottom: 4vh;
  left: 4vw;
  right: 4vw;
  background: #FF69B4;
  color: white;
  height: 12vw;
  line-height: 12vw;
  border-radius: 6vw;
  font-size: 1rem;
  border: none;
}

.pay-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.pay-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

.pay-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
}

.pay-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}

.pay-title {
  font-size: 32rpx;
  font-weight: 500;
}

.pay-close {
  font-size: 40rpx;
  color: #999;
  padding: 10rpx;
}

.pay-content {
  padding: 40rpx;
}

.pay-amount {
  font-size: 48rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20rpx;
}

.pay-desc {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  margin-bottom: 40rpx;
}

.pay-method {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
  margin-bottom: 40rpx;
}

.pay-icon {
  width: 48rpx;
  height: 48rpx;
  margin-right: 20rpx;
}

.pay-text {
  font-size: 28rpx;
}

.pay-confirm-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  background: #07c160;
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
}
</style>