<template>
  <view class="tarot-shuffle">
    <!-- 塔罗牌容器 -->
    <view class="card-container">
      <view
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        :class="{ shuffling: isShuffling, hidden: card.isHidden }"
        :style="getCardStyle(index)"
        @click="selectCard(index)"
      >
        <image
          :src="card.isFlipped ? card.frontImage : cardBackImage"
          class="card-image"
          :class="{ flipping: card.isFlipping }"
          @error="handleImageError(card)"
        />
      </view>
    </view>

    <!-- 提示文字 -->
    <view class="hint-text" v-if="!isShuffling && shuffleProgress === 0">
      来到这里，心中大概有些困惑吧或许，这里有你的答案<br />带着你的困惑，
    </view>
    <view
      class="hint-text"
      v-if="!isShuffling && shuffleProgress === 1 && selectedCards.length < 3"
    >
      此刻，请深吸壹口气，凭直觉选取3张神秘塔罗
    </view>
    <view class="hint-text" v-if="selectedCards.length === 3">
      你的命运已揭晓，查看你的过去、现在和未来吧！
    </view>

    <!-- 洗牌按钮 -->
    <button
      class="shuffle-button"
      @click="startShuffle"
      :disabled="isShuffling"
      v-if="shuffleProgress === 0"
    >
      {{ isShuffling ? "洗牌中..." : "开始洗牌" }}
    </button>

    <!-- 过去、现在、将来展示区域 -->
    <view class="result-container" v-if="shuffleProgress === 1">
      <view class="result-box">
        <text class="result-title">过去</text>
        <view class="card-placeholder" :class="{ filled: pastCard }">
          <image
            v-if="pastCard"
            :src="pastCard.frontImage"
            class="card-image"
            @error="handleImageError(pastCard)"
          />
        </view>
      </view>
      <view class="result-box">
        <text class="result-title">现在</text>
        <view class="card-placeholder" :class="{ filled: presentCard }">
          <image
            v-if="presentCard"
            :src="presentCard.frontImage"
            class="card-image"
            @error="handleImageError(presentCard)"
          />
        </view>
      </view>
      <view class="result-box">
        <text class="result-title">将来</text>
        <view class="card-placeholder" :class="{ filled: futureCard }">
          <image
            v-if="futureCard"
            :src="futureCard.frontImage"
            class="card-image"
            @error="handleImageError(futureCard)"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const cardBackImage = "/static/images/card_back.jpg"; // 修改为英文路径

