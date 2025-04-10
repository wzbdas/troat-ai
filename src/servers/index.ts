export const getList = () => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/users/register', // 确保后端服务在此端口运行
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'  // 添加跨域头
      },
      timeout: 5000,  // 添加超时设置
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        console.error('请求失败：', err);  // 添加错误日志
        reject(err);
      },
      complete: () => {
        console.log('请求完成');  // 添加完成日志
      }
    });
  });
}