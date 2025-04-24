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
          <image class="back-image" src="/static/zxqzimg/背面A.jpg"></image>
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
  '权杖2',
  '权杖3',
  '权杖4',
  '权杖5',
  '权杖6',
  '权杖7',
  '权杖8',
  '权杖9',
  '权杖10',
  '权杖国王',
  '权杖王后',
  '权杖骑士',
  '权杖侍卫',
  '权杖ACE'
]

// 图片路径引用方式
const images = imageNames.map(name => `../../../static/zxqzimg/${name}.jpg`)

// tarotCards数据中的图片路径
const tarotCards = [
  {
    image: '../../../static/zxqzimg/权杖2.jpg',
    title: '权杖2',
    description: '权杖2代表平衡、决策和合作。这张牌展示了一个人在两个选择之间寻找平衡，暗示着需要做出决定或与他人合作。它象征着伙伴关系、谈判和权衡利弊的过程。'
  },
  {
    image: '../../../static/zxqzimg/权杖3.jpg',
    title: '权杖3',
    description: '权杖3象征着计划、团队合作和初步成功。这张牌表示你的创意和努力开始显现成果，但仍需继续发展。它代表着合作精神、共同愿景和创造性的扩展。'
  },
  {
    image: '../../../static/zxqzimg/权杖4.jpg',
    title: '权杖4',
    description: '权杖4代表稳定、休息和庆祝成就。这张牌显示了在奋斗后的短暂休息，让你有时间享受已取得的成果。它提醒你在继续前进前，需要巩固基础并恢复精力。'
  },
  {
    image: '../../../static/zxqzimg/权杖5.jpg',
    title: '权杖5',
    description: '权杖5象征竞争、冲突和挑战。这张牌表示在追求目标的过程中可能遇到的障碍和对抗。它提醒你面对困难时保持坚韧，并学会在竞争中找到自己的优势。'
  },
  {
    image: '../../../static/zxqzimg/权杖6.jpg',
    title: '权杖6',
    description: '权杖6代表胜利、认可和成功。这张牌象征着经过努力后获得的成就和荣誉。它表示你的才能和贡献得到了他人的赞赏，同时也提醒你谦虚地接受赞美。'
  },
  {
    image: '../../../static/zxqzimg/权杖7.jpg',
    title: '权杖7',
    description: '权杖7象征防御、坚持和毅力。这张牌展示了一个人在面对挑战时的坚守立场。它提醒你保护自己的成果，并在面对阻力时不要轻易放弃自己的信念。'
  },
  {
    image: '../../../static/zxqzimg/权杖8.jpg',
    title: '权杖8',
    description: '权杖8代表快速行动、变化和进展。这张牌象征着事情正在迅速发展，需要你保持敏捷和适应性。它暗示着信息传递、旅行或重要消息的到来。'
  },
  {
    image: '../../../static/zxqzimg/权杖9.jpg',
    title: '权杖9',
    description: '权杖9象征准备、防御和坚持。这张牌表示你已经取得了成功，但需要保持警惕以保护自己的成果。它提醒你在最后冲刺前做好充分准备，并坚持到底。'
  },
  {
    image: '../../../static/zxqzimg/权杖10.jpg',
    title: '权杖10',
    description: '权杖10代表负担、责任和压力。这张牌显示了承担过多责任可能带来的疲惫感。它提醒你评估自己的能力范围，学会适当地委派任务和寻求帮助。'
  },
  {
    image: '../../../static/zxqzimg/权杖国王.jpg',
    title: '权杖国王',
    description: '权杖国王象征领导力、创造力和魅力。这张牌代表一个充满热情、有远见且能激励他人的领导者。他擅长将想法转化为行动，并以自信和决断力引导他人。'
  },
  {
    image: '../../../static/zxqzimg/权杖王后.jpg',
    title: '权杖王后',
    description: '权杖王后代表热情、独立和创造力。这张牌象征着一个充满活力、自信且富有魅力的人。她鼓励你表达自己的热情，追求创意，并以积极的态度面对生活。'
  },
  {
    image: '../../../static/zxqzimg/权杖骑士.jpg',
    title: '权杖骑士',
    description: '权杖骑士象征冒险、行动和热情。这张牌代表一个充满活力、勇往直前的人物。他鼓励你追求新的机会，勇敢地迎接挑战，并以热情和决心实现目标。'
  },
  {
    image: '../../../static/zxqzimg/权杖侍卫.jpg',
    title: '权杖侍卫',
    description: '权杖侍卫代表探索、发现和新机会。这张牌象征着新想法的萌芽和冒险的开始。他鼓励你保持好奇心，探索新的可能性，并对未来充满热情和期待。'
  },
  {
    image: '../../../static/zxqzimg/权杖ACE.jpg',
    title: '权杖ACE',
    description: '权杖ACE象征新的开始、灵感和创造力。这张牌代表新机会的种子和潜在的成长。它鼓励你抓住新的想法，开始新的项目，并以热情和活力追求你的目标。'
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