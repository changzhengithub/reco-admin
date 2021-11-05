
/**
 ** 路由权限控制 **
 * 监听每次路由跳转，进行过滤和筛选路由
 */

import storage from 'store'
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar

// import '@/components/NProgress/nprogress.less' // progress bar custom style

import Notification from '@arco-design/web-vue/es/notification'

import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['empower'] // no redirect whitelist
const loginRoutePath = '/empower'
const defaultRoutePath = '/home'

router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar

    // 设置系统标题
    if (to.meta && to.meta.title) {
        const domTitle = '综合OA';
        document.title = to.meta.title + domTitle;
    }

    /* has token */
    if (storage.get(ACCESS_TOKEN)) {
        if (to.path === loginRoutePath) {
            next({ path: defaultRoutePath })
            NProgress.done()
        } else {
            // 判断是否有权限

            if (store.state.permission.length === 0) {
                // request login userInfo
                store
                    .dispatch('GetInfo')
                    .then(() => {
                        const { routerList } = store.state;
                        console.log(routerList);

                        router.addRoute(routerList)
                        // router.addRoutes(routerList)

                        // 请求带有 redirect 重定向时，登录自动重定向到该地址
                        const redirect = decodeURIComponent(from.query.redirect || to.path)

                        if (to.path === redirect) {
                            // set the replace: true so the navigation will not leave a history record
                            next({ ...to, replace: true })
                        } else {
                            // 跳转到目的路由
                            next({ path: redirect })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Notification.error({
                            title: '错误',
                            content: '请求用户信息失败，请重试'
                        })

                        // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
                        // store.dispatch('Logout').then(() => {
                        //     next({ path: loginRoutePath, query: { redirect: to.fullPath } })
                        // }).catch(err => {
                        //     window.location.href = '/'
                        // })
                    })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.includes(to.name)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
