// 获取用户列表接口
// #ifdef MP-WEIXIN
export const getUserList = (data:any) => {
  console.log(data,1111);
  
  return new Promise((resolve, reject) => {
    uni.request({
     url: `http://localhost:3000/mbi/list?id=data`, // 确保后端服务在此端口运行
     method: 'GET',
     header: {
       'content-type': 'application/json',
       'Access-Control-Allow-Origin': '*'  // 添加跨域头
     },
     data: data,
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
    })
  })
};

// 添加用户接口
export const addUser = (data: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
       url: 'http://localhost:3000/mbi/addUser', // 确保后端服务在此端口运行
       method: 'POST',
       header: {
         'content-type': 'application/json',
         'Access-Control-Allow-Origin': '*'  // 添加跨域头
       },
       data: data,
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
    })
    })
    };
//回显用户接口
export const getUser = (data: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
       url: `http://localhost:3000/mbi/getUser?id=data`, // 确保后端服务在此端口运行
       method: 'GET' , 
       header: {
         'content-type': 'application/json',
         'Access-Control-Allow-Origin': '*'  // 添加跨域头 
       },
       data: data,
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
    }) 
  })  
}
//修改用户接口
export const updateUser = (data: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
       url: 'http://localhost:3000/mbi/updateUser', // 确保后端服务在此端口运行
       method: 'POST', 
       header: {
         'content-type': 'application/json',
         'Access-Control-Allow-Origin': '*'  // 添加跨域头 
       },
       data: data,
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
    }) 
  }) 
}
//删除用户接口
export const deleteUser = (data: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
       url: 'http://localhost:3000/mbi/delUser', // 确保后端服务在此端口运行
       method: 'POST',
       header: {
         'content-type': 'application/json; charset=utf-8',
         'Access-Control-Allow-Origin': '*'  // 添加跨域头
       },
       data: data,
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
    })
  })
};
//获取倾诉列表接口
export const getQingsuList = (data:any) => {
  return new Promise((resolve, reject) => {
    uni.request({
     url: `http://localhost:3000/mbi/qingsu?id=data`, // 确保后端服务在此端口运行
     method: 'GET',
     header: {
       'content-type': 'application/json',
       'Access-Control-Allow-Origin': '*'  // 添加跨域头
     },
     data:data,
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
    })
  })
};

//添加倾诉接口
export const addQingsu = (data: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
       url: 'http://localhost:3000/mbi/addQingsu', // 确保后端服务在此端口运行
       method: 'POST',
       header: {
         'content-type': 'application/json',
         'Access-Control-Allow-Origin': '*'  // 添加跨域头
       },
       data: data,
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
    })
    })
    };
//删除倾诉接口
export const deleteQingsu = (data: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
       url: 'http://localhost:3000/mbi/delQingsu', // 确保后端服务在此端口运行
       method: 'POST',
       header: {
         'content-type': 'application/json; charset=utf-8',
         'Access-Control-Allow-Origin': '*'  // 添加跨域头
       },
       data: data,
       timeout: 5000,  // 添加超时设置
       success: (res) => {
         resolve(res);
       },
       fail: (err) => {
         console.error('请求失败：', err);  // 添加错误日志
         reject(err);
       },
       complete: () => { console.log('请求完成');  // 添加完成日志  
       }
    }) 
  }) 
}
//获取回忆列表
export const getMemoryList = (data:any) => {
  return new Promise((resolve, reject) => {
    uni.request({
     url: `http://localhost:3000/mbi/memory?id=data`, // 确保后端服务在此端口运行
     method: 'GET',
     header: {
       'content-type': 'application/json',
       'Access-Control-Allow-Origin': '*'  // 添加跨域头
     },
     data:data,
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
    })
  })
};
//添加回忆接口
export const addMemory = (data: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
       url: 'http://localhost:3000/mbi/addMemory', // 确保后端服务在此端口运行
       method: 'POST',
       header: {
         'content-type': 'application/json',
         'Access-Control-Allow-Origin': '*'  // 添加跨域头
       },
       data: data,
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
    })
    })
    };
//删除回忆接口
export const deleteMemory = (data: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
       url: 'http://localhost:3000/mbi/delMemory', // 确保后端服务在此端口运行
       method: 'POST',
       header: {
         'content-type': 'application/json; charset=utf-8',
         'Access-Control-Allow-Origin': '*'  // 添加跨域头
       },
       data: data,
       timeout: 5000,  // 添加超时设置
       success: (res) => {
         resolve(res);
       },
       fail: (err) => {
         console.error('请求失败：', err);  // 添加错误日志
         reject(err);
       },
       complete: () => { console.log('请求完成');  // 添加完成日志    
       }
    }) 
  }) 
}
//获取娃娃列表
export const getDollList = () => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/mbi/doll', // 确保后端服务在此端口运行
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
    })
  })
}
//获取音频类型接口
export const getAudioTypeList = () => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/mbi/typeList',
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
    }) 
  })  
}
//获取音频列表接口
export const getAudioList = () => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/mbi/audioList' ,
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
    }) 
  })  
}
//修改音频状态接口
export const updateAudioStatus = (data: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/mbi/audioUpdate' ,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'  // 添加跨域头
      },
      data: data,
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
    }) 
  })  
}
//生辰八字接口
export const getBazi = (data: any) => {
  return new Promise((resolve, reject) => {
    uni.request({
       url: 'http://localhost:3000/model/bazi', // 确保后端服务在此端口运行
       method: 'POST',
       header: {
         'content-type': 'application/json',
         'Access-Control-Allow-Origin': '*'  // 添加跨域头
       },
       data: data,
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
    })
    })
    };
