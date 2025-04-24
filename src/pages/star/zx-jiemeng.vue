<template>
  <view class="dream-container">
    <!-- 顶部背景和标题 -->
    <view class="header">
    <view class="header-bg"></view>
    <view class="header-content">
      <text class="header-title">周公解梦</text>
      <view class="search-box">
        <input 
          type="text" 
          v-model="searchText" 
          placeholder="梦见..." 
          class="search-input"
        />
        <button class="search-btn" @tap="handleSearch">解梦</button>
      </view>
      <view class="hot-tags-wrapper">
  <scroll-view scroll-x class="hot-tags" :show-scrollbar="false">
    <view class="tags-container">
      <text 
        v-for="(tag, index) in hotTags" 
        :key="index"
        class="tag"
        @tap="handleTagClick(tag)"
      >{{ tag }}</text>
    </view>
  </scroll-view>
</view>
    </view>
  </view>

    <view class="category-grid">
      <view 
        v-for="(category, index) in categories" 
        :key="index"
        class="category-item"
        @tap="handleCategoryClick(category)"
      >
        <image :src="category.icon" mode="aspectFit" class="category-icon" />
        <text class="category-name">{{ category.name }}</text>
      </view>
    </view>

    <view class="popup" v-if="showPopup" @tap="closePopup">
    <view class="popup-content" @tap.stop>
      <view class="popup-header">
        <text class="popup-title">{{ selectedCategory?.name || '' }}分类</text>
        <view class="popup-close" @tap="closePopup">
          <text class="close-icon">×</text>
        </view>
      </view>
      <scroll-view scroll-y class="popup-body">
        <view 
          v-for="(item, index) in categoryContent" 
          :key="index"
          class="category-dream-item"
          hover-class="item-hover"
          @tap="handleDreamItemClick(item)"
        >
          <view class="dream-content">
            <text class="dream-title">{{ item.title }}</text>
            <text class="dream-desc">{{ item.description }}</text>
          </view>
          <text class="item-arrow">›</text>
        </view>
      </scroll-view>
    </view>
  </view>


    <!-- 常见解梦列表 -->
    <view class="dream-list">
      <view class="list-title">常见解梦</view>
      <view 
        v-for="(item, index) in dreamList" 
        :key="index"
        class="dream-item"
        @tap="handleDreamClick(item)"
      >
        <text class="dream-name">{{ item.name }}</text>
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
const searchText = ref('')
const hotTags = ref(['结婚', '怀孕', '蛇', '死人', '猫', '狗', '掉牙', '下雨'])
import { analyzeDream } from '@/servers/star'
const showPopup = ref(false)
const selectedCategory = ref(null)
const categoryContent = ref([])

const categories = ref([
  { name: '常见', icon: '/src/static/zximgh5/dream-icons/common.png' },
  { name: '人物', icon: '/src/static/zximgh5/dream-icons/people.png' },
  { name: '身体', icon: '/src/static/zximgh5/dream-icons/body.png' },
  { name: '情感', icon: '/src/static/zximgh5/dream-icons/emotion.png' },
  { name: '动物', icon: '/src/static/zximgh5/dream-icons/animal.png' },
  { name: '植物', icon: '/src/static/zximgh5/dream-icons/plant.png' },
  { name: '物品', icon: '/src/static/zximgh5/dream-icons/item.png' },
  { name: '生活', icon: '/src/static/zximgh5/dream-icons/life.png' },
  { name: '鬼神', icon: '/src/static/zximgh5/dream-icons/ghost.png' },
  { name: '自然', icon: '/src/static/zximgh5/dream-icons/nature.png' },
  { name: '建筑', icon: '/src/static/zximgh5/dream-icons/building.png' },
  { name: '其他', icon: '/src/static/zximgh5/dream-icons/other.png' }
])

