<template>
  <view class="profile">
    <view class="form">
      <view class="form-item">
        <text class="label">头像</text>
        <view class="avatar-wrapper">
          <image class="avatar" src="../../img/1.jpg" mode="aspectFill"></image>
        </view>
      </view>

      <view class="form-item">
        <text class="label">名称</text>
        <view class="value-wrapper">
          <input class="input-value" v-model="userInfo.name" placeholder="请输入名称" />
        </view>
      </view>

      <view class="form-item">
        <text class="label">太阳星座</text>
        <view class="value-wrapper">
          <text class="value">{{ userInfo.sunsign }}</text>
          <text class="arrow" @tap="showPicker('sunsign')">›</text>
        </view>
      </view>

      <view class="form-item">
        <text class="label">月亮星座</text>
        <view class="value-wrapper">
          <text class="value">{{ userInfo.moonsign }}</text>
          <text class="arrow" @tap="showPicker('moonsign')">›</text>
        </view>
      </view>

      <view class="form-item">
        <text class="label">上升星座</text>
        <view class="value-wrapper">
          <text class="value">{{ userInfo.risesign }}</text>
          <text class="arrow" @tap="showPicker('risesign')">›</text>
        </view>
      </view>

      <view class="form-item">
        <text class="label">性别</text>
        <view class="value-wrapper">
          <input class="input-value" v-model="userInfo.sex" placeholder="请输入性别" />
        </view>
      </view>
    </view>


    <view class="popup" v-if="showPopup">
      <view class="mask" @tap="cancelPicker"></view>
      <view class="picker-container">
        <view class="picker-header">
          <text class="cancel" @tap="cancelPicker">取消</text>
          <text class="confirm" @tap="confirmPicker">确认</text>
        </view>
        <picker-view class="picker" :value="pickerValue" @change="onPickerChange">
          <picker-view-column>
            <view class="picker-item" v-for="(item, index) in signs" :key="index">
              {{item}}
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
    <button class="save-btn" @tap="saveUserInfo">保存</button>
  </view>
 
</template>

<script>
import { UpdateList } from '@/servers/index';
export default {
  data() {
    return {
      showPopup: false,
      userInfo: {
        name: '',
        sunsign: '',
        moonsign: '',
        risesign: '',
        sex: ''
      },
      signs: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
      currentType: '',
      pickerValue: [0],
      tempValue: ''
    }
  },
  methods: {
    showPicker(type) {
      this.currentType = type;
      const currentValue = this.userInfo[type];
      const index = this.signs.findIndex(item => item === currentValue);
      this.pickerValue = [index > -1 ? index : 0];
      this.tempValue = this.signs[this.pickerValue[0]];
      this.showPopup = true;  // 显示选择器
    },
    confirmPicker() {
      if (this.currentType && this.tempValue) {
        this.userInfo[this.currentType] = this.tempValue;
      }
      this.showPopup = false;  // 隐藏选择器
    },
    cancelPicker() {
      this.showPopup = false;  // 隐藏选择器
    },
    onPickerChange(e) {
      const index = e.detail.value[0];
      this.tempValue = this.signs[index];
    },
    
    // 修改保存方法
    async saveUserInfo() {
      try {
        // 获取当前存储的用户信息，保留星币数量
        const savedInfo = uni.getStorageSync('userInfo');
        const currentUserInfo = savedInfo ? JSON.parse(savedInfo) : {};
        
        const result = await uni.request({
          url: 'http://localhost:3000/users/update',
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          data: {
            name: this.userInfo.name,
            sunsign: this.userInfo.sunsign,
            moonsign: this.userInfo.moonsign,
            risesign: this.userInfo.risesign,
            sex: this.userInfo.sex,
            surplus: currentUserInfo.surplus || 0, // 保留原有星币数量
            isOnline: true
          }
        });
    
        if (result.statusCode === 200 && result.data.code === 200) {
          // 更新本地存储时合并原有数据
          const updatedUserInfo = {
            ...this.userInfo,
            surplus: currentUserInfo.surplus || 0 // 保留原有星币数量
          };
          uni.setStorageSync('userInfo', JSON.stringify(updatedUserInfo));
          
          // 发送更新事件
          uni.$emit('userInfoUpdated', updatedUserInfo);
          
          uni.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500,
            success: () => {
              setTimeout(() => {
                uni.switchTab({
                  url: '/pages/my/my'
                });
              }, 1500);
            }
          });
        } else {
          throw new Error(result.data.msg || '保存失败');
        }
      } catch (error) {
        console.error('保存失败:', error);
        uni.showToast({
          title: '保存失败',
          icon: 'error'
        });
      }
    }
  },
  // 修改页面加载方法
  onShow() {
    try {
      const savedInfo = uni.getStorageSync('userInfo');
      if (savedInfo) {
        const parsedInfo = JSON.parse(savedInfo);
        // 确保所有必要字段都存在
        this.userInfo = {
          name: parsedInfo.name || '',
          sunsign: parsedInfo.sunsign || '',
          moonsign: parsedInfo.moonsign || '',
          risesign: parsedInfo.risesign || '',
          sex: parsedInfo.sex || ''
        };
      } else {
        // 如果没有存储的用户信息，尝试从登录信息获取
        const phone = uni.getStorageSync('userPhone');
        if (phone) {
          uni.request({
            url: 'http://localhost:3000/users/login',
            method: 'POST',
            data: {
              phone: phone
            },
            success: (res) => {
              if (res.statusCode === 200 && res.data.code === 200) {
                this.userInfo = res.data.data;
                uni.setStorageSync('userInfo', JSON.stringify(res.data.data));
              }
            }
          });
        }
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
    }
  }
}
</script>

<style>
.save-btn {
  width: 90%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: #ff6b9d;
  color: #fff;
  border-radius: 40rpx;
  margin: 40rpx auto;
  font-size: 28rpx;
}
.profile {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
}

.form {
  background: #fff;
  border-radius: 20rpx;
}

.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1px solid #f5f5f5;
}

.label {
  color: #333;
  font-size: 28rpx;
}

.avatar-wrapper, .value-wrapper {
  display: flex;
  align-items: center;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 10rpx;
}

.value {
  color: #666;
  font-size: 28rpx;
  margin-right: 10rpx;
}

.arrow {
  color: #999;
  font-size: 32rpx;
  padding: 10rpx 20rpx;  /* 增加点击区域 */
}

.save-btn {
  width: 90%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: #ff6b9d;
  color: #fff;
  border-radius: 40rpx;
  margin: 40rpx auto;
  font-size: 28rpx;
}

.picker-header {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #f8f8f8;
  border-bottom: 1rpx solid #eee;
}

.cancel, .confirm {
  font-size: 28rpx;
  padding: 10rpx;
}

.cancel {
  color: #666;
}

.confirm {
  color: #ff6b9d;
}

.picker {
  width: 100%;
  height: 400rpx;
  background-color: #fff;
}

.picker-item {
  line-height: 70rpx;
  text-align: center;
}
.input-value {
  color: #666;
  font-size: 28rpx;
  text-align: right;
  padding: 0;
  margin-right: 10rpx;
  min-width: 120rpx;
}

/* 添加任务状态样式 */
.task-status {
  font-size: 0.8rem;
}

.completed {
  color: #999;
}

.todo {
  color: #ff6b9d;
  margin-left: 100px; /* 添加左边距以对齐 */
}

</style>