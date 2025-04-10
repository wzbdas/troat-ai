<template>
  <view class="rights-container">
    <view 
      v-for="(image, index) in images" 
      :key="index"
      class="card-wrapper"
      :style="{
        '--rotation': `${-30 + index * 5}deg`,
        animationDelay: `${index * 0.1}s`
      }"
    >
      <view class="card">
        <view class="card-back">
          <!-- 添加图片元素替代背景图 -->
          <image class="back-image" src="/static/zxxbimg/背面A.jpg"></image>
        </view>
        <view class="card-front">
          <image 
            :src="image"
            class="tarot-image"
            mode="aspectFill"
            :alt="`Tarot card ${imageNames[index]}`"
          />
        </view>
      </view>
    </view>
    
    <!-- 添加测一测按钮 -->
    <view class="test-button-wrapper">
      <button class="test-button" @tap="handleRandomCard">测一测</button>
    </view>
    
    <!-- 抽卡结果弹窗 -->
    <view class="card-modal" v-if="showCardModal" @tap.stop="closeModal">
      <view class="modal-content" @tap.stop>
        <view class="modal-header">
          <text class="modal-title">你抽到的卡牌</text>
          <text class="modal-close" @tap="closeModal">×</text>
        </view>
        <view class="selected-card">
          <image 
            :src="selectedCard.image" 
            mode="aspectFill" 
            class="selected-card-image"
          />
          <text class="selected-card-title">{{selectedCard.title}}</text>
          <text class="selected-card-description">{{selectedCard.description}}</text>
        </view>
      </view>
    </view>
  </view>
  <Intro />
  <view class="card-list">
    <view class="card-info" v-for="(card, index) in tarotCards" :key="index">
    <view>
      <image class="card-image" :src="card.image" :alt="card.title" mode="aspectFill"></image>
    </view>
    <view class="card-text">
      <text class="card-title">{{ card.title }}</text>
      <text class="card-description">
        {{ card.description }}
      </text>
    </view>
  </view>
  </view>
</template>

<script setup>
import Intro from './zxx-Intro.vue'
import { ref } from 'vue'
// 注意：先定义imageNames，再使用它
const imageNames = [
  '星币2',
  '星币3',
  '星币4',
  '星币5',
  '星币6',
  '星币7',
  '星币8',
  '星币9',
  '星币10',
  '星币国王',
  '星币王后',
  '星币骑士',
  '星币侍卫',
  '星币ACE'
]

// 图片路径引用方式
const images = imageNames.map(name => `../../../static/zxxbimg/${name}.jpg`)

// tarotCards数据中的图片路径
const tarotCards = [
  {
    image: '../../../static/zxxbimg/星币2.jpg',
    title: '星币2',
    description: '星币2代表平衡、合作和财务决策。这张牌展示了一个人在物质资源方面寻找平衡，暗示着需要明智地管理资源。它象征着伙伴关系中的财务合作、价值交换和务实的决策过程。'
  },
  {
    image: '../../../static/zxxbimg/星币3.jpg',
    title: '星币3',
    description: '星币3象征技艺、团队合作和专业成长。这张牌表现了通过勤奋工作和专注发展技能的过程。它代表着职业发展、手工艺术和通过实践获得的专业知识与成就。'
  },
  {
    image: '../../../static/zxxbimg/星币4.jpg',
    title: '星币4',
    description: '星币4代表安全感、节俭和物质稳定。这张牌显示了对资源的保护和积累。它提醒你建立财务安全网，合理规划未来，同时也警惕过度吝啬可能带来的孤立。'
  },
  {
    image: '../../../static/zxxbimg/星币5.jpg',
    title: '星币5',
    description: '星币5象征物质困难、健康挑战和暂时的逆境。这张牌表现了在物质层面上的挣扎。它提醒你即使在困难时期，也要保持希望，寻求帮助，相信这只是人生旅程中的一个阶段。'
  },
  {
    image: '../../../static/zxxbimg/星币6.jpg',
    title: '星币6',
    description: '星币6代表慷慨、互助和物质支持。这张牌象征着给予和接受帮助的平衡。它表示通过分享资源创造的和谐关系，以及在物质和精神层面上的互惠互利。'
  },
  {
    image: '../../../static/zxxbimg/星币7.jpg',
    title: '星币7',
    description: '星币7象征耐心、长期投资和持续努力。这张牌展示了为未来收获而播种的过程。它提醒你坚持不懈地努力，相信你的劳动最终会结出丰硕的果实。'
  },
  {
    image: '../../../static/zxxbimg/星币8.jpg',
    title: '星币8',
    description: '星币8代表技能精进、专注工作和职业发展。这张牌象征着通过专注和勤奋获得的成就。它鼓励你投入时间发展专业技能，追求卓越，并享受工作带来的满足感。'
  },
  {
    image: '../../../static/zxxbimg/星币9.jpg',
    title: '星币9',
    description: '星币9象征物质丰富、独立和自给自足。这张牌表示通过努力工作获得的物质成功和安全感。它代表着享受劳动成果的满足，以及在物质层面上实现的独立和自由。'
  },
  {
    image: '../../../static/zxxbimg/星币10.jpg',
    title: '星币10',
    description: '星币10代表家族财富、传承和物质圆满。这张牌展示了物质和家庭生活的丰盛与和谐。它象征着世代相传的价值观、家族企业，以及在物质和精神层面上的富足与安全。'
  },
  {
    image: '../../../static/zxxbimg/星币国王.jpg',
    title: '星币国王',
    description: '星币国王象征财富管理、商业智慧和实用主义。这个角色代表一个成功的商人或管理者。他擅长创造和维护财富，以稳健和务实的方式处理物质资源，为他人提供安全和稳定。'
  },
  {
    image: '../../../static/zxxbimg/星币王后.jpg',
    title: '星币王后',
    description: '星币王后代表丰饶、实用智慧和物质滋养。这个角色象征着创造舒适环境和物质安全的能力。她鼓励你关注实际需求，培养自给自足的能力，并以慷慨和务实的态度管理资源。'
  },
  {
    image: '../../../static/zxxbimg/星币骑士.jpg',
    title: '星币骑士',
    description: '星币骑士象征勤奋、责任感和可靠性。这个角色代表着踏实前进的能量。他鼓励你保持专注和耐心，一步一步实现目标，并以负责任和值得信赖的态度处理物质事务。'
  },
  {
    image: '../../../static/zxxbimg/星币侍卫.jpg',
    title: '星币侍卫',
    description: '星币侍卫代表学习、机会和新的物质开始。这个角色象征着对实用知识的追求和新项目的起步。他鼓励你保持开放的心态学习新技能，关注细节，并为未来的成功打下坚实基础。'
  },
  {
    image: '../../../static/zxxbimg/星币ACE.jpg',
    title: '星币ACE',
    description: '星币ACE象征新的物质开始、机遇和繁荣的种子。这张牌代表财富、健康或实际成就的新可能性。它鼓励你抓住物质层面的机会，开始新的项目，并相信你有能力创造丰盛的未来。'
  }
]

