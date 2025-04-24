import http from '../utils/http'

export const getArticleList = () => {
    return http.get('/articles/list', null, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

//获取文章详情
export const getArticleDetail = (id: number) => {
    return http.get('/articles/list', null, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const getActiveList = () => {
    return http.get('/zactive/active', null, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const updateArticleState = (data) => {
    return http.post('/articles/updateState', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}


export const updateArticleStats = (data) => {
    // 修改为 application/x-www-form-urlencoded
    return http.post('/articles/update', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
}

export const getComments = (articleId: number) => {
    // 使用 params 
    return http.get('/articles/comments', {
        params: { articleId }
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const addComment = (data) => {
    return http.post('/articles/comments/add', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const getUserInfo = (userId) => {
    return http.get(`/users/${userId}`, null, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

// 解梦接口
export const analyzeDream = (data: { dreamContent: string; additionalInfo?: string }) => {
    return http.post('/dream/analysis', data, {
      headers: {
        'Content-Type': 'application/json ',
      }
    })
  }