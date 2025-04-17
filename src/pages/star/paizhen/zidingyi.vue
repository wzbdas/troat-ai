<template>
  <view class="custom-spread">
    <view class="spread-title">自定义牌阵</view>
    <view class="spread-description">
      创建您自己的牌阵，根据您的具体问题和需求进行个性化解读。
    </view>
    
    <view class="setup-section" v-if="!isSetupComplete">
      <view class="input-group">
        <text class="input-label">牌阵名称</text>
        <input 
          class="input-field" 
          type="text" 
          v-model="spreadName" 
          placeholder="例如：职业发展牌阵"
        />
      </view>
      
      <view class="input-group">
        <text class="input-label">牌位数量 (1-7)</text>
        <input 
          class="input-field" 
          type="number" 
          v-model="cardCount" 
          placeholder="输入1-7之间的数字"
          @input="validateCardCount"
        />
      </view>
      
      <view class="positions-setup" v-if="cardCount > 0">
        <view class="position-input" v-for="(position, index) in positions" :key="index">
          <text class="position-number">{{ index + 1 }}</text>
          <input 
            class="position-name-input" 
            type="text" 
            v-model="position.name" 
            :placeholder="`牌位${index + 1}名称`"
          />
          <input 
            class="position-meaning-input" 
            type="text" 
            v-model="position.meaning" 
            :placeholder="`牌位${index + 1}含义`"
          />
        </view>
      </view>
      
      <button class="setup-button" @tap="completeSetup" :disabled="!isSetupValid">创建牌阵</button>
    </view>
    
    <view class="reading-section" v-if="isSetupComplete">
      <view class="spread-info">
        <text class="spread-name">{{ spreadName }}</text>
        <text class="spread-card-count">{{ cardCount }}张牌阵</text>
      </view>
      
      <view class="custom-cards-container">
        <view 
          class="card-position" 
          v-for="(position, index) in positions" 
          :key="index"
          :style="{ width: `${100 / Math.min(4, cardCount)}%` }"
        >
          <view class="card" :class="{ 'card-selected': selectedCards[index] }" @tap="selectCard(index)">
            <view class="card-front" v-if="selectedCards[index]">
              <image class="card-image" :src="selectedCards[index].image" mode="aspectFill"></image>
            </view>
            <view class="card-back" v-else>
              <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
            </view>
          </view>
          <view class="position-label">{{ position.name }}</view>
          <view class="position-meaning">{{ position.meaning }}</view>
        </view>
      </view>
      
      <view class="action-buttons">
        <button class="action-button shuffle-button" @tap="shuffleCards">洗牌</button>
        <button class="action-button reset-button" @tap="resetCards">重置</button>
        <button class="action-button new-spread-button" @tap="startNewSpread">新牌阵</button>
      </view>
      
      <view class="reading-result" v-if="isReadingComplete">
        <view class="result-title">塔罗解读</view>
        <view class="result-content">
          {{ generateReading() }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 牌阵设置
const spreadName = ref('')
const cardCount = ref(0)
const positions = ref([])
const isSetupComplete = ref(false)

// 验证牌位数量
const validateCardCount = () => {
  let count = parseInt(cardCount.value)
  if (isNaN(count) || count < 1) {
    cardCount.value = 1
  } else if (count > 7) {
    cardCount.value = 7
  }
  
  // 更新牌位数组
  updatePositions()
}

// 更新牌位数组
const updatePositions = () => {
  const count = parseInt(cardCount.value)
  if (!isNaN(count)) {
    // 保留现有的牌位设置
    const currentPositions = [...positions.value]
    positions.value = []
    
    for (let i = 0; i < count; i++) {
      if (currentPositions[i]) {
        positions.value.push(currentPositions[i])
      } else {
        positions.value.push({
          name: `牌位${i + 1}`,
          meaning: `牌位${i + 1}的含义`
        })
      }
    }
  }
}

// 监听牌位数量变化
watch(cardCount, () => {
  validateCardCount()
})

// 验证设置是否有效
const isSetupValid = computed(() => {
  return (
    spreadName.value.trim() !== '' &&
    cardCount.value >= 1 &&
    cardCount.value <= 7 &&
    positions.value.every(pos => pos.name.trim() !== '' && pos.meaning.trim() !== '')
  )
})

// 完成设置
const completeSetup = () => {
  if (isSetupValid.value) {
    isSetupComplete.value = true
    // 初始化选中的卡牌数组
    selectedCards.value = Array(positions.value.length).fill(null)
  }
}

// 模拟塔罗牌组
const tarotDeck = ref([
  { id: 1, name: '权杖2', image: '/src/static/zxqzimg/权杖2.jpg', meaning: '平衡与选择，暗示需要在对立中寻找和谐' },
  { id: 2, name: '权杖3', image: '/src/static/zxqzimg/权杖3.jpg', meaning: '探索与成长，展现新的机遇和可能性' },
  { id: 3, name: '权杖4', image: '/src/static/zxqzimg/权杖4.jpg', meaning: '稳定与休息，提示需要在忙碌中找到平衡' },
  { id: 4, name: '圣杯5', image: '/src/static/zxsbimg/圣杯5.jpg', meaning: '失落与转机，暗示情感上的挑战和成长' },
  { id: 5, name: '圣杯6', image: '/src/static/zxsbimg/圣杯6.jpg', meaning: '怀旧与治愈，展现过去经验带来的智慧' },
  { id: 6, name: '宝剑7', image: '/src/static/zxbjimg/宝剑7.jpg', meaning: '策略与计划，需要谨慎思考和明智决策' },
  { id: 7, name: '宝剑8', image: '/src/static/zxbjimg/宝剑8.jpg', meaning: '困境与突破，暗示需要勇气面对挑战' },
  { id: 8, name: '星币9', image: '/src/static/zxxbimg/星币9.jpg', meaning: '富足与满足，展现物质和精神上的丰盈' },
  { id: 9, name: '星币10', image: '/src/static/zxxbimg/星币10.jpg', meaning: '圆满与收获，象征努力得到回报' },
  { id: 10, name: '权杖国王', image: '/src/static/zxqzimg/权杖国王.jpg', meaning: '领导与创造，展现成熟的掌控力和远见' },
  { id: 11, name: '圣杯王后', image: '/src/static/zxsbimg/圣杯王后.jpg', meaning: '关怀与直觉，象征情感的智慧和滋养' },
  { id: 12, name: '宝剑骑士', image: '/src/static/zxbjimg/宝剑骑士.jpg', meaning: '行动与决断，暗示需要果断前进' },
  { id: 13, name: '星币侍卫', image: '/src/static/zxxbimg/星币侍卫.jpg', meaning: '务实与专注，展现对目标的坚持' },
  { id: 14, name: '权杖王后', image: '/src/static/zxqzimg/权杖王后.jpg', meaning: '热情与创造力，象征内在力量的觉醒' },
  { id: 15, name: '圣杯骑士', image: '/src/static/zxsbimg/圣杯骑士.jpg', meaning: '浪漫与追求，展现感性的冒险精神' }
])

// 已选择的卡牌
const selectedCards = ref([])

// 判断是否完成解读
const isReadingComplete = computed(() => {
  return selectedCards.value.length > 0 && selectedCards.value.every(card => card !== null)
})

// 选择卡牌
const selectCard = (position) => {
  if (selectedCards.value[position] === null) {
    // 从牌组中随机选择一张牌
    const availableCards = tarotDeck.value.filter(card => 
      !selectedCards.value.some(selected => selected && selected.id === card.id)
    )
    
    if (availableCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCards.length)
      selectedCards.value[position] = availableCards[randomIndex]
    }
  }
}

