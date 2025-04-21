<template>
  <view class="answer-book">
    <!-- 欢迎页面 -->
    <view v-if="currentView === 'welcome'" class="welcome-view">
      <view class="book-title">你好，欢迎来到</view>
      <view class="book-name">答案之书</view>
      <view class="book-subtitle">THE BOOK OF ANSWER</view>
      <view class="book-desc">我可以为你解答心中的疑惑 灵灵之中，呈命运般的指引！</view>
      <button class="action-btn" @tap="startTest">开始测试</button>
    </view>

    <!-- 测试步骤页面 -->
    <view v-if="currentView === 'test'" class="test-view">
      <view class="step-container">
        <view class="step-number">1</view>
        <view class="step-title">闭上眼睛 在心里默念你的问题</view>
        <view class="step-example">例如：我应该今天表白吗？ 我会考研上岸吗？</view>
      </view>
      <view class="step-container">
        <view class="step-number">2</view>
        <view class="step-title">深呼吸五秒</view>
        <view class="countdown">{{ countdown }}</view>
      </view>
      <button class="action-btn" @tap="showAnswer" :disabled="!canShowAnswer">揭晓答案</button>
    </view>

    <!-- 结果页面 -->
    <view v-if="currentView === 'result'" class="result-view">
      <view class="result-title">{{ currentAnswer.en }}</view>
      <view class="result-content">{{ currentAnswer.cn }}</view>
      <button class="action-btn" @tap="resetTest">再问一次</button>
    </view>

    <!-- 装饰边框 -->
    <view class="border-decoration">
      <view class="corner top-left">★</view>
      <view class="corner top-right">★</view>
      <view class="corner bottom-left">★</view>
      <view class="corner bottom-right">★</view>
      <view class="border-line top"></view>
      <view class="border-line right"></view>
      <view class="border-line bottom"></view>
      <view class="border-line left"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

// 答案库
const answers = [
  { en: 'FOLLOW SOMEONE ELSE\'S LEAD', cn: '跟着其他人走' },
  { en: 'GO FOR IT', cn: '放手去做' },
  { en: 'WAIT', cn: '等待' },
  { en: 'YES', cn: '是的' },
  { en: 'NO', cn: '不' },
  { en: 'MAYBE', cn: '也许' },
];

// 当前视图状态
const currentView = ref('welcome');
// 倒计时数值
const countdown = ref('5');
// 是否可以显示答案
const canShowAnswer = ref(false);
// 当前答案
const currentAnswer = ref(answers[0]);

// 倒计时定时器
let timer: number | null = null;

// 开始测试
const startTest = () => {
  currentView.value = 'test';
  startCountdown();
};

// 开始倒计时
const startCountdown = () => {
  let count = 5;
  canShowAnswer.value = false;
  countdown.value = count.toString();
  
  timer = setInterval(() => {
    count--;
    countdown.value = count.toString();
    if (count <= 0) {
      clearInterval(timer!);
      canShowAnswer.value = true;
      countdown.value = '准备好了！';
    }
  }, 1000);
};

// 显示答案
const showAnswer = () => {
  if (!canShowAnswer.value) return;
  currentAnswer.value = answers[Math.floor(Math.random() * answers.length)];
  currentView.value = 'result';
};

// 重置测试
const resetTest = () => {
  currentView.value = 'welcome';
  countdown.value = '5';
  canShowAnswer.value = false;
};

// 组件卸载时清理定时器
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.answer-book {
  position: relative;
  min-height: 100vh;
  padding: 40rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFF0F5;
}

/* 欢迎页面样式 */
.welcome-view {
  text-align: center;
}

.book-title {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 40rpx;
}

.book-logo {
  width: 200rpx;
  height: 200rpx;
  margin: 0 auto 30rpx;
}

.logo-image {
  width: 100%;
  height: 100%;
}

.book-name {
  font-size: 48rpx;
  font-weight: bold;
  color: #FF69B4;
  margin-bottom: 20rpx;
}

.book-subtitle {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 30rpx;
}

.book-desc {
  font-size: 28rpx;
  color: #999;
  margin-bottom: 60rpx;
  line-height: 1.5;
}

/* 测试步骤页面样式 */
.test-view {
  width: 100%;
}

.step-container {
  margin-bottom: 60rpx;
  text-align: center;
}

.step-number {
  width: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  background: #FF69B4;
  color: #fff;
  border-radius: 30rpx;
  margin: 0 auto 20rpx;
  font-size: 32rpx;
}

.step-title {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 20rpx;
}

.step-example {
  font-size: 24rpx;
  color: #999;
}

.countdown {
  font-size: 48rpx;
  color: #FF69B4;
  margin: 30rpx 0;
}

/* 结果页面样式 */
.result-view {
  text-align: center;
}

.result-title {
  font-size: 36rpx;
  color: #FF69B4;
  margin-bottom: 30rpx;
}

.result-content {
  font-size: 48rpx;
  color: #333;
  margin-bottom: 60rpx;
}

/* 通用按钮样式 */
.action-btn {
  background: #FF69B4;
  color: #fff;
  border: none;
  border-radius: 40rpx;
  padding: 20rpx 60rpx;
  font-size: 32rpx;
}

.action-btn[disabled] {
  background: #ccc;
}

/* 装饰边框样式 */
.border-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.corner {
  position: absolute;
  font-size: 40rpx;
  color: #FF69B4;
}

.top-left {
  top: 20rpx;
  left: 20rpx;
}

.top-right {
  top: 20rpx;
  right: 20rpx;
}

.bottom-left {
  bottom: 20rpx;
  left: 20rpx;
}

.bottom-right {
  bottom: 20rpx;
  right: 20rpx;
}

.border-line {
  position: absolute;
  background: linear-gradient(to right, #FFB6C1, #FF69B4);
}

.top, .bottom {
  height: 2rpx;
  left: 60rpx;
  right: 60rpx;
}

.left, .right {
  width: 2rpx;
  top: 60rpx;
  bottom: 60rpx;
}

.top { top: 40rpx; }
.right { right: 40rpx; }
.bottom { bottom: 40rpx; }
.left { left: 40rpx; }
</style>