<template>
  <view class="server">
    <scroll-view class="chat-container" scroll-y>
      <view class="message-list">
        <view v-for="(msg, index) in messages" :key="index" 
          :class="['message', msg.type === 'user' ? 'message-user' : 'message-ai']">
          <view class="avatar">{{ msg.type === 'user' ? '👤' : '🤖' }}</view>
          <view class="content">
            {{ msg.content }}
            <!-- AI回复后显示转人工按钮 -->
            <!-- <view v-if="msg.type === 'ai'" class="transfer-btn" @tap="handleTransfer">
              转人工
            </view> -->
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 输入区域 -->
    <view class="input-container">
      <input 
        class="message-input" 
        type="text" 
        v-model="inputMessage"
        placeholder="请输入消息..."
        @confirm="sendMessage"
      />
      <button class="send-btn" @tap="sendMessage">发送</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputMessage = ref('');
const messages = ref([
  {
    type: 'ai',
    content: '你好！我是AI助手，很高兴为您服务。'
  }
]);

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return;
  
  // 添加用户消息
  const userMessage = inputMessage.value;
  messages.value.push({
    type: 'user',
    content: userMessage
  });

  // 清空输入
  inputMessage.value = '';

  try {
    const response = await uni.request({
      url: 'http://localhost:3000/api/ai/ask',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        question: userMessage
      }
    });

    if (response.statusCode === 200) {
      messages.value.push({
        type: 'ai',
        content: response.data.answer
      });
    } else {
      throw new Error(response.data.error || '回复失败');
    }
  } catch (error) {
    console.error('发送消息失败:', error);
    messages.value.push({
      type: 'ai',
      content: '抱歉，我现在无法回复，请稍后再试。'
    });
  }
};

// 添加转人工方法
const handleTransfer = () => {
  uni.navigateTo({
    url: '/pages/my/component/work'
  });
};
</script>

<style scoped>
.server {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: #f8f9fa;
}

.chat-container {
  flex: 1;
  padding: 1.2rem;
  overflow-y: auto;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message {
  display: flex;
  gap: 0.8rem;
  max-width: 70vw;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-user {
  flex-direction: row-reverse;
  align-self: flex-end;
}

.avatar {
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content {
  background: #fff;
  padding: 1rem 1.2rem;
  border-radius: 1.2rem;
  font-size: 0.95rem;
  line-height: 1.6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
}

.message-user .content {
  background: #ff6b9d;
  color: #fff;
}

.message-ai .content {
  background: #fff;
  margin-right: 2rem;
}

.input-container {
  display: flex;
  padding: 1rem 1.2rem;
  gap: 0.8rem;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.message-input {
  flex: 1;
  height: 3rem;
  padding: 0 1.2rem;
  border: 1.5px solid #eee;
  border-radius: 1.5rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.message-input:focus {
  border-color: #ff6b9d;
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
}

.send-btn {
  width: 6rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background: #ff6b9d;
  color: #fff;
  border-radius: 1.5rem;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(255, 107, 157, 0.3);
  transition: all 0.3s ease;
}

.send-btn:active {
  transform: scale(0.95);
}

.transfer-btn {
  margin-top: 0.8rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  color: #ff6b9d;
  background: rgba(255, 107, 157, 0.1);
  border-radius: 1rem;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
}

.transfer-btn:active {
  transform: scale(0.95);
}
</style>