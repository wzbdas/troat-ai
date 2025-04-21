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
          <text class="value">{{ userInfo.name }}</text>
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
          <text class="value">{{ userInfo.sex }}</text>
          <text class="arrow">›</text>
        </view>
      </view>
    </view>


    <!-- 替换选择器组件 -->
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
    <button class="save-btn">保存</button>
  </view>
 
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,  // 添加这个控制显示状态
      userInfo: {
        name: '玛丽',
        sunsign: '狮子',
        moonsign: '处女',
        risesign: '天秤',
        sex: '女'
      },
      signs: ['双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手'],
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
</style>