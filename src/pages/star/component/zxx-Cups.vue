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
            <image class="back-image" src="/static/zxsbimg/背面A.jpg"></image>
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
  
  const images = imageNames.map(name => `../../../static/zxsbimg/${name}.jpg`)

  const tarotCards = [
  {
    image: '../../../static/zxsbimg/圣杯2.jpg',
    title: '圣杯2',
    description: '圣杯2象征着平衡、合作和选择。这张牌展示了两个人之间的和谐关系，代表着伙伴关系、爱情或友谊的开始。它提醒你在关系中保持平衡，并愿意与他人分享情感。'
  },
  {
    image: '../../../static/zxsbimg/圣杯3.jpg',
    title: '圣杯3',
    description: '圣杯3代表庆祝、友谊和共同的喜悦。这张牌象征着与朋友或亲人共度美好时光，分享快乐和成就。它鼓励你珍视生活中的美好时刻，并与他人一起庆祝。'
  },
  {
    image: '../../../static/zxsbimg/圣杯4.jpg',
    title: '圣杯4',
    description: '圣杯4象征冥想、内省和休息。这张牌表示需要从情感上退一步，给自己时间思考和恢复。它提醒你有时需要独处，以便更好地理解自己的感受和需求。'
  },
  {
    image: '../../../static/zxsbimg/圣杯5.jpg',
    title: '圣杯5',
    description: '圣杯5代表失望、悲伤和情感上的挫折。这张牌显示了对过去的执着和对现有祝福的忽视。它提醒你不要沉浸在过去的痛苦中，而要看到生活中仍然存在的积极面。'
  },
  {
    image: '../../../static/zxsbimg/圣杯6.jpg',
    title: '圣杯6',
    description: '圣杯6象征怀旧、童年记忆和纯真。这张牌代表着回忆过去的美好时光，或者与过去有关的人重新联系。它提醒你珍视美好的回忆，同时也要向前看。'
  },
  {
    image: '../../../static/zxsbimg/圣杯7.jpg',
    title: '圣杯7',
    description: '圣杯7代表幻想、选择和梦想。这张牌表示面对多种可能性时的困惑或犹豫。它提醒你要区分现实和幻想，做出明智的选择，并追求真正能带来满足的目标。'
  },
  {
    image: '../../../static/zxsbimg/圣杯8.jpg',
    title: '圣杯8',
    description: '圣杯8象征放弃、转变和寻找更深层次的满足。这张牌表示离开舒适区，追求更有意义的体验。它鼓励你勇敢地放下不再服务于你的事物，向更高的目标迈进。'
  },
  {
    image: '../../../static/zxsbimg/圣杯9.jpg',
    title: '圣杯9',
    description: '圣杯9代表满足、愿望实现和物质丰富。这张牌象征着情感和物质上的满足感。它提醒你欣赏和享受生活中的丰盛，同时也要保持谦虚和感恩的心态。'
  },
  {
    image: '../../../static/zxsbimg/圣杯10.jpg',
    title: '圣杯10',
    description: '圣杯10象征家庭幸福、和谐和情感圆满。这张牌代表着理想的家庭关系和深厚的情感连接。它提醒你珍视与亲人的关系，并为创造和维护和谐的家庭环境而努力。'
  },
  {
    image: '../../../static/zxsbimg/圣杯国王.jpg',
    title: '圣杯国王',
    description: '圣杯国王代表情感成熟、慷慨和智慧。这张牌象征着一个能够平衡情感和理性的人。他鼓励你以同情心和理解力对待他人，同时保持情感上的稳定和成熟。'
  },
  {
    image: '../../../static/zxsbimg/圣杯王后.jpg',
    title: '圣杯王后',
    description: '圣杯王后象征情感丰富、直觉和滋养。这张牌代表一个充满爱心、富有同情心的人。她鼓励你关注自己的情感需求，同时也要关心和支持他人。'
  },
  {
    image: '../../../static/zxsbimg/圣杯骑士.jpg',
    title: '圣杯骑士',
    description: '圣杯骑士代表浪漫、魅力和创意。这张牌象征着一个富有想象力、追求理想的人。他鼓励你追随自己的心，表达你的情感，并勇敢地追求爱和创意的机会。'
  },
  {
    image: '../../../static/zxsbimg/圣杯侍卫.jpg',
    title: '圣杯侍卫',
    description: '圣杯侍卫象征情感信息、直觉和新的情感体验。这张牌代表着情感上的新开始或灵感。他鼓励你保持开放的心态，接受新的情感体验，并倾听你的直觉。'
  },
  {
    image: '../../../static/zxsbimg/圣杯ACE.jpg',
    title: '圣杯ACE',
    description: '圣杯ACE象征新的情感开始、创造力和精神启示。这张牌代表爱、直觉和情感丰富的新开始。它鼓励你敞开，接受新的情感连接，并信任你的直觉指引。'
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