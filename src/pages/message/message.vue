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
        <view v-for="(message, index) in chatMessages" :key="index" class="message-item" :class="message.sender === 'user' ? 'user-message-container' : 'ai-message-container'">
          <!-- AI 消息 -->
          <view v-if="message.sender === 'ai'" class="ai-message-wrapper">
            <image src="https://tse3-mm.cn.bing.net/th/id/OIP-C.iCXuE_HnNhT_teEWcHU7xQAAAA?rs=1&pid=ImgDetMain" class="avatar ai-avatar" />
            <view class="message-content">
              <text class="username">小智AI</text>
              <view class="message-bubble ai-bubble">
                <text class="message-text">{{ message.text }}</text>
              </view>
            </view>
          </view>
          <!-- 用户消息 -->
          <view v-else class="user-message-wrapper">
            <view class="message-content">
              <text class="username user-name">{{ userName }}</text>
              <view class="message-bubble user-bubble">
                <text class="message-text">{{ message.text }}</text>
              </view>
            </view>
            <image :src="userAvatar" class="avatar user-avatar" />
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

    <!-- 加载动画 -->
    <view v-if="isLoading" class="loading-overlay">
      <view class="loading-content">
        <view class="gear"></view>
        <text class="loading-text">AI思考中...</text>
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
    const isLoading = ref(false);

    // 用户名称和头像
    const userName = ref("游客");
    const userAvatar = ref("https://tse4-mm.cn.bing.net/th/id/OIP-C.aCW_Ax9FtUGhnDBetciYoQAAAA?w=374&h=329&rs=1&pid=ImgDetMain");

    // 页面加载时获取用户信息
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
        chatMessages.value.push({
          sender: 'ai',
          text: reading.value,
        });
        scrollToBottom();
      }

      try {
        const userInfo = uni.getStorageSync('userInfo');
        if (userInfo) {
          const parsedInfo = JSON.parse(userInfo);
          userName.value = parsedInfo.name || "未设置昵称";
          userAvatar.value = parsedInfo.img || userAvatar.value;
        }
      } catch (error) {
        console.error('获取用户信息失败：', error);
      }
    });

    const sendMessage = async () => {
      const question = inputMessage.value.trim();
      if (!question) return;

      chatMessages.value.push({ sender: 'user', text: question });
      inputMessage.value = "";
      scrollToBottom();

      isLoading.value = true;

      try {
        uni.request({
          url: 'http://localhost:3000/api/chat',
          method: 'POST',
          data: { question },
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
          complete: () => {
            isLoading.value = false;
          },
        });
      } catch (error) {
        console.error('Error sending message to AI:', error);
        chatMessages.value.push({ sender: 'ai', text: '发送消息失败，请稍后再试。' });
        scrollToBottom();
        isLoading.value = false;
      }
    };

    const scrollToBottom = () => {
      setTimeout(() => {
        scrollTop.value = chatMessages.value.length * 60;
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
      isLoading,
      userName,
      userAvatar,
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
  margin-bottom: 20px;
  display: flex;
  width: 100%;
}

.ai-message-container {
  justify-content: flex-start;
  margin-left: 5px;
}

.user-message-container {
  justify-content: flex-end;
  margin-right: 5px;
}

.ai-message-wrapper,
.user-message-wrapper {
  display: flex;
  align-items: flex-start;
  max-width: 70%;
}

.ai-message-wrapper {
  flex-direction: row;
}

.user-message-wrapper {
  flex-direction: row;
  justify-content: flex-end;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.ai-avatar {
  margin-right: 10px;
}

.user-avatar {
  margin-left: 10px;
}

.message-content {
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 50px);
}

.username {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 5px;
}

.user-name {
  text-align: right;
}

.message-bubble {
  border-radius: 10px;
  padding: 10px;
  max-width: 100%;
  word-wrap: break-word;
}

.ai-bubble {
  background-color: #f1f1f1;
  color: black;
}

.user-bubble {
  background-color: #4a4a8a;
  color: white;
}

.message-text {
  font-size: 14px;
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
