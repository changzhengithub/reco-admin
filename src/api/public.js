import request from '@/utils/request'

const api = {
    login: '/api/login', // 登录
    logout: '/api/system/logout', // 退出登录
    
    info: '/api/owner/info', // 获取用户信息
}

// 登录
export function loginApi(parameter) {
    return request({
        url: api.login,
        method: 'post',
        data: parameter
    })
}

// 退出登录
export function logoutApi() {
    return request({
        url: api.logout,
        method: 'post',
    })
}

// 获取用户信息
export function infoApi() {
    return request({
        url: api.info,
        method: 'get',
    })
}