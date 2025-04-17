<template>
   <view class="circle-container">
    <view 
      v-for="(image, index) in images" 
      :key="index"
      class="image-wrapper"
      :style="{
        transform: `rotate(${index * (360 / images.length)}deg) translateY(-${circleRadius}px) rotate(${rotationAngle}deg)`
      }"
    >
      <image 
        :src="image"
        class="tarot-image"
        mode="aspectFill"
        :style="{
          transform: `rotate(-${index * (360 / images.length)}deg)`
        }"
        @error="handleImageError(index)"
      />
    </view>
    <view class="center-button-wrapper">
      <button class="select-button" @tap="handleSelect">
        <text class="button-text">随机抽</text>
      </button>
    </view>
    <!-- 选择抽牌数量的弹窗 -->
  <view class="modal" v-if="showModal">
    <view class="modal-content">
      <view class="modal-title">请选择抽取数量</view>
      <view class="modal-buttons">
        <button @tap="handleDrawCards(1)" class="modal-button">抽一张</button>
        <!-- <button @tap="handleDrawCards(2)" class="modal-button">抽两张</button> -->
        <button @tap="handleDrawCards(3)" class="modal-button">抽三张</button>
      </view>
    </view>
  </view>
  <!-- 展示抽到的卡牌弹窗 -->
  <view class="modal" v-if="showCardModal">
    <view class="modal-content">
      <view class="modal-header">
        <view class="modal-title">你抽到的卡牌</view>
        <view class="modal-close" @tap="closeCardModal">×</view>
      </view>
      <view class="selected-cards">
        <view v-for="(card, index) in selectedCards" :key="index" class="selected-card">
          <image :src="card.image" mode="aspectFill" class="selected-card-image"/>
          <text class="selected-card-title">{{card.title}}</text>
        </view>
      </view>
      <view class="modal-actions">
        <button @tap="handleSelfReading" class="modal-button self-reading">自助解牌</button>
        <button @tap="handleAIReading" class="modal-button ai-reading">AI解牌</button>
      </view>
    </view>
  </view>
  </view>
    <Intro />
 
    <view class="card-list">
  <view class="card-info" v-for="(card, index) in visibleCards" :key="index">
    <view>
      <image 
        class="card-image" 
        :src="card.image" 
        :alt="card.title"
        mode="aspectFill"
        @error="handleCardImageError(index)"
      />
    </view>
    <view class="card-text">
      <p class="card-title">{{ card.title }}</p>
      <p class="card-description">
        {{ card.description }}
      </p>
    </view>
  </view>
  
  <!-- 加载更多按钮 -->
  <view v-if="visibleCards.length < tarotCards.length" class="load-more">
    <button @tap="loadMoreCards" class="load-more-button">加载更多</button>
  </view>
</view>
 

</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive,computed } from 'vue'
import Intro from './zxx-Intro.vue'

// 添加新的响应式变量
const showModal = ref(false)
const showCardModal = ref(false)
const selectedCards = ref([])
const rotationDuration = 8000 // 旋转持续时间（毫秒）

//#ifdef MP-WEIXIN
const getImagePath = (name) => {
  return `/static/zx-images/${name}.jpg`
}
//#endif

// 修改图片数组处理
const images = [
  '00愚者', '01魔术师', '02女祭祀', '03皇后', '04皇帝',
  '05教皇', '06恋人', '07战车', '08力量', '09隐士',
  '10命运之轮', '11正义', '12倒吊人', '13死神', '14节制',
  '15恶魔', '16高塔', '17星星', '18月亮', '19太阳',
  '20审判', '21世界'
].map(name => getImagePath(name))


const circleRadius = ref(0)
const rotationAngle = ref(0)
const rotationSpeed = ref(5)
const isRotating = ref(false)
let rotationInterval = null

// 修改计算圆的半径的方法
const calculateRadius = () => {
  try {
    const systemInfo = uni.getSystemInfoSync()
    const containerWidth = 600
    const imageWidth = 90
    const availableRadius = (containerWidth - imageWidth) / 2
    circleRadius.value = uni.upx2px(availableRadius) // 转换为px单位
  } catch (error) {
    console.error('计算半径时出错:', error)
    circleRadius.value = uni.upx2px(320)
  }
}

// 添加旋转动画方法
const startRotation = () => {
  isRotating.value = true
  rotationSpeed.value = 5 // 初始速度
  rotationInterval = setInterval(() => {
    rotationAngle.value = (rotationAngle.value + rotationSpeed.value) % 360
  }, 50)

  // 8秒后停止旋转并显示选择弹窗
  setTimeout(() => {
    stopRotation()
    showModal.value = true
  }, rotationDuration)
}

const stopRotation = () => {
  isRotating.value = false
  clearInterval(rotationInterval)
}

const handleSelect = () => {
  if (!isRotating.value) {
    startRotation()
  } else {
    stopRotation()
  }
}

