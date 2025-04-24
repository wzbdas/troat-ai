<template>
  <view class="tarot-result">
    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">塔罗解答</text>
      <text class="subtitle">ASK THE TAROT</text>
    </view>

    <!-- 抽取的三张牌 -->
    <view class="cards-container">
      <view class="card-box">
        <image :src="pastCard.frontImage" class="card-image" />
      </view>
      <view class="card-box">
        <image :src="presentCard.frontImage" class="card-image" />
      </view>
      <view class="card-box">
        <image :src="futureCard.frontImage" class="card-image" />
      </view>
    </view>

    <!-- 中间标题 -->
    <text class="section-title">大家都在问</text>

    <!-- 可滚动的提示词列表 -->
    <scroll-view scroll-x class="scroll-container">
      <view class="scroll-item">
        <button @click="setInput('什么时候可以复合')">什么时候可以复合</button>
      </view>
      <view class="scroll-item">
        <button @click="setInput('桃花运什么时候来')">桃花运什么时候来</button>
      </view>
      <view class="scroll-item">
        <button @click="setInput('我和他的最终结果')">我和他的最终结果</button>
      </view>
      <view class="scroll-item">
        <button @click="setInput('我跟她有未来吗')">我跟她有未来吗</button>
      </view>
      <view class="scroll-item">
        <button @click="setInput('他对我的感情是真的吗')">他对我的感情是真的吗</button>
      </view>
      <view class="scroll-item">
        <button @click="setInput('今天运气怎么样')">今天运气怎么样</button>
      </view>
      <view class="scroll-item">
        <button @click="setInput('今年工作顺利吗')">今年工作顺利吗</button>
      </view>
      <view class="scroll-item">
        <button @click="setInput('明天会不会倒霉')">明天会不会倒霉</button>
      </view>
    </scroll-view>

    <!-- 底部输入框和按钮 -->
    <view class="input-container">
      <textarea
        v-model="userInput"
        placeholder="歡迎留言，說出你的感受（不超過100字）..."
        maxlength="100"
        class="input-text"
        @input="updateCharCount"
      ></textarea>
      <text class="char-count">{{ charCount }}/100</text>
    </view>

    <button class="submit-button" @click="submit">提交</button>

    <!-- 加载动画 -->
    <view v-if="isLoading" class="loading-overlay">
      <view class="loading-content">
        <view class="gear"></view>
        <text class="loading-text">解析中...</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { defineComponent, ref } from "vue";

interface Card {
  id: number;
  frontImage: string;
  isFlipped: boolean;
  isFlipping: boolean;
  isHidden: boolean;
  position: string;
  name?: string; // 添加 name 字段
  reversed?: boolean; // 添加 reversed 字段
}