const categoryData = {
  '常见': [
    { title: '掉牙齿', description: '预示着生活将有重大转变' },
    { title: '考试', description: '反映内心的压力与焦虑' },
    { title: '飞翔', description: '象征追求自由与突破' },
    { title: '死亡', description: '象征着重生与转变' },
    { title: '结婚', description: '代表新的开始或承诺' }
  ],
  '人物': [
    { title: '已故亲人', description: '思念或未了心愿的表现' },
    { title: '陌生人', description: '内心隐藏面的投射' },
    { title: '名人', description: '对某种特质的向往' },
    { title: '婴儿', description: '新的开始或纯真的象征' },
    { title: '老人', description: '智慧与经验的体现' }
  ],
  '身体': [
    { title: '掉头发', description: '暗示压力与衰退' },
    { title: '流血', description: '能量流失或情感创伤' },
    { title: '断腿', description: '行动受阻或方向迷失' },
    { title: '长高', description: '个人成长与进步' },
    { title: '生病', description: '需要休息与调整' }
  ],
  '情感': [
    { title: '哭泣', description: '情感需要释放' },
    { title: '大笑', description: '内心的喜悦与释放' },
    { title: '愤怒', description: '压抑情绪的表现' },
    { title: '恐惧', description: '内心深处的不安' },
    { title: '孤独', description: '自我反思的需要' }
  ],
  '动物': [
    { title: '蛇', description: '智慧或危险的象征' },
    { title: '猫', description: '神秘与优雅的象征' },
    { title: '狗', description: '忠诚与保护的象征' },
    { title: '鸟', description: '自由与希望的象征' },
    { title: '龙', description: '力量与成功的象征' }
  ],
  '植物': [
    { title: '开花', description: '希望与新生的象征' },
    { title: '枯萎', description: '某种结束或衰退' },
    { title: '大树', description: '生命力与庇护' },
    { title: '果实', description: '收获与成就' },
    { title: '草地', description: '安宁与自由' }
  ],
  '物品': [
    { title: '钱财', description: '价值与机遇' },
    { title: '手机', description: '通讯与联系' },
    { title: '车子', description: '人生方向与进程' },
    { title: '房子', description: '安全感与归属' },
    { title: '镜子', description: '自我认知与反思' }
  ],
  '生活': [
    { title: '吃饭', description: '能量补充与满足' },
    { title: '购物', description: '欲望与选择' },
    { title: '工作', description: '责任与成就' },
    { title: '旅行', description: '人生历程与探索' },
    { title: '搬家', description: '生活的改变与转折' }
  ],
  '鬼神': [
    { title: '鬼魂', description: '潜意识的显现' },
    { title: '神仙', description: '理想与向往' },
    { title: '妖怪', description: '内心的恐惧' },
    { title: '天使', description: '指引与保护' },
    { title: '恶魔', description: '内心的阴暗面' }
  ],
  '自然': [
    { title: '下雨', description: '情绪的释放' },
    { title: '打雷', description: '内心的震撼' },
    { title: '彩虹', description: '希望与祝福' },
    { title: '海洋', description: '情感的深度' },
    { title: '山峰', description: '目标与挑战' }
  ],
  '建筑': [
    { title: '高楼', description: '成就与野心' },
    { title: '古堡', description: '神秘与保护' },
    { title: '桥梁', description: '沟通与过渡' },
    { title: '学校', description: '学习与成长' },
    { title: '医院', description: '治愈与康复' }
  ],
  '其他': [
    { title: '时间', description: '生命的流逝' },
    { title: '颜色', description: '情绪的象征' },
    { title: '数字', description: '命运的暗示' },
    { title: '方向', description: '人生的指引' },
    { title: '光影', description: '希望与迷茫' }
  ]
}




