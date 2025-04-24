<template>
  <view class="avatar-select">
    <view class="header">
      <view class="back-btn" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="title">选择头像</text>
      <view class="right-placeholder"></view>
    </view>
    
    <view class="content">
      <view class="avatar-grid">
        <view 
          class="avatar-item" 
          v-for="(avatar, index) in avatars" 
          :key="index"
          @tap="selectAvatar(avatar)"
        >
          <image class="avatar-image" :src="avatar.url" mode="aspectFill"></image>
          <view class="selected-mark" v-if="selectedAvatar === avatar.url">
            <text class="check-icon">✓</text>
          </view>
        </view>
      </view>
    </view>

    <view class="footer">
      <button class="save-btn" @tap="saveAvatar">保存</button>
    </view>
  </view>
</template>

<style>
.avatar-select {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.header {
  padding-top: var(--status-bar-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(var(--status-bar-height) + 2vh) 4vw 2vh;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  padding: 2vw;
  margin-left: -2vw;
}

.back-icon {
  font-size: 1.2rem;
  color: #333;
}

.title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
}

.right-placeholder {
  width: 6vw;
}

.content {
  flex: 1;
  padding: 3vw;
  background-color: #fff;
}

.avatar-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 3vw;
}

.avatar-item {
  width: calc((100% - 6vw) / 3);
  position: relative;
  aspect-ratio: 1;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.selected-mark {
  position: absolute;
  bottom: 1vw;
  right: 1vw;
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  background-color: #ff6b9d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.check-icon {
  color: #fff;
  font-size: 0.8rem;
}

.footer {
  padding: 3vw;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.save-btn {
  width: 100%;
  height: 8vh;
  line-height: 8vh;
  text-align: center;
  background: #ff6b9d;
  color: #fff;
  border-radius: 6vw;
  font-size: 1rem;
  margin: 0;
}
</style>

<script>
export default {
  data() {
    return {
      selectedAvatar: '',
      avatars: [
        { id: 1, url: '../../static/img/2.jpg' },
        { id: 2, url: '../../static/img/3.jpg' },
        { id: 3, url: '../../static/img/4.jpg' },
        { id: 4, url: '../../static/img/5.jpg' },
        { id: 5, url: '../../static/img/6.jpg' },
        { id: 6, url: '../../static/img/7.jpg' },
        { id: 7, url: '../../static/img/8.jpg' },
        { id: 8, url: '../../static/img/9.jpg' },
        { id: 9, url: '../../static/img/10.jpg' },
        { id: 10, url: '../../static/img/11.jpg' },
        { id: 11, url: '../../static/img/12.jpg' },
        { id: 12, url: '../../static/img/13.jpg' },
      ]
    }
  },
  onLoad() {
    try {
      const userInfo = uni.getStorageSync('userInfo');
      if (userInfo) {
        const parsedInfo = JSON.parse(userInfo);
        this.selectedAvatar = parsedInfo.img || '../../../img/1.jpg';  // 设置默认头像
      }
    } catch (error) {
      console.error('获取用户头像失败:', error);
    }
  },
  methods: {
    selectAvatar(avatar) {
      this.selectedAvatar = avatar.url;
    },
    saveAvatar() {
      try {
        const userInfo = uni.getStorageSync('userInfo');
        if (userInfo) {
          const parsedInfo = JSON.parse(userInfo);
          parsedInfo.img = this.selectedAvatar;
          uni.setStorageSync('userInfo', JSON.stringify(parsedInfo));
          
          // 发送更新事件
          uni.$emit('userInfoUpdated', parsedInfo);
          
          uni.showToast({
            title: '头像已保存',
            icon: 'success',
            duration: 1500,
            success: () => {
              setTimeout(() => {
                uni.navigateBack();
              }, 1500);
            }
          });
        }
      } catch (error) {
        console.error('保存头像失败:', error);
        uni.showToast({
          title: '保存失败',
          icon: 'error'
        });
      }
    }
  }
}
</script>