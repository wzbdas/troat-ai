<template>
  <view class="tarot-container">
    <view class="tarot-intro">
      <text class="title">78张塔罗牌图片以及释意</text>
      <text class="desc">标准塔罗牌有78张卡牌组成，分为两部分:主牌(大阿尔卡那)和辅牌(小阿尔卡那)。
        "阿尔卡那"(arcana)是arcanum的复数形式，而后者的英文解释为"奥秘"。
        22张大阿尔卡那是塔罗牌的核心，均有其特定的含义所在。
        56张小阿尔卡那是对大阿尔卡那的诠释，依据西方的四元素学说分为四组--权杖(火)、圣杯(水)、宝剑(风)、星币(土)。</text>
    </view>
    <view class="tab-container">
      <view 
        v-for="(item, index) in tabList" 
        :key="index"
        :class="['tab-item', { active: currentTab === index }]"
        @tap="switchTab(index)"
      >
        {{ item.name }}
      </view>
    </view>

    <view class="cards-container">
      <!-- 第一张卡牌单独一行 -->
      <view 
        v-if="currentCards.length > 0"
        class="card-item first-card"
        @tap="showCardDetail(currentCards[0])"
      >
        <image 
          :src="currentCards[0].image" 
          mode="aspectFit"
          class="card-image"
        />
        <text class="card-name">{{ currentCards[0].name }}</text>
      </view>
      
      <!-- 其余卡牌三张一行 -->
      <view class="other-cards-container">
        <view 
          v-for="(card, index) in currentCards.slice(1)" 
          :key="index + 1"
          class="card-item"
          @tap="showCardDetail(card)"
        >
          <image 
            :src="card.image" 
            mode="aspectFit"
            class="card-image"
          />
          <text class="card-name">{{ card.name }}</text>
        </view>
      </view>
    </view>
    <!-- 卡牌详情弹出层 -->
    <view class="card-detail-overlay" v-if="showDetail" @tap="closeDetail">
      <view class="card-detail-container" @tap.stop>
        <view class="card-detail-header">
          <text class="card-detail-title">{{ selectedCard.name }}</text>
          <text class="card-detail-close" @tap="closeDetail">×</text>
        </view>
        <view class="card-detail-content">
          <image :src="selectedCard.image" mode="aspectFit" class="card-detail-image" />
          <view class="card-detail-info">
            <text class="card-detail-subtitle">简介</text>
            <text class="card-detail-text">{{ getCardIntro(selectedCard) }}</text>
            
            <view class="card-detail-button" @tap="toggleFullAnalysis">
              {{ showFullAnalysis ? '收起详细解析' : '查看详细解析' }}
            </view>
            
            <view class="card-full-analysis" v-if="showFullAnalysis">
              <text class="card-detail-subtitle">详细解析</text>
              <text class="card-detail-text">{{ getCardAnalysis(selectedCard) }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tabList = [
  { name: '22张大阿卡那牌', type: 'major' },
  { name: '14张权杖牌', type: 'wands' },
  { name: '14张圣杯牌', type: 'cups' },
  { name: '14张宝剑牌', type: 'swords' },
  { name: '14张星币牌', type: 'pentacles' }
]

const majorArcana = [
  { name: '愚者', image: '/src/static/zx-images/00愚者.jpg' },
  { name: '魔术师', image: '/src/static/zx-images/01魔术师.jpg' },
  { name: '女祭司', image: '/src/static/zx-images/02女祭祀.jpg' },
  { name: '女皇', image: '/src/static/zx-images/03皇后.jpg' },
  { name: '皇帝', image: '/src/static/zx-images/04皇帝.jpg' },
  { name: '教皇', image: '/src/static/zx-images/05教皇.jpg' },
  { name: '恋人', image: '/src/static/zx-images/06恋人.jpg' },
  { name: '战车', image: '/src/static/zx-images/07战车.jpg' },
  { name: '力量', image: '/src/static/zx-images/08力量.jpg' },
  { name: '隐士', image: '/src/static/zx-images/09隐士.jpg' },
  { name: '命运之轮', image: '/src/static/zx-images/10命运之轮.jpg' },
  { name: '正义', image: '/src/static/zx-images/11正义.jpg' },
  { name: '倒吊人', image: '/src/static/zx-images/12倒吊人.jpg' },
  { name: '死神', image: '/src/static/zx-images/13死神.jpg' },
  { name: '节制', image: '/src/static/zx-images/14节制.jpg' },
  { name: '恶魔', image: '/src/static/zx-images/15恶魔.jpg' },
  { name: '塔', image: '/src/static/zx-images/16高塔.jpg' },
  { name: '星星', image: '/src/static/zx-images/17星星.jpg' },
  { name: '月亮', image: '/src/static/zx-images/18月亮.jpg' },
  { name: '太阳', image: '/src/static/zx-images/19太阳.jpg' },
  { name: '审判', image: '/src/static/zx-images/20审判.jpg' },
  { name: '世界', image: '/src/static/zx-images/21世界.jpg' }
]

const wandsCards = [
  { name: '权杖王牌', image: '/src/static/zxqzimg/权杖ACE.jpg' },
  { name: '权杖二', image: '/src/static/zxqzimg/权杖2.jpg' },
  { name: '权杖三', image: '/src/static/zxqzimg/权杖3.jpg' },
  { name: '权杖四', image: '/src/static/zxqzimg/权杖4.jpg' },
  { name: '权杖五', image: '/src/static/zxqzimg/权杖5.jpg' },
  { name: '权杖六', image: '/src/static/zxqzimg/权杖6.jpg' },
  { name: '权杖七', image: '/src/static/zxqzimg/权杖7.jpg' },
  { name: '权杖八', image: '/src/static/zxqzimg/权杖8.jpg' },
  { name: '权杖九', image: '/src/static/zxqzimg/权杖9.jpg' },
  { name: '权杖十', image: '/src/static/zxqzimg/权杖10.jpg' },
  { name: '权杖侍从', image: '/src/static/zxqzimg/权杖侍卫.jpg' },
  { name: '权杖骑士', image: '/src/static/zxqzimg/权杖骑士.jpg' },
  { name: '权杖皇后', image: '/src/static/zxqzimg/权杖王后.jpg' },
  { name: '权杖国王', image: '/src/static/zxqzimg/权杖国王.jpg' }
]

const cupsCards = [
  { name: '圣杯王牌', image: '/src/static/zxsbimg/圣杯ACE.jpg' },
  { name: '圣杯二', image: '/src/static/zxsbimg/圣杯2.jpg' },
  { name: '圣杯三', image: '/src/static/zxsbimg/圣杯3.jpg' },
  { name: '圣杯四', image: '/src/static/zxsbimg/圣杯4.jpg' },
  { name: '圣杯五', image: '/src/static/zxsbimg/圣杯5.jpg' },
  { name: '圣杯六', image: '/src/static/zxsbimg/圣杯6.jpg' },
  { name: '圣杯七', image: '/src/static/zxsbimg/圣杯7.jpg' },
  { name: '圣杯八', image: '/src/static/zxsbimg/圣杯8.jpg' },
  { name: '圣杯九', image: '/src/static/zxsbimg/圣杯9.jpg' },
  { name: '圣杯十', image: '/src/static/zxsbimg/圣杯10.jpg' },
  { name: '圣杯侍从', image: '/src/static/zxsbimg/圣杯侍卫.jpg' },
  { name: '圣杯骑士', image: '/src/static/zxsbimg/圣杯骑士.jpg' },
  { name: '圣杯皇后', image: '/src/static/zxsbimg/圣杯王后.jpg' },
  { name: '圣杯国王', image: '/src/static/zxsbimg/圣杯国王.jpg' }
]

const swordsCards = [
  { name: '宝剑王牌', image: '/src/static/zxbjimg/宝剑ACE.jpg' },
  { name: '宝剑二', image: '/src/static/zxbjimg/宝剑2.jpg' },
  { name: '宝剑三', image: '/src/static/zxbjimg/宝剑3.jpg' },
  { name: '宝剑四', image: '/src/static/zxbjimg/宝剑4.jpg' },
  { name: '宝剑五', image: '/src/static/zxbjimg/宝剑5.jpg' },
  { name: '宝剑六', image: '/src/static/zxbjimg/宝剑6.jpg' },
  { name: '宝剑七', image: '/src/static/zxbjimg/宝剑7.jpg' },
  { name: '宝剑八', image: '/src/static/zxbjimg/宝剑8.jpg' },
  { name: '宝剑九', image: '/src/static/zxbjimg/宝剑9.jpg' },
  { name: '宝剑十', image: '/src/static/zxbjimg/宝剑10.jpg' },
  { name: '宝剑侍从', image: '/src/static/zxbjimg/宝剑侍卫.jpg' },
  { name: '宝剑骑士', image: '/src/static/zxbjimg/宝剑骑士.jpg' },
  { name: '宝剑皇后', image: '/src/static/zxbjimg/宝剑王后.jpg' },
  { name: '宝剑国王', image: '/src/static/zxbjimg/宝剑国王.jpg' }
]

const pentaclesCards = [
  { name: '星币王牌', image: '/src/static/zxxbimg/星币ACE.jpg' },
  { name: '星币二', image: '/src/static/zxxbimg/星币2.jpg' },
  { name: '星币三', image: '/src/static/zxxbimg/星币3.jpg' },
  { name: '星币四', image: '/src/static/zxxbimg/星币4.jpg' },
  { name: '星币五', image: '/src/static/zxxbimg/星币5.jpg' },
  { name: '星币六', image: '/src/static/zxxbimg/星币6.jpg' },
  { name: '星币七', image: '/src/static/zxxbimg/星币7.jpg' },
  { name: '星币八', image: '/src/static/zxxbimg/星币8.jpg' },
  { name: '星币九', image: '/src/static/zxxbimg/星币9.jpg' },
  { name: '星币十', image: '/src/static/zxxbimg/星币10.jpg' },
  { name: '星币侍从', image: '/src/static/zxxbimg/星币侍卫.jpg' },
  { name: '星币骑士', image: '/src/static/zxxbimg/星币骑士.jpg' },
  { name: '星币皇后', image: '/src/static/zxxbimg/星币王后.jpg' },
  { name: '星币国王', image: '/src/static/zxxbimg/星币国王.jpg' }
]

const currentTab = ref(0)

const currentCards = computed(() => {
  switch(currentTab.value) {
    case 0: return majorArcana
    case 1: return wandsCards
    case 2: return cupsCards
    case 3: return swordsCards
    case 4: return pentaclesCards
    default: return []
  }
})

const switchTab = (index: number) => {
  currentTab.value = index
}

// 添加卡牌详情相关状态
const showDetail = ref(false)
const selectedCard = ref<any>({})
const showFullAnalysis = ref(false)

// 显示卡牌详情
const showCardDetail = (card: any) => {
  selectedCard.value = card
  showDetail.value = true
  showFullAnalysis.value = false
}

// 关闭卡牌详情
const closeDetail = () => {
  showDetail.value = false
}

// 切换详细解析显示状态
const toggleFullAnalysis = () => {
  showFullAnalysis.value = !showFullAnalysis.value
}
// 获取卡牌简介
const getCardIntro = (card: any) => {
  const introMap: Record<string, string> = {
    // 大阿卡那牌简介
    '愚者': '愚者代表新的开始、冒险和无限可能。他站在悬崖边，准备踏出一步，象征着信念和勇气。',
    '魔术师': '魔术师象征着创造力、技能和意志力。他掌握着元素的力量，能够将想法转化为现实。',
    '女祭司': '女祭司代表直觉、潜意识和神秘。她坐在两根柱子之间，象征着平衡和内在智慧。',
    // ... 可以继续添加其他卡牌的简介
    
    // 权杖牌简介
    '权杖王牌': '权杖王牌代表新的开始、灵感和创造力的火花。它象征着新项目的启动和充满活力的能量。',
    // ... 其他权杖牌简介
    
    // 圣杯牌简介
    '圣杯王牌': '圣杯王牌象征着情感的新开始、爱、直觉和创造力。它代表着丰富的情感体验和精神满足。',
    // ... 其他圣杯牌简介
    
    // 宝剑牌简介
    '宝剑王牌': '宝剑王牌代表思想的力量、清晰的判断和新的见解。它象征着突破困境和理性思考的胜利。',
    // ... 其他宝剑牌简介
    
    // 星币牌简介
    '星币王牌': '星币王牌象征着物质世界的新开始、财富和实际成果。它代表着稳定的基础和实际的机会。',
    // ... 其他星币牌简介
  }
  
  return introMap[card.name] || `${card.name}是塔罗牌中的重要一张，代表着特定的能量和象征意义。`
}

// 获取卡牌详细解析
const getCardAnalysis = (card: any) => {
  const analysisMap: Record<string, string> = {
    // 大阿卡那牌详细解析
    '愚者': '愚者牌是塔罗牌中唯一的零号牌，象征着纯真、自由和无限可能。正位时，它代表新的开始、冒险精神、自发性和信任。愚者不受常规约束，愿意尝试新事物，相信生活会指引方向。\n\n逆位时，它可能暗示鲁莽、不负责任、缺乏方向或错失机会。愚者提醒我们保持开放的心态，但也要注意脚下的路。在人生旅途中，有时需要像愚者一样勇敢跳跃，相信自己能够飞翔。',
    '魔术师': '魔术师是塔罗牌中的第一张牌，代表着创造力、技能和意志力的体现。他站在桌前，上方是无限符号，桌上摆放着代表四元素的工具，象征着他掌握了所有必要的资源。\n\n正位时，魔术师表示拥有将想法转化为现实的能力、创新思维和自信。这是一张行动的牌，提醒我们利用自己的才能和资源实现目标。\n\n逆位时，可能暗示才能被误用、缺乏专注或自我怀疑。魔术师教导我们认识到自己的潜力，并有意识地运用它来创造我们想要的现实。',
    // ... 可以继续添加其他卡牌的详细解析
  }
  
  return analysisMap[card.name] || `${card.name}的详细解析包含其在不同情境下的含义、象征意义以及对应的生活建议。正位和逆位各有不同的解读，需要结合具体情境进行分析。在塔罗牌阅读中，它与其他牌的组合也会产生更丰富的含义。`
}
</script>

<style scoped>
.tarot-container {
  padding: 30rpx;
  max-width: 1200rpx;
  margin: 0 auto; /* 使整个容器居中 */
}

.tarot-intro {
  margin-bottom: 30rpx;
  text-align: center; /* 文本居中对齐 */
  max-width: 800rpx; /* 限制最大宽度 */
  margin-left: auto; /* 左右自动外边距实现居中 */
  margin-right: auto;
  padding: 30rpx;
  background-color: rgba(255, 255, 255, 0.8); /* 添加半透明背景 */
  border-radius: 20rpx; /* 圆角边框 */
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.title {
  font-size: 40rpx; /* 增大标题字号 */
  font-weight: bold;
  color: #ff4c8d; /* 使用主题色 */
  margin-bottom: 30rpx; /* 增加与描述的间距 */
  display: block;
  letter-spacing: 2rpx; /* 增加字间距 */
}

.desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.8; /* 增加行高 */
  display: block;
  text-align: justify; /* 文本两端对齐 */
  text-indent: 2em; /* 首行缩进 */
}

.tab-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.tab-item {
  padding: 16rpx 30rpx;
  background: #f5f5f5;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #666;
}

.tab-item.active {
  background: #ffd1e0;
  color: #ff4c8d;
}

.cards-container {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}
.first-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20rpx;
}

