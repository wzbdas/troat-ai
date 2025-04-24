<template>
  <view class="muyu-container">
    <!-- 顶部信息区域 -->
    <view class="header">
      <text class="title">电子木鱼</text>
      <text class="subtitle">敲击木鱼，积累功德</text>
    </view>
    
    <!-- 功德计数器 -->
    <view class="merit-counter">
      <text class="merit-label">功德数</text>
      <text class="merit-value">{{ meritCount }}</text>
    </view>
    
    <!-- 木鱼区域 -->
    <view class="muyu-area">
      <view class="muyu-wrapper" @tap="tapMuyu">
        <image 
          class="muyu-image" 
          :class="{ 'tapping': isTapping }"
          src="../../../static/index/muyu.png" 
          mode="aspectFit"
        />
        
        <!-- 功德文字动画 -->
        <view 
          v-for="(item, index) in meritTexts" 
          :key="index"
          class="merit-text"
          :style="{ left: item.x + 'px', top: item.y + 'px', opacity: item.opacity }"
        >
          功德+1
        </view>
      </view>
    </view>
    
    <!-- 底部功能区 -->
    <view class="footer">
      <view class="stats">
        <view class="stat-item">
          <text class="stat-label">今日敲击</text>
          <text class="stat-value">{{ todayCount }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-label">总计敲击</text>
          <text class="stat-value">{{ totalCount }}</text>
        </view>
      </view>
      
      <view class="actions">
        <button class="action-btn" @tap="resetTodayCount">重置功德</button>
        <button class="action-btn" @tap="toggleSound">{{ isSoundOn ? '关闭音效' : '开启音效' }}</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      meritCount: 0,
      todayCount: 0,
      totalCount: 0,
      isTapping: false,
      isSoundOn: true,
      muyuSound: null,
      meritTexts: [],
      lastTapDate: null
    }
  },
  onLoad() {
    // 初始化音频
    this.initAudio();
    
    // 从本地存储加载数据
    this.loadData();
    
    // 检查日期，重置今日计数
    this.checkDate();
  },
  methods: {
    // 初始化音频
    initAudio() {
      this.muyuSound = uni.createInnerAudioContext();
      this.muyuSound.src = 'https://my-source-yqw-1350260472.cos.ap-beijing.myqcloud.com/audios%2Fmuyu.mp4';
      this.muyuSound.autoplay = false;
    },
    
    // 从本地存储加载数据
    loadData() {
      try {
        const meritData = uni.getStorageSync('muyuMeritData');
        if (meritData) {
          const data = JSON.parse(meritData);
          this.meritCount = data.meritCount || 0;
          this.todayCount = data.todayCount || 0;
          // 确保正确加载总计敲击数量
          this.totalCount = data.totalCount || 0;
          this.lastTapDate = data.lastTapDate ? new Date(data.lastTapDate) : new Date();
          this.isSoundOn = data.isSoundOn !== undefined ? data.isSoundOn : true;
        }
      } catch (e) {
      }
    },
    
    // 保存数据到本地存储
    saveData() {
      try {
        const data = {
          meritCount: this.meritCount,
          todayCount: this.todayCount,
          totalCount: this.totalCount,
          lastTapDate: new Date().toISOString(),
          isSoundOn: this.isSoundOn
        };
        uni.setStorageSync('muyuMeritData', JSON.stringify(data));
      } catch (e) {
      }
    },
    
    // 检查日期，如果不是同一天则重置今日计数
    checkDate() {
      if (!this.lastTapDate) return;
      
      const today = new Date();
      const lastDate = new Date(this.lastTapDate);
      
      if (today.getFullYear() !== lastDate.getFullYear() || 
          today.getMonth() !== lastDate.getMonth() || 
          today.getDate() !== lastDate.getDate()) {
        this.todayCount = 0;
        this.saveData();
      }
    },
    
    // 敲击木鱼
    tapMuyu() {
      // 增加计数
      this.meritCount++;
      this.todayCount++;
      this.totalCount++;
      
      // 播放音效
      if (this.isSoundOn) {
        this.playSound();
      }
      
      // 添加动画效果
      this.addTapAnimation();
      
      // 添加功德文字动画
      this.addMeritText();
      
      // 保存数据
      this.saveData();
    },
    
    // 播放敲击音效
    playSound() {
      if (this.muyuSound) {
        this.muyuSound.stop();
        this.muyuSound.play();
      }
    },
    
    // 添加敲击动画
    addTapAnimation() {
      this.isTapping = true;
      setTimeout(() => {
        this.isTapping = false;
      }, 150);
    },
    
    // 添加功德文字动画
    addMeritText() {
      // 获取随机位置
      const x = Math.random() * 100 - 50; // -50 到 50 之间
      const y = -Math.random() * 50 - 20; // -20 到 -70 之间
      
      // 创建新的功德文字
      const meritText = {
        x,
        y,
        opacity: 1
      };
      
      this.meritTexts.push(meritText);
      
      // 动画效果
      let opacity = 1;
      const timer = setInterval(() => {
        opacity -= 0.05;
        meritText.y -= 2;
        meritText.opacity = opacity;
        
        if (opacity <= 0) {
          clearInterval(timer);
          // 移除已完成动画的文字
          const index = this.meritTexts.indexOf(meritText);
          if (index !== -1) {
            this.meritTexts.splice(index, 1);
          }
        }
      }, 50);
    },
    
    // 重置今日功德计数
    resetTodayCount() {
      uni.showModal({
        title: '确认重置',
        content: '确定要重置今日功德计数吗？',
        success: (res) => {
          if (res.confirm) {
            // 只重置今日敲击和当前功德，保留总计敲击
            this.todayCount = 0;
            this.meritCount = 0;
            // 不修改 totalCount，保持总计敲击不变
            this.saveData();
            uni.showToast({
              title: '今日功德已重置',
              icon: 'none'
            });
          }
        }
      });
    },
    
    // 切换音效
    toggleSound() {
      this.isSoundOn = !this.isSoundOn;
      this.saveData();
      uni.showToast({
        title: this.isSoundOn ? '音效已开启' : '音效已关闭',
        icon: 'none'
      });
    }
  },
  onUnload() {
    // 页面卸载时释放音频资源
    if (this.muyuSound) {
      this.muyuSound.destroy();
    }
  }
}
</script>

