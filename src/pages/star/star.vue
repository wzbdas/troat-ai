<template>
  <div class="zxx-topbox">
    <div class="zxx-topbox-con">
      <p class="title">自己-示例</p>
      <div class="right-actions">
        <span class="action-item">切换<van-icon name="arrow" /></span>
        <span class="action-item">详情<van-icon name="arrow-down" /></span>
      </div>
    </div>
    <div class="zxx-tab">
      <div class="tab-list">
        <div 
          v-for="(item, index) in tabItems" 
          :key="index"
          :class="['tab-item', { active: currentTab === index }]"
          @click="handleTabClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  <Dakn />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Dakn from './component/zxx-Dakn.vue'
// import Rights from './component/zxx-Rights.vue'
// import Cups from './component/zxx-Cups.vue'
// import Swords from './component/zxx-Swords.vue'
// import Coins from './component/zxx-Coins.vue'

const tabItems = [
  '22张大阿卡那牌',
  '14张权杖牌',
  '14张圣杯牌',
  '14张宝剑牌',
  '14张星币牌'
]

const currentTab = ref(0)

const handleTabClick = (index: number) => {
  currentTab.value = index
}
</script>

<style scoped>
.zxx-topbox {
  width: 100vw;
  background: #fff;
}

.zxx-topbox-con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4vw;
  height: 5.5vh;
  border-bottom: 0.1vh solid #f5f5f5;
}

.title {
  font-size: 4vw;
  font-weight: 500;
  color: #333;
}

.right-actions {
  display: flex;
  align-items: center;
  gap: 4vw;
  color: #666;
  font-size: 3.5vw;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 1vw;
}

.zxx-tab {
  padding: 0 4vw;
  width: 100%;
  overflow-x: auto;
}

.tab-list {
  display: flex;
  align-items: center;
  height: 5.5vh;
  border-bottom: 0.1vh solid #f5f5f5;
  width: max-content;
  min-width: 100%;
}

.tab-item {
  position: relative;
  padding: 0 3vw;
  font-size: 3.5vw;
  color: #666;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.tab-item.active {
  color: #ff4c8d;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.3vh;
  background: #ff4c8d;
  transition: all 0.3s ease;
}

/* 组件内容区域样式 */
.tab-content {
  padding: 4vw;
  font-size: 4vw;
  color: #333;
  text-align: center;
  background: #f8f8f8;
  min-height: 50vh;
}
</style>