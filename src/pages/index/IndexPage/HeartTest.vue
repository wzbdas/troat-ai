<template>
  <view class="heart-test">
    <!-- 测试说明部分 -->
    <view class="test-intro card">
      <view class="h2">MBTI性格测试</view>
      <view class="intro-content">
        <text>MBTI建立了个性类型的四个维度，每个维度都用两种不同的偏好，八个方向的不同组合就构成了16种个性类型。</text>
        <view class="dimension-list">
          <view class="dimension-item">（1）能量的投注方向：外倾（E）—内倾（I）</view>
          <view class="dimension-item">（2）接受信息的方式：感觉（S）—直觉（N）</view>
          <view class="dimension-item">（3）作决策的方式：思维（T）—情感（F）</view>
          <view class="dimension-item">（4）喜好的行动方式：判断（J）—知觉（P）</view>
        </view>
        <text class="note">注：每题考虑的时间不得超过10秒钟。每7题为一部分找出你选择最多的那个字母，按顺序进行排列。</text>
      </view>
    </view>

    <!-- 题目列表部分 -->
    <view class="question-list">
      <view v-for="(question, index) in questions" :key="index" class="question-card card">
        <view class="question-title">{{ index + 1 }}. {{ question.title }}</view>
        <view class="options">
          <view v-for="(option, optionIndex) in question.options" :key="option.value" class="option-item" :class="{ 'option-active': answers[index] === option.value }" @tap="answers[index] = option.value">
            <radio :checked="answers[index] === option.value" :value="option.value" :name="'question-' + index" />
            <text class="option-text">{{ option.text }}</text>
            <text class="option-text">{{ option.value }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 提交按钮 --> 
    <button class="submit-btn" @tap="submitTest">提交</button>

    <!-- 结果弹窗 -->
    <view v-if="showResult" class="result-modal">
      <view class="result-content card">
        <view class="h3">您的MBTI性格类型是：{{ result }}</view>
        <text>{{ resultDescription }}</text>
        <button class="close-btn" @tap="showResult = false">关闭</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 题目数据
const questions = [
  {
    id:1,
    title: '你倾向从何处得到力量：',
    options: [
      { value: 'E', text: '别人' },
      { value: 'I', text: '自己的想法' }
    ]
  },
  {
    id:2,
    title: '你更喜欢：',
    options: [
      { value: 'E', text: '参加聚会' },
      { value: 'I', text: '独处' }
    ]
  },
  {
    id:3,
    title: '在社交场合中，你通常：',
    options: [
      { value: 'E', text: '容易与人交谈，认识新朋友' },
      { value: 'I', text: '倾向于与熟悉的人交谈' }
    ]
  },
  {
    id:4,
    title: '你更倾向于：',
    options: [
      { value: 'E', text: '边说边想' },
      { value: 'I', text: '先想后说' }
    ]
  },
  {
    id: 5,
    title: '在工作中，你更喜欢：',
    options: [
      { value: 'E', text: '与他人合作' },
      { value: 'I', text: '独立完成' }
    ]
  },
  {
    id: 6,
    title: '你更喜欢的环境是：',
    options: [
      { value: 'E', text: '热闹、充满活力' },
      { value: 'I', text: '安静、平和' }
    ]
  },
  {
    id: 7,
    title: '休息时，你更倾向于：',
    options: [
      { value: 'E', text: '外出活动' },
      { value: 'I', text: '待在家里' }
    ]
  },
  {
    id: 8,
    title: '你更关注：',
    options: [
      { value: 'S', text: '具体的细节' },
      { value: 'N', text: '整体的概念' }
    ]
  },
  {
    id: 9,
    title: '你更相信：',
    options: [
      { value: 'S', text: '实际经验' },
      { value: 'N', text: '直觉感受' }
    ]
  },
  {
    id: 10,
    title: '你更喜欢的工作方式是：',
    options: [
      { value: 'S', text: '按部就班' },
      { value: 'N', text: '创新改变' }
    ]
  },
  {
    id: 11,
    title: '面对问题时，你更倾向于：',
    options: [
      { value: 'S', text: '寻找具体的解决方案' },
      { value: 'N', text: '探索各种可能性' }
    ]
  },
  {
    id: 12,
    title: '你更喜欢的学习方式是：',
    options: [
      { value: 'S', text: '循序渐进' },
      { value: 'N', text: '跳跃思考' }
    ]
  },
  {
    id: 13,
    title: '你更看重：',
    options: [
      { value: 'S', text: '现实可行性' },
      { value: 'N', text: '未来可能性' }
    ]
  },
  {
    id: 14,
    title: '你更倾向于：',
    options: [
      { value: 'S', text: '保持现状' },
      { value: 'N', text: '追求改变' }
    ]
  },
  {
    id: 15,
    title: '做决定时，你更看重：',
    options: [
      { value: 'T', text: '逻辑分析' },
      { value: 'F', text: '个人感受' }
    ]
  },
  {
    id: 16,
    title: '你认为更重要：',
    options: [
      { value: 'T', text: '公平公正' },
      { value: 'F', text: '和谐关系' }
    ]
  },
  {
    id: 17,
    title: '面对冲突时，你更倾向于：',
    options: [
      { value: 'T', text: '据理力争' },
      { value: 'F', text: '避免伤害' }
    ]
  },
  {
    id: 18,
    title: '你更欣赏：',
    options: [
      { value: 'T', text: '坚持原则' },
      { value: 'F', text: '体谅他人' }
    ]
  },
  {
    id: 19,
    title: '你更倾向于：',
    options: [
      { value: 'T', text: '实事求是' },
      { value: 'F', text: '考虑感受' }
    ]
  },
  {
    id: 20,
    title: '批评他人时，你会：',
    options: [
      { value: 'T', text: '直接指出问题' },
      { value: 'F', text: '委婉表达' }
    ]
  },
  {
    id: 21,
    title: '你更重视：',
    options: [
      { value: 'T', text: '真实' },
      { value: 'F', text: '善意' }
    ]
  },
  {
    id: 22,
    title: '你的工作方式更倾向于：',
    options: [
      { value: 'J', text: '按计划进行' },
      { value: 'P', text: '随机应变' }
    ]
  },
  {
    id: 23,
    title: '你更喜欢：',
    options: [
      { value: 'J', text: '提前安排' },
      { value: 'P', text: '临场发挥' }
    ]
  },
  {
    id: 24,
    title: '你的生活更倾向于：',
    options: [
      { value: 'J', text: '规律有序' },
      { value: 'P', text: '灵活自由' }
    ]
  },
  {
    id: 25,
    title: '面对任务时，你更倾向于：',
    options: [
      { value: 'J', text: '尽快完成' },
      { value: 'P', text: '等待灵感' }
    ]
  },
  {
    id: 26,
    title: '你更喜欢：',
    options: [
      { value: 'J', text: '确定的结果' },
      { value: 'P', text: '开放的可能' }
    ]
  },
  {
    id: 27,
    title: '你的工作环境通常：',
    options: [
      { value: 'J', text: '整齐有序' },
      { value: 'P', text: '随意舒适' }
    ]
  },
  {
    id: 28,
    title: '你更喜欢：',
    options: [
      { value: 'J', text: '按部就班' },
      { value: 'P', text: '即兴发挥' }
    ]
  }
];

// 答案数组
const answers = ref(new Array(28).fill(''));

// 结果相关
const showResult = ref(false);
const result = ref('');
const resultDescription = ref('');

// 计算MBTI类型
const calculateMBTI = () => {
  // 分组统计
  const groups = {
    EI: answers.value.slice(0, 7),
    SN: answers.value.slice(7, 14),
    TF: answers.value.slice(14, 21),
    JP: answers.value.slice(21, 28)
  };

  // 计算每组的结果
  const mbti = [
    countLetters(groups.EI, 'E', 'I'),
    countLetters(groups.SN, 'S', 'N'),
    countLetters(groups.TF, 'T', 'F'),
    countLetters(groups.JP, 'J', 'P')
  ].join('');

  return mbti;
};

// 统计字母出现次数并返回占多数的字母
const countLetters = (arr: string[], letter1: string, letter2: string) => {
  const count1 = arr.filter(x => x === letter1).length;
  const count2 = arr.filter(x => x === letter2).length;
  return count1 >= count2 ? letter1 : letter2;
};

// 提交测试
const submitTest = () => {
  if (answers.value.some(x => !x)) {
    uni.showToast({
      title: '请完成所有题目',
      icon: 'none'
    });
    return;
  }

  result.value = calculateMBTI();
  resultDescription.value = getResultDescription(result.value);
  showResult.value = true;
};

// 获取结果描述
const getResultDescription = (type: string) => {
  const descriptions: Record<string, string> = {
    'ISTJ': '内向、感知、思考、判断型：一丝不苟、认真负责，而且明智豁达，是坚定不移的社会维护者。\n适合职业：会计师、审计师、行政人员、项目经理。',
    'ISFJ': '内向、感知、感觉、判断型：忠心耿耿、一心一意、富有同情心，喜欢助人为乐。\n适合职业：护士、教师、社工、行政助理。',
    'INFJ': '内向、直觉、感觉、判断型：具有洞察力和创造力，富有同情心，追求生活的意义和价值。\n适合职业：心理咨询师、作家、艺术家、人力资源专员。',
    'INTJ': '内向、直觉、思考、判断型：具有战略思维，追求完美，独立自主，善于规划。\n适合职业：科学家、工程师、战略分析师、系统架构师。',
    'ISTP': '内向、感知、思考、知觉型：灵活机智，善于解决具体问题，喜欢动手操作。\n适合职业：技术员、工程师、机械师、数据分析师。',
    'ISFP': '内向、感知、感觉、知觉型：温和友善，享受当下，具有艺术气质。\n适合职业：艺术家、设计师、摄影师、美容师。',
    'INFP': '内向、直觉、感觉、知觉型：理想主义者，重视个人价值观，富有创造力。\n适合职业：作家、心理咨询师、艺术家、教师。',
    'INTP': '内向、直觉、思考、知觉型：逻辑思维强，追求知识，善于理论分析。\n适合职业：研究员、程序员、数学家、系统分析师。',
    'ESTP': '外向、感知、思考、知觉型：活力充沛，善于解决问题，喜欢冒险。\n适合职业：企业家、销售人员、运动员、警察。',
    'ESFP': '外向、感知、感觉、知觉型：活泼开朗，善于社交，享受生活。\n适合职业：演员、主持人、销售代表、导游。',
    'ENFP': '外向、直觉、感觉、知觉型：热情洋溢，富有创造力，善于激励他人。\n适合职业：记者、公关、培训师、创意总监。',
    'ENTP': '外向、直觉、思考、知觉型：创新者，善于辩论，喜欢挑战。\n适合职业：企业家、发明家、律师、管理顾问。',
    'ESTJ': '外向、感知、思考、判断型：务实果断，善于组织，重视效率。\n适合职业：经理、行政主管、军官、法官。',
    'ESFJ': '外向、感知、感觉、判断型：热心助人，重视和谐，善于照顾他人。\n适合职业：教师、护士、客服经理、行政人员。',
    'ENFJ': '外向、直觉、感觉、判断型：富有魅力，善于领导，关心他人成长。\n适合职业：教师、培训师、人力资源经理、非营利组织负责人。',
    'ENTJ': '外向、直觉、思考、判断型：天生的领导者，战略思维强，追求效率。\n适合职业：企业高管、管理咨询师、项目经理、政治家。'
  };
  return descriptions[type] || '未能找到对应的性格类型描述';
};
</script>

<style scoped>
.heart-test {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.test-intro h2 {
  text-align: center;
  color: #333;
  margin-bottom: 15px;
}

.intro-content {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.dimension-list {
  margin: 15px 0;
}

.dimension-item {
  margin: 8px 0;
  color: #444;
}

.note {
  color: #ff6b81;
  font-size: 13px;
  margin-top: 10px;
}

.question-card {
  margin-bottom: 15px;
}

.question-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: #f8f8f8;
  cursor: pointer;
  transition: all 0.3s ease;
}

.option-active {
  background: #ffb7c5;
}

.option-text {
  font-size: 14px;
  color: #444;
}

.submit-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 30px;
  width: 80%;
  max-width: 600rpx;
  margin: 0 auto;
  background:  #f4b9c1;
  color: white;
  padding: 12px 0;
  border-radius: 30px;
  font-size: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(255, 107, 129, 0.3);
  z-index: 999;
}

.result-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.result-content {
  width: 90%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  padding: 25px;
}

.result-content h3 {
  text-align: center;
  color: #333;
  margin-bottom: 15px;
}

.close-btn {
  text-align: center;
  margin-top: 20px;
  color: #666;
  padding: 10px;
  border-top: 1px solid #eee;
}
</style>