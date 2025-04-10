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
          <image class="back-image" src="/static/zxbjimg/背面A.jpg"></image>
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
  '宝剑2',
  '宝剑3',
  '宝剑4',
  '宝剑5',
  '宝剑6',
  '宝剑7',
  '宝剑8',
  '宝剑9',
  '宝剑10',
  '宝剑国王',
  '宝剑王后',
  '宝剑骑士',
  '宝剑侍卫',
  '宝剑ACE'
]

// 图片路径引用方式
const images = imageNames.map(name => `../../../static/zxbjimg/${name}.jpg`)

// tarotCards数据中的图片路径
const tarotCards = [
  {
    image: '../../../static/zxbjimg/宝剑2.jpg',
    title: '宝剑2',
    description: '宝剑2代表平衡、决策和两难选择。这张牌展示了一个人在两个选择之间寻找平衡，暗示着需要做出理性决定。它象征着权衡利弊、内心冲突和需要保持客观的情况。'
  },
  {
    image: '../../../static/zxbjimg/宝剑3.jpg',
    title: '宝剑3',
    description: '宝剑3象征心痛、悲伤和情感上的失落。这张牌表现了情感创伤和背叛带来的痛苦。它提醒你面对痛苦是治愈的第一步，同时也暗示这种状态是暂时的，终将过去。'
  },
  {
    image: '../../../static/zxbjimg/宝剑4.jpg',
    title: '宝剑4',
    description: '宝剑4代表休息、恢复和内心平静。这张牌显示了在精神压力后的必要休息。它提醒你在面对挑战前需要恢复精力，通过冥想和内省找回内心的平静与力量。'
  },
  {
    image: '../../../static/zxbjimg/宝剑5.jpg',
    title: '宝剑5',
    description: '宝剑5象征冲突、争论和竞争。这张牌表现了人际关系中的紧张和分歧。它提醒你注意沟通方式，避免不必要的争端，同时也暗示有时冲突是解决问题的必要过程。'
  },
  {
    image: '../../../static/zxbjimg/宝剑6.jpg',
    title: '宝剑6',
    description: '宝剑6代表过渡、改变和离开困境。这张牌象征着从困难时期向更好状态的转变。它暗示着需要放下过去，勇敢面对未知，相信前方有更光明的未来在等待。'
  },
  {
    image: '../../../static/zxbjimg/宝剑7.jpg',
    title: '宝剑7',
    description: '宝剑7象征欺骗、策略和隐藏的动机。这张牌展示了试图通过不诚实手段获取优势的情况。它提醒你警惕他人的欺骗，同时也反思自己是否在某些情况下不够诚实。'
  },
  {
    image: '../../../static/zxbjimg/宝剑8.jpg',
    title: '宝剑8',
    description: '宝剑8代表限制、困境和自我设限。这张牌表现了被困在思维模式中的状态。它提醒你有时我们感到的限制是自己创造的，通过改变思维方式可以找到解脱的途径。'
  },
  {
    image: '../../../static/zxbjimg/宝剑9.jpg',
    title: '宝剑9',
    description: '宝剑9象征焦虑、恐惧和过度担忧。这张牌展示了被自己的思想困扰的状态。它提醒你不要让恐惧控制生活，学会区分真实的威胁和想象中的担忧，找回内心的平静。'
  },
  {
    image: '../../../static/zxbjimg/宝剑10.jpg',
    title: '宝剑10',
    description: '宝剑10代表结束、失败和痛苦的终结。这张牌表现了一个周期的结束，虽然可能伴随着痛苦。它提醒你接受结束是新开始的必要条件，最黑暗的时刻也意味着光明即将到来。'
  },
  {
    image: '../../../static/zxbjimg/宝剑国王.jpg',
    title: '宝剑国王',
    description: '宝剑国王象征理性、权威和清晰的思维。这个角色代表一个公正、客观的领导者。他擅长分析复杂情况，做出明智决定，并以真理和正义为指导原则行事。'
  },
  {
    image: '../../../static/zxbjimg/宝剑王后.jpg',
    title: '宝剑王后',
    description: '宝剑王后代表洞察力、直接和独立思考。这个角色象征着清晰的思维和直接的沟通。她鼓励你看清事实真相，不受情感干扰地分析情况，并勇敢地表达自己的想法。'
  },
  {
    image: '../../../static/zxbjimg/宝剑骑士.jpg',
    title: '宝剑骑士',
    description: '宝剑骑士象征行动、勇气和决断力。这个角色代表着快速思考和行动的能量。他鼓励你勇敢追求真理，直面挑战，并以坚定的决心和清晰的思路解决问题。'
  },
  {
    image: '../../../static/zxbjimg/宝剑侍卫.jpg',
    title: '宝剑侍卫',
    description: '宝剑侍卫代表新想法、好奇心和智力挑战。这个角色象征着思维的敏捷和对知识的渴望。他鼓励你保持好奇心，探索新的思路，并以开放的心态接受学习和成长的机会。'
  },
  {
    image: '../../../static/zxbjimg/宝剑ACE.jpg',
    title: '宝剑ACE',
    description: '宝剑ACE象征清晰的思维、突破和新的见解。这张牌代表思想的力量和真理的启示。它鼓励你寻求真相，突破思维限制，并以清晰的视角查看生活中的挑战和机遇。'
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