<template>
  <view class="plan-container">
    <view class="plan-content">
      <view class="section">
        <view class="section-title">我的开发计划</view>
        <text class="section-text">朋友，你好！</text>
        <text class="section-text">希望能为专业使用者提供一个文中却与国际接轨、专业却符合国人习惯的免费软件。</text>
        <text class="section-text">因为期待，所以等待，感谢你对我当前开发计划的关注，也希望你能为我的功能优化提出宝贵意见。</text>
      </view>

      <view class="section">
        <view class="section-title">当前主要目标</view>
        <text class="section-text">2024年，在专业工具方面，我将持续优化占典占星、印度占星及中式工具等。</text>
        <text class="section-text">同时，2024年，我也将注意保持专业与娱乐的平衡，进一步加强广大用户喜欢的塔罗牌等工具。</text>
      </view>

      <view class="section">
        <view class="section-title">一、古占</view>
        <view class="sub-section">
          <text class="sub-title">1.主限法</text>
          <text class="section-text">目前的主限法其实已经比较完善，但在技法上仍有进步空间。2024年将主要配合@Zohar同学来进行这部分的完善。</text>
        </view>
        <view class="sub-section">
          <text class="sub-title">2.阿拉伯点</text>
          <text class="section-text">此前已经开发了自定义阿拉伯点，但是如何在星盘上呈现一直是个难题。截止此时，我已经开发了专用的阿拉伯点星盘，以后将会继续完善。</text>
        </view>
      </view>

      <view class="section">
        <view class="section-title">二、印占</view>
        <view class="sub-section">
          <text class="sub-title">1.大运系统</text>
          <text class="section-text">截止目前，已经开发了Vimsottari和Ashtottari两个大运，但还有好几种复杂的大运尚待开发。</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.plan-container {
  min-height: 100vh;
  background-color: #fff;
  padding: 30rpx;
}

.plan-content {
  padding-bottom: 40rpx;
}

.section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  position: relative;
  padding-left: 20rpx;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6rpx;
  height: 30rpx;
  background-color: #ff6b9d;
  border-radius: 3rpx;
}

.sub-section {
  margin: 20rpx 0;
  padding-left: 20rpx;
}

.sub-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

.section-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.8;
  margin-bottom: 20rpx;
  display: block;
  text-align: justify;
}
</style>