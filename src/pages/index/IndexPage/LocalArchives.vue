<template>
  <view class="container">

    <!-- 搜索区域 -->
    <view class="search-section">
      <view class="filter-row">
        <view class="filter-item active">
          <text>全部</text>
        </view>
        <view class="filter-item">
          <text>名称</text>
        </view>
      </view>
      <view class="search-box">
        <input type="text" placeholder="可输入搜索内容" class="search-input" />
        <button class="search-btn">搜索</button>
      </view>
    </view>

    <!-- 功能按钮区 -->
    <view class="function-bar">
      <view class="left-functions">
        <text class="function-text">上次选择</text>
      </view>
      <view class="right-functions">
        <text class="function-btn">+ 文件夹</text>
        <text class="function-btn">⟲ 全部同步</text>
      </view>
    </view>

    <!-- 档案列表 -->
    <scroll-view class="archives-list" scroll-y >
      <view v-if="userList.length === 0" class="no-data">
        暂无档案数据
      </view>
      <view v-else class="archive-item" v-for="(user, index) in userList" :key="index">
        <view class="item-left">
          <radio :checked="selectedArchive===user.id" @click="selectedArchive=user.id" class="archive-radio" />
          <text class="gender-icon">{{ user.sex === '男' ? '♀' : '♂' }}</text>
          <text class="archive-info">{{ user.name }}{{ user.birthday }} {{ user.area }}</text>
        </view>
        <view class="item-right">
          <text class="demo-tag" v-if="user.isDemo">示例</text>
          <button class="edit-btn">编辑</button>
        </view>
      </view>
    </scroll-view>


    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <text class="archive-count">共 {{ userList.length }} 个档案，其中 0 个未同步</text>
      <view class="action-buttons">
        <button class="add-btn"
           @click="navigateToUserAdd"
          >+ 新增</button>
        <button class="confirm-btn" @click="confirmSelection">确定选择</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
// 修改导入路径，使用相对路径
import { getUserList } from '../../../servers/index'

// 定义用户列表响应式数据
const userList = ref([])
const selectedArchive = ref(null)

// 获取用户列表数据
const fetchUserList = async () => {
 const res = await getUserList()
 console.log(res);
 
 if(res.data.code == 200){
    userList.value = res.data.data
    console.log(userList.value)
  }else{
    console.log('获取用户列表失败')
  }
 }

// 确认选择按钮点击事件
const confirmSelection = () => {
  if (selectedArchive.value) {
    const selectedUser = userList.value.find(user => user.id === selectedArchive.value)
    if (selectedUser) {
      uni.$emit('updateUserInfo', selectedUser)
      uni.navigateBack()
    }
  } else {
    uni.showToast({
      title: '请选择一个档案',
      icon: 'none'
    })
  }
}

// 页面加载时获取数据
onMounted(() => {
  fetchUserList()
})

const goBack = () => {
  uni.navigateBack()
}

const navigateToUserAdd = () => {
  uni.navigateTo({
    url: '/pages/index/IndexPage/UserAdd'
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 0;
}


.back-btn {
  padding: 10rpx;
}

.back-icon {
  font-size: 40rpx;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
}

.right-icons {
  display: flex;
  gap: 20rpx;
}

.search-section {
  background-color: #fff;
  padding: 20rpx;
}

.filter-row {
  display: flex;
  gap: 20rpx;
  margin-bottom: 20rpx;
}

.filter-item {
  padding: 10rpx 30rpx;
  border-radius: 30rpx;
  background-color: #f5f5f5;
}

.filter-item.active {
  background-color: #FFB6C1;
  color: #fff;
}

.search-box {
  display: flex;
  gap: 20rpx;
}

.search-input {
  flex: 1;
  padding: 10rpx 20rpx;
  border: 1px solid #eee;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.search-btn {
  padding: 0 30rpx;
  background-color: #FFB6C1;
  color: #fff;
  border-radius: 8rpx;
  font-size: 28rpx;
  line-height: 2;
}

.function-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
  margin-top: 20rpx;
}

.right-functions {
  display: flex;
  gap: 20rpx;
}

.function-btn {
  color: #666;
  font-size: 28rpx;
}
page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.archives-list {
  background-color: #fff;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  width: 100%;
  height: 100%;
}

.archive-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 20rpx;
  border-bottom: 1px solid #eee;
}

.item-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.gender-icon {
  font-size: 32rpx;
  color: #FFB6C1;
}

.archive-info {
  font-size: 28rpx;
  color: #333;
}

.item-right {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.demo-tag {
  padding: 4rpx 12rpx;
  background-color: #FFB6C1;
  color: #fff;
  border-radius: 6rpx;
  font-size: 24rpx;
}

.edit-btn {
  width: 120rpx;
  background-color: #FFB6C1;
  color: #fff;
  border-radius: 30rpx;
  font-size: 24rpx;
}

.divider {
  text-align: center;
  padding: 30rpx 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: #ddd;
}

.divider::before {
  left: 15%;
}

.divider::after {
  right: 15%;
}

.divider-text {
  display: inline-block;
  padding: 0 20rpx;
  font-size: 24rpx;
  color: #999;
  background: #f5f5f5;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  border-top: 1px solid #eee;
}

.archive-count {
  font-size: 24rpx;
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
}

.add-btn {
  flex: 1;
  padding: 20rpx;
  background-color: #fff;
  border: 1px solid #FFB6C1;
  color: #FFB6C1;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.confirm-btn {
  flex: 1;
  padding: 20rpx;
  background-color: #FFB6C1;
  color: #fff;
  border-radius: 8rpx;
  font-size: 28rpx;
}
.no-data {
  text-align: center;
  padding: 40rpx;
  color: #999;
  font-size: 28rpx;
}
</style>
