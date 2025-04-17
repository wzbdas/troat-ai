<template>
    <view class="tarot-result">
      <!-- 顶部标题 -->
      <view class="header">
        <text class="title">塔羅解答</text>
        <text class="subtitle">ASK THE TAROT</text>
      </view>
  
      <!-- 抽取的三张牌 -->
      <view class="cards-container">
        <view class="card-box">
          <!-- <text class="card-title">過去</text> -->
          <image :src="pastCard.frontImage" class="card-image" />
          
        </view>
        <view class="card-box">
          <!-- <text class="card-title">星示六</text> -->
          <image :src="presentCard.frontImage" class="card-image" />
        </view>
        <view class="card-box">
          <!-- <text class="card-title">須知</text> -->
          <image :src="futureCard.frontImage" class="card-image" />
        </view>
      </view>
  
      <!-- 中间标题 -->
      <text class="section-title">大衆觀感問</text>
  
      <!-- 可滚动的提示词列表 -->
      <scroll-view scroll-x class="scroll-container">
        <view class="scroll-item">
          <button>塔羅給予你</button>
        </view>
        <view class="scroll-item">
          <button>他在我在想什麼</button>
        </view>
        <view class="scroll-item">
          <button>我和他最終結果</button>
        </view>
        <view class="scroll-item">
          <button>我跟我的女友會分手嗎</button>
        </view>
        <view class="scroll-item">
          <button>他對我表達真實感受嗎</button>
        </view>
        <view class="scroll-item">
          <button>他外遇了</button>
        </view>
        <view class="scroll-item">
          <button>分享你的想法與疑惑</button>
        </view>
        <view class="scroll-item">
          <button>我想今年工作上會有期嗎</button>
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
  }
  
  export default defineComponent({
    name: "TarotResult",
    setup() {
      const pastCard = ref<Card | null>(null);
      const presentCard = ref<Card | null>(null);
      const futureCard = ref<Card | null>(null);
      const userInput = ref("");
      const charCount = ref(0);
  
      // 接收页面参数
      onLoad((options) => {
        if (options?.pastCard) {
          pastCard.value = JSON.parse(decodeURIComponent(options.pastCard));
        }
        if (options?.presentCard) {
          presentCard.value = JSON.parse(decodeURIComponent(options.presentCard));
        }
        if (options?.futureCard) {
          futureCard.value = JSON.parse(decodeURIComponent(options.futureCard));
        }
      });
  
      const updateCharCount = () => {
        charCount.value = userInput.value.length;
      };
  
      const submit = () => {
        if (!userInput.value) {
          uni.showToast({
            title: "请输入你的感受",
            icon: "none",
          });
          return;
        }
        uni.showToast({
          title: "提交成功",
          icon: "success",
        });
        userInput.value = "";
        charCount.value = 0;
      };
  
      return {
        pastCard,
        presentCard,
        futureCard,
        userInput,
        charCount,
        updateCharCount,
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
    background: linear-gradient(180deg, #1a1a3d 0%, #3b1a5a 50%, #5a1a3d 100%);
    padding: 20px;
    color: #fff;
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
  
  .card-title {
    font-size: 18px;
    margin-bottom: 10px;
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
    background-color: rgba(0, 0, 0, 0.3);
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
  </style>