const imageNames = [
  // 权杖 (Wands)
  { name: "WandsAce_Upright", position: "upright" },
  { name: "WandsAce_Reversed", position: "reversed" },
  { name: "WandsTwo_Upright", position: "upright" },
  { name: "WandsTwo_Reversed", position: "reversed" },
  { name: "WandsThree_Upright", position: "upright" },
  { name: "WandsThree_Reversed", position: "reversed" },
  { name: "WandsFour_Upright", position: "upright" },
  { name: "WandsFour_Reversed", position: "reversed" },
  { name: "WandsFive_Upright", position: "upright" },
  { name: "WandsFive_Reversed", position: "reversed" },
  { name: "WandsSix_Upright", position: "upright" },
  { name: "WandsSix_Reversed", position: "reversed" },
  { name: "WandsSeven_Upright", position: "upright" },
  { name: "WandsSeven_Reversed", position: "reversed" },
  { name: "WandsEight_Upright", position: "upright" },
  { name: "WandsEight_Reversed", position: "reversed" },
  { name: "WandsNine_Upright", position: "upright" },
  { name: "WandsNine_Reversed", position: "reversed" },
  { name: "WandsTen_Upright", position: "upright" },
  { name: "WandsTen_Reversed", position: "reversed" },
  { name: "WandsPage_Upright", position: "upright" },
  { name: "WandsPage_Reversed", position: "reversed" },
  { name: "WandsKnight_Upright", position: "upright" },
  { name: "WandsKnight_Reversed", position: "reversed" },
  { name: "WandsQueen_Upright", position: "upright" },
  { name: "WandsQueen_Reversed", position: "reversed" },
  { name: "WandsKing_Upright", position: "upright" },
  { name: "WandsKing_Reversed", position: "reversed" },
  // 圣杯 (Cups)
  { name: "CupsAce_Upright", position: "upright" },
  { name: "CupsAce_Reversed", position: "reversed" },
  { name: "CupsTwo_Upright", position: "upright" },
  { name: "CupsTwo_Reversed", position: "reversed" },
  { name: "CupsThree_Upright", position: "upright" },
  { name: "CupsThree_Reversed", position: "reversed" },
  { name: "CupsFour_Upright", position: "upright" },
  { name: "CupsFour_Reversed", position: "reversed" },
  { name: "CupsFive_Upright", position: "upright" },
  { name: "CupsFive_Reversed", position: "reversed" },
  { name: "CupsSix_Upright", position: "upright" },
  { name: "CupsSix_Reversed", position: "reversed" },
  { name: "CupsSeven_Upright", position: "upright" },
  { name: "CupsSeven_Reversed", position: "reversed" },
  { name: "CupsEight_Upright", position: "upright" },
  { name: "CupsEight_Reversed", position: "reversed" },
  { name: "CupsNine_Upright", position: "upright" },
  { name: "CupsNine_Reversed", position: "reversed" },
  { name: "CupsTen_Upright", position: "upright" },
  { name: "CupsTen_Reversed", position: "reversed" },
  { name: "CupsPage_Upright", position: "upright" },
  { name: "CupsPage_Reversed", position: "reversed" },
  { name: "CupsKnight_Upright", position: "upright" },
  { name: "CupsKnight_Reversed", position: "reversed" },
  { name: "CupsQueen_Upright", position: "upright" },
  { name: "CupsQueen_Reversed", position: "reversed" },
  { name: "CupsKing_Upright", position: "upright" },
  { name: "CupsKing_Reversed", position: "reversed" },
  // 宝剑 (Swords)
  { name: "SwordsAce_Upright", position: "upright" },
  { name: "SwordsAce_Reversed", position: "reversed" },
  { name: "SwordsTwo_Upright", position: "upright" },
  { name: "SwordsTwo_Reversed", position: "reversed" },
  { name: "SwordsThree_Upright", position: "upright" },
  { name: "SwordsThree_Reversed", position: "reversed" },
  { name: "SwordsFour_Upright", position: "upright" },
  { name: "SwordsFour_Reversed", position: "reversed" },
  { name: "SwordsFive_Upright", position: "upright" },
  { name: "SwordsFive_Reversed", position: "reversed" },
  { name: "SwordsSix_Upright", position: "upright" },
  { name: "SwordsSix_Reversed", position: "reversed" },
  { name: "SwordsSeven_Upright", position: "upright" },
  { name: "SwordsSeven_Reversed", position: "reversed" },
  { name: "SwordsEight_Upright", position: "upright" },
  { name: "SwordsEight_Reversed", position: "reversed" },
  { name: "SwordsNine_Upright", position: "upright" },
  { name: "SwordsNine_Reversed", position: "reversed" },
  { name: "SwordsTen_Upright", position: "upright" },
  { name: "SwordsTen_Reversed", position: "reversed" },
  { name: "SwordsKnight_Upright", position: "upright" },
  { name: "SwordsKnight_Reversed", position: "reversed" },
  { name: "SwordsKing_Upright", position: "upright" },
  { name: "SwordsKing_Reversed", position: "reversed" },
  // 星币 (Pentacles)
  { name: "PentaclesAce_Upright", position: "upright" },
  { name: "PentaclesAce_Reversed", position: "reversed" },
  { name: "PentaclesTwo_Upright", position: "upright" },
  { name: "PentaclesTwo_Reversed", position: "reversed" },
  { name: "PentaclesThree_Upright", position: "upright" },
  { name: "PentaclesThree_Reversed", position: "reversed" },
  { name: "PentaclesFour_Upright", position: "upright" },
  { name: "PentaclesFour_Reversed", position: "reversed" },
  { name: "PentaclesFive_Upright", position: "upright" },
  { name: "PentaclesFive_Reversed", position: "reversed" },
  { name: "PentaclesSix_Upright", position: "upright" },
  { name: "PentaclesSix_Reversed", position: "reversed" },
  { name: "PentaclesSeven_Upright", position: "upright" },
  { name: "PentaclesSeven_Reversed", position: "reversed" },
  { name: "PentaclesEight_Upright", position: "upright" },
  { name: "PentaclesEight_Reversed", position: "reversed" },
  { name: "PentaclesNine_Upright", position: "upright" },
  { name: "PentaclesNine_Reversed", position: "reversed" },
  { name: "PentaclesTen_Upright", position: "upright" },
  { name: "PentaclesTen_Reversed", position: "reversed" },
  { name: "PentaclesPage_Upright", position: "upright" },
  { name: "PentaclesPage_Reversed", position: "reversed" },
  { name: "PentaclesKnight_Upright", position: "upright" },
  { name: "PentaclesKnight_Reversed", position: "reversed" },
  { name: "PentaclesQueen_Upright", position: "upright" },
  { name: "PentaclesQueen_Reversed", position: "reversed" },
  { name: "PentaclesKing_Upright", position: "upright" },
  { name: "PentaclesKing_Reversed", position: "reversed" },
  // 大阿卡纳 (Major Arcana)
  { name: "TheFool_Upright", position: "upright" },
  { name: "TheFool_Reversed", position: "reversed" },
  { name: "TheMagician_Upright", position: "upright" },
  { name: "TheMagician_Reversed", position: "reversed" },
  { name: "TheHighPriestess_Upright", position: "upright" },
  { name: "TheHighPriestess_Reversed", position: "reversed" },
  { name: "TheEmperor_Upright", position: "upright" },
  { name: "TheEmperor_Reversed", position: "reversed" },
  { name: "TheHierophant_Upright", position: "upright" },
  { name: "TheHierophant_Reversed", position: "reversed" },
  { name: "TheLovers_Upright", position: "upright" },
  { name: "TheLovers_Reversed", position: "reversed" },
  { name: "TheChariot_Upright", position: "upright" },
  { name: "TheChariot_Reversed", position: "reversed" },
  { name: "Strength_Upright", position: "upright" },
  { name: "Strength_Reversed", position: "reversed" },
  { name: "TheHermit_Upright", position: "upright" },
  { name: "TheHermit_Reversed", position: "reversed" },
  { name: "WheelOfFortune_Upright", position: "upright" },
  { name: "WheelOfFortune_Reversed", position: "reversed" },
  { name: "Justice_Upright", position: "upright" },
  { name: "Justice_Reversed", position: "reversed" },
  { name: "TheHangedMan_Upright", position: "upright" },
  { name: "TheHangedMan_Reversed", position: "reversed" },
  { name: "Death_Upright", position: "upright" },
  { name: "Death_Reversed", position: "reversed" },
  { name: "Temperance_Upright", position: "upright" },
  { name: "Temperance_Reversed", position: "reversed" },
  { name: "TheDevil_Upright", position: "upright" },
  { name: "TheDevil_Reversed", position: "reversed" },
  { name: "TheTower_Upright", position: "upright" },
  { name: "TheTower_Reversed", position: "reversed" },
  { name: "TheStar_Upright", position: "upright" },
  { name: "TheStar_Reversed", position: "reversed" },
  { name: "TheMoon_Upright", position: "upright" },
  { name: "TheMoon_Reversed", position: "reversed" },
  { name: "TheSun_Upright", position: "upright" },
  { name: "TheSun_Reversed", position: "reversed" },
  { name: "Judgement_Upright", position: "upright" },
  { name: "Judgement_Reversed", position: "reversed" },
  { name: "TheWorld_Upright", position: "upright" },
  { name: "TheWorld_Reversed", position: "reversed" },
];