//#endif
import http from '../utils/http'
// #ifdef H5
// 获取用户列表接口
export const getUserList = (data:any) => {
  return http.get('/mbi/list',data,{
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
// 添加用户接口
export const addUser = (data: any) => {
  return http.post('/mbi/addUser', data, {
    headers: {
      'Content-Type': 'application/json',
    }
   })
}
//回显用户接口
export const getUser = (data: any) => {
  return http.get('/mbi/getUser', data, {
    headers: {
      'Content-Type': 'application/json',
    }
 })
}
//修改用户接口
export const updateUser = (data: any) => {
  return http.post('/mbi/updateUser', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
//删除用户接口
export const deleteUser = (data: any) => {
  return http.post('/mbi/delUser', data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
}
// 获取倾诉列表接口
export const getQingsuList = (data:any) => {
  return http.get('/mbi/qingsu', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
//添加倾诉接口
export const addQingsu = (data: any) => {
  return http.post('/mbi/addQingsu', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
//删除倾诉接口
export const deleteQingsu = (data: any) => {
  return http.post('/mbi/delQingsu', data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
}
//获取回忆列表
export const getMemoryList = (data:any) => {
  return http.get('/mbi/memory', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
//添加回忆接口
export const addMemory = (data: any) => {
  return http.post('/mbi/addMemory', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
//删除回忆接口
export const deleteMemory = (data: any) => {
  return http.post('/mbi/delMemory', data, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
}
//获取娃娃接口
export const getDollList = () => {
  return http.get('/mbi/doll', null, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
//获取音频类型接口
export const getAudioTypeList = () => {
  return http.get('/mbi/typeList', null, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
//获取音频列表接口
export const getAudioList = () => {
  return http.get('/mbi/audioList', null, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
//修改音频状态接口
export const updateAudioStatus = (data: any) => {
  return http.post('/mbi/audioUpdate', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  }) 
}
//生辰八字接口
export const getBazi = (data: any) => {
  return http.post('/model/bazi', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
//#endif
// // 获取用户列表接口
// export const getList = () => {
//   return new Promise((resolve, reject) => {
//     uni.request({
//       url: 'http://localhost:3000/users/register', // 确保后端服务在此端口运行
//       method: 'GET',
//       header: {
//         'content-type': 'application/json',
//         'Access-Control-Allow-Origin': '*'  // 添加跨域头
//       },
//       timeout: 5000,  // 添加超时设置
//       success: (res) => {
//         resolve(res);
//       },
//       fail: (err) => {
//         console.error('请求失败：', err);  // 添加错误日志
//         reject(err);
//       },
//       complete: () => {
//         console.log('请求完成');  // 添加完成日志
//       }
//     });
//   });
// }





// // 用户注册接口
// export const registerUser = (data: { phone: string; password: string }) => {
//   // 参数校验
//   if (!data.phone || !data.password) {
//     return Promise.reject(new Error('手机号和密码不能为空'));
//   }

//   return new Promise((resolve, reject) => {
//     uni.request({
//       url: 'http://localhost:3000/users/add',
//       method: 'POST',
//       data: {
//         phone: data.phone,
//         password: data.password,
//         // 添加其他必要字段
//         name: data.phone, // 默认使用手机号作为用户名
//         create_time: new Date().toISOString()
//       },
//       header: {
//         'content-type': 'application/json'
//       },
//       success: (res: any) => {
//         if (res.data.code === 0) {
//           resolve(res.data);
//         } else {
//           reject(new Error(res.data.msg || '注册失败'));
//         }
//       },
//       fail: (err) => {
//         console.error('注册失败：', err);
//         reject(new Error('网络请求失败'));
//       }
//     });
//   });
// };
// 修改用户列表接口
// export const UpdateList = (data: { id: number, surplus: number }) => {
//   return new Promise((resolve, reject) => {
//     uni.request({
//       url: 'http://localhost:3000/users/update',
//       method: 'POST',
//       data: {
//         id: data.id,
//         surplus: data.surplus,
//       },
//       header: {
//         'content-type': 'application/json',
//         'Access-Control-Allow-Origin': '*'
//       },
//       timeout: 5000,
//       success: (res) => {
//         resolve(res);
//       },
//       fail: (err) => {
//         console.error('请求失败：', err);
//         reject(err);
//       }
//     });
//   });
// }


// 获取活动
export const getActive = () => {
  return http.get('/zactive/active', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

