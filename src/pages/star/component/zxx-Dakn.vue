<template>
  <div class="circle-container" ref="containerRef">
    <div class="circle-wrapper">
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="image-wrapper"
        :style="{
          transform: `rotate(${index * (360 / images.length)}deg) translateX(${circleRadius}px)`
        }"
      >
        <img 
          :src="image"
          class="tarot-image"
          :alt="`Tarot card ${imageNames[index]}`"
          :style="{
            transform: `rotate(-${index * (360 / images.length)}deg)`
          }"
        />
      </div>
      <div class="center-button-wrapper">
        <button class="select-button" @click="handleSelect">
          <span class="button-text">选一选</span>
          <div class="ripple-effect"></div>
        </button>
      </div>
    </div>
    
  </div>
  <Intro />
  <div class="card-list">
    <div class="card-info" v-for="(card, index) in tarotCards"
    :key="index">
    <div >
      <img class="card-image" :src="card.image" :alt="card.title">
    </div>
    <div class="card-text">
      <p class="card-title">{{ card.title }}</p>
      <p class="card-description">
        {{ card.description }}
      </p>
    </div>
  </div>
  </div>
  
</template>

<script setup>
import { ref, onBeforeMount, onUnmounted, nextTick } from 'vue';
import Intro from './zxx-Intro.vue'

// 图片名称数组
const imageNames = [
  '00愚者', '01魔术师', '02女祭祀', '03皇后', '04皇帝',
  '05教皇', '06恋人', '07战车', '08力量', '09隐士',
  '10命运之轮', '11正义', '12倒吊人', '13死神', '14节制',
  '15恶魔', '16高塔', '17星星', '18月亮', '19太阳',
  '20审判', '21世界'
]
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
// 生成图片路径
const images = imageNames.map(name => `../../../static/zx-images/${name}.jpg`)

const circleRadius = ref(120) // 设置默认半径
const containerRef = ref(null)

// 计算圆的半径
const calculateRadius = () => {
  if (!containerRef.value) return
  
  const container = containerRef.value
  const containerRect = container.getBoundingClientRect()
  const containerSize = Math.min(containerRect.width * 0.2, containerRect.height * 0.2)
  const cardSize = { width: 40, height: 60 }
  
  circleRadius.value = (containerSize - cardSize.width) / 1.2
}

// 监听窗口大小变化
const handleResize = () => {
  calculateRadius()
}

onBeforeMount(() => {
  nextTick(() => {
    calculateRadius()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }
  })
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})

const handleSelect = () => {
  // 这里可以添加选牌逻辑
  console.log('选择卡牌')
}
</script>

<style scoped>
.circle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  background: #f8f8f8;
  border: 1px solid #000;
}

.circle-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 20px; */
}

.image-wrapper {
  position: absolute;
  transform-origin: center;
  width: 40px;
  height: 60px;
  margin-left: -20px;
  margin-top: -30px;
  transition: all 0.3s ease;
}

.tarot-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.image-wrapper:hover .tarot-image {
  transform: scale(1.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 3;
}


.center-button-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.select-button {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(130deg, #f19fb9, #efa1ba);
  border: none;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
              -5px -5px 10px rgba(255, 255, 255, 0.8);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.button-text {
  position: relative;
  z-index: 2;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.select-button:hover {
  transform: scale(1.05);
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.12),
              -6px -6px 12px rgba(240, 5, 181, 0.9);
}

.select-button:active {
  transform: scale(0.95);
  box-shadow: inset 4px 4px 8px rgba(214, 9, 9, 0.1),
              inset -4px -4px 8px rgba(228, 10, 119, 0.9);
}

.ripple-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transition: all 0.6s ease;
}

.select-button:hover .ripple-effect {
  width: 150%;
  height: 150%;
  background: rgba(255, 255, 255, 0);
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
  background-image: linear-gradient(to right, #ff4ca8d9, #e592c7c1);
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
</style>