<style>
.muyu-container {
  min-height: 100vh;
  background: #000;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: 40rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  color: #FFD700;
  display: block;
}

.subtitle {
  font-size: 28rpx;
  color: #E6C980;
  margin-top: 10rpx;
}

.merit-counter {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20rpx;
  padding: 20rpx 40rpx;
  margin-bottom: 60rpx;
  text-align: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
}

.merit-label {
  font-size: 32rpx;
  color: #FFD700;
  margin-right: 20rpx;
}

.merit-value {
  font-size: 48rpx;
  font-weight: bold;
  color: #FFD700;
}

.muyu-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}

.muyu-wrapper {
  position: relative;
  width: 300rpx;
  height: 300rpx;
}

.muyu-image {
  width: 100%;
  height: 100%;
  transition: transform 0.15s ease;
}

.muyu-image.tapping {
  transform: scale(0.9);
}

.merit-text {
  position: absolute;
  color: #FFD700;
  font-size: 28rpx;
  font-weight: bold;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
  pointer-events: none;
  transition: opacity 0.5s, top 0.5s;
}

.footer {
  width: 100%;
  margin-top: 60rpx;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40rpx;
}

.stat-item {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 20rpx 30rpx;
  text-align: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
}

.stat-label {
  font-size: 24rpx;
  color: #FFD700;
  display: block;
  margin-bottom: 10rpx;
}

.stat-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #FFD700;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.action-btn {
  flex: 1;
  margin: 0 20rpx;
  background-color: #8B4513;
  color: #FFD700;
  border-radius: 50rpx;
  font-size: 28rpx;
  height: 80rpx;
  line-height: 80rpx;
}
</style>