<template>
  <view class="coupon-container">
    <!-- 第一张卡券 -->
    <view class="coupon-item">
      <view class="coupon-left">
        <view class="amount">
          <text class="currency">¥</text>
          <text class="value">5</text>
        </view>
        <view class="desc">满20可用</view>
      </view>
      <view class="coupon-right">
        <view class="title">卡牌券</view>
        <view class="date">有效期至: 2025-12-31</view>
        <view class="use-btn">立即使用</view>
      </view>
      <view class="qr-code"></view>
    </view>

    <!-- 第二张卡券 -->
    <view class="coupon-item">
      <view class="coupon-left">
        <view class="amount">
          <text class="currency">¥</text>
          <text class="value">10</text>
        </view>
        <view class="desc">满50可用</view>
      </view>
      <view class="coupon-right">
        <view class="title">星骰券</view>
        <view class="date">有效期至: 2025-12-31</view>
        <view class="use-btn">立即使用</view>
      </view>
      <view class="qr-code"></view>
    </view>

    <!-- 第三张卡券 -->
    <view class="coupon-item">
      <view class="coupon-left">
        <view class="amount">
          <text class="currency">¥</text>
          <text class="value">20</text>
        </view>
        <view class="desc">满100可用</view>
      </view>
      <view class="coupon-right">
        <view class="title">报告券</view>
        <view class="date">有效期至: 2025-12-31</view>
        <view class="use-btn">立即使用</view>
      </view>
      <view class="qr-code"></view>
    </view>

    <!-- 第四张卡券 -->
    <view class="coupon-item">
      <view class="coupon-left">
        <view class="amount">
          <text class="currency">¥</text>
          <text class="value">50</text>
        </view>
        <view class="desc">满200可用</view>
      </view>
      <view class="coupon-right">
        <view class="title">优惠券</view>
        <view class="date">有效期至: 2025-12-31</view>
        <view class="use-btn">立即使用</view>
      </view>
      <view class="qr-code"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 页面逻辑
</script>

<style>
.coupon-container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.coupon-item {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  position: relative;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.coupon-left {
  width: 200rpx;
  border-right: 1px dashed #eee;
  padding-right: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.amount {
  display: flex;
  align-items: baseline;
  color: #ff6b9d;
}

.currency {
  font-size: 32rpx;
}

.value {
  font-size: 64rpx;
  font-weight: bold;
}

.desc {
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
}

.coupon-right {
  flex: 1;
  padding-left: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.date {
  font-size: 24rpx;
  color: #999;
}

.use-btn {
  width: 160rpx;
  height: 60rpx;
  background: #ff6b9d;
  color: #fff;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
}

.qr-code {
  position: absolute;
  right: 30rpx;
  top: 30rpx;
  width: 80rpx;
  height: 80rpx;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjMiIHk9IjMiIHdpZHRoPSI3IiBoZWlnaHQ9IjciLz48cmVjdCB4PSIxNCIgeT0iMyIgd2lkdGg9IjciIGhlaWdodD0iNyIvPjxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjciIGhlaWdodD0iNyIvPjxyZWN0IHg9IjMiIHk9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSI3Ii8+PC9zdmc+') center/contain no-repeat;
  opacity: 0.2;
}
</style>