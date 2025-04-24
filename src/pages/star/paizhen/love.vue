<template>
  <view class="love-spread">
    <view class="spread-title">恋人金字塔牌阵</view>
    <view class="spread-description">
      恋人金字塔牌阵专为解读感情关系而设计，帮助您了解关系的各个方面和未来发展。
    </view>
    
    <view class="cards-container">
      <view class="pyramid-layout">
        <!-- 顶层 -->
        <view class="pyramid-row top-row">
          <view class="card-position">
            <view class="card" :class="{ 'card-selected': selectedCards[0] }" @tap="selectCard(0)">
              <view class="card-front" v-if="selectedCards[0]">
                <image class="card-image" :src="selectedCards[0].image" mode="aspectFill"></image>
              </view>
              <view class="card-back" v-else>
                <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
              </view>
            </view>
            <view class="position-label">关系结果</view>
          </view>
        </view>
        
        <!-- 中层 -->
        <view class="pyramid-row middle-row">
          <view class="card-position">
            <view class="card" :class="{ 'card-selected': selectedCards[1] }" @tap="selectCard(1)">
              <view class="card-front" v-if="selectedCards[1]">
                <image class="card-image" :src="selectedCards[1].image" mode="aspectFill"></image>
              </view>
              <view class="card-back" v-else>
                <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
              </view>
            </view>
            <view class="position-label">您的感受</view>
          </view>
          
          <view class="card-position">
            <view class="card" :class="{ 'card-selected': selectedCards[2] }" @tap="selectCard(2)">
              <view class="card-front" v-if="selectedCards[2]">
                <image class="card-image" :src="selectedCards[2].image" mode="aspectFill"></image>
              </view>
              <view class="card-back" v-else>
                <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
              </view>
            </view>
            <view class="position-label">对方感受</view>
          </view>
        </view>
        
        <!-- 底层 -->
        <view class="pyramid-row bottom-row">
          <view class="card-position">
            <view class="card" :class="{ 'card-selected': selectedCards[3] }" @tap="selectCard(3)">
              <view class="card-front" v-if="selectedCards[3]">
                <image class="card-image" :src="selectedCards[3].image" mode="aspectFill"></image>
              </view>
              <view class="card-back" v-else>
                <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
              </view>
            </view>
            <view class="position-label">关系基础</view>
          </view>
          
          <view class="card-position">
            <view class="card" :class="{ 'card-selected': selectedCards[4] }" @tap="selectCard(4)">
              <view class="card-front" v-if="selectedCards[4]">
                <image class="card-image" :src="selectedCards[4].image" mode="aspectFill"></image>
              </view>
              <view class="card-back" v-else>
                <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
              </view>
            </view>
            <view class="position-label">当前挑战</view>
          </view>
          
          <view class="card-position">
            <view class="card" :class="{ 'card-selected': selectedCards[5] }" @tap="selectCard(5)">
              <view class="card-front" v-if="selectedCards[5]">
                <image class="card-image" :src="selectedCards[5].image" mode="aspectFill"></image>
              </view>
              <view class="card-back" v-else>
                <image class="back-image" src="/src/static/zxqzimg/背面A.jpg" mode="aspectFill"></image>
              </view>
            </view>
            <view class="position-label">近期发展</view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="action-buttons">
      <button class="action-button shuffle-button" @tap="shuffleCards">重新洗牌</button>
    </view>
    
    <view class="reading-result" v-if="isReadingComplete">
      <view class="result-title">感情解读</view>
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
  selectedCards.value = [null, null, null]
  
  // 打乱牌组顺序
  for (let i = tarotDeck.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tarotDeck.value[i], tarotDeck.value[j]] = [tarotDeck.value[j], tarotDeck.value[i]]
  }
}

// 生成解读结果
const generateReading = () => {
  if (!isReadingComplete.value) return ''
  
  return `您的恋人金字塔牌阵解读：
  
关系结果：${selectedCards.value[0].name} - 显示了这段关系可能的发展方向。
您的感受：${selectedCards.value[1].name} - 揭示了您在这段关系中的真实感受和期待。
对方感受：${selectedCards.value[2].name} - 代表对方在这段关系中的感受和想法。
关系基础：${selectedCards.value[3].name} - 显示了这段关系的基础和根源。
当前挑战：${selectedCards.value[4].name} - 揭示了你们目前面临的主要挑战。
近期发展：${selectedCards.value[5].name} - 预示了关系在近期的可能发展。

这个牌阵提供了关系的全面视角，帮助您理解双方的感受和关系的动态。`
}
</script>

<style scoped>
.love-spread {
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

.pyramid-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30rpx;
}

.pyramid-row {
  display: flex;
  gap: 20rpx;
}

.card-position {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  width: 140rpx;
  height: 240rpx;
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

.position-label {
  font-size: 24rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
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