// 处理抽牌
const handleDrawCards = (count) => {
  showModal.value = false
  selectedCards.value = []
  
  // 随机抽取指定数量的卡片
  const shuffled = [...tarotCards].sort(() => 0.5 - Math.random())
  selectedCards.value = shuffled.slice(0, count)
  
  showCardModal.value = true
}

// 关闭卡牌展示弹窗
const closeCardModal = () => {
  showCardModal.value = false
  selectedCards.value = []
}

// 处理自助解牌
const handleSelfReading = () => {
  console.log('自助解牌', selectedCards.value)
  uni.showToast({
    title: '正在进入自助解牌...',
    icon: 'none'
  })
}

// 处理AI解牌
const handleAIReading = () => {
  console.log('AI解牌', selectedCards.value)
  uni.showToast({
    title: 'AI正在解析您的牌面...',
    icon: 'none'
  })
}


const handleImageError = (index) => {
  console.error(`图片加载失败: ${images[index]}`)
  // 可以在这里添加默认图片替换逻辑
}

onMounted(() => {
  calculateRadius()
})

onUnmounted(() => {
  clearInterval(rotationInterval)
})

const tarotCards = [
  {
    image: '../../../static/zx-images/00愚者.jpg',
    title: '愚人',
    description: '他十分愚蠢，缺乏理性判断的能力；有的则指出他极端崇尚精神层面，不在乎现实。总的来说就是凭直觉行事、没有拒绝和抵抗的能力；同时，也代表了愚蠢、冲动和虚无。不过他们之中较成熟的，则会从生命的历练中学取经验，然后成为自己理想中的人。'
  },
  {
    image: '../../../static/zx-images/01魔术师.jpg',
    title: '魔术师',
    description: '魔术师代表创造力和自信。他拥有将想法变为现实的能力，象征着无限的可能性。然而，他也可能显得过于自信或操控他人，需注意平衡。'
  },
  {
    image: '../../../static/zx-images/02女祭祀.jpg',
    title: '女祭司',
    description: '女祭司象征直觉、智慧和神秘。她鼓励倾听内心的声音，探索隐藏的真相。但她也可能显得过于内向或神秘，需学会表达自己。'
  },
  {
    image: '../../../static/zx-images/03皇后.jpg',
    title: '皇后',
    description: '皇后象征丰收、母性和滋养。她代表温暖、爱与关怀，但有时可能过于保护或控制，需学会放手。'
  },
  {
    image: '../../../static/zx-images/04皇帝.jpg',
    title: '皇帝',
    description: '皇帝代表权威、结构和控制。他象征稳定和秩序，但也可能显得过于固执或霸道，需学会灵活。'
  },
  {
    image: '../../../static/zx-images/05教皇.jpg',
    title: '教皇',
    description: '教皇象征传统、信仰和指导。他代表精神上的指引，但也可能显得过于教条，需学会接纳不同观点。'
  },
  {
    image: '../../../static/zx-images/06恋人.jpg',
    title: '恋人',
    description: '恋人代表爱情、选择和和谐。它象征关系的美好，但也提醒你在面临选择时要跟随内心。'
  },
  {
    image: '../../../static/zx-images/07战车.jpg',
    title: '战车',
    description: '战车象征意志力、控制和胜利。它代表通过决心和努力达成目标，但也提醒你不要过于冲动。'
  },
  {
    image: '../../../static/zx-images/08力量.jpg',
    title: '力量',
    description: '力量象征内在的勇气、耐心和控制。它提醒你在面对挑战时保持冷静和温柔，而不是使用暴力。'
  },
  {
    image: '../../../static/zx-images/09隐士.jpg',
    title: '隐士',
    description: '隐士象征内省、智慧和孤独。他鼓励你寻找内在的真相，但也可能显得过于孤僻，需学会与他人分享。'
  },
  {
    image: '../../../static/zx-images/10命运之轮.jpg',
    title: '命运之轮',
    description: '命运之轮代表变化、命运和周期。它提醒你生活中的起伏是正常的，学会接受和适应变化。'
  },
  {
    image: '../../../static/zx-images/11正义.jpg',
    title: '正义',
    description: '正义象征公平、真相和因果。它提醒你做出决定时要保持公正，但也可能显得过于苛刻。'
  },
  {
    image: '../../../static/zx-images/12倒吊人.jpg',
    title: '倒吊人',
    description: '倒吊人象征牺牲、转变和新的视角。它鼓励你放下执念，从不同角度看待问题。'
  },
  {
    image: '../../../static/zx-images/13死神.jpg',
    title: '死神',
    description: '死神象征结束、转变和新生。它代表旧事物的终结和新篇章的开始，但也可能带来恐惧和抗拒。'
  },
  {
    image: '../../../static/zx-images/14节制.jpg',
    title: '节制',
    description: '节制象征平衡、和谐和耐心。它提醒你在生活中找到中庸之道，避免极端。'
  },
  {
    image: '../../../static/zx-images/15恶魔.jpg',
    title: '恶魔',
    description: '恶魔象征诱惑、束缚和欲望。它警告你可能被物质或不良习惯所困，需学会释放自己。'
  },
  {
    image: '../../../static/zx-images/16高塔.jpg',
    title: '高塔',
    description: '高塔象征突变、破坏和觉醒。它代表旧结构的崩塌，但也带来新的启示和成长。'
  },
  {
    image: '../../../static/zx-images/17星星.jpg',
    title: '星星',
    description: '星星象征希望、灵感和治愈。它代表在黑暗后的光明，鼓励你保持信念和乐观。'
  },
  {
    image: '../../../static/zx-images/18月亮.jpg',
    title: '月亮',
    description: '月亮象征幻象、恐惧和潜意识。它提醒你面对内心的不安，探索隐藏的真相。'
  },
  {
    image: '../../../static/zx-images/19太阳.jpg',
    title: '太阳',
    description: '太阳象征成功、活力和喜悦。它代表光明和正能量，预示着幸福和成就。'
  },
  {
    image: '../../../static/zx-images/20审判.jpg',
    title: '审判',
    description: '审判象征觉醒、评估和重生。它鼓励你反思过去，迎接新的开始。'
  },
  {
    image: '../../../static/zx-images/21世界.jpg',
    title: '世界',
    description: '世界象征完成、和谐和圆满。它代表目标的达成和旅程的结束，是成功的象征。'
  }
]

