import { createStore } from 'vuex'
import storage from 'store'
import { infoApi } from '@/api/login'
import { asyncRouterMap } from '@/router/router.config'
// import { SET_TOKEN, SET_INFO } from './mutation-types'

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
                    console.log(response);

                    storage.set('userInfo', response.data);
                    commit('setInfo', response.data);
                    // 获取权限列表
                    // const { permissions } = response.data;
                    const permissions = ['index', 'home', 'about'];
                    
                    
                    if (permissions.length) {
                        commit('setPermission', permissions); // permission.js 判断如果没有权限列表就重新请求
                        console.log(permissions);
                        // 返回权限列表让 permission.js 过滤对应路由
                        
                        const routerList = filterAsyncRouter(asyncRouterMap, permissions)
                        console.log(routerList);
                        commit('setRouterList', routerList)
                        resolve();
                    } else {
                        reject(new Error('角色必须是非空数组!'))
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 根据权限列表过滤对应路由
        FilterRoutes({ commit }, permissions) {
            return new Promise(resolve => {
                console.log(permissions);
                const routerList = filterAsyncRouter(asyncRouterMap, permissions)
                commit('setRouterList', routerList)
                resolve()
            })
        }
    },
    modules: {
    }
})


function filterAsyncRouter(routerMap, permissions) {
    console.log(routerMap);
    console.log(permissions);
    // const routerList = [];

    // routerMap.forEach(route => {
    //     const { permission } = route.mata;
    //     if (permissions.includes(permission)) {
    //         routerList.push(route)
    //         if (route.children && route.children.length) {
    //             route.children = filterAsyncRouter(route.children, roles)
    //         }
    //     }
    // });
    // return routerList

    const routerList = routerMap.filter(route => {
        console.log(route.meta);
        if (route.meta && route.meta.permission) {
            const { permission } = route.mata;
    
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