export default defineComponent({
  name: "TarotShuffle",
  setup() {
    const cardCount = imageNames.length; // Total number of tarot cards

    // Validate the imageNames array length
    if (imageNames.length !== cardCount) {
      throw new Error(
        `Expected ${cardCount} images, but found ${imageNames.length}`
      );
    }

    // Generate card data using the imageNames array
    const cards = ref(
      imageNames.map((imageObj, index) => {
        const frontImage = `/static/images/${imageObj.name}.jpg`;
        if (frontImage === cardBackImage) {
          throw new Error(
            "card-back.jpg cannot be used as a front image for any card."
          );
        }
        return {
          id: index,
          frontImage,
          isFlipped: false,
          isFlipping: false,
          isHidden: false,
          position: imageObj.position,
        };
      })
    );

    const isShuffling = ref(false);
    const shuffleProgress = ref(0);
    const selectedCards = ref<number[]>([]);
    const pastCard = ref<any>(null);
    const presentCard = ref<any>(null);
    const futureCard = ref<any>(null);

    const getCardStyle = (index: number) => {
      const width = 300;
      const height = 250;
      const depth = 20;

      const getUShapePosition = (t: number) => {
        let x = (t - 0.5) * width;
        let y = depth * (x / (width / 2)) ** 2 - height / 2;
        const dx = 1;
        const dy =
          (depth * ((x + dx) / (width / 2)) ** 2 -
            depth * (x / (width / 2)) ** 2) /
          dx;
        const rotate = (Math.atan(dy) * 180) / Math.PI;
        return { x, y, rotate };
      };

      if (!isShuffling.value && shuffleProgress.value === 0) {
        return {
          transform: `translate(${index * 1}px, 0) rotate(0deg)`,
          zIndex: cardCount - index,
        };
      }

      if (isShuffling.value && shuffleProgress.value < 0.6) {
        const randomX = Math.random() * 300 - 150;
        const randomY = Math.random() * 300 - 150;
        const randomRotate = Math.random() * 360;
        return {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`,
          zIndex: Math.floor(Math.random() * cardCount),
        };
      }

      const t = index / (cardCount - 1);
      const transitionProgress = Math.min(
        1,
        (shuffleProgress.value - 0.6) / 0.4
      );
      const cardTransition = Math.min(
        1,
        transitionProgress * cardCount * 2 - index
      );

      if (cardTransition <= 0) {
        const randomX = Math.random() * 300 - 150;
        const randomY = Math.random() * 300 - 150;
        const randomRotate = Math.random() * 360;
        return {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`,
          zIndex: Math.floor(Math.random() * cardCount),
        };
      }

      const { x, y, rotate } = getUShapePosition(t);
      return {
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
        zIndex: cardCount - index,
      };
    };

    const startShuffle = () => {
      if (isShuffling.value) return;

      isShuffling.value = true;
      shuffleProgress.value = 0;
      selectedCards.value = [];
      pastCard.value = null;
      presentCard.value = null;
      futureCard.value = null;

      cards.value = cards.value.map((card) => ({
        ...card,
        isFlipped: false,
        isFlipping: false,
        isHidden: false,
      }));

      let shuffleCount = 0;
      const totalShuffles = 25;
      const shuffleInterval = setInterval(() => {
        shuffleCount++;
        shuffleProgress.value = shuffleCount / totalShuffles;
        cards.value = [...cards.value];

        if (shuffleCount >= totalShuffles) {
          clearInterval(shuffleInterval);
          isShuffling.value = false;
          shuffleProgress.value = 1;
        }
      }, 200);
    };

    const selectCard = (index: number) => {
      if (
        isShuffling.value ||
        shuffleProgress.value !== 1 ||
        selectedCards.value.length >= 3
      )
        return;
      if (selectedCards.value.includes(index)) return;

      selectedCards.value.push(index);

      // Start flipping animation
      cards.value[index].isFlipping = true;

      setTimeout(() => {
        cards.value[index].isFlipped = true;
        cards.value[index].isFlipping = false;

        // Assign to past, present, or future immediately after the animation
        if (selectedCards.value.length === 1) {
          pastCard.value = cards.value[index];
        } else if (selectedCards.value.length === 2) {
          presentCard.value = cards.value[index];
        } else if (selectedCards.value.length === 3) {
          futureCard.value = cards.value[index];

          // Navigate to the result page with parameters
          uni.navigateTo({
            url: `/pages/tarot-result/tarot-result?pastCard=${encodeURIComponent(
              JSON.stringify(pastCard.value)
            )}&presentCard=${encodeURIComponent(
              JSON.stringify(presentCard.value)
            )}&futureCard=${encodeURIComponent(
              JSON.stringify(futureCard.value)
            )}`,
          });
        }

        // Hide the card from the deck after flipping
        cards.value[index].isHidden = true;
      }, 1000); // Match the animation duration
    };

    const handleImageError = (card: any) => {
      console.error(
        `图片加载失败: ${card.isFlipped ? card.frontImage : cardBackImage}`
      );
    };

    return {
      cards,
      cardBackImage,
      isShuffling,
      shuffleProgress,
      selectedCards,
      pastCard,
      presentCard,
      futureCard,
      getCardStyle,
      startShuffle,
      selectCard,
      handleImageError,
    };
  },
});
</script>

