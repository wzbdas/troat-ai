<template>
  <view class="speak-container">
    <view class="speak-header">
      <text class="header-title">登录问题说明</text>
    </view>
    
    <view class="speak-desc">
      由于本软件属于支持多端、多种方式登录的产品，因此将一些登录问题进行说明。
    </view>

    <view class="speak-section">
      <view class="section-title bold">小程序登录</view>
      <view class="section-subtitle">小程序用户授权登录</view>
      <view class="section-content">
        在此过程中，我们不会搜集你在小程序所在平台的个人信息如头像、昵称等，但会获得一个你在该小程序中的唯一识别编号，比如openid、unionid，并以此完成账号登录。
      </view>
    </view>

    <view class="speak-section">
      <view class="section-title">特别注意</view>
      <view class="section-content">
        如果你使用小程序注册登录之后，后来又用手机号或邮箱注册，则会生成两个完全独立的账号。这些独立账号之间的星币、报告等也是不可互通的。
      </view>
      <view class="section-content">
        如果你希望让小程序授权与手机号处于同一个账号，则应该在"我的"-"设置"中绑定手机号。当然，前提是这个手机号之前没有注册过。
      </view>
      <view class="section-content">
        如果这个手机已经被注册了，在账号内资料不多的情况下，可以考虑将其注销，然后再绑定。
      </view>
    </view>

    <view class="speak-section">
      <view class="section-title bold">手机、邮箱登录</view>
      <view class="section-content">
        手机和邮箱均可注册登录，但需要验证码进行配合。
      </view>
    </view>

    <view class="speak-section">
      <view class="section-title">中国大陆以外手机号</view>
      <view class="section-content">
        抱歉，我们暂不支持中国大陆以外的手机号，建议使用邮箱方式。
      </view>
    </view>
  </view>
</template>

<style scoped>
.speak-container {
  min-height: 100vh;
  background-color: #fff;
  padding: 0 4vw;
}

.speak-header {
  padding: 4vw 0;
  border-bottom: 1px solid #f5f5f5;
}

.header-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  text-align: center;
}

.speak-desc {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.6;
  padding: 4vw 0;
  border-bottom: 1px solid #f5f5f5;
}

.speak-section {
  padding: 4vw 0;
  border-bottom: 1px solid #f5f5f5;
}

.section-title {
  font-size: 1rem;
  color: #ff69b4;
  margin-bottom: 2vw;
}

.section-title.bold {
  font-weight: bold;
}

.section-subtitle {
  font-size: 0.9rem;
  color: #ff69b4;
  margin-bottom: 2vw;
}

.section-content {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2vw;
}

.section-content:last-child {
  margin-bottom: 0;
}
</style>