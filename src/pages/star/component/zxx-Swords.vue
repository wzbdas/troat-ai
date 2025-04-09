<template>
    <div class="cups-container">
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="card-wrapper"
        :style="{
          '--rotation': `${-30 + index * 5}deg`,
          animationDelay: `${index * 0.1}s`
        }"
      >
        <div class="card">
          <div class="card-back">
            <!-- 添加图片元素替代背景图 -->
            <image class="back-image" src="/static/zxbjimg/背面A.jpg"></image>
          </div>
          <div class="card-front">
            <img 
              :src="image"
              class="tarot-image"
              :alt="`Tarot card ${imageNames[index]}`"
            >
          </div>
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
  import Intro from './zxx-Intro.vue'
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
  
  const images = imageNames.map(name => `../../../static/zxbjimg/${name}.jpg`)

  const tarotCards = [
  {
    image: '../../../static/zxbjimg/宝剑2.jpg',
    title: '宝剑2',
    description: '宝剑2象征着决策和平衡。这张牌展示了内心的矛盾与选择，代表着需要在对立的观点之间找到平衡。它提醒你在做决定时要保持理性和公正。'
  },
  {
    image: '../../../static/zxbjimg/宝剑3.jpg',
    title: '宝剑3',
    description: '宝剑3代表心痛和失落。这张牌象征着情感上的伤害和背叛，提醒我们有时痛苦是不可避免的。它教导我们如何面对和克服心灵的创伤。'
  },
  {
    image: '../../../static/zxbjimg/宝剑4.jpg',
    title: '宝剑4',
    description: '宝剑4象征休息和恢复。这张牌表示需要从精神压力中暂时抽离，给自己时间休养生息。它提醒你在面对挑战时也要懂得适时休息。'
  },
  {
    image: '../../../static/zxbjimg/宝剑5.jpg',
    title: '宝剑5',
    description: '宝剑5象征冲突和失败。这张牌表示在竞争或争斗中遭遇挫折，提醒我们有时失败是不可避免的。它教导我们如何从失败中吸取教训，重新站起来。'
  },
  {
    image: '../../../static/zxbjimg/宝剑6.jpg',
    title: '宝剑6',
    description: '宝剑6象征转变和过渡。这张牌代表着离开困境，寻求新的方向。它提醒你有时需要勇气来改变现状，寻找更好的可能性。'
  },
  {
    image: '../../../static/zxbjimg/宝剑7.jpg',
    title: '宝剑7',
    description: '宝剑7代表策略和谋划。这张牌表示需要智慧和计划来应对挑战。它提醒你在面对困难时要运用智慧，而不是莽撞行事。'
  },
  {
    image: '../../../static/zxbjimg/宝剑8.jpg',
    title: '宝剑8',
    description: '宝剑8象征束缚和限制。这张牌表示被困在自己的思维模式中，感到无法突破。它提醒你有时限制是来自于自己的想法，需要改变思维方式。'
  },
  {
    image: '../../../static/zxbjimg/宝剑9.jpg',
    title: '宝剑9',
    description: '宝剑9代表焦虑和恐惧。这张牌象征着被自己的担忧和恐惧所困扰。它提醒你要面对内心的恐惧，而不是让它们控制你的生活。'
  },
  {
    image: '../../../static/zxbjimg/宝剑10.jpg',
    title: '宝剑10',
    description: '宝剑10象征终结和新生。这张牌代表着一个艰难时期的结束，同时也预示着新的开始。它提醒你接受结束，为新的开始做好准备。'
  },
  {
    image: '../../../static/zxbjimg/宝剑国王.jpg',
    title: '宝剑国王',
    description: '宝剑国王象征智慧和权威。这张牌代表一个理性、公正且富有智慧的领导者。他提醒你在做决定时要运用智慧和逻辑，保持公正和客观。'
  },
  {
    image: '../../../static/zxbjimg/宝剑王后.jpg',
    title: '宝剑王后',
    description: '宝剑王后象征洞察力和独立。这张牌代表一个思维敏锐、直率且独立的人。她鼓励你运用智慧和洞察力，保持独立思考的能力。'
  },
  {
    image: '../../../static/zxbjimg/宝剑骑士.jpg',
    title: '宝剑骑士',
    description: '宝剑骑士象征行动和勇气。这张牌代表一个勇敢、果断且充满行动力的人。他鼓励你勇敢面对挑战，采取果断的行动。'
  },
  {
    image: '../../../static/zxbjimg/宝剑侍卫.jpg',
    title: '宝剑侍卫',
    description: '宝剑侍卫象征新思维和学习。这张牌代表对知识的渴望和敏锐的观察力。他鼓励你保持求知欲，观察周围的环境，学习新的知识。'
  },
  {
    image: '../../../static/zxbjimg/宝剑ACE.jpg',
    title: '宝剑ACE',
    description: '宝剑ACE象征突破和新的开始。这张牌代表思维的突破和新的理念。它鼓励你接受新的思维方式，突破固有的思维模式。'
  }
]
  </script>
  
  <style scoped>
  .cups-container {
    position: relative;
    width: 100%;
    height: 50vh; /* 增加高度 */
    display: flex;
    justify-content: center;
    align-items: center; /* 已经是居中对齐 */
    overflow: hidden;
    background-color: pink;
    border: 2px solid black;
    padding: 0; /* 移除底部内边距 */
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
    width: 60px;
    height: 100px;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    /* 添加阴影增强视觉效果 */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
    border-radius: 8px;
  }
  
  .tarot-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
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