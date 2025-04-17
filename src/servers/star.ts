import http from '../utils/http'

export const getArticleList = () => {
    return http.get('/articles/list', null, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}