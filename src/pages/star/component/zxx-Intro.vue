<template>
<div class="card-container">
    <div class="button-group">
      <div class="button-item report-button">
        <span class="icon">👥</span>
        合牌报告
      </div>
      <div class="button-item natal-button">
        <span class="icon">👤</span>
        本命解读
      </div>
    </div>
    <div class="info-section">
      <div class="info-text">
        <span class="info-icon">ⓘ</span>
        什么是塔罗牌
      </div>
      <div class="info-link">
        查看说明
        <span class="arrow">></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.card-container {
  background-color: #fff5f5; /* 浅粉色背景 */
  border-radius: 1rem; /* 使用 rem 单位 */
  padding: 4vw; /* 使用 vw 单位，动态调整内边距 */
  width: 90%; /* 宽度占屏幕的 90% */
  max-width: 400px; /* 最大宽度限制 */
  margin: 5vh auto; /* 垂直居中，动态调整外边距 */
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.1); /* 阴影使用 rem 单位 */
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 2vw; /* 动态间距 */
}

.button-item {
  flex: 1; /* 按钮平分宽度 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5vw 3vw; /* 动态调整内边距 */
  border-radius: 0.8rem; /* 使用 rem 单位 */
  font-size: clamp(14px, 4vw, 16px); /* 字体大小自适应，限制在 14px-16px 之间 */
  color: white;
  cursor: pointer;
}

.report-button {
  background-color: #d1b3ff; /* 紫色背景 */
}

.natal-button {
  background-color: #ffd700; /* 黄色背景 */
}

.icon {
  margin-right: 2vw; /* 动态调整图标与文字的间距 */
  font-size: clamp(16px, 5vw, 20px); /* 图标大小自适应 */
}

.info-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4vw; /* 动态调整上边距 */
  font-size: clamp(12px, 3.5vw, 14px); /* 字体大小自适应 */
  color: #333;
}

.info-text {
  display: flex;
  align-items: center;
}

.info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(16px, 5vw, 20px); /* 图标大小自适应 */
  height: clamp(16px, 5vw, 20px);
  background-color: #e0e0e0;
  border-radius: 50%;
  margin-right: 2vw; /* 动态调整间距 */
  font-size: clamp(10px, 3vw, 12px); /* 字体大小自适应 */
  color: #666;
}

.info-link {
  display: flex;
  align-items: center;
  color: #666;
  cursor: pointer;
}

.arrow {
  margin-left: 1vw; /* 动态调整箭头间距 */
  font-size: clamp(12px, 4vw, 16px); /* 箭头大小自适应 */
}
</style>