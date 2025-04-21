<template>
  <view class="message-page">
    <!-- 顶部标题 -->
    <view class="header">
      <text class="title">与小智AI 聊天</text>
    </view>

    <!-- 塔罗牌和用户提问 -->
    <view class="tarot-info">
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
      <view class="question-box">
        <text class="question-label">你的提问：</text>
        <text class="question-text">{{ userQuestion }}</text>
      </view>
    </view>

    <!-- 聊天框 -->
    <view class="chat-container">
      <!-- 聊天消息 -->
      <scroll-view scroll-y class="chat-box" :scroll-top="scrollTop">
        <view v-for="(message, index) in chatMessages" :key="index" class="message-item" :class="[message.sender === 'user' ? 'user-message-container' : 'ai-message-container']">
          <view :class="[message.sender === 'user' ? 'user-message' : 'ai-message']">
            <text class="message-text">{{ message.text }}</text>
          </view>
        </view>
      </scroll-view>

      <!-- 输入框 -->
      <view class="input-container">
        <input
          v-model="inputMessage"
          placeholder="输入问题..."
          class="input-text"
          @confirm="sendMessage"
        />
        <button class="send-button" @click="sendMessage">发送</button>
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
}

interface ChatMessage {
  sender: string; // 'user' or 'ai'
  text: string;
}

export default defineComponent({
  name: "Message",
  setup() {
    // 初始化牌数据，防止 undefined 错误
    const pastCard = ref<Card>({
      id: 0,
      frontImage: '',
      isFlipped: false,
      isFlipping: false,
      isHidden: false,
      position: 'past',
    });

    const presentCard = ref<Card>({
      id: 0,
      frontImage: '',
      isFlipped: false,
      isFlipping: false,
      isHidden: false,
      position: 'present',
    });

    const futureCard = ref<Card>({
      id: 0,
      frontImage: '',
      isFlipped: false,
      isFlipping: false,
      isHidden: false,
      position: 'future',
    });

    const userQuestion = ref("");
    const reading = ref("");
    const inputMessage = ref("");
    const chatMessages = ref<ChatMessage[]>([]);
    const scrollTop = ref(0);

    // 加载塔罗牌、用户提问和初始解读
    onLoad(async (options) => {
      if (options?.pastCard) {
        pastCard.value = JSON.parse(decodeURIComponent(options.pastCard));
      }
      if (options?.presentCard) {
        presentCard.value = JSON.parse(decodeURIComponent(options.presentCard));
      }
      if (options?.futureCard) {
        futureCard.value = JSON.parse(decodeURIComponent(options.futureCard));
      }
      if (options?.userQuestion) {
        userQuestion.value = decodeURIComponent(options.userQuestion);
      }
      if (options?.reading) {
        reading.value = decodeURIComponent(options.reading);
        // 将解读作为第一条 AI 消息添加到聊天中
        chatMessages.value.push({
          sender: 'ai',
          text: reading.value,
        });
        scrollToBottom();
      }
      // 调试：打印接收到的牌信息
      console.log("Message 页面接收到的牌信息:", {
        pastCard: pastCard.value,
        presentCard: presentCard.value,
        futureCard: futureCard.value,
      });
    });

    // 发送用户消息到后端并获取 AI 响应
    const sendMessage = async () => {
      const question = inputMessage.value.trim();
      if (!question) return;

      // 将用户消息添加到聊天
      chatMessages.value.push({ sender: 'user', text: question });
      inputMessage.value = "";
      scrollToBottom();

      try {
        // 使用 uni.request 发送请求到后端
        uni.request({
          url: 'http://localhost:3000/api/ai/ask',
          method: 'POST',
          data: {
            question: question,
          },
          success: (res) => {
            if (res.data.answer) {
              chatMessages.value.push({ sender: 'ai', text: res.data.answer });
            } else {
              chatMessages.value.push({ sender: 'ai', text: 'AI没有回答' });
            }
            scrollToBottom();
          },
          fail: (error) => {
            console.error('Error sending message to AI:', error);
            chatMessages.value.push({ sender: 'ai', text: '发送消息失败，请稍后再试。' });
            scrollToBottom();
          },
        });
      } catch (error) {
        console.error('Error sending message to AI:', error);
        chatMessages.value.push({ sender: 'ai', text: '发送消息失败，请稍后再试。' });
        scrollToBottom();
      }
    };

    // 滚动到聊天容器底部
    const scrollToBottom = () => {
      setTimeout(() => {
        scrollTop.value = chatMessages.value.length * 60; // 每条消息大致高度
      }, 100);
    };

    return {
      pastCard,
      presentCard,
      futureCard,
      userQuestion,
      reading,
      inputMessage,
      chatMessages,
      sendMessage,
      scrollTop,
    };
  },
});
</script>

<style scoped>
.message-page {
  display: flex;
  flex-direction: column;
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

.tarot-info {
  margin-bottom: 20px;
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

.question-box {
  margin-bottom: 10px;
}

.question-label {
  font-size: 16px;
  font-weight: bold;
}

.question-text {
  font-size: 14px;
  color: white;
}

.chat-container {
  margin-top: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat-box {
  flex: 1;
  max-height: none;
  overflow-y: scroll;
}

.message-item {
  margin-bottom: 10px;
  display: flex;
  width: 100%;
}

.ai-message-container {
  justify-content: flex-start;
}

.user-message-container {
  justify-content: flex-end;
}

.user-message {
  background-color: #4a90e2;
  color: white;
  border-radius: 10px;
  padding: 10px;
  max-width: 80%;
}

.ai-message {
  background-color: #f1f1f1;
  color: black;
  border-radius: 10px;
  padding: 10px;
  max-width: 80%;
}

.input-container {
  display: flex;
  align-items: center;
  background-color: #3b1a5a;
  padding: 10px;
  border-radius: 25px;
  margin-top: 10px;
  position: sticky;
  bottom: 0;
}

.input-text {
  flex: 1;
  height: 40px;
  font-size: 14px;
  color: #fff;
  background: transparent;
  border: none;
  margin-right: 10px;
  padding-left: 15px;
}

.input-text::placeholder {
  color: #ccc;
}

.send-button {
  width: 60px;
  height: 40px;
  font-size: 14px;
  color: #000;
  background-color: #ffcc00;
  border: none;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>