const dreamList = ref([
  { 
    name: '爬山', 
    content: '梦见爬山',
    analysis: `1. 梦境的整体概述
梦见爬山通常象征着你正在面对人生中的挑战和困难，正在努力向上攀登，追求更高的目标。

2. 梦境中关键元素的象征意义
山：代表人生道路上的障碍、挑战或目标。
爬行动作：象征着努力、奋斗和坚持不懈的精神。
山顶：代表成功、成就和目标的实现。

3. 潜意识心理状态分析
这个梦可能反映了你当前面临的压力和挑战，同时也表明你有克服困难的决心和毅力。

4. 与现实生活的关联
你可能正在工作、学习或生活中面临一些困难或挑战，需要付出额外的努力才能克服。

5. 建设性的建议和启示
坚持不懈地努力，相信自己能够克服困难。适当休息，调整步伐，不要给自己太大压力。`
  },
  { 
    name: '剪发', 
    content: '梦见剪头发',
    analysis: `1. 梦境的整体概述
梦见剪头发通常与个人形象、生活变化或心态转变有关，可能预示着你正在经历或即将经历一些改变。

2. 梦境中关键元素的象征意义
头发：在许多文化中，头发象征着力量、个性和生命力。
剪发行为：代表改变、转变或放下过去。
剪发后的感受：反映对你的变化的态度。

3. 潜意识心理状态分析
这个梦可能表明你渴望改变或正在经历转变，也可能反映你对失去某些东西的担忧。

4. 与现实生活的关联
你可能正在考虑做出一些改变，如工作转变、关系调整或生活方式的改变。

5. 建设性的建议和启示
接受变化是生活的一部分，勇敢面对新的开始。评估什么对你真正重要，做出符合自己内心的决定。`
  },
  { 
    name: '打蛇', 
    content: '梦见打蛇',
    analysis: `1. 梦境的整体概述
梦见打蛇通常象征着你正在与内心的恐惧、威胁或敌人作斗争，表现出你面对困难的勇气和决心。

2. 梦境中关键元素的象征意义
蛇：在梦境中常代表隐藏的威胁、恐惧、智慧或转变。
打蛇行为：象征着面对挑战、克服困难的勇气。
蛇的反应：反映问题的难度或解决的可能性。

3. 潜意识心理状态分析
这个梦可能表明你正在努力克服内心的恐惧或外部的威胁，展现了你的勇气和决心。

4. 与现实生活的关联
你可能正在面对工作、人际关系或个人生活中的挑战或威胁，需要勇敢面对。

5. 建设性的建议和启示
相信自己有能力克服困难。识别生活中的真正威胁，采取适当的行动来保护自己。`
  },
  { 
    name: '爬坡', 
    content: '梦见爬坡',
    analysis: `1. 梦境的整体概述
梦见爬坡通常象征着你正在努力克服生活中的障碍和挑战，朝着目标前进。

2. 梦境中关键元素的象征意义
坡：代表生活中的困难、挑战或目标。
爬行动作：象征着努力、奋斗和坚持。
坡的陡峭程度：反映困难的大小。

3. 潜意识心理状态分析
这个梦可能反映了你面对困难时的毅力和决心，也可能表明你感到生活充满挑战。

4. 与现实生活的关联
你可能正在工作或个人生活中面临一些需要克服的障碍，正在努力向上攀登。

5. 建设性的建议和启示
坚持不懈，相信自己能够克服困难。寻找更有效的方法来应对挑战，必要时寻求他人的帮助。`
  },
  { 
    name: '洗澡', 
    content: '梦见洗澡',
    analysis: `1. 梦境的整体概述
梦见洗澡通常象征着净化、更新和自我反思，可能预示着你正在经历或渴望一种精神上或情感上的净化。

2. 梦境中关键元素的象征意义
水：代表情感、净化和生命力。
洗澡行为：象征着清洁、净化和更新。
洗澡的环境：反映你的私人空间和安全感。

3. 潜意识心理状态分析
这个梦可能表明你希望摆脱过去的负担、压力或负面情绪，开始新的阶段。

4. 与现实生活的关联
你可能正在经历一段自我反思的时期，或者渴望从某些负面经历中恢复过来。

5. 建设性的建议和启示
给自己时间和空间进行自我反思和恢复。接受过去的经历，但不要让它们定义你的未来。`
  },
  { 
    name: '杀鱼', 
    content: '梦见杀鱼',
    analysis: `1. 梦境的整体概述
梦见杀鱼可能象征着你正在处理或终结某些情感或关系，也可能代表为了生存或进步而做出的必要牺牲。

2. 梦境中关键元素的象征意义
鱼：在梦中常代表情感、直觉或潜意识的想法。
杀鱼行为：象征着结束、转变或控制。
鱼的反应：反映对你的这种变化的感受。

3. 潜意识心理状态分析
这个梦可能表明你正在努力控制自己的情感，或者正在结束某段关系或生活阶段。

4. 与现实生活的关联
你可能正在面临需要做出艰难决定的情况，或者正在结束某段关系或项目。

5. 建设性的建议和启示
 recognizes sometimes end is new beginning. evaluate your decision whether it truly fits your long-term interests and values.`
  },
  { 
    name: '上课', 
    content: '梦见上课',
    analysis: `1. 梦境的整体概述
梦见上课通常与学习、成长和自我提升有关，可能反映你对知识的渴望或对未准备好面对某种挑战的担忧。

2. 梦境中关键元素的象征意义
课堂：代表学习环境、社交场合或评估场所。
老师：象征权威、指导或内心的智慧。
学习内容：反映你当前关注的问题或需要发展的技能。

3. 潜意识心理状态分析
这个梦可能表明你渴望学习和成长，或者担心自己在某些方面准备不足。

4. 与现实生活的关联
你可能正在面临需要新知识或技能的挑战，或者回忆起过去的学习经历。

5. 建设性的建议和启示
保持学习的心态，不断提升自己。接受生活中的每一课，无论是成功还是失败，都是成长的机会。`
  },
  { 
    name: '捡指甲', 
    content: '梦见捡指甲',
    analysis: `1. 梦境的整体概述
梦见捡指甲是一个较为罕见的梦境，可能与自我形象、健康意识或对细节的关注有关。

2. 梦境中关键元素的象征意义
指甲：代表自我保护、防御或个人形象的一部分。
捡拾行为：象征着对被忽视或丢弃事物的重视。
指甲的状态：反映你对自身状况的感受。

3. 潜意识心理状态分析
这个梦可能表明你正在关注自己通常忽视的细节，或者试图重新获得某种失去的保护或力量。

4. 与现实生活的关联
你可能正在重新评估被忽视的方面，或者对你的健康和形象有新的关注。

5. 建设性的建议和启示
关注生活中的细节可能会带来意想不到的收获。重视自我保健和个人形象，但不要过分执着于表面现象。`
  },
  { 
    name: '抱鱼', 
    content: '梦见抱鱼',
    analysis: `1. 梦境的整体概述
梦见抱鱼通常与情感、直觉和丰富有关，可能象征着你正在拥抱自己的情感或潜意识的想法。

2. 梦境中关键元素的象征意义
鱼：代表情感、直觉、财富或生育能力。
抱的动作：象征着接纳、保护或珍视。
鱼的大小和数量：反映情感或财富的程度。

3. 潜意识心理状态分析
这个梦可能表明你正在接受自己的情感，或者对某种机会或财富感到满足和珍视。

4. 与现实生活的关联
你可能正在经历情感上的满足，或者正在获得某种形式的丰富或机会。

5. 建设性的建议和启示
珍视你的情感和直觉，它们是你生活中的重要资源。保持开放的心态，接受生活带给你的丰富和机会。`
  },
  { 
    name: '捡钱', 
    content: '梦见捡钱',
    analysis: `1. 梦境的整体概述
梦见捡钱通常与机遇、价值和自我价值感有关，可能象征着你正在发现自己未被认可的价值或机会。

2. 梦境中关键元素的象征意义
钱：代表价值、机会、能量或自我价值。
捡钱行为：象征着发现、获得或认可价值。
钱的数量：反映价值或机会的大小。

3. 潜意识心理状态分析
这个梦可能表明你正在认识到自己的价值，或者对即将到来的好运和机会感到期待。

4. 与现实生活的关联
你可能正在寻找或发现新的机会，或者开始更加重视自己的才能和价值。

5. 建设性的建议和启示
保持警觉，留意生活中的机会。相信自己的价值，不要害怕追求应得的回报和认可。`
  }
])