// 添加抽卡相关的响应式变量
const showCardModal = ref(false)
const selectedCard = ref({})

// 随机抽取卡牌的方法
const handleRandomCard = () => {
  // 随机选择一张卡牌
  const randomIndex = Math.floor(Math.random() * tarotCards.length)
  selectedCard.value = tarotCards[randomIndex]
  
  // 显示弹窗
  showCardModal.value = true
}

// 关闭弹窗
const closeModal = () => {
  showCardModal.value = false
}
</script>

<style scoped>
.rights-container {
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: pink;
  border: 2rpx solid black;
  padding: 0;
}

.test-button-wrapper {
  position: absolute;
  bottom: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
.test-button {
  width: 160rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background: linear-gradient(130deg, #ff4081, #f50057);
  border: 4rpx solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  transition: all 0.3s ease;
}

.test-button:active {
  transform: scale(0.95);
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.3);
}

.card-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-content {
  background-color: white;
  padding: 30rpx;
  border-radius: 20rpx;
  width: 80%;
  max-width: 600rpx;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.modal-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

.modal-close {
  font-size: 48rpx;
  color: #999;
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.selected-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
}

.selected-card-image {
  width: 200rpx;
  height: 320rpx;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.2);
}

.selected-card-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 15rpx;
}

.selected-card-description {
  font-size: 28rpx;
  text-align: center;
  line-height: 1.5;
  color: #333;
}

.card-wrapper {
  position: absolute;
  /* 修改定位，从底部改为中心 */
  top: 50%;
  left: 50%;
  transform-origin: center;
  /* 修改初始位置为中心 */
  transform: translate(-50%, -50%);
  animation: fanOut 0.8s ease-out forwards;
  opacity: 0;
}

.card {
  position: relative;
  width: 160rpx;
  height: 220rpx;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  /* 添加阴影增强视觉效果 */
  box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.3);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
}

.card-front {
  transform: rotateY(180deg);
}

.card-back {
  background: linear-gradient(135deg, #7b68ee, #4b0082);
  background-size: cover;
  background-position: center;
}

.back-image {
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}

.tarot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8rpx;
}

/* 修改动画，使卡牌从左侧移动到中心 */
@keyframes fanOut {
  0% {
    opacity: 0;
    transform: translate(-150%, -50%) rotate(-30deg);
  }
  100% {
    opacity: 1;
    /* 使用计算的旋转角度，并保持在中心位置 */
    transform: translate(-50%, -50%) rotate(var(--rotation, 0deg));
  }
}

.card-list {
  display: flex;
  flex-direction: column; /* 卡片垂直排列 */
  align-items: center; /* 居中对齐 */
  padding: 1rem;
  background-color: #f8f8f8; /* 背景色 */
  min-height: 100vh; /* 占满屏幕高度 */
  box-sizing: border-box;
}
.card-info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background-image: linear-gradient(to right, #ff4ca8d9, #e592c7c1);
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 16rpx;
  width: 92%;
  padding: 15rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}
.card-image{
  width: 200rpx;
  height: 300rpx;
  margin: 10rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
}

.card-text {
  flex: 1;
  padding: 10rpx;
  display: flex;
  flex-direction: column;
}

.card-title{
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 15rpx;
  margin-left: 5rpx;
  display: block;
  color: #333;
}

.card-description{
  font-size: 28rpx;
  margin-bottom: 10rpx;
  margin-right: 10rpx;
  text-align: justify;
  max-height: 220rpx;
  overflow-y: auto;
  line-height: 1.6;
  display: block;
  color: #444;
  padding-right: 10rpx;
}

/* 添加滚动条样式 */
.card-description::-webkit-scrollbar {
  width: 4rpx;
}

.card-description::-webkit-scrollbar-thumb {
  background-color: rgba(255, 76, 141, 0.5);
  border-radius: 4rpx;
}
</style>