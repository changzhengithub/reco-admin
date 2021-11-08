import { createStore } from 'vuex'
import storage from 'store'
// eslint-disable-next-line
import { infoApi, logoutApi } from '@/api/login'
import { asyncRouterMap } from '@/router/router.config'
import { ACCESS_TOKEN } from './mutation-types'

export default createStore({
    state: {
        token: '', // token
        info: {}, // 用户信息
        permission: [], // 权限列表
        routerList: [], // 路由列表
    },
    mutations: {
        // 设置token
        setToken(state, token) {
            state.token = token
        },
        // 设置用户信息
        setInfo(state, info) {
            state.info = info
        },

        // 设置权限列表
        setPermission(state, permission) {
            state.permission = permission
        },

        // 设置路由列表，匹配的所有路由
        setRouterList(state, routerList) {
            state.routerList = routerList
        },


    },
    actions: {

        // 获取用户信息
        GetInfo({ commit }) {
            return new Promise((resolve, reject) => {
                infoApi().then(response => {
                    storage.set('userInfo', response.data);
                    commit('setInfo', response.data);
                    // 获取权限列表
                    // const { permissions } = response.data;
                    const permissions = ['index', 'home', 'about', 'user', 'unitOrg', 'teamManage'];
                    
                    commit('setPermission', permissions); // permission.js 判断如果没有权限列表就重新请求
                    if (permissions.length) {
                        resolve(permissions);
                    } else {
                        reject(new Error('角色必须是非空数组!'))
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 根据权限列表过滤对应路由
        FilterRoutes({ commit }, res) {
            const { permissions } = res;
            return new Promise((resolve, reject) => {
                const routerList = filterAsyncRouter(asyncRouterMap, permissions)
                routerList.push({
                    path: '/:catchAll(.*)',
                    redirect: '/exception',
                    hidden: true
                })
                if (routerList.length) {
                    commit('setRouterList', routerList)
                    resolve()
                } else {
                    reject(new Error('无法获取该用户角色，请重新登录!'))
                }
            })
        },

        // 登出
        Logout({ commit }) {
            // eslint-disable-next-line
            return new Promise((resolve,reject) => {
                commit('setToken', '');
                commit('setInfo', {});
                commit('setPermission', []);
                commit('setRouterList', []);
                storage.remove(ACCESS_TOKEN);
                storage.remove('userInfo');
                resolve();
                // logoutApi().then(response => {
                //     if (response.code != 200) {
                //         reject(response);
                //         return
                //     }
                //     commit('setToken', '');
                //     commit('setInfo', {});
                //     commit('setPermission', []);
                //     commit('setRouterList', []);
                //     storage.remove(ACCESS_TOKEN);
                //     storage.remove('userInfo');
                //     resolve();
                // }).catch(error => {
                //     reject(error);
                // })
            })
        }
    },
    modules: {
    }
})

// 根据权限列表过滤路由
function filterAsyncRouter(routerMap, permissions) {
    const routerList = routerMap.filter(route => {
        if (route.meta && route.meta.permission) {
            const { permission } = route.meta;
            if (permissions.includes(permission)) {
                if (route.children && route.children.length) {
                    route.children = filterAsyncRouter(route.children, permissions);
                }
                return true
            }
        }
        return false
    })
    return routerList
}