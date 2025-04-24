<template>
  <view class="agreement-container">
    <view class="agreement-content">
      
      <view class="agreement-section">
        <text class="section-text">请您在产品之前，请务必仔细阅读并理解《用户许可使用协议》（以下简称"本协议"）中规定的所有权利和限制。</text>
      </view>

      <view class="agreement-section">
        <text class="section-text">我们一向尊重并会严格保护用户在使用本产品时的合法权益（包括用户隐私、用户数据等）不受到任何侵犯。</text>
      </view>

      <view class="agreement-section">
        <text class="section-text">本协议（包括本文最后部分的隐私政策）是用户（包括通过各种合法途径获取到本产品的自然人、法人或其他组织机构，以下简称"用户"或"您"）与我们之间针对本产品相关事项最终的、完整的且排他的协议，并取代、合并之前的当事人之间关于上述事项的讨论和协议。</text>
      </view>

      <view class="agreement-section">
        <text class="section-text">本协议将对用户使用本产品的行为产生法律约束力，您已承诺和保证有权利和能力订立本协议。用户开始使用本产品将视为已经接受本协议，请认真阅读并理解本协议中各种条款，包括免除和限制我们的免责条款和对用户的权利限制（未成年人审阅时应由法定监护人陪同），如果您不能接受本协议中的全部条款，请勿开始使用本产品。</text>
      </view>

      <view class="agreement-section">
        <view class="section-title">使用账户</view>
        <text class="section-text">您必须承诺和保证：</text>
        <text class="section-text">1. 您使用本产品的行为必须合法</text>
        <text class="section-text">本产品将会依据本协议"修改和终止"的规定保留或终止您的账户，您必须承诺对您的登录信息保密、不被其他人获取与使用，并且对您在本账户下的所有行为负责。您必须将任何有可能触犯法律的、未授权使用或怀疑为未授权使用的行为在第一时间通知本产品。本产品不对您因不能遵守上述要求而造成的损失承担法律责任。</text>
      </view>
      <view class="agreement-section">
        <view class="section-title">终端用户协议许可</view>
        <text class="section-text">依据本协议规定，本产品将授予您以下不可转让的、非排他的许可：</text>
        <text class="section-text">1. 使用本产品的权利；</text>
        <text class="section-text">2. 在您所有的网络通信设备、计算机设备和移动通信设备上下载、安装、使用本产品的权利。</text>
      </view>

      <view class="agreement-section">
        <view class="section-title">限制性条款</view>
        <text class="section-text">本协议对您的授权将受到以下限制：</text>
        <text class="section-text">1. 您不得对本产品进行任何形式的许可、出售、租赁、转让、发行或其他商业用途；</text>
        <text class="section-text">2. 除非法律禁止此类限制，否则您不得对本产品的任何部分或衍生产品进行修改、翻译、改编、合并、利用、分解、改造或反向编译、反向工程等；</text>
        <text class="section-text">3. 您不得以创建相同或竞争服务为目的使用本产品；</text>
        <text class="section-text">4. 除非法律明文规定，否则您不得对本产品的任何部分以任何形式或方法进行生产、复制、发行、出售、下载或显示等；</text>
        <text class="section-text">5. 您不得删除或破坏包含在本产品中的任何版权声明或其他所有权标记。</text>
      </view>

      <view class="agreement-section">
        <view class="section-title">费用</view>
        <text class="section-text">您必须自行负担购买本产品的费用，个人上网或第三方（包括但不限于电信或移动通讯提供商）收取的通讯费、信息费等相关费用。如涉及电信增值服务，我们建议您与增值服务提供商确认相关费用问题。</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 页面逻辑
</script>

<style>
.agreement-container {
  min-height: 100vh;
  background-color: #fff;
  padding: 30rpx;
}

.agreement-content {
  padding-bottom: 40rpx;
}

.agreement-title {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
  color: #333;
}

.agreement-section {
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #333;
}

.section-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20rpx;
  display: block;
}
</style>