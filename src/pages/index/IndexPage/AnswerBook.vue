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
        <view class="countdown" :class="{ 'ready': countdown === '准备好了！' }">{{ countdown }}</view>
      </view>
      <button class="action-btn" @tap="showAnswer" :disabled="!canShowAnswer" :class="{ 'btn-ready': canShowAnswer }">揭晓答案</button>
    </view>

    <!-- 结果页面 -->
    <view v-if="currentView === 'result'" class="result-view">
      <view class="result-card">
        <view class="result-title">{{ currentAnswer.en }}</view>
        <view class="result-content">{{ currentAnswer.cn }}</view>
        <view class="result-desc">{{ currentAnswer.desc }}</view>
      </view>
      <view class="button-group">
        <button class="action-btn" @tap="resetTest">再问一次</button>
      </view>
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
import { ref, onUnmounted, computed } from 'vue';

// 答案库
const answers = [
  { en: 'FOLLOW SOMEONE ELSE\'S LEAD', cn: '跟着其他人走', desc: '有时候，最好的决策是跟随他人的脚步，从他们的经验中学习。' },
  { en: 'GO FOR IT', cn: '放手去做', desc: '不要犹豫，勇敢地追求你想要的，机会稍纵即逝。' },
  { en: 'WAIT', cn: '等待', desc: '现在不是行动的最佳时机，耐心等待更好的机会到来。' },
  { en: 'YES', cn: '是的', desc: '命运之轮已经转向你的方向，这是一个肯定的信号。' },
  { en: 'NO', cn: '不', desc: '这可能不是你最好的选择，考虑其他可能性。' },
  { en: 'MAYBE', cn: '也许', desc: '情况尚不明朗，需要更多思考和信息才能做出决定。' },
  { en: 'TRUST YOUR INTUITION', cn: '相信你的直觉', desc: '你内心深处已经知道答案，倾听你的内心声音。' },
  { en: 'RECONSIDER', cn: '重新考虑', desc: '现在的计划可能需要调整，不妨从不同角度思考问题。' },
  { en: 'BE PATIENT', cn: '保持耐心', desc: '好事多磨，坚持下去，你会看到努力的回报。' },
  { en: 'TAKE A RISK', cn: '冒险一试', desc: '有时候，最大的风险是不冒险，勇敢踏出舒适区。' },
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
      
      // 添加按钮震动效果
      vibrateButton();
    }
  }, 1000);
};

// 按钮震动效果
const vibrateButton = () => {
  // 在支持震动的设备上提供触觉反馈
  if (uni.vibrateShort) {
    uni.vibrateShort();
  }
};

// 显示答案
const showAnswer = () => {
  if (!canShowAnswer.value) return;
  // 随机选择一个答案，避免重复
  const randomIndex = Math.floor(Math.random() * answers.length);
  currentAnswer.value = answers[randomIndex];
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
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

/* 欢迎页面样式 */
.welcome-view {
  text-align: center;
  animation: fadeIn 0.8s ease-in-out;
}

.book-title {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 40rpx;
}

.book-name {
  font-size: 56rpx;
  font-weight: bold;
  color: #FF69B4;
  margin-bottom: 20rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.book-subtitle {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 30rpx;
  letter-spacing: 2rpx;
}

.book-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 60rpx;
  line-height: 1.6;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}

/* 测试步骤页面样式 */
.test-view {
  width: 100%;
  animation: fadeIn 0.8s ease-in-out;
}

.step-container {
  margin-bottom: 60rpx;
  text-align: center;
}

.step-number {
  width: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  background: linear-gradient(135deg, #FF69B4, #FF1493);
  color: #fff;
  border-radius: 30rpx;
  margin: 0 auto 20rpx;
  font-size: 32rpx;
  box-shadow: 0 4rpx 8rpx rgba(255, 105, 180, 0.3);
}

.step-title {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.step-example {
  font-size: 24rpx;
  color: #999;
  line-height: 1.5;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.countdown {
  font-size: 60rpx;
  color: #FF69B4;
  margin: 30rpx 0;
  font-weight: bold;
  transition: all 0.3s ease;
}

.countdown.ready {
  color: #32CD32;
  animation: pulse 1.5s infinite;
}

/* 结果页面样式 */
.result-view {
  text-align: center;
  animation: fadeIn 0.8s ease-in-out;
  width: 100%;
}

.result-card {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
}

.result-title {
  font-size: 36rpx;
  color: #FF69B4;
  margin-bottom: 30rpx;
  font-weight: bold;
}

.result-content {
  font-size: 56rpx;
  color: #333;
  margin-bottom: 30rpx;
  font-weight: bold;
}

.result-desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  margin-top: 20rpx;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20rpx;
  margin-top: 20rpx;
}

/* 通用按钮样式 */
.action-btn {
  background: linear-gradient(135deg, #FF69B4, #FF1493);
  color: #fff;
  border: none;
  border-radius: 40rpx;
  padding: 20rpx 60rpx;
  font-size: 32rpx;
  box-shadow: 0 4rpx 10rpx rgba(255, 105, 180, 0.4);
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2rpx 5rpx rgba(255, 105, 180, 0.4);
}

.action-btn[disabled] {
  background: #ccc;
  box-shadow: none;
}

.btn-ready {
  animation: pulse 1.5s infinite;
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
  opacity: 0.8;
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
  opacity: 0.6;
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

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20rpx); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style>