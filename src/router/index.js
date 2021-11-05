import { createRouter, createWebHistory } from 'vue-router'

import { constantRouterMap } from '@/router/router.config'

// import { BasicLayout } from '@/layouts'

// const routes = [
//     {
//         path: '/',
//         name: 'index',
//         component: BasicLayout,
//         redirect: '/home',
//         children: [
//             {
//                 path: '/home',
//                 name: 'home',
//                 component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
//             },
//             {
//                 path: '/user',
//                 name: 'user',
//                 component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue')
//             },
//         ]
//     },
//     {
//         path: '/about',
//         name: 'about',
//         component: () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue')
//     },
//     {
//         path: '/empower',
//         name: 'empower',
//         component: () => import(/* webpackChunkName: "empower" */ '@/views/empower/index.vue')
//     },
// ]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: constantRouterMap
})

export default router