const handleSearch = async () => {
  if (!searchText.value.trim()) {
    uni.showToast({
      title: '请输入梦境内容',
      icon: 'none'
    })
    return
  }
  
  try {
    // 显示加载提示
    uni.showLoading({
      title: '正在解析梦境...'
    })
    
    // 调用解梦接口
    const response = await analyzeDream({
      dreamContent: searchText.value,
      additionalInfo: ''
    })
    
    // 关闭加载提示
    uni.hideLoading()
    
    // 检查响应格式
    console.log('API响应:', response)
    
    if (response && response.data) {
      if (response.data.success) {
        // 跳转到解梦详情页，传递内容和解析结果
        uni.navigateTo({
      url: `/pages/star/component/dream-detail?content=${encodeURIComponent(searchText.value)}&analysis=${encodeURIComponent(response.data.result)}`
    })
      } else {
        throw new Error(response.data.error || '解析失败')
      }
    } else {
      throw new Error('无效的响应数据')
    }
  } catch (error) {
    uni.hideLoading()
    console.error('解梦请求失败:', error)
    
    // 显示更具体的错误信息
    uni.showToast({
      title: error.message || '网络错误，请重试',
      icon: 'none',
      duration: 2000
    })
  }
}




const handleTagClick = (tag) => {
  searchText.value = tag
  handleSearch()
}
//点击分类的按钮
const handleCategoryClick = (category) => {
  selectedCategory.value = category
  categoryContent.value = categoryData[category.name] || []
  showPopup.value = true
}
// 关闭弹出框
const closePopup = () => {
  showPopup.value = false
  selectedCategory.value = null
}
// 处理具体解梦项点击
const handleDreamItemClick = async (item) => {
  try {
    uni.showLoading({
      title: '正在解析梦境...'
    })
    
    const response = await analyzeDream({
      dreamContent: item.title,
      additionalInfo: item.description || ''
    })
    
    uni.hideLoading()
    
    if (response && response.data) {
      if (response.data.success) {
        uni.navigateTo({
          url: `/pages/star/component/jiemengxq?content=${encodeURIComponent(item.title)}&analysis=${encodeURIComponent(response.data.result)}`
        })
      } else {
        throw new Error(response.data.error || '解析失败')
      }
    } else {
      throw new Error('无效的响应数据')
    }
  } catch (error) {
    uni.hideLoading()
    console.error('解梦请求失败:', error)
    
    // 如果 AI 接口失败，使用默认描述
    uni.navigateTo({
      url: `/pages/star/component/jiemengxq?content=${encodeURIComponent(item.title)}&analysis=${encodeURIComponent(item.description || '暂无解析')}`
    })
  }
}