<style scoped>
.tarot-shuffle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1a3d 0%, #3b1a5a 50%, #5a1a3d 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.shuffle-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #ff4d4d;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
}

.shuffle-button:disabled {
  background-color: #ccc;
}

.card-container {
  position: relative;
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  position: absolute;
  width: 50px;
  height: 80px;
  transition: transform 0.8s ease;
}

.card.shuffling {
  transition: transform 0.2s ease;
}

.card.hidden {
  display: none;
}

.card-image {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.card-image.flipping {
  animation: flipAndRotate 1s ease forwards;
}

@keyframes flipAndRotate {
  0% {
    transform: rotateY(0deg) rotate(0deg);
  }
  50% {
    transform: rotateY(180deg) rotate(720deg);
  }
  100% {
    transform: rotateY(180deg) rotate(0deg);
  }
}

.hint-text {
  font-size: 16px;
  text-align: center;
  margin: 10px 0;
  line-height: 1.6;
  color: #add8e6;
  text-shadow: 0 0 5px rgba(139, 44, 90, 0.3);
  padding: 0 20px;
}

.result-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
}

.result-box {
  text-align: center;
}

.result-title {
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
}

.card-placeholder {
  width: 60px;
  height: 90px;
  border: 2px dashed #fff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-placeholder.filled {
  border: none;
}

.card-placeholder image {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>