// 塔罗牌 ID 到名称的映射表
const tarotCardMap: { [key: number]: string } = {
  0: "WandsAce_Upright",
  1: "WandsAce_Reversed",
  2: "WandsTwo_Upright",
  3: "WandsTwo_Reversed",
  4: "WandsThree_Upright",
  5: "WandsThree_Reversed",
  6: "WandsFour_Upright",
  7: "WandsFour_Reversed",
  8: "WandsFive_Upright",
  9: "WandsFive_Reversed",
  10: "WandsSix_Upright",
  11: "WandsSix_Reversed",
  12: "WandsSeven_Upright",
  13: "WandsSeven_Reversed",
  14: "WandsEight_Upright",
  15: "WandsEight_Reversed",
  16: "WandsNine_Upright",
  17: "WandsNine_Reversed",
  18: "WandsTen_Upright",
  19: "WandsTen_Reversed",
  20: "WandsPage_Upright",
  21: "WandsPage_Reversed",
  22: "WandsKnight_Upright",
  23: "WandsKnight_Reversed",
  24: "WandsQueen_Upright",
  25: "WandsQueen_Reversed",
  26: "WandsKing_Upright",
  27: "WandsKing_Reversed",
  28: "CupsAce_Upright",
  29: "CupsAce_Reversed",
  30: "CupsTwo_Upright",
  31: "CupsTwo_Reversed",
  32: "CupsThree_Upright",
  33: "CupsThree_Reversed",
  34: "CupsFour_Upright",
  35: "CupsFour_Reversed",
  36: "CupsFive_Upright",
  37: "CupsFive_Reversed",
  38: "CupsSix_Upright",
  39: "CupsSix_Reversed",
  40: "CupsSeven_Upright",
  41: "CupsSeven_Reversed",
  42: "CupsEight_Upright",
  43: "CupsEight_Reversed",
  44: "CupsNine_Upright",
  45: "CupsNine_Reversed",
  46: "CupsTen_Upright",
  47: "CupsTen_Reversed",
  48: "CupsPage_Upright",
  49: "CupsPage_Reversed",
  50: "CupsKnight_Upright",
  51: "CupsKnight_Reversed",
  52: "CupsQueen_Upright",
  53: "CupsQueen_Reversed",
  54: "CupsKing_Upright",
  55: "CupsKing_Reversed",
  56: "SwordsAce_Upright",
  57: "SwordsAce_Reversed",
  58: "SwordsTwo_Upright",
  59: "SwordsTwo_Reversed",
  60: "SwordsThree_Upright",
  61: "SwordsThree_Reversed",
  62: "SwordsFour_Upright",
  63: "SwordsFour_Reversed",
  64: "SwordsFive_Upright",
  65: "SwordsFive_Reversed",
  66: "SwordsSix_Upright",
  67: "SwordsSix_Reversed",
  68: "SwordsSeven_Upright",
  69: "SwordsSeven_Reversed",
  70: "SwordsEight_Upright",
  71: "SwordsEight_Reversed",
  72: "SwordsNine_Upright",
  73: "SwordsNine_Reversed",
  74: "SwordsTen_Upright",
  75: "SwordsTen_Reversed",
  76: "SwordsKnight_Upright",
  77: "SwordsKnight_Reversed",
  78: "SwordsKing_Upright",
  79: "SwordsKing_Reversed",
  80: "PentaclesAce_Upright",
  81: "PentaclesAce_Reversed",
  82: "PentaclesTwo_Upright",
  83: "PentaclesTwo_Reversed",
  84: "PentaclesThree_Upright",
  85: "PentaclesThree_Reversed",
  86: "PentaclesFour_Upright",
  87: "PentaclesFour_Reversed",
  88: "PentaclesFive_Upright",
  89: "PentaclesFive_Reversed",
  90: "PentaclesSix_Upright",
  91: "PentaclesSix_Reversed",
  92: "PentaclesSeven_Upright",
  93: "PentaclesSeven_Reversed",
  94: "PentaclesEight_Upright",
  95: "PentaclesEight_Reversed",
  96: "PentaclesNine_Upright",
  97: "PentaclesNine_Reversed",
  98: "PentaclesTen_Upright",
  99: "PentaclesTen_Reversed",
  100: "PentaclesPage_Upright",
  101: "PentaclesPage_Reversed",
  102: "PentaclesKnight_Upright",
  103: "PentaclesKnight_Reversed",
  104: "PentaclesQueen_Upright",
  105: "PentaclesQueen_Reversed",
  106: "PentaclesKing_Upright",
  107: "PentaclesKing_Reversed",
  108: "TheFool_Upright",
  109: "TheFool_Reversed",
  110: "TheMagician_Upright",
  111: "TheMagician_Reversed",
  112: "TheHighPriestess_Upright",
  113: "TheHighPriestess_Reversed",
  114: "TheEmperor_Upright",
  115: "TheEmperor_Reversed",
  116: "TheHierophant_Upright",
  117: "TheHierophant_Reversed",
  118: "TheLovers_Upright",
  119: "TheLovers_Reversed",
  120: "TheChariot_Upright",
  121: "TheChariot_Reversed",
  122: "Strength_Upright",
  123: "Strength_Reversed",
  124: "TheHermit_Upright",
  125: "TheHermit_Reversed",
  126: "WheelOfFortune_Upright",
  127: "WheelOfFortune_Reversed",
  128: "Justice_Upright",
  129: "Justice_Reversed",
  130: "TheHangedMan_Upright",
  131: "TheHangedMan_Reversed",
  132: "Death_Upright",
  133: "Death_Reversed",
  134: "Temperance_Upright",
  135: "Temperance_Reversed",
  136: "TheDevil_Upright",
  137: "TheDevil_Reversed",
  138: "TheTower_Upright",
  139: "TheTower_Reversed",
  140: "TheStar_Upright",
  141: "TheStar_Reversed",
  142: "TheMoon_Upright",
  143: "TheMoon_Reversed",
  144: "TheSun_Upright",
  145: "TheSun_Reversed",
  146: "Judgement_Upright",
  147: "Judgement_Reversed",
  148: "TheWorld_Upright",
  149: "TheWorld_Reversed",
};

