<template>
  <view class="user-add-container">
    
    <view class="form-card">
      <!-- 昵称 -->
      <view class="form-item">
        <text class="label">昵称</text>
        <input type="text" v-model="userForm.name" placeholder="请输入昵称" class="input-field" />
      </view>
      
      <!-- 性别 -->
      <view class="form-item">
        <text class="label">性别</text>
        <view class="radio-group">
          <label class="radio-item">
            <radio :checked="userForm.sex === '男'" @click="userForm.sex = '男'" color="#999" />
            <text>男</text>
          </label>
          <label class="radio-item">
            <radio :checked="userForm.sex === '女'" @click="userForm.sex = '女'" color="#8a8a8a" />
            <text>女</text>
          </label>
        </view>
      </view>
      
      <!-- 出生日期 -->
      <view class="form-item">
        <text class="label">出生日期 (阳历)</text>
        <view class="picker-container" @click="showDatePicker = true">
          <text class="picker-value">{{ userForm.birthday || '2000-01-01 12:00' }}</text>
          <text class="picker-arrow">></text>
        </view>
      </view>
      
      <!-- 出生时区 -->
      <view class="form-item">
        <text class="label">出生时区</text>
        <view class="picker-container" @click="showTimezonePicker = true">
          <text class="picker-value">{{ userForm.timeZone || '东8区' }}</text>
          <text class="picker-arrow">></text>
        </view>
        <text class="helper-text">无法选择?</text>
      </view>
    
      
      <!-- 出生地 -->
      <view class="form-item">
        <text class="label">出生地</text>
        <view class="picker-container" @click="showLocationPicker = true">
          <text class="picker-value">{{ userForm.area || '北京北京东城' }}</text>
          <text class="picker-arrow">></text>
        </view>
      </view>

    </view>
    
    <!-- 保存按钮 -->
    <view class="save-button" @click="saveProfile">
      <text>保存档案</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// 定义档案表单接口
interface ProfileForm {
  name: string;
  sex: string;
  birthday: string;
  timeZone: string;
  area: string;
}

// 初始化表单数据
const userForm = reactive<ProfileForm>({
  name: '',
  sex: '女',
  birthday: '2000-01-01 12:00',
  timeZone: '东8区',
  area: '北京北京东城',
});

// 控制各选择器的显示状态
const showDatePicker = ref(false);
const showTimezonePicker = ref(false);
const showLocationPicker = ref(false);


// 保存档案
const saveProfile = () => {
  // 这里可以调用API提交表单数据
  console.log('提交的档案数据:', userForm);
  uni.showToast({
    title: '档案保存成功',
    icon: 'success'
  });
};
</script>

<style scoped>
.user-add-container {
  padding: 0;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  position: relative;
  border-bottom: 1px solid #eee;
  background-color: #fff;
}

.page-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.form-card {
  background-color: #fff;
  border-radius: 12px;
  margin: 15px;
  padding: 0 15px;
  padding-bottom: 80px; /* 添加底部间距，防止内容被固定按钮遮挡 */
}

.form-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.form-item:last-child {
  border-bottom: none;
}

.label {
  width: 120px;
  font-size: 16px;
  color: #666;
  font-weight: 500;
}

.label-with-icon {
  display: flex;
  align-items: center;
  width: 120px;
}

.info-icon {
  margin-left: 5px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  background-color: #eee;
  color: #999;
  font-size: 12px;
}

.input-field {
  flex: 1;
  height: 40px;
  font-size: 16px;
  color: #333;
}

.radio-group {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.radio-item {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.picker-container {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.picker-value {
  font-size: 16px;
  color: #333;
}

.picker-arrow {
  color: #ccc;
  font-size: 16px;
}

.helper-text {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.coordinates {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  width: 100%;
}

.save-button {
  position: fixed;
  left: 15px;
  right: 15px;
  bottom: 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #f8a5c2;
  color: #fff;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  z-index: 100;
}
</style>