.first-card .card-image {
  width: 300rpx;
  height: 500rpx;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.15);
}

.first-card .card-name {
  margin-top: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.other-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30rpx;
}

.card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card-item:active {
  transform: scale(0.95);
}

.card-image {
  width: 200rpx;
  height: 350rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.card-name {
  margin-top: 16rpx;
  font-size: 26rpx;
  color: #333;
}


/* 添加卡牌详情弹出层样式 */
.card-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.card-detail-container {
  width: 90%;
  max-width: 650rpx;
  max-height: 90vh;
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  border-bottom: 1px solid #eee;
}

.card-detail-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.card-detail-close {
  font-size: 48rpx;
  color: #999;
  line-height: 1;
}

.card-detail-content {
  padding: 30rpx;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.card-detail-image {
  width: 300rpx;
  height: 500rpx;
  align-self: center;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
}

.card-detail-info {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.card-detail-subtitle {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.card-detail-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.card-detail-button {
  margin-top: 20rpx;
  padding: 16rpx 0;
  background-color: #ffd1e0;
  color: #ff4c8d;
  text-align: center;
  border-radius: 30rpx;
  font-size: 28rpx;
  font-weight: bold;
}

.card-full-analysis {
  margin-top: 20rpx;
  padding-top: 20rpx;
  border-top: 1px dashed #eee;
}

/* 修改卡片样式，添加点击效果 */
.card-item {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card-item:active {
  transform: scale(0.95);
}
</style>