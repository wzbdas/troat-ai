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
        <view class="picker-container">
          <uni-datetime-picker
            type="datetime"
            :value="userForm.birthday"
            @change="(e) => onDateChange(e)"
            :clear-icon="false"
            :border="false"
          />
        </view>
      </view>
      
      <!-- 出生时区 -->
      <view class="form-item">
        <text class="label">出生时区</text>
        <view class="picker-container">
          <text class="picker-value">{{ userForm.timeZone }}</text>
        </view>
        <text class="helper-text">默认东8区</text>
      </view>
    
      
      <!-- 出生地 -->
      <view class="form-item">
        <text class="label">出生地</text>

        <input type="text" v-model="userForm.area" placeholder="请输入出生地" class="input-field" />
      </view>
         <!-- 保存按钮 -->
      <view class="save-button" @click="saveProfile">
        <text>{{ isEdit ? '更新档案' : '保存档案' }}</text>
      </view>
    </view>
    
 

  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

// 修改导入路径，使用相对路径
import { addUser, updateUser, getUser } from '../../../servers/index'
import { onLoad } from '@dcloudio/uni-app';

// 是否为编辑模式
const isEdit = ref(false);

//定义路由id
const id = ref<string | number>('');

// 获取用户详情并回显数据
const fetchUserDetail = async () => {
  if (!id.value) return;  
  try {
    //#ifdef MP-WEIXIN
    const res = await getUser({id:id.value})
    //#endif
    // #ifdef H5
    const res = await getUser({  params:{id:id.value} });
    // #endif
    if (res.data.code === 200 && res.data.data) {
      const userData = res.data.data[0];
      // 填充表单数据
      userForm.name = userData.name || '';
      userForm.sex = userData.sex || '女';
      userForm.birthday = userData.birthday || '2000-01-01 12:00';
      userForm.timeZone = userData.timeZone || '东8区';
      userForm.area = userData.area || '北京北京东城';
    } else {
      uni.showToast({
        title: '获取用户信息失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('获取用户详情失败:', error);
    uni.showToast({
      title: '获取用户信息失败',
      icon: 'none'
    });
  }
};

onLoad((options) => {
  if (options.id) {
    id.value = options.id;
    console.log('路由参数:', options);
    
    isEdit.value = true;
    // 获取用户详情并回显
    fetchUserDetail();
  }
})

// 定义档案表单接口
interface ProfileForm {
  name: string;
  sex: string;
  birthday: string;
  timeZone: string;
  area: string;
  userId?: string | number;
}
 // #ifdef MP-WEIXIN
 const userInfo = uni.getStorageSync('userInfo')
// #endif
// #ifdef H5
const userInfo = localStorage.getItem('userInfo')
// #endif
const userId = userInfo ? JSON.parse(userInfo).id : ''
// 初始化表单数据
const userForm = reactive<ProfileForm>({
  name: '',
  sex: '女',
  birthday: '2000-01-01 12:00',
  timeZone: '东8区',
  area: '北京北京东城',
  userId: userId,
});


// 初始化区域数组，用于地区选择器
const regionArray = ref([0, 0, 0])
// 日期选择事件处理
const onDateChange = (value: any) => {
  if (value) {
    userForm.birthday = value;
  }
};




// 保存档案
const saveProfile = async () => {
  // 表单验证
  if (!userForm.name) {
    uni.showToast({
      title: '请输入昵称',
      icon: 'none'
    });
    return;
  }

  if (!userForm.birthday) {
    uni.showToast({
      title: '请选择出生日期',
      icon: 'none'
    });
    return;
  }

  try {
    let res;
    
    if (isEdit.value) {
      // 编辑模式，调用更新接口
      res = await updateUser({
        ...userForm,
        id: id.value
      });
    } else {
      // 新增模式，调用添加接口
      res = await addUser(userForm);
    }
    
    if (res.data.code === 200) {
      uni.showToast({
        title: isEdit.value ? '档案更新成功' : '档案保存成功',
        icon: 'success'
      });
      // 保存成功后，跳转到档案列表页
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/index/IndexPage/LocalArchives',
        });
      }, 1500);
    } else {
      uni.showToast({
        title: res.data.message || '保存失败，请重试',
        icon: 'error'
      });
    }
  } catch (error) {
    uni.showToast({
      title: '保存失败，请重试',
      icon: 'error'
    });
  }
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

  position: relative;

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

  padding: 0 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fff;
}

.input-field:focus {
  border-color: #f4b9c1;
  outline: none;

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
  position: relative;
  min-height: 40px;
}

.picker-value {
  font-size: 16px;
  color: #333;
  flex: 1;
  padding-right: 10px;
}

.picker-arrow {
  color: #ccc;
  font-size: 16px;
  margin-left: 5px;
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
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #f4b9c1;
  color: #fff;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  z-index: 100;
  transition: all 0.3s ease;
}

.save-button:active {
  transform: scale(0.98);
  background-color: #e6a8b0;
}
</style>