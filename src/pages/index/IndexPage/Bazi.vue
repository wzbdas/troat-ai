<template>
    <view class="bazi-page">
      <!-- 顶部标题 -->
      <view class="header">
        <text class="title">八字命理</text>
        <text class="subtitle">探索命理，寻找人生方向</text>
      </view>
  
      <!-- 输入表单 -->
      <view class="form-container">
        <view class="form-title">请输入您的出生信息</view>
  
        <!-- 姓名输入 -->
        <view class="form-item">
          <text class="label">姓名</text>
          <input
            type="text"
            v-model="formData.name"
            placeholder="请输入姓名"
            class="input"
          />
        </view>
  
        <!-- 性别选择 -->
        <view class="form-item">
          <text class="label">性别</text>
          <view class="gender-selector">
            <view
              class="gender-option"
              :class="{ active: formData.gender === '男' }"
              @tap="formData.gender = '男'"
            >
              <text>男</text>
            </view>
            <view
              class="gender-option"
              :class="{ active: formData.gender === '女' }"
              @tap="formData.gender = '女'"
            >
              <text>女</text>
            </view>
          </view>
        </view>
  
        <!-- 出生日期选择 -->
        <view class="form-item">
          <text class="label">出生日期</text>
          <picker
            mode="date"
            :value="formData.birthDate"
            @change="onDateChange"
            class="date-picker"
            fields="day"
            start="1900-01-01"
            end="2100-12-31"
          >
            <view class="picker-text">
              {{ formData.birthDate || '请选择出生日期' }}
            </view>
          </picker>
        </view>
  
        <!-- 出生时间选择 -->
        <view class="form-item">
          <text class="label">出生时辰</text>
          <picker
            mode="selector"
            :range="timeOptions"
            :value="timeIndex"
            @change="onTimeChange"
            class="time-picker"
          >
            <view class="picker-text">
              {{ formData.birthTime || '请选择出生时辰' }}
            </view>
          </picker>
        </view>
  
        <!-- 提交按钮 -->
        <view class="button-group">
          <button class="reset-btn" @tap="resetForm">重置</button>
          <button class="submit-btn" @tap="calculateBazi">查询八字</button>
        </view>
      </view>
  
  
      <!-- 加载动画 -->
      <view class="loading-container" v-if="isLoading">
        <view class="loading-spinner">
          <view class="spinner-item" v-for="(item, index) in 8" :key="index"></view>
        </view>
        <text class="loading-text">小主我在疯狂奔跑，请耐心等待♥♥♥</text>
      </view>
  
      <!-- 八字结果展示 -->
      <view class="result-container" v-if="showResult && !isLoading">
        <view class="result-header">
          <text class="result-title">八字分析结果</text>
          <text class="result-subtitle">{{ formData.name }} - {{ formData.gender }}</text>
          <text class="result-date">{{ formData.birthDate }} {{ formData.birthTime }}</text>
        </view>
  
        <!-- 命理解析 -->
        <view class="analysis-section">
          <text class="section-title">命理解析</text>
          <text class="analysis-text">{{ formatAnalysisText(baziResult.analysis) }}</text>
        </view>

      </view>
    </view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getBazi } from '../../../servers/index'
  
  // 表单数据
  const formData = ref({
    name: '',
    gender: '男',
    birthDate: '',
    birthTime: '',
  });
  
  // 时辰选项
  const timeOptions = [
    '子时 (23:00-01:00)',
    '丑时 (01:00-03:00)',
    '寅时 (03:00-05:00)',
    '卯时 (05:00-07:00)',
    '辰时 (07:00-09:00)',
    '巳时 (09:00-11:00)',
    '午时 (11:00-13:00)',
    '未时 (13:00-15:00)',
    '申时 (15:00-17:00)',
    '酉时 (17:00-19:00)',
    '戌时 (19:00-21:00)',
    '亥时 (21:00-23:00)',
  ];
  
  // 时辰索引
  const timeIndex = ref(0);
  
  // 是否显示结果
  const showResult = ref(false);
  // 是否正在加载
  const isLoading = ref(false);
  
  // 八字结果
  const baziResult = ref({
    analysis: '',
    advice: '',
  });
  
  // 日期选择事件处理
  const onDateChange = (e) => {
    formData.value.birthDate = e.detail.value;
  };
  
  // 时辰选择事件处理
  const onTimeChange = (e) => {
    timeIndex.value = Number(e.detail.value);
    formData.value.birthTime = timeOptions[timeIndex.value];
  };
  
  // 计算八字
  const calculateBazi = () => {
    // 验证表单
    if (
      !formData.value.name ||
      !formData.value.birthDate ||
      !formData.value.birthTime
    ) {
      uni.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    // 显示加载动画
    isLoading.value = true;
    showResult.value = false;
    
    // 滚动到页面顶部
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
    
    getBazi({
      birthday: formData.value.birthDate,
      birthTime: formData.value.birthTime,
    }).then(res => {
      // 隐藏加载动画
      isLoading.value = false;
      
      if (res.data.code === 200) {
        baziResult.value.analysis = res.data.data.analysis;
        showResult.value = true;
        
        // 滚动到结果区域
        setTimeout(() => {
          uni.pageScrollTo({
            selector: '.result-container',
            duration: 300
          });
        }, 100);
      } else {
        uni.showToast({
          title: res.data.msg || '获取分析结果失败',
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(error => {
      // 发生错误时也要隐藏加载动画
      isLoading.value = false;
      console.error('请求失败:', error);
      uni.showToast({
        title: '网络请求失败',
        icon: 'none',
        duration: 2000
      });
    });
  };
  
  // 重置表单
  const resetForm = () => {
    formData.value = {
      name: '',
      gender: '男',
      birthDate: '',
      birthTime: '',
    };
    timeIndex.value = 0;
    showResult.value = false;
    
    uni.showToast({
      title: '表单已重置',
      icon: 'none',
      duration: 1500
    });
  };
  
  
  // 格式化分析文本，去除#号
  const formatAnalysisText = (text) => {
    if (!text) return '';
    // 同时去除#号和*号
    return text.replace(/[#*]/g, '');
  };
  </script>
  
  <style scoped>
  .bazi-page {
    padding: 30rpx;
    background-color: #f8f8f8;
    min-height: 100vh;
    position: relative;
    overflow: hidden; /* 防止内容溢出 */
    box-sizing: border-box;
  }
  .header {
    text-align: center;
    margin-bottom: 40rpx;
    padding: 20rpx 0;
  }
  
  .title {
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
    display: block;
    margin-bottom: 10rpx;
    background: linear-gradient(to right, #ebbbc1, #d48a92);
    -webkit-background-clip: text;
    color: transparent;
  }
  
  .subtitle {
    font-size: 28rpx;
    color: #666;
    margin-top: 10rpx;
  }
  
  .form-container {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }
  
  .form-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
    text-align: center;
    position: relative;
  }
  
  .form-title::after {
    content: '';
    position: absolute;
    bottom: -10rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 60rpx;
    height: 4rpx;
    background: linear-gradient(to right, #ebbbc1, #d48a92);
    border-radius: 2rpx;
  }
  
  .form-item {
    margin-bottom: 30rpx;
  }
  
  .label {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 10rpx;
    display: block;
    font-weight: 500;
  }
  
  .input {
    width: 100%;
    height: 80rpx;
    border: 1px solid #ddd;
    border-radius: 10rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }
  
  .input:focus {
    border-color: #ebbbc1;
  }
  
  .gender-selector {
    display: flex;
    gap: 20rpx;
  }
  
  .gender-option {
    flex: 1;
    height: 80rpx;
    border: 1px solid #ddd;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    transition: all 0.3s ease;
  }
  
  .gender-option.active {
    background: linear-gradient(135deg, #ebbbc1, #d48a92);
    color: #fff;
    border-color: #ebbbc1;
    box-shadow: 0 4rpx 8rpx rgba(235, 187, 193, 0.3);
  }
  
  .  .date-picker,
  .time-picker {
    width: 100%;
    height: 80rpx;
    border: 1px solid #ddd;
    border-radius: 10rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: border-color 0.3s;
    position: relative;
    z-index: 1;
    background-color: #fff; /* 确保背景色 */
    overflow: hidden; /* 防止内容溢出 */
  }
  /* 确保选择器内容不会溢出 */
  uni-picker {
    width: 100%;
    overflow: hidden;
  }
  
  /* 确保页面内容在视口内 */
  page {
    height: 100%;
    overflow-x: hidden;
  }
  .date-picker:active,
  .time-picker:active {
    border-color: #ebbbc1;
  }
  
  .picker-text {
    color: #333;
  }
  
  .button-group {
    display: flex;
    gap: 20rpx;
    margin-top: 30rpx;
  }
  
  .reset-btn {
    flex: 1;
    background-color: #f5f5f5;
    color: #666;
    height: 90rpx;
    line-height: 90rpx;
    font-size: 32rpx;
    border-radius: 45rpx;
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;
  }
  
  .reset-btn:active {
    background-color: #e0e0e0;
    transform: scale(0.98);
  }
  
  .submit-btn {
    flex: 2;
    background: linear-gradient(135deg, #ebbbc1, #d48a92);
    color: #fff;
    height: 90rpx;
    line-height: 90rpx;
    font-size: 32rpx;
    border-radius: 45rpx;
    box-shadow: 0 4rpx 8rpx rgba(235, 187, 193, 0.3);
    transition: all 0.3s ease;
    border: none;
  }
  
  .submit-btn:active {
    background: linear-gradient(135deg, #e0a9af, #c97a82);
    transform: scale(0.98);
    box-shadow: 0 2rpx 4rpx rgba(235, 187, 193, 0.2);
  }
  
  .result-container {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20rpx); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .result-header {
    text-align: center;
    margin-bottom: 30rpx;
    padding-bottom: 20rpx;
    border-bottom: 1px solid #eee;
  }
  
  .result-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    display: block;
    margin-bottom: 10rpx;
  }
  
  .result-subtitle {
    font-size: 28rpx;
    color: #666;
    display: block;
    margin-bottom: 5rpx;
  }
  
  .result-date {
    font-size: 24rpx;
    color: #999;
    display: block;
  }
  
  .analysis-section {
    margin-top: 30rpx;
    padding-top: 20rpx;
    border-top: 1px solid #eee;
  }
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
    position: relative;
    display: inline-block;
  }
  
  .section-title::after {
    content: '';
    position: absolute;
    bottom: -6rpx;
    left: 0;
    width: 100%;
    height: 3rpx;
    background: linear-gradient(to right, #ebbbc1, transparent);
    border-radius: 2rpx;
  }
  
  .analysis-text {
    font-size: 28rpx;
    color: #333;
    line-height: 1.8;
    text-align: justify;
  }

  /* 加载动画样式 */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60rpx 0;
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
    margin-bottom: 30rpx;
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .loading-spinner {
    position: relative;
    width: 80rpx;
    height: 80rpx;
    margin-bottom: 30rpx;
  }
  
  .spinner-item {
    position: absolute;
    width: 16rpx;
    height: 16rpx;
    background: linear-gradient(135deg, #ebbbc1, #d48a92);
    border-radius: 50%;
    animation: spinner-animation 1.2s linear infinite;
    transform-origin: 40rpx 40rpx;
  }
  
  .spinner-item:nth-child(1) {
    animation-delay: 0s;
    transform: rotate(0deg) translate(40rpx, 0);
  }
  
  .spinner-item:nth-child(2) {
    animation-delay: -0.15s;
    transform: rotate(45deg) translate(40rpx, 0);
  }
  
  .spinner-item:nth-child(3) {
    animation-delay: -0.3s;
    transform: rotate(90deg) translate(40rpx, 0);
  }
  
  .spinner-item:nth-child(4) {
    animation-delay: -0.45s;
    transform: rotate(135deg) translate(40rpx, 0);
  }
  
  .spinner-item:nth-child(5) {
    animation-delay: -0.6s;
    transform: rotate(180deg) translate(40rpx, 0);
  }
  
  .spinner-item:nth-child(6) {
    animation-delay: -0.75s;
    transform: rotate(225deg) translate(40rpx, 0);
  }
  
  .spinner-item:nth-child(7) {
    animation-delay: -0.9s;
    transform: rotate(270deg) translate(40rpx, 0);
  }
  
  .spinner-item:nth-child(8) {
    animation-delay: -1.05s;
    transform: rotate(315deg) translate(40rpx, 0);
  }
  
  @keyframes spinner-animation {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
  
  .loading-text {
    font-size: 28rpx;
    color: #666;
  }
  </style>