const handleDreamClick = (dream) => {
  uni.navigateTo({
    url: `/pages/star/component/jiemengxq?content=${encodeURIComponent(dream.content)}&analysis=${encodeURIComponent(dream.analysis)}`
  })
}
</script>

<style scoped>
.dream-container {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 40rpx;
}

.header {
  position: relative;
  height: 400rpx;
  width: 100%;
}
.header-content {
  position: relative;
  z-index: 2;
  padding: 30rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../../static/zximgh5/dream-bg.png');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  z-index: 1;
}

.header-bg::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 133, 162, 0.3), rgba(255, 133, 162, 0.1));
}

.header-title {
  color: #fff;
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin: 20rpx 0;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
}

.search-box {
  margin: 20rpx 0;
  display: flex;
  gap: 20rpx;
}

.search-input {
  flex: 1;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 40rpx;
  padding: 0 30rpx;
  font-size: 28rpx;
}

.search-btn {
  width: 160rpx;
  height: 80rpx;
  background: #ff85a2;
  color: #fff;
  border-radius: 40rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.hot-tags-wrapper {
  width: 100%;
  margin-top: auto;
  padding-bottom: 40rpx;
}

.hot-tags {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}

.tags-container {
  display: inline-flex;
  padding: 0 10rpx;
  gap: 20rpx;
}

.tag {
  padding: 8rpx 20rpx;
  background: rgba(255, 255, 255, 0.85);
  color: #ff85a2;
  border-radius: 20rpx;
  font-size: 26rpx;
  display: inline-block;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.category-grid {
  margin: 40rpx 30rpx;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.category-icon {
  width: 80rpx;
  height: 80rpx;
}

.category-name {
  font-size: 24rpx;
  color: #666;
}

.dream-list {
  margin: 0 30rpx;
}

.list-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #333;
}

.dream-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.dream-name {
  font-size: 28rpx;
  color: #333;
}

.arrow {
  color: #999;
  font-size: 24rpx;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.popup-content {
  width: 90%;
  max-height: 80vh;
  background-color: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  position: relative;
  animation: slideUp 0.3s ease;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
}

.popup-header {
  padding: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #f5f5f5;
  background: linear-gradient(to right, #ff85a2, #ffa5b9);
}

.popup-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.popup-close {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.close-icon {
  font-size: 40rpx;
  color: #fff;
  font-weight: 300;
}

.popup-body {
  max-height: calc(80vh - 100rpx);
  padding: 20rpx;
}

.category-dream-item {
  margin: 20rpx 0;
  padding: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.dream-content {
  flex: 1;
  margin-right: 20rpx;
}

.dream-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
  display: block;
}

.dream-desc {
  font-size: 26rpx;
  color: #666;
  display: block;
}

.item-arrow {
  font-size: 40rpx;
  color: #ff85a2;
  font-weight: 300;
}

.item-hover {
  transform: translateX(10rpx);
  background: #fff9fa;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(50rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.loading {
  text-align: center;
  padding: 40rpx;
  color: #999;
}

.error {
  text-align: center;
  padding: 40rpx;
  color: #ff4d4f;
}

.dream-query {
  margin-bottom: 30rpx;
  padding: 20rpx;
  background: #f8f8f8;
  border-radius: 12rpx;
}

.query-label {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.query-content {
  font-size: 28rpx;
  color: #666;
}

.section {
  margin-bottom: 30rpx;
  padding: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #ff85a2;
  margin-bottom: 16rpx;
  display: block;
}

.section-content {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
}



.dream-overview {
  background-color: #f9f0f2;
  padding: 16rpx;
  border-left: 8rpx solid #ff85a2;
  margin-bottom: 16rpx;
}

.highlight {
  color: #ff85a2;
  font-weight: bold;
}

.section-content :deep(em) {
  font-style: italic;
  color: #666;
}

.section-content :deep(strong) {
  font-weight: bold;
  color: #ff85a2;
  display: block;
  margin: 10rpx 0;
}

/* 添加流式动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}

/* 为内容添加打字机效果的基础样式 */
.section-content {
  overflow: hidden;
}
</style>