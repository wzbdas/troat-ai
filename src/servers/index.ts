import http from '../utils/http';

// 获取用户列表接口
export const getUserList = () => {
  return http.get('/mbi/list', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
// 添加用户接口
export const addUser = (data: any) => {
  return http.post('/mbi/addUser', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};





// 用户注册接口
export const registerUser = (data: { phone: string; password: string }) => {
  // 参数校验
  if (!data.phone || !data.password) {
    return Promise.reject(new Error('手机号和密码不能为空'));
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/users/add',
      method: 'POST',
      data: {
        phone: data.phone,
        password: data.password,
        // 添加其他必要字段
        name: data.phone, // 默认使用手机号作为用户名
        create_time: new Date().toISOString()
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res: any) => {
        if (res.data.code === 0) {
          resolve(res.data);
        } else {
          reject(new Error(res.data.msg || '注册失败'));
        }
      },
      fail: (err) => {
        console.error('注册失败：', err);
        reject(new Error('网络请求失败'));
      }
    });
  });
};
// 修改用户列表接口
export const UpdateList = (data: { id: number, surplus: number }) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/users/update',
      method: 'POST',
      data: {
        id: data.id,
        surplus: data.surplus,
      },
      header: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      timeout: 5000,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        console.error('请求失败：', err);
        reject(err);
      }
    });
  });
}