// 图片懒加载相关
const isImgLoaded = reactive({})
// 使用简单的分页加载替代懒加载
const pageSize = 5 // 每页显示5张卡片
const currentPage = ref(1)

// 计算当前可见的卡片
const visibleCards = computed(() => {
  return tarotCards.slice(0, currentPage.value * pageSize)
})

// 加载更多卡片
const loadMoreCards = () => {
  if (currentPage.value * pageSize < tarotCards.length) {
    currentPage.value++
  }
}

// 处理卡片图片加载错误
const handleCardImageError = (index) => {
  console.error(`卡片图片加载失败: ${tarotCards[index].image}`)
}

onMounted(() => {
  calculateRadius()
  // 不再需要初始化图片加载状态
})


</script>

<style scoped>
.circle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 750rpx;
  height: 850rpx;
  position: relative;
  margin: 0 auto;
  background: linear-gradient(135deg, #fce4ec, #f8bbd0);
  border-radius: 10rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
}

.image-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90rpx;
  height: 140rpx;
  margin-left: -45rpx;
  margin-top: -70rpx;
  transform-origin: center;
  transition: transform 0.3s ease;
}

.tarot-image {
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
  border: 2rpx solid #fff;
  object-fit: cover;
}

.center-button-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.select-button {
  width: 160rpx;
  height: 140rpx;
  border-radius: 50%;
  background: linear-gradient(130deg, #ff4081, #f50057);
  border: 4rpx solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.select-button:hover {
  background: linear-gradient(130deg, #f50057, #ff4081);
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
  flex-direction: row; /* 明确设置为横向排列 */
  justify-content: flex-start; /* 内容左对齐 */
  align-items: flex-start; /* 垂直方向顶部对齐 */
  background-image: linear-gradient(to right, pink, #fff);
  margin-top: 10px;
  border-radius: 10px;
}
.card-image{
  width: 30vw;
  height: 35vh;
  margin: 10px;
  border-radius: 10px;
}

.card-title{
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  margin-left: 5px;
}

.card-description{
  font-size: 16px;
  margin-bottom: 10px;
  margin-right: 10px;
  text-align: justify; /* 两端对齐，增强阅读体验 */
  max-height: 150px; /* 限制描述区域高度 */
  overflow-y: auto; /* 文字过长时可滚动 */
  line-height: 1.5;
}

.modal {
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
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 300px;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.modal-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex: 1;
}

.modal-close {
  font-size: 24px;
  color: #999;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
}
.modal-close:hover {
  background-color: #f0f0f0;
  color: #666;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}

.modal-button {
  flex: 1;
  margin: 10px;
  border-radius: 5px;
  color: black;
  border: none;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: pink;
}
.self-reading {
  background: linear-gradient(130deg, #ff4081, #f50057);
}

.self-reading:hover {
  background: linear-gradient(130deg, #f50057, #ff4081);
  transform: translateY(-2px);
}

.ai-reading {
  background: linear-gradient(130deg, #7b1fa2, #6a1b9a);
}

.ai-reading:hover {
  background: linear-gradient(130deg, #6a1b9a, #7b1fa2);
  transform: translateY(-2px);
}
.selected-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
}

.selected-card {
  width: 120rpx;
  text-align: center;
}

.selected-card-image {
  width: 100%;
  height: 180rpx;
  border-radius: 5px;
  margin-bottom: 5px;
}

.selected-card-title {
  font-size: 14px;
  color: #333;
}

.load-more {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.load-more-button {
  background: linear-gradient(130deg, #e2306b, #e79ab5);
  color: white;
  padding: 5px 10px;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  width: 350px;
}

.load-more-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>