// 将 id 转换为牌名
const enrichTarotCard = (card: Card): Card => {
  const cardId = parseInt(String(card.id), 10);
  if (isNaN(cardId)) {
    console.error('无效的卡片 id:', card);
    return { ...card, name: "UnknownCard", reversed: false };
  }

  const cardName = tarotCardMap[cardId];
  if (!cardName) {
    console.error(`卡片 id ${cardId} 在 tarotCardMap 中未找到`);
    return { ...card, name: "UnknownCard", reversed: false };
  }

  const isReversed = cardName.endsWith("_Reversed");
  const baseName = isReversed ? cardName.replace("_Reversed", "") : cardName.replace("_Upright", "");
  return {
    ...card,
    name: baseName,
    reversed: isReversed,
  };
};

export default defineComponent({
  name: "TarotResult",
  setup() {
    const pastCard = ref<Card | null>(null);
    const presentCard = ref<Card | null>(null);
    const futureCard = ref<Card | null>(null);
    const userInput = ref("");
    const charCount = ref(0);
    const isLoading = ref(false);

    // 接收页面参数并转换牌名
    onLoad((options) => {
      if (options?.pastCard) {
        const parsedPastCard = JSON.parse(decodeURIComponent(options.pastCard));
        pastCard.value = enrichTarotCard(parsedPastCard);
      }
      if (options?.presentCard) {
        const parsedPresentCard = JSON.parse(decodeURIComponent(options.presentCard));
        presentCard.value = enrichTarotCard(parsedPresentCard);
      }
      if (options?.futureCard) {
        const parsedFutureCard = JSON.parse(decodeURIComponent(options.futureCard));
        futureCard.value = enrichTarotCard(parsedFutureCard);
      }
      // 调试：打印转换后的牌信息
      console.log("转换后的牌信息:", {
        pastCard: pastCard.value,
        presentCard: presentCard.value,
        futureCard: futureCard.value,
      });
    });

    const updateCharCount = () => {
      charCount.value = userInput.value.length;
    };

    const setInput = (text: string) => {
      userInput.value = text;
      updateCharCount();
    };

    // 将用户提问存储到本地
    const saveQuestionToStorage = (question: string) => {
      uni.getStorage({
        key: "userQuestions",
        success: (res) => {
          const questions = res.data ? [...res.data, question] : [question];
          uni.setStorage({
            key: "userQuestions",
            data: questions,
            success: () => {
              console.log("问题已成功存储到本地:", question);
            },
            fail: (error) => {
              console.error("存储失败:", error);
            },
          });
        },
        fail: () => {
          uni.setStorage({
            key: "userQuestions",
            data: [question],
            success: () => {
              console.log("问题已成功存储到本地:", question);
            },
            fail: (error) => {
              console.error("存储失败:", error);
            },
          });
        },
      });
    };

    const submit = () => {
      if (!userInput.value) {
        uni.showToast({
          title: "请输入你的感受",
          icon: "none",
        });
        return;
      }

      // 将当前用户提问存储到本地
      saveQuestionToStorage(userInput.value);

      // 显示加载动画
      isLoading.value = true;

      // 规范化 tarotCard 数据，包含 id、name、reversed 和 position
      const tarotCards = [
        pastCard.value ? { id: pastCard.value.id, name: pastCard.value.name, reversed: pastCard.value.reversed, position: "past" } : null,
        presentCard.value ? { id: presentCard.value.id, name: presentCard.value.name, reversed: presentCard.value.reversed, position: "present" } : null,
        futureCard.value ? { id: futureCard.value.id, name: futureCard.value.name, reversed: futureCard.value.reversed, position: "future" } : null,
      ].filter((card): card is { id: number; name: string; reversed: boolean; position: string } => card !== null);

      console.log("发送塔罗牌解析请求:", {
        url: "http://localhost:3000/api/tarot/reading",
        data: {
          tarotCard: tarotCards,
          questionType: "general",
          userQuestion: userInput.value,
        },
      });

      // 确保三张牌都存在
      if (tarotCards.length !== 3) {
        uni.showToast({
          title: "塔罗牌数据不完整",
          icon: "none",
        });
        isLoading.value = false;
        return;
      }

      // 使用 uni.request 发送请求
      uni.request({
        url: "http://localhost:3000/api/tarot/reading",
        method: "POST",
        data: {
          tarotCard: tarotCards,
          questionType: "general",
          userQuestion: userInput.value,
        },
        header: {
          "Content-Type": "application/json",
        },
        success: (res: any) => {
          isLoading.value = false;
          console.log("塔罗牌解析响应:", res);
          if (res.data.success) {
            // 跳转到 message 页面，并传递三张牌、用户提问和解析结果
            uni.navigateTo({
              url: `/pages/message/message?pastCard=${encodeURIComponent(
                JSON.stringify(pastCard.value)
              )}&presentCard=${encodeURIComponent(
                JSON.stringify(presentCard.value)
              )}&futureCard=${encodeURIComponent(
                JSON.stringify(futureCard.value)
              )}&userQuestion=${encodeURIComponent(userInput.value)}&reading=${encodeURIComponent(
                res.data.reading
              )}`,
            });

            uni.showToast({
              title: "提交成功",
              icon: "success",
            });
            userInput.value = "";
            charCount.value = 0;
          } else {
            uni.showToast({
              title: res.data.message || "解读失败",
              icon: "none",
            });
          }
        },
        fail: (error) => {
          isLoading.value = false;
          uni.showToast({
            title: "服务器错误",
            icon: "none",
          });
          console.error("塔罗牌解读错误:", error);
        },
      });
    };

    return {
      pastCard,
      presentCard,
      futureCard,
      userInput,
      charCount,
      isLoading,
      updateCharCount,
      setInput,
      submit,
    };
  },
});
</script>

