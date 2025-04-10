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
          <image class="back-image" src="/static/zxsbimg/背面A.jpg"></image>
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
  '圣杯2',
  '圣杯3',
  '圣杯4',
  '圣杯5',
  '圣杯6',
  '圣杯7',
  '圣杯8',
  '圣杯9',
  '圣杯10',
  '圣杯国王',
  '圣杯王后',
  '圣杯骑士',
  '圣杯侍卫',
  '圣杯ACE'
]

// 图片路径引用方式
const images = imageNames.map(name => `../../../static/zxsbimg/${name}.jpg`)

// tarotCards数据中的图片路径
const tarotCards = [
  {
    image: '../../../static/zxsbimg/圣杯2.jpg',
    title: '圣杯2',
    description: '圣杯2代表伙伴关系、平衡和选择。这张牌展示了两个人之间的情感连接和和谐。它象征着友谊、爱情或合作关系中的平衡与互惠，以及需要在情感层面上做出选择的时刻。'
  },
  {
    image: '../../../static/zxsbimg/圣杯3.jpg',
    title: '圣杯3',
    description: '圣杯3象征庆祝、友谊和共同的喜悦。这张牌表现了人们共同分享快乐时刻的场景。它代表着社交聚会、团队合作的成功，以及与他人一起分享生活中美好时光的重要性。'
  },
  {
    image: '../../../static/zxsbimg/圣杯4.jpg',
    title: '圣杯4',
    description: '圣杯4代表沉思、内省和情感稳定。这张牌显示一个人在平静中反思自己的情感世界。它提醒你需要暂时从外部世界退缩，关注内心需求，并在情感上重新充电。'
  },
  {
    image: '../../../static/zxsbimg/圣杯5.jpg',
    title: '圣杯5',
    description: '圣杯5象征失落、悲伤和情感挑战。这张牌表现了对过去的执着和对现状的不满。它提醒你不要只关注已经失去的东西，而要注意那些仍然存在的积极因素和新的可能性。'
  },
  {
    image: '../../../static/zxsbimg/圣杯6.jpg',
    title: '圣杯6',
    description: '圣杯6代表怀旧、童年记忆和过去的快乐。这张牌唤起对纯真时光的回忆和温暖情感。它象征着与过去和解、重温美好回忆，以及从过去经验中汲取力量面对现在。'
  },
  {
    image: '../../../static/zxsbimg/圣杯7.jpg',
    title: '圣杯7',
    description: '圣杯7象征幻想、选择和内心愿望。这张牌展示了面对多种可能性时的迷惑。它提醒你区分现实与幻想，做出明智的情感选择，并认清自己真正想要的是什么。'
  },
  {
    image: '../../../static/zxsbimg/圣杯8.jpg',
    title: '圣杯8',
    description: '圣杯8代表放弃、转变和寻找更深层次的满足。这张牌表现了离开舒适区寻找更有意义生活的旅程。它象征着情感上的转变，以及为了追求内心真正渴望而愿意放弃已有的安逸。'
  },
  {
    image: '../../../static/zxsbimg/圣杯9.jpg',
    title: '圣杯9',
    description: '圣杯9象征满足、情感丰富和个人成就。这张牌展示了一个人在物质和情感上都达到满足状态。它代表着内心的满足感、情感上的富足，以及对生活的感恩和欣赏。'
  },
  {
    image: '../../../static/zxsbimg/圣杯10.jpg',
    title: '圣杯10',
    description: '圣杯10代表家庭幸福、情感圆满和和谐关系。这张牌展示了理想的家庭和社区生活。它象征着深厚的情感连接、家庭和谐，以及与所爱之人共同创造的幸福生活。'
  },
  {
    image: '../../../static/zxsbimg/圣杯国王.jpg',
    title: '圣杯国王',
    description: '圣杯国王象征情感智慧、同理心和创造力。这个角色代表一个情感成熟、富有同情心的领导者。他擅长理解他人情感，能够在保持温和的同时做出明智的决定。'
  },
  {
    image: '../../../static/zxsbimg/圣杯王后.jpg',
    title: '圣杯王后',
    description: '圣杯王后代表情感丰富、直觉和滋养。这个角色象征着无条件的爱、情感支持和深刻的直觉能力。她鼓励你关注内心的声音，培养同理心，并以爱和关怀对待他人。'
  },
  {
    image: '../../../static/zxsbimg/圣杯骑士.jpg',
    title: '圣杯骑士',
    description: '圣杯骑士象征浪漫、魅力和情感提议。这个角色代表着带着爱和创意前进的能量。他鼓励你追随内心的感受，表达你的情感，并勇敢地向他人传递你的爱与关怀。'
  },
  {
    image: '../../../static/zxsbimg/圣杯侍卫.jpg',
    title: '圣杯侍卫',
    description: '圣杯侍卫代表情感敏感、创意和新的情感体验。这个角色象征着情感上的新开始和创意灵感。他鼓励你保持开放的心态，接受新的情感体验，并用创造性的方式表达你的感受。'
  },
  {
    image: '../../../static/zxsbimg/圣杯ACE.jpg',
    title: '圣杯ACE',
    description: '圣杯ACE象征情感新生、爱的开始和创造力的涌现。这张牌代表新的情感旅程、精神启示或创意灵感的种子。它鼓励你敞开接受新的情感连接和精神成长的机会。'
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