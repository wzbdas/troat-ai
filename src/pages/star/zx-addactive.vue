<template>
  <view class="add-activity-container">
    <view class="form-container">
      <view class="form-title">创建新活动</view>

      <view class="form-item">
        <text class="label">活动标题</text>
        <input type="text" 
               v-model="formData.title" 
               placeholder="请输入活动标题" 
               class="input" />
      </view>

      <view class="form-item">
        <text class="label">活动描述</text>
        <textarea v-model="formData.context" 
                  placeholder="请输入活动描述" 
                  class="textarea" />
      </view>

      <view class="form-item">
        <text class="label">活动地点</text>
        <input type="text" v-model="formData.local" placeholder="请输入活动地点" class="input" />
      </view>

      <view class="form-item">
        <text class="label">开始时间</text>
        <input type="text" :value="formData.startTime" disabled class="input" />
      </view>


      <view class="form-item">
        <text class="label">结束时间</text>
        <picker 
          mode="date" 
          :value="formData.endTime" 
          :start="minEndDate"
          @change="onEndTimeChange" 
          class="input"
        >
          <view>{{ formData.endTime || '请选择结束时间' }}</view>
        </picker>
      </view>

      <view class="form-item">
  <text class="label">活动宣传图</text>
  <view class="image-upload" @tap="chooseImage">
    <image v-if="formData.image" :src="formData.image" mode="aspectFit" class="preview-image" />
    <view v-else class="upload-placeholder">
      <text>点击上传图片</text>
    </view>
  </view>
</view>

      <view class="button-group">
        <button class="submit-btn" @click="handleSubmit">提交</button>
        <button class="cancel-btn" @click="handleCancel">取消</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
const minEndDate = new Date().toISOString().split('T')[0]; // 获取当前日期作为最小日期

const formData = ref({
  title: '',
  context: '',
  local: '',
  startTime: new Date().toLocaleDateString(), // 自动获取当前时间
  endTime: '',
  image: ''
})

// 修改结束时间选择处理
const onEndTimeChange = (e) => {
  const selectedDate = new Date(e.detail.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 设置时间为当天开始

  if (selectedDate < today) {
    uni.showToast({
      title: '结束时间不能早于今天',
      icon: 'none'
    });
    return;
  }
  formData.value.endTime = e.detail.value;
}

// 修改 chooseImage 函数
const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      // 设置预览图片
      formData.value.image = res.tempFilePaths[0]
      // 保存文件路径用于上传
      formData.value.imageFile = res.tempFilePaths[0]
      
      uni.showToast({
        title: '图片选择成功',
        icon: 'success'
      })
    },
    fail: (error) => {
      console.error('选择图片失败:', error)
      uni.showToast({
        title: '选择图片失败',
        icon: 'none'
      })
    }
  })
}

// 修改 handleSubmit 函数中的上传部分
const handleSubmit = async () => {
  // 表单验证
  if (!formData.value.title.trim()) {
    uni.showToast({ title: '请输入活动标题', icon: 'none' });
    return;
  }
  if (!formData.value.context.trim()) {
    uni.showToast({ title: '请输入活动描述', icon: 'none' });
    return;
  }
  if (!formData.value.local.trim()) {
    uni.showToast({ title: '请输入活动地点', icon: 'none' });
    return;
  }
  if (!formData.value.endTime) {
    uni.showToast({ title: '请选择结束时间', icon: 'none' });
    return;
  }
  
  if (!formData.value.image) {
    uni.showToast({ title: '请上传活动宣传图', icon: 'none' });
    return;
  }
  try {
    // 将日期格式化为 YYYY-MM-DD 格式
    const startDate = new Date(formData.value.startTime).toISOString().split('T')[0];
    const endDate = formData.value.endTime;

    // 显示上传中提示
    uni.showLoading({
    title: '正在提交...'
  })


  const uploadResult = await new Promise((resolve, reject) => {
    uni.uploadFile({
      url: 'http://localhost:3000/zactive/add',
      filePath: formData.value.imageFile,
      name: 'image',
      formData: {
        title: formData.value.title,
        context: formData.value.context,
        local: formData.value.local,
        startTime: startDate,
        endTime: endDate
      },
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })

    // 隐藏加载提示
    uni.hideLoading()

    const result = JSON.parse(uploadResult.data)

    if (result.code === 200) {
      uni.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        }
      })
    } else {
      uni.showToast({
        title: result.msg || '添加失败',
        icon: 'none'
      })
    }
  } catch (error) {
    console.error('请求失败：', error)
    Taro.hideLoading()
    Taro.showToast({
      title: '网络请求失败',
      icon: 'none'
    })
  }
}
</script>

<style scoped>
.add-activity-container {
  padding: 20upx;
  background-color: #fff1f2;  /* 浅粉色背景 */
  min-height: 100vh;
}

.form-container {
  background-color: #fff;
  border-radius: 16upx;
  padding: 40upx;
  box-shadow: 0 4upx 20upx rgba(255, 182, 193, 0.2);  /* 粉色阴影 */
}

.form-title {
  font-size: 40upx;
  font-weight: bold;
  color: #ff69b4;  /* 粉色标题 */
  margin-bottom: 50upx;
  text-align: center;
  position: relative;
}

.form-title::after {
  content: '';
  position: absolute;
  bottom: -10upx;
  left: 50%;
  transform: translateX(-50%);
  width: 60upx;
  height: 4upx;
  background-color: #ff69b4;  /* 标题下划线 */
  border-radius: 2upx;
}

.form-item {
  margin-bottom: 35upx;
}

.label {
  display: block;
  font-size: 28upx;
  color: #666;
  margin-bottom: 12upx;
  font-weight: 500;
}

.input {
  width: 100%;
  height: 88upx;
  border: 2upx solid #ffd1dc;  /* 浅粉色边框 */
  border-radius: 12upx;
  padding: 0 25upx;
  font-size: 28upx;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.input:focus {
  border-color: #ff69b4;
  box-shadow: 0 0 8upx rgba(255, 105, 180, 0.2);
}

.textarea {
  width: 100%;
  height: 200upx;
  border: 2upx solid #ffd1dc;
  border-radius: 12upx;
  padding: 25upx;
  font-size: 28upx;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.textarea:focus {
  border-color: #ff69b4;
  box-shadow: 0 0 8upx rgba(255, 105, 180, 0.2);
}

.image-upload {
  width: 100%;
  height: 300upx;
  border: 2upx dashed #ffd1dc;
  border-radius: 12upx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10upx;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative; /* 添加定位 */
  overflow: hidden; /* 防止内容溢出 */
}

.image-upload:active {
  background-color: #fff5f6;
  border-color: #ff69b4;
  opacity: 0.8; /* 添加点击效果 */
}

.upload-placeholder {
  color: #ff69b4;
  font-size: 28upx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10upx; /* 添加间距 */
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12upx;
  pointer-events: none; /* 防止图片干扰点击事件 */
}

.button-group {
  display: flex;
  gap: 25upx;
  margin-top: 50upx;
}

.submit-btn,
.cancel-btn {
  flex: 1;
  height: 88upx;
  border-radius: 44upx;  /* 圆角按钮 */
  font-size: 32upx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.submit-btn {
  background-color: #ff69b4;
  color: #fff;
  border: none;
}

.submit-btn:active {
  background-color: #ff1493;
  transform: scale(0.98);
}

.cancel-btn {
  background-color: #fff;
  color: #ff69b4;
  border: 2upx solid #ff69b4;
}

.cancel-btn:active {
  background-color: #fff5f6;
  transform: scale(0.98);
}
</style>