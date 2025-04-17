<template>
  <view class="instruction-container">
    <view class="instruction-content">
      <view class="section">
        <view class="section-title">我是谁，在做什么</view>
        <text class="section-text">陌生人，你好！</text>
        <text class="section-text">我以前从事于互联网旅游行业，是个业余的星座爱好者。自2023年下半年，已经开始全职开发本软件。</text>
        <text class="section-text">和你一样，我对命运、星空充满了好奇。</text>
        <text class="section-text">在澳洲留学期间，因过于无聊，每天晚上在院子里看南半球的银河，并在新浪星座查看星座与血型。</text>
        <text class="section-text">回国工作多年后，开始用空闲时间，比较深入的了解星座，才慢慢触及到各种各样的理念和技巧。</text>
        <text class="section-text">在2020年开始，我把学到的知识转化为一个个小工具，并坚持迭代改进，希望帮助爱好者们顺利上手并感到快乐。</text>
      </view>

      <view class="section">
        <view class="section-title">用户服务</view>
        <text class="section-text">我能可能为你提供的：</text>
        <text class="section-text">一个自我分析的工具，和一些较为温和的字句。</text>
        <text class="section-text bold">我服务的目标：</text>
        <text class="section-text">帮你发现自己的强大，找到自己的方向，学会自我成长。</text>
        <text class="section-text">因此，我不接受看盘咨询，并希望你能独立思考。</text>
        <text class="section-text">此外，2023年，为了软件的改版，希望能建立一个入门级的种子用户群，如果有兴趣的请联系客服（也是我本人）。</text>
      </view>

      <view class="section">
        <view class="section-title">提出建议</view>
        <text class="section-text">正常情况下，这个软件会一直处于完善中，直到成为我心中功能最齐全的软件。</text>
        <text class="section-text">但一个人的知识很有限，我常常需要大家给予提醒和帮助。</text>
        <text class="section-text">我非常愿意接受关于改进软件的建议，如果你发现了问题或者有好想法，请一定告诉我。</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 页面逻辑
</script>

<style>
.instruction-container {
  min-height: 100vh;
  background-color: #fff;
  padding: 30rpx;
}

.instruction-content {
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

.section-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.8;
  margin-bottom: 20rpx;
  display: block;
  text-align: justify;
}

.bold {
  font-weight: bold;
  color: #333;
  margin-top: 20rpx;
}
</style>