<template>
  <view class="page">
    <!-- Carousel -->
    <swiper class="carousel" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500">
      <swiper-item>
        <image src="https://my-source-yqw-1350260472.cos.ap-beijing.myqcloud.com/images%2Fswiper1.jpg" class="carousel-image" />
        <view class="carousel-text">冥想行愈，手抚内心的平静与自信</view>
      </swiper-item>
      <swiper-item>
        <image src="https://my-source-yqw-1350260472.cos.ap-beijing.myqcloud.com/images%2Fswiper2.webp" class="carousel-image" />
        <view class="carousel-text">探索内心，释放无限可能</view>
      </swiper-item>
    </swiper>
    <!-- 音频列表 -->
    <view class="section" v-for="type in AudioTypeList" :key="type.id">
      <view class="section-header">
        <text class="section-title">{{ type.Type }}</text>
        <text class="section-more" @click="toggleTypeExpand(type.id)">
          {{ isTypeExpanded(type.id) ? '收起' : '查看更多' }}
        </text>
      </view>
      <view class="item-list">
        <view 
          class="item" 
          v-for="(item, index) in getFilteredAudioByType(type.id)" 
          :key="item.id">
          <image :src="item.imageUrl" class="item-image" />
          <text class="item-title">{{ item.name }}</text>
          <button class="item-button" @click="toggleAudio(index, type.id)">
            <image
              class="bofang"
              :src="item.isPlaying==1 ? '../../../static/index/yinpinbofang.png' : '../../../static/index/yinpin-bofang.png'"
              mode="scaleToFill"
            />
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getAudioTypeList, getAudioList, updateAudioStatus } from '../../../servers/index'
// 存储每个类型的展开状态
const expandedTypes = ref({});

// 切换类型展开状态
const toggleTypeExpand = (typeId) => {
  expandedTypes.value[typeId] = !expandedTypes.value[typeId];
};

// 检查类型是否展开
const isTypeExpanded = (typeId) => {
  return !!expandedTypes.value[typeId];
};

// 根据类型获取过滤后的音频列表
const getFilteredAudioByType = (typeId) => {
  // 过滤出该类型的所有音频
  const typeAudios = AudioList.value.filter(audio => audio.type_id === typeId);
  
  // 如果该类型已展开，返回所有音频，否则只返回前3个
  return isTypeExpanded(typeId) ? typeAudios : typeAudios.slice(0, 1);
};
// 音频数据
const AudioList = ref([]);
// 音频类型数据
const AudioTypeList = ref([]);
// 使用Map存储音频上下文
const audioContextMap = ref(new Map());
const showAllAudioList = ref(false);

// 初始化音频上下文函数
const initAudioContexts = () => {
  AudioList.value.forEach((item) => {
    // 如果已经有这个音频的上下文，先销毁
    if (audioContextMap.value.has(item.id)) {
      audioContextMap.value.get(item.id).destroy();
    }
    
    const audioContext = uni.createInnerAudioContext();
    audioContext.src = item.url;
    audioContext.onPlay(() => {
      // 更新本地状态
      item.isPlaying = 1;
    });
    
    audioContext.onPause(() => {
      // 更新本地状态
      item.isPlaying = 0;
    });
    
    audioContext.onEnded(() => {
      // 更新本地状态
      item.isPlaying = 0;
      // 更新后端状态
      updateAudioStatus({ id: item.id, isPlaying: 0 });
    });
    
    audioContext.onError((res) => {
      uni.showToast({ title: '音频加载失败', icon: 'none' });
    });
    
    audioContextMap.value.set(item.id, audioContext);
  });
};

// 获取音频列表
const fetchAudioList = async () => {
  try {
    const res = await getAudioList();
    if (res && res.data) {
      AudioList.value = res.data.data;
      // 获取数据后初始化音频上下文
      initAudioContexts();
    } 
  } catch (error) {
    uni.showToast({
      title: '获取音频列表失败',
      icon: 'none'
    });
  }
};

// 获取音频类型列表
const fetchAudioTypeList = async () => {
  try {
    const res = await getAudioTypeList();
    AudioTypeList.value = res.data.data;
  } catch (error) {
    uni.showToast({
      title: '获取音频类型列表失败',
      icon: 'none'
    });
  }
};


// 切换音频播放/暂停
const toggleAudio = async (index,typeId) => {
  const typeAudios = getFilteredAudioByType(typeId);
  const item = typeAudios[index];
  if (!item) {
    uni.showToast({ title: '音频项不存在', icon: 'none' });
    return;
  }

  try {
    // 获取音频上下文
    const audioContext = audioContextMap.value.get(item.id);
    if (!audioContext) {
      uni.showToast({ title: '音频初始化失败', icon: 'none' });
      return;
    }

    // 确定新的播放状态
    const newStatus = item.isPlaying === 1 ? 0 : 1;

    // 先控制音频播放，再更新状态
    if (newStatus === 1) {
      // 暂停所有正在播放的音频
      AudioList.value.forEach((otherItem) => {
        if (otherItem.id !== item.id && otherItem.isPlaying === 1) {
          const otherContext = audioContextMap.value.get(otherItem.id);
          if (otherContext) {
            otherContext.pause();
            // 更新其他音频状态
            updateAudioStatus({ id: otherItem.id, isPlaying: 0 });
            // 更新本地状态
            otherItem.isPlaying = 0;
          }
        }
      });
      
      // 播放当前音频
      audioContext.play();
    } else {
      // 暂停当前音频
      audioContext.pause();
    }


   // 调用后端接口更新状态
   const res = await updateAudioStatus({ id: item.id, isPlaying: newStatus });
    if (res && res.data) {
      
      // 直接更新本地状态
      item.isPlaying = newStatus;
    } else {
      uni.showToast({ title: '更新音频状态失败', icon: 'none' });
    }
  } catch (error) {
    uni.showToast({ title: '操作失败，请重试', icon: 'none' });
  }
};

// 组件挂载
onMounted(() => {
  fetchAudioList();
  fetchAudioTypeList();
});

// 销毁音频上下文
onUnmounted(() => {
  audioContextMap.value.forEach((context) => {
    context.destroy();
  });
  audioContextMap.value.clear();
});
</script>

<style scoped>
.page {
  background-image: url('../../../static/index/meditation.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding: 20rpx;
  box-sizing: border-box;
}

/* Carousel */
.carousel {
  height: 400rpx;
  border-radius: 20rpx;
  overflow: hidden;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-text {
  position: absolute;
  bottom: 20rpx;
  left: 20rpx;
  color: #fff;
  font-size: 32rpx;
  font-weight: bold;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}



/* Section */
.section {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  margin-top:20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.section-more {
  font-size: 24rpx;
  color: #666;
}

.section-subheader {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
}

/* Water Sounds List */
.item-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  height: 100rpx;
}

.item-image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
  object-fit: cover;
  margin-right: 20rpx;
}

.item-title {
  flex: 1;
  font-size: 32rpx;
  color: #333;
}

.item-button {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 10rpx 20rpx;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bofang {
  width: 40rpx;
  height: 40rpx;
}

/* Bowls Grid */
.item-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.item-grid .item {
  flex: 1;
  min-width: 200rpx;
  text-align: center;
  flex-direction: column;
  background-color: transparent;
  padding: 0;
  height: auto;
}

.item-grid .item-image {
  width: 150rpx;
  height: 150rpx;
  margin: 0 auto 10rpx;
}

.item-grid .item-title {
  font-size: 28rpx;
  display: block;
  margin-bottom: 10rpx;
}

.item-grid .item-button {
  background-color: #fff;
  font-size: 24rpx;
}
</style>