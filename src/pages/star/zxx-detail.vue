<template>
    <div class="detail-container">
        <div class="detail-section">
            <h3 class="section-title">什么是塔罗牌</h3>
            <p class="section-content">塔罗牌（TAROT）共 78 张，包括 22 张大阿尔卡那牌和 56 张小阿尔卡那牌。大阿尔卡那牌又称将牌，牌面各有独特图案和意义，如愚人、魔术师、女祭司等，代表着不同人生际遇，是占卜分析的重点。小阿尔卡那牌也叫小牌，有 4 种花色，通常是权杖、星币、圣杯、宝剑，每种花色包含 10 张数字牌（Ace - 10）和 4 张宫廷牌（侍从、骑士、王后、国王），可解释具体状况、周遭环境、原因发展等，也可用于解释人物性格。</p>
        </div>
        <div class="detail-section">
            <h3 class="section-title">塔罗牌占卜方式</h3>
            <p class="section-content">使用塔罗牌占卜时，通常涉及洗牌、抽牌和解读牌的过程。占卜者会根据特定的牌阵抽取一定数量的牌，并根据牌的正位或逆位以及它们在牌阵中的位置来解释牌意。不过，塔罗牌的解读非常主观，依赖于占卜者的直觉、经验和对牌意的理解。</p>
        </div>
        <div class="detail-section">
            <h3 class="section-title">塔罗牌的主要体系与起源</h3>
            <p class="section-content">塔罗牌有马赛塔罗牌、韦特塔罗牌和托特塔罗牌三大体系。此外，根据不同民族和地域文化，还创造出美国土著塔罗牌、草药塔罗牌、龙塔罗牌以及俄罗斯塔罗牌、英国塔罗牌、瑞典塔罗牌和日本塔罗牌等。其起源众说纷纭，有 "埃及起源论""希伯来起源论""吉普赛起源论" 等，但缺乏有力证据。较为普遍的观点是，它起源于 15 世纪初意大利的一种纸牌游戏，牌面符号多来自中世纪和文艺复兴时期的欧洲文化。18 世纪左右，塔罗牌与占卜紧密联系起来。1910 年，莱德 - 伟特塔罗牌（韦特塔罗牌）出版，成为全球最受欢迎、发行量最大的塔罗牌，也是 "国际标准版"。此后，还有托特塔罗牌等不同体系出现。</p>
        </div>
        <div class="back-button" @click="goBack">
            返回
        </div>
    </div>
</template>

<script setup>
const goBack = () => {
  uni.navigateBack()
}
</script>

<style scoped>
.detail-container {
  padding: 4vw;
  background-color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
}

.detail-section {
  margin-bottom: 6vw;
  background-color: #fff5f5;
  padding: 4vw;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 5vw;
  color: #333;
  margin-bottom: 3vw;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -1vw;
  left: 0;
  width: 100%;
  height: 0.5vw;
  background-color: #ff4c8d;
  border-radius: 1vw;
}

.section-content {
  font-size: 3.8vw;
  line-height: 1.6;
  color: #666;
  text-align: justify;
}

.back-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 10vw;
  margin: 5vw auto;
  background-color: #ff4c8d;
  color: white;
  border-radius: 5vw;
  font-size: 4vw;
  box-shadow: 0 2px 8px rgba(255, 76, 141, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:active {
  transform: scale(0.95);
}
</style>