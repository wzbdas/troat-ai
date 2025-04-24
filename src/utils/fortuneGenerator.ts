interface FortuneData {
  love: number;
  wealth: number;
  career: number;
  health: number;
}

// 使用生日和地区信息生成一致的运势数据
export function generateFortuneData(birthday: string, area: string): FortuneData {
  // 添加参数检查，提供默认值
  const safeBirthday = birthday || '2000-01-01';
  const safeArea = area || '默认地区';
  
  // 将生日字符串转换为数字以用于生成运势
  const dateNum = new Date(safeBirthday).getTime();
  
  // 将地区字符串转换为数字
  const areaNum = safeArea.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // 使用当前日期作为种子的一部分，这样每天的运势都会不同
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const todayNum = new Date(todayStr).getTime();
  
  // 组合所有数字生成种子
  const seed = (dateNum + areaNum + todayNum) % 100000;
  
  // 使用种子生成伪随机数
  const random = (base: number) => {
    const x = Math.sin(base + seed) * 10000;
    return Math.floor((x - Math.floor(x)) * 100);
  };
  
  // 生成各项运势数值（确保在0-100之间）
  return {
    love: Math.max(0, Math.min(100, random(1))),
    wealth: Math.max(0, Math.min(100, random(2))),
    career: Math.max(0, Math.min(100, random(3))),
    health: Math.max(0, Math.min(100, random(4)))
  };
}