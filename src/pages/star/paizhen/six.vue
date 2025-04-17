<template>
  <view class="six-spread">
    <view class="spread-title">六芒星牌阵</view>
    <view class="spread-description">
      六芒星牌阵是一种强大的综合牌阵，可以帮助您全面了解生活中的各个方面，找到平衡与和谐。
    </view>
    
    <view class="cards-container">
      <view class="hexagram-layout">
        <!-- 上三角形 -->
        <view class="triangle top-triangle">
          <view class="card-position top">
            <view class="card" :class="{ 'card-selected': selectedCards[0] }" @tap="selectCard(0)">
              <view class="card-front" v-if="selectedCards[0]">
                <image class="card-image" :src="selectedCards[0].image" mode="aspectFill"></image>
              </view>
              <view class="card-back" v-else>
                <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
              </view>
            </view>
            <view class="position-number">1</view>
          </view>
          
          <view class="triangle-middle">
            <view class="card-position top-left">
              <view class="card" :class="{ 'card-selected': selectedCards[1] }" @tap="selectCard(1)">
                <view class="card-front" v-if="selectedCards[1]">
                  <image class="card-image" :src="selectedCards[1].image" mode="aspectFill"></image>
                </view>
                <view class="card-back" v-else>
                  <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
                </view>
              </view>
              <view class="position-number">2</view>
            </view>
            
            <view class="card-position top-right">
              <view class="card" :class="{ 'card-selected': selectedCards[2] }" @tap="selectCard(2)">
                <view class="card-front" v-if="selectedCards[2]">
                  <image class="card-image" :src="selectedCards[2].image" mode="aspectFill"></image>
                </view>
                <view class="card-back" v-else>
                  <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
                </view>
              </view>
              <view class="position-number">3</view>
            </view>
          </view>
        </view>
        
        <!-- 下三角形 -->
        <view class="triangle bottom-triangle">
          <view class="triangle-middle">
            <view class="card-position bottom-left">
              <view class="card" :class="{ 'card-selected': selectedCards[3] }" @tap="selectCard(3)">
                <view class="card-front" v-if="selectedCards[3]">
                  <image class="card-image" :src="selectedCards[3].image" mode="aspectFill"></image>
                </view>
                <view class="card-back" v-else>
                  <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
                </view>
              </view>
              <view class="position-number">4</view>
            </view>
            
            <view class="card-position bottom-right">
              <view class="card" :class="{ 'card-selected': selectedCards[4] }" @tap="selectCard(4)">
                <view class="card-front" v-if="selectedCards[4]">
                  <image class="card-image" :src="selectedCards[4].image" mode="aspectFill"></image>
                </view>
                <view class="card-back" v-else>
                  <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
                </view>
              </view>
              <view class="position-number">5</view>
            </view>
          </view>
          
          <view class="card-position bottom">
            <view class="card" :class="{ 'card-selected': selectedCards[5] }" @tap="selectCard(5)">
              <view class="card-front" v-if="selectedCards[5]">
                <image class="card-image" :src="selectedCards[5].image" mode="aspectFill"></image>
              </view>
              <view class="card-back" v-else>
                <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
              </view>
            </view>
            <view class="position-number">6</view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="positions-meaning">
      <view class="meaning-item">
        <text class="position-title">1. 精神</text>
        <text class="position-desc">代表您的精神状态和高层次意识</text>
      </view>
      <view class="meaning-item">
        <text class="position-title">2. 思想</text>
        <text class="position-desc">反映您的思维模式和理性思考</text>
      </view>
      <view class="meaning-item">
        <text class="position-title">3. 情感</text>
        <text class="position-desc">显示您的情感状态和内心感受</text>
      </view>
      <view class="meaning-item">
        <text class="position-title">4. 物质</text>
        <text class="position-desc">代表您的物质世界和实际情况</text>
      </view>
      <view class="meaning-item">
        <text class="position-title">5. 行动</text>
        <text class="position-desc">指示您应该采取的行动或方向</text>
      </view>
      <view class="meaning-item">
        <text class="position-title">6. 结果</text>
        <text class="position-desc">预示可能的结果或发展趋势</text>
      </view>
    </view>
    
    <view class="action-buttons">
      <button class="action-button shuffle-button" @tap="shuffleCards">洗牌</button>
      <button class="action-button reset-button" @tap="resetCards">重置</button>
    </view>
    
    <view class="reading-result" v-if="isReadingComplete">
      <view class="result-title">六芒星解读</view>
      <view class="result-content">
        {{ generateReading() }}
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 模拟塔罗牌组
const tarotDeck = ref([
  { id: 1, name: '权杖2', image: '/src/static/zxqzimg/权杖2.jpg' },
  { id: 2, name: '权杖3', image: '/src/static/zxqzimg/权杖3.jpg' },
  { id: 3, name: '权杖4', image: '/src/static/zxqzimg/权杖4.jpg' },
  { id: 4, name: '圣杯5', image: '/src/static/zxsbimg/圣杯5.jpg' },
  { id: 5, name: '圣杯6', image: '/src/static/zxsbimg/圣杯6.jpg' },
  { id: 6, name: '宝剑7', image: '/src/static/zxbjimg/宝剑7.jpg' },
  { id: 7, name: '宝剑8', image: '/src/static/zxbjimg/宝剑8.jpg' },
  { id: 8, name: '星币9', image: '/src/static/zxxbimg/星币9.jpg' },
  { id: 9, name: '星币10', image: '/src/static/zxxbimg/星币10.jpg' },
  { id: 10, name: '权杖国王', image: '/src/static/zxqzimg/权杖国王.jpg' },
  { id: 11, name: '圣杯王后', image: '/src/static/zxsbimg/圣杯王后.jpg' },
  { id: 12, name: '宝剑骑士', image: '/src/static/zxbjimg/宝剑骑士.jpg' },
  { id: 13, name: '星币侍卫', image: '/src/static/zxxbimg/星币侍卫.jpg' }
])

