<template>
    <view class="question">
  
      <!-- 问题列表 -->
      <view class="question-list">
        <view class="question-item" v-for="(item, index) in questionList" :key="index">
          <view class="question-title">{{ item.title }}</view>
          <view class="question-content">{{ item.content }}</view>
        </view>
      </view>
  
      <!-- 人工客服按钮 -->
      <!-- <button class="service-btn">人工客服</button> -->
    </view>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const questionList = ref([
    {
      title: '星宿关系查询与其他软件不一样，怎么回事？',
      content: '我们使用了比较专业的测算方式，在某些时候会与其他软件产生差异。具体测算参数可以查看右上角的"设置"，但对于普通用户，我们建议不要修改默认设置。'
    },
    {
      title: '我以前保存的档案为什么没了？',
      content: '1.档案数据默认是保存在您的手机本地的。如果您操作过卸载APP、清除手机缓存、清除小程序宿主（微信、抖音等）缓存等操作，会导致本地档案被清除。\n2.如需要长期保存档案，可以使用软件的云端存储功能。'
    },
    {
      title: '我是否可以入驻你们平台？',
      content: '抱歉，目前我们没有开展咨询类业务，没有人工服务，所以也不需要入驻。'
    },
    {
      title: '为什么档案页面的保存按钮点击无效？',
      content: '部分手机会出现保存按钮穿透到下方备注输入框的问题，这就导致按钮无法正常点击。\n可以把页面下滑或者上滑，避开备注输入框即可。'
    },
    {
      title: '我的报告买错了，可以退回吗？',
      content: '如果是疏忽大意使用了软件系统默认的档案，可以联系客服退回。如果是其他情况（比如选用了朋友A的生日后，想换成朋友B的生日），通常不可以退回。'
    },
    {
      title: '为什么自定义阿拉伯点没有在专业插件中显示？',
      content: '需要在星盘的设置中先开启阿拉伯点。'
    },
    {
      title: '星盘上的虚线怎么去掉？',
      content: '在星盘设置页面的最下方，有虚实线的切换。需要注意的是，关闭之后，仍仍是将虚线变为了实线，并不会隐藏掉相位线。想要隐藏相位线，需要修改相位容许度，但我们通常不推荐百行修改。'
    },
    {
      title: '在哪里可以看双人星宿关系？',
      content: '在"首页-趣味工具-星宿关系"中。'
    },
    {
      title: '你们的解读准吗？',
      content: '软件中的各类解读皆来自于相关书籍和网络信息的整理，并非对未来的准确预测，仅供娱乐参考，不可用于封建迷信。'
    }
  ])
  </script>
  
  <style scoped>
  .question {
    min-height: 100vh;
    background: #f5f5f5;
    padding: 20rpx;
  }
  
  .search-box {
    display: flex;
    padding: 20rpx;
    background: #fff;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
  }
  
  .search-input {
    flex: 1;
    height: 70rpx;
    padding: 0 20rpx;
    border: 1px solid #eee;
    border-radius: 35rpx;
    margin-right: 20rpx;
    font-size: 28rpx;
  }
  
  .search-btn {
    width: 120rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    background: #ff6b9d;
    color: #fff;
    border-radius: 35rpx;
    font-size: 28rpx;
  }
  
  .question-list {
    background: #fff;
    border-radius: 10rpx;
    padding: 20rpx;
  }
  
  .question-item {
    padding: 30rpx 0;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .question-item:last-child {
    border-bottom: none;
  }
  
  .question-title {
    font-size: 30rpx;
    color: #ff6b9d;
    margin-bottom: 20rpx;
  }
  
  .question-content {
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
  }
  
  .service-btn {
    position: fixed;
    bottom: 40rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: #ff6b9d;
    color: #fff;
    border-radius: 40rpx;
    font-size: 28rpx;
  }
  </style>