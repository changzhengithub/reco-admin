import { shallowRef } from 'vue'
// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'
// eslint-disable-next-line
const RouteView = {
    name: 'RouteView',
    render: h => h('router-view')
}

// 权限路由
export const asyncRouterMap = [
    {
        path: '/',
        name: 'index',
        component: shallowRef(BasicLayout),
        meta: { permission: 'index'},
        redirect: '/about',
        hidden: false,
        children: [
            // 首页
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home'),
                meta: { title: '首页', icon: 'home', keepAlive: true, permission: 'home' },
                hidden: false,
                children: [
                    // 关于
                    {
                        path: '/about',
                        component: () => import('@/views/about'),
                        name: 'about',
                        meta: { title: '关于', icon: 'cloud-server', keepAlive: true, permission: 'about' },
                        hidden: false,
                    },
                ]
            },

            // 用户信息
            {
                path: '/user',
                name: 'user',
                component: () => import('@/views/user'),
                meta: { title: '用户信息', icon: 'user', keepAlive: true, permission: 'user' },
                hidden: false,
            },

            // 设置
            {
                path: '/setting',
                name: 'setting',
                component: () => import('@/views/setting'),
                meta: { title: '设置', icon: 'setting', keepAlive: true, permission: 'setting' },
                hidden: false,
            },
        ]
    },
]

// 基础路由
export const constantRouterMap = [
    {
        path: '/empower',
        name: 'empower',
        component: () => import( /* webpackChunkName: "empower" */ '@/views/empower')
    },
    // 异常处理
    {
        path: '/exception',
        name: 'exception',
        component: () => import( /* webpackChunkName: "exception" */ '@/views/exception')
    },
    
]