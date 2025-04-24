<template>
    <view>
        <scroll-view scroll-x class="tab-container" :show-scrollbar="false">
      <view class="tab-wrapper">
        <view 
          v-for="(item, index) in tabList" 
          :key="index"
          :class="['tab-item', { active: currentTab === index }]"
          @tap="switchTab(index)"
        >
          {{ item.name }}
        </view>
      </view>
    </scroll-view>

    <!-- 添加大师列表渲染 -->
    <view class="dashi-list">
      <view 
        v-for="(item, index) in filteredDashiList" 
        :key="index"
        class="dashi-item"
      >
        <image :src="item.img" mode="aspectFill" class="dashi-avatar"/>
        <view class="dashi-info">
          <text class="dashi-name">{{item.name}}</text>
          <text class="dashi-type">{{item.type}}</text>
          <text class="dashi-intro">{{item.troduce}}</text>
        </view>
      </view>
    </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 定义标签列表
const tabList = ref([
  { name: '大师专栏' },
  { name: '星座领域'},
  { name: '生肖领域' },
  { name: '塔罗领域' },
  { name: '命理大师' }
])

// 当前选中的标签索引
const currentTab = ref(0)

// 添加切换标签的方法
const switchTab = (index) => {
  currentTab.value = index
}

// 扩展dashiList数据，添加category属性
const dashiList = ref([
  {
    name: '苏珊米勒',
    type: '全球著名占星作家',
    img: '/static/zxdashi/sushan.png',
    troduce: '苏珊米勒是美国著名的占星家，同时她又是畅销书作家、专栏作家、网络作家和实业家。1995年，她推出了自己的获奖网站——占星区网站(AstrologyZone)。由于该网站每月发布的星座综合运势预测非常准确，使苏珊米勒受到了来自全世界范围的赞誉。',
    category: ['大师专栏', '星座领域']
  },
  {
    name: '莫小奇',
    type: '星座女神',
    img: '/static/zxdashi/moxiaoqi.png',
    troduce: '莫小奇是中国古代神话中一位非常有名的女神，她的名字来源于古代神话中的"莫"和"小奇"两个字。',
    category: ['大师专栏', '命理大师']
  },
  {
    name: '爱莎公主',
    type: '神秘学专家',
    img: '/static/zxdashi/aishagz.png',
    troduce: '爱莎公主，澳籍华人，新南威尔士大学艺术系研究生，神秘学专家，心理学专家，生活美学家，时尚能量设计师。从事身心灵工作迄今已经15年，现任澳大利亚塔罗协会会员，美国塔罗协会会员，国际塔罗专家协会会员，中华塔罗文化协会会长。爱莎已经风靡娱乐圈与时尚界，成为明星大腕最爱的人生导师。',
    category: ['大师专栏', '塔罗领域']
  },
  {
    name: '艾菲尔',
    type: '星座塔罗作家',
    img: '/static/zxdashi/aifeie.png',
    troduce: '艾菲尔是一位非常有名的塔罗作家，她的名字来源于希腊神话中的"艾菲尔塔"。',
    category: ['大师专栏', '星座领域']
  },
  {
    name: '董易珊',
    type: '姓名学专家',
    img: '/static/zxdashi/dongys.png',
    troduce: '生于孔子故里，长于周易世家，中国女性起名第一人。她是著名国学研究应用专家，现代环境风水学，姓名学应用专家。毕业于山东中医学院，后在新加坡国立大学获得环境工程学硕士学位，现任中国国际周易联合会理事、中国姓名研究会会长、大易开运国际文化传播(北京)有限公司执行董事。',
    category: ['大师专栏', '生肖领域']
  },
  {
    name: '看星星的Kiddo',
    type: '独立塔罗占卜师',
    img: '/static/zxdashi/tarotp.png',
    troduce: '独立塔罗占卜师，签约自媒体，多家媒体星座专栏运势作者，擅长UniversalWaite和AleisterCrowleyThoth进行塔罗运势个案占卜。',
    category: ['大师专栏', '塔罗领域']
  },
  {
    name: '张鑫龙',
    type: '国内著名玄学大师',
    img: '/static/zxdashi/zhangxl.png',
    troduce: '张鑫龙，生于古燕赵之地的河北省定兴县，在易水之地纯朴开朗的民风熏陶下，自幼爱好中国传统文化和玄学。师从本地有名的易理大师孙茂坤先生，苦学数载，精通周易、四柱、风水、六爻、面相术等玄学理论。',
    category: ['大师专栏', '命理大师']
  },
  {
    name: '董易林',
    type: '著名周易研究大师',
    img: '/static/zxdashi/dongyl.png',
    troduce: '董易林生于孔孟之乡，长在易经世家，擅长堪舆风水学、建筑风水学、命理姓名学等。得益于家族文化氛围的熏陶，以及自身的研究实践，董易林老师不断推陈出新，将中华传统文化与现代生活进行创新性的结合，专业声望远播海外，堪称周易文化传承和弘扬的领军人物。',
    category: ['大师专栏', '生肖领域']
  }
])

// 添加计算属性来过滤数据
const filteredDashiList = computed(() => {
  const currentCategory = tabList.value[currentTab.value].name
  if (currentCategory === '大师专栏') {
    return dashiList.value
  }
  return dashiList.value.filter(item => item.category.includes(currentCategory))
})

// 添加咨询处理方法
const handleConsult = (dashi) => {
  // 这里可以添加跳转到咨询页面的逻辑
  uni.navigateTo({
    url: `/pages/star/consult/index?master=${encodeURIComponent(JSON.stringify(dashi))}`
  })
}
</script>

<style scoped>
.tab-container {
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 30rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}

.tab-wrapper {
  display: inline-flex;
  gap: 20rpx;
  padding: 0 10rpx;
  box-sizing: border-box;
  width: max-content; /* 保持内容宽度 */
  justify-content: flex-start;
}

.tab-item {
  padding: 16rpx 30rpx;
  background: #f5f5f5;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #666;
  transition: all 0.3s ease;
  flex-shrink: 0;
  display: inline-block;
}

.tab-item.active {
  background: #ff85a2;
  color: #fff;
}

.dashi-list {
  padding: 20rpx;
}

.dashi-item {
  display: flex;
  padding: 20rpx;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.dashi-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  margin-right: 20rpx;
}

.dashi-info {
  flex: 1;
}

.dashi-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
  display: block;
}

.dashi-type {
  font-size: 24rpx;
  color: #ff85a2;
  margin-bottom: 12rpx;
  display: block;
}

.dashi-intro {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

/* 优化tab样式 */
.tab-container {
  background: #fff;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.tab-item {
  padding: 16rpx 36rpx;
  font-size: 28rpx;
  transition: all 0.3s ease;
}

.tab-item.active {
  background: linear-gradient(135deg, #ff85a2, #ff6b8b);
  color: #fff;
  box-shadow: 0 4rpx 12rpx rgba(255, 133, 162, 0.3);
}
</style>