// 洗牌
const shuffleCards = () => {
  // 重置已选择的卡牌
  selectedCards.value = Array(positions.value.length).fill(null)
  
  // 打乱牌组顺序
  for (let i = tarotDeck.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tarotDeck.value[i], tarotDeck.value[j]] = [tarotDeck.value[j], tarotDeck.value[i]]
  }
}

// 重置
const resetCards = () => {
  selectedCards.value = Array(positions.value.length).fill(null)
}

// 开始新的牌阵
const startNewSpread = () => {
  isSetupComplete.value = false
  spreadName.value = ''
  cardCount.value = 0
  positions.value = []
  selectedCards.value = []
}

// 生成解读结果
const generateReading = () => {
  if (!isReadingComplete.value) return ''
  
  let reading = `您的${spreadName.value}解读：\n\n`
  
  // 添加整体牌阵能量解读
  reading += `整体能量：这个牌阵展现了${spreadName.value}的多个维度，让我们一起深入探索每个位置的启示。\n\n`
  
  // 详细解读每个牌位
  positions.value.forEach((position, index) => {
    const card = selectedCards.value[index]
    reading += `${position.name}：\n`
    reading += `抽到的牌：${card.name}\n`
    reading += `牌面含义：${card.meaning}\n`
    reading += `对应解释：在${position.meaning}方面，${card.meaning}。这提示您需要特别关注这个方面的发展。\n\n`
  })
  
  // 添加整体建议
  reading += `综合建议：\n`
  reading += `根据牌阵的整体能量，建议您在接下来的时期：\n`
  reading += `1. 留意牌阵中重复出现的元素和符号\n`
  reading += `2. 关注各个牌位之间的联系和互动\n`
  reading += `3. 结合当前处境，灵活运用牌阵的指引\n\n`
  
  reading += `这个自定义牌阵为您提供了关于${spreadName.value}的个性化指引，希望能帮助您更好地理解和把握当前的情况。`
  
  return reading
}
</script>