<style scoped>
.tarot-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: url('https://bpic.588ku.com/illus_water_img/23/06/20/87d732bbbe7e4a05d3b3457d1d79c141.jpg!/fw/750/quality/99/unsharp/true/compress/true') no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
  color: white;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
}

.subtitle {
  font-size: 14px;
  color: #ccc;
  margin-top: 5px;
}

.cards-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
}

.card-box {
  text-align: center;
}

.card-image {
  width: 60px;
  height: 90px;
  border-radius: 5px;
}

.section-title {
  font-size: 20px;
  margin: 20px 0;
}

.scroll-container {
  display: flex;
  width: 100%;
  padding: 10px 0;
  white-space: nowrap;
}

.scroll-item {
  display: inline-block;
  margin-right: 10px;
}

.scroll-item button {
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #4a4a8a;
  border: none;
  border-radius: 20px;
  white-space: nowrap;
}

.input-container {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
  margin: 20px 0;
}

.input-text {
  width: 100%;
  height: 60px;
  font-size: 14px;
  color: #fff;
  background: transparent;
  border: none;
}

.input-text::placeholder {
  color: #ccc;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #999;
}

.submit-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #ffcc00;
  border: none;
  border-radius: 50%;
  margin-top: 20px;
}

/* 加载动画样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-text {
  color: white;
  margin-top: 20px;
  font-size: 16px;
}

.gear {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ffcc00;
  position: relative;
  animation: rotate 2s linear infinite;
}

.gear:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: transparent;
  border: 10px solid #fff;
  box-sizing: border-box;
}

.gear:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #4a4a8a;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
