<template>
  <div class="coins-container">
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
          <image class="back-image" src="/static/zxxbimg/背面A.jpg"></image>
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

const images = imageNames.map(name => `../../../static/zxxbimg/${name}.jpg`)

const tarotCards = [
{
  image: '../../../static/zxxbimg/星币2.jpg',
  title: '星币2',
  description: '星币2象征着物质平衡和合作。这张牌展示了资源的分配与共享，代表着在物质层面上需要找到平衡点。它提醒你在财务决策时要注重公平与互惠。'
},
{
  image: '../../../static/zxxbimg/星币3.jpg',
  title: '星币3',
  description: '星币3代表技艺和团队合作。这张牌象征着通过专业技能获得回报，提醒我们努力工作终会带来收获。它教导我们要精进技艺，与他人合作共赢。'
},
{
  image: '../../../static/zxxbimg/星币4.jpg',
  title: '星币4',
  description: '星币4象征稳固和储蓄。这张牌表示需要对物质财富进行妥善管理和保护。它提醒你要未雨绸缪，建立稳固的物质基础。'
},
{
  image: '../../../static/zxxbimg/星币5.jpg',
  title: '星币5',
  description: '星币5象征物质损失和考验。这张牌表示在财务上可能遇到暂时的困难，提醒我们要学会在逆境中寻找机会。它教导我们如何更明智地管理资源。'
},
{
  image: '../../../static/zxxbimg/星币6.jpg',
  title: '星币6',
  description: '星币6象征慷慨和分享。这张牌代表着物质上的给予与接受，提醒你慷慨待人也会获得回报。它鼓励我们建立互惠互利的关系。'
},
{
  image: '../../../static/zxxbimg/星币7.jpg',
  title: '星币7',
  description: '星币7代表耐心和投资。这张牌表示需要耐心等待投资的回报。它提醒你在追求物质目标时要有长远眼光，循序渐进。'
},
{
  image: '../../../static/zxxbimg/星币8.jpg',
  title: '星币8',
  description: '星币8象征专注和技能。这张牌表示通过专注和努力能获得丰厚的物质回报。它提醒你要投入时间和精力来提升自己的技能。'
},
{
  image: '../../../static/zxxbimg/星币9.jpg',
  title: '星币9',
  description: '星币9代表个人成就和富足。这张牌象征着通过个人努力获得的物质成功。它提醒你享受成功的同时也要懂得知足常乐。'
},
{
  image: '../../../static/zxxbimg/星币10.jpg',
  title: '星币10',
  description: '星币10象征物质丰盛和家族财富。这张牌代表着长期积累带来的富足和安全感。它提醒你要善于经营和传承财富。'
},
{
  image: '../../../static/zxxbimg/星币国王.jpg',
  title: '星币国王',
  description: '星币国王象征财务智慧和稳健。这张牌代表一个精明的商人或管理者。他提醒你要用智慧和务实的态度来管理财富。'
},
{
  image: '../../../static/zxxbimg/星币王后.jpg',
  title: '星币王后',
  description: '星币王后象征丰盛和实用智慧。这张牌代表一个善于理财且重视实际的人。她鼓励你在物质层面上既要务实又要有远见。'
},
{
  image: '../../../static/zxxbimg/星币骑士.jpg',
  title: '星币骑士',
  description: '星币骑士象征勤勉和责任。这张牌代表一个踏实肯干、注重实效的人。他鼓励你通过勤奋工作来实现物质目标。'
},
{
  image: '../../../static/zxxbimg/星币侍卫.jpg',
  title: '星币侍卫',
  description: '星币侍卫象征学习和机遇。这张牌代表对物质世界的学习和探索。他鼓励你保持开放的心态，抓住机会提升自己的价值。'
},
{
  image: '../../../static/zxxbimg/星币ACE.jpg',
  title: '星币ACE',
  description: '星币ACE象征新的物质机会。这张牌代表财富的新起点和机遇。它鼓励你抓住新的机会，开创属于自己的财富之路。'
}
]
</script>

<style scoped>
.coins-container {
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