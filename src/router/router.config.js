import { shallowRef } from 'vue'
// eslint-disable-next-line
import { RouteView, BasicLayout } from '@/layouts'


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
                meta: { title: '首页', icon: () =>(<icon-share-alt />), keepAlive: true, permission: 'home' },
                hidden: false,
                children: [
                    // 关于
                    {
                        path: '/about',
                        component: () => import('@/views/about'),
                        name: 'about',
                        meta: { title: '关于', icon: () =>(<icon-tags />), keepAlive: true, permission: 'about' },
                        hidden: false,
                    },
                ]
            },

            // 用户信息
            {
                path: '/user',
                name: 'user',
                component: () => import('@/views/user'),
                meta: { title: '用户信息', icon: () =>(<icon-user />), keepAlive: true, permission: 'user' },
                hidden: false,
            },

            // 设置
            {
                path: '/setting',
                name: 'setting',
                component: () => import('@/views/setting'),
                meta: { title: '设置', icon: ()=>(<icon-settings />), keepAlive: true, permission: 'setting' },
                hidden: false,
            },

            // 组织单位
            {
                path: '/unitOrg',
                name: 'unitOrg',
                component: shallowRef(RouteView),
                meta: { title: '组织单位', icon: () =>(<icon-apps />), keepAlive: true, permission: 'unitOrg' },
                redirect: '/unitOrg/teamManage',
                hidden: false,
                children: [
                    // 团队管理
                    {
                        path: '/unitOrg/teamManage',
                        name: 'teamManage',
                        component: () => import('@/views/teamManagement/index.vue'),
                        meta: { title: '团队管理', icon: ()=>(<icon-interaction />), keepAlive: true, permission: 'teamManage' },
                        hidden: false,
                    },
                ]
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