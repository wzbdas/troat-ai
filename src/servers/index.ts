import http from '../utils/http';

// 获取用户列表接口
export const getUserList = () => {
  return http.get('/mbi/list', null, {
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