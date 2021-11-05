import { createRouter, createWebHistory } from 'vue-router'

import { BasicLayout } from '@/layouts'

const routes = [
    {
        path: '/',
        name: 'index',
        component: BasicLayout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
            },
            {
                path: '/about',
                name: 'about',
                component: () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue')
            },
            {
                path:'/teamManagement',
                name:'teamManagement',
                component: () => import(/* webpackChunkName: "teamManagement" */ '@/views/teamManagement/index.vue')
            },
        ]
    },
    {
        path: '/empower',
        name: 'empower',
        component: () => import(/* webpackChunkName: "empower" */ '@/views/empower/index.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