<style scoped>
.custom-spread {
  padding: 20rpx;
}

.spread-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20rpx;
  color: #ff4c8d;
}

.spread-description {
  font-size: 28rpx;
  text-align: center;
  margin-bottom: 40rpx;
  color: #666;
  padding: 0 30rpx;
}

.setup-section {
  background-color: #f9f9f9;
  padding: 30rpx;
  border-radius: 16rpx;
  margin-bottom: 30rpx;
}

.input-group {
  margin-bottom: 20rpx;
}

.input-label {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  color: #333;
}

.input-field {
  width: 100%;
  height: 80rpx;
  border: 2rpx solid #ddd;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  background-color: #fff;
}

.positions-setup {
  margin-top: 30rpx;
}

.position-input {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  gap: 10rpx;
}

.position-number {
  width: 40rpx;
  height: 40rpx;
  background-color: #ff4c8d;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  font-weight: bold;
}

.position-name-input, .position-meaning-input {
  flex: 1;
  height: 70rpx;
  border: 2rpx solid #ddd;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 24rpx;
  background-color: #fff;
}

.setup-button {
  width: 100%;
  height: 80rpx;
  background-color: #ff4c8d;
  color: white;
  border: none;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: bold;
  margin-top: 30rpx;
}

.setup-button[disabled] {
  background-color: #ccc;
  color: #999;
}

.reading-section {
  margin-top: 20rpx;
}

.spread-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.spread-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff4c8d;
}

.spread-card-count {
  font-size: 24rpx;
  color: #666;
  background-color: #f5f5f5;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
}

.custom-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20rpx;
  margin: 30rpx 0;
}

.card-position {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30rpx;
}

.card {
  width: 200rpx;
  height: 340rpx;
  perspective: 1000rpx;
  margin-bottom: 20rpx;
  cursor: pointer;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-selected {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.3);
  position: absolute;
  backface-visibility: hidden;
  background: linear-gradient(135deg, #2c3e50, #3498db);
  border: 2rpx solid #daa520;
}

.card-front {
  transform: rotateY(180deg);
}

.card-image, .back-image {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
  object-fit: cover;
}

.custom-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220rpx, 1fr));
  gap: 30rpx;
  padding: 40rpx 20rpx;
  background: linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.1));
  border-radius: 20rpx;
}

.position-label {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin: 16rpx 0 8rpx;
  text-align: center;
}

.position-meaning {
  font-size: 24rpx;
  color: #666;
  text-align: center;
  padding: 0 10rpx;
}
</style>