// 已选择的卡牌
const selectedCards = ref([null, null, null, null, null, null])

// 判断是否完成解读
const isReadingComplete = computed(() => {
  return selectedCards.value.every(card => card !== null)
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
  selectedCards.value = [null, null, null, null, null, null]
  
  // 打乱牌组顺序
  for (let i = tarotDeck.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tarotDeck.value[i], tarotDeck.value[j]] = [tarotDeck.value[j], tarotDeck.value[i]]
  }
}

// 重置
const resetCards = () => {
  selectedCards.value = [null, null, null, null, null, null]
}

// 生成解读结果
const generateReading = () => {
  if (!isReadingComplete.value) return ''
  
  return `您的六芒星牌阵解读：
  
精神层面：${selectedCards.value[0].name} - 显示了您当前的精神状态和高层次意识。
思想层面：${selectedCards.value[1].name} - 反映了您的思维模式和理性思考方式。
情感层面：${selectedCards.value[2].name} - 揭示了您的情感状态和内心感受。
物质层面：${selectedCards.value[3].name} - 代表了您的物质世界和实际情况。
行动建议：${selectedCards.value[4].name} - 指示了您应该采取的行动或方向。
可能结果：${selectedCards.value[5].name} - 预示了可能的结果或发展趋势。

六芒星牌阵将精神与物质、思想与情感、行动与结果联系在一起，为您提供全面的生活指引。`
}
</script>

<style scoped>
.six-spread {
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

.cards-container {
  display: flex;
  justify-content: center;
  margin: 30rpx 0;
}

.hexagram-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.triangle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.triangle-middle {
  display: flex;
  gap: 60rpx;
}

.card-position {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  width: 120rpx;
  height: 200rpx;
  perspective: 1000rpx;
  margin-bottom: 10rpx;
  cursor: pointer;
}

.card-front, .card-back {
  width: 100%;
  height: 100%;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card-image, .back-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.position-number {
  width: 36rpx;
  height: 36rpx;
  background-color: #ff4c8d;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  font-weight: bold;
}

.positions-meaning {
  margin: 30rpx 0;
  padding: 20rpx;
  background-color: #f9f9f9;
  border-radius: 16rpx;
}

.meaning-item {
  margin-bottom: 10rpx;
  display: flex;
  align-items: center;
}

.position-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #ff4c8d;
  width: 150rpx;
}

.position-desc {
  font-size: 24rpx;
  color: #666;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 30rpx;
  margin: 30rpx 0;
}

.action-button {
  padding: 16rpx 40rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  border: none;
}

.shuffle-button {
  background-color: #ff4c8d;
  color: white;
}

.reset-button {
  background-color: #f5f5f5;
  color: #666;
}

.reading-result {
  margin-top: 30rpx;
  padding: 30rpx;
  background-color: #f9f9f9;
  border-radius: 16rpx;
}

.result-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #ff4c8d;
}

.result-content {
  font-size: 28rpx;
  line-height: 1.6;
  color: #333;
  white-space: pre-line;
}
</style>