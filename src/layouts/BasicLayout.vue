<template>
    <a-layout class="basic">
        <!-- 侧边导航栏 start -->
        <a-layout-sider hide-trigger collapsible :collapsed="collapsed">
            <div class="logo">
                <img src="@/assets/images/logo.png" alt="">
                <div class="logo-title">综合管理系统</div>
            </div>
            <a-menu
                :selected-keys="selectedKeys"
                @menuItemClick="onClickMenuItem"
            >
                <template v-for="(item, index) in menuList" :key="index">
                    <a-menu-item :key="item.path" v-if="!item.children">
                        <arcoIcon :icon="item.meta.icon"></arcoIcon>
                        {{item.meta.title}}
                    </a-menu-item>
                    <a-sub-menu v-if="item.children" :key="item.path">
                        <template #title>
                            <span><arcoIcon :icon="item.meta.icon"></arcoIcon>{{item.meta.title}}</span>
                        </template>
                        <a-menu-item v-for="(subItem) in item.children" :key="subItem.path">
                            <arcoIcon :icon="subItem.meta.icon"></arcoIcon>
                            {{subItem.meta.title}}
                        </a-menu-item>
                    </a-sub-menu>
                    
                </template>
        
            </a-menu>
        </a-layout-sider>
        <!-- 侧边导航栏 end -->
        <a-layout>
            <!-- 头部 start -->
            <a-layout-header>
                <GlobalHeader @COLLAPSE_EVENT="onCollapse"></GlobalHeader>
            </a-layout-header>
            <!-- 头部 end -->

            <a-layout class="basic-layout">
                <a-layout-content>
                    <router-view />
                </a-layout-content>

                <!-- <a-layout-footer>Footer</a-layout-footer> -->
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script>
import { defineComponent } from "vue"
import { mapState } from 'vuex'

import { arcoIcon } from '@/utils/render'
import GlobalHeader from '@/components/GlobalHeader'


export default defineComponent({
    components: {
        arcoIcon,
        GlobalHeader
    },
  
    data() {
        return {
            collapsed: false, // 折叠导航栏
            menuList: [],
            currentRoute: '',
            selectedKeys: [],
            openKeys: [],
        }
    },
    computed: {
        ...mapState(['routerList'])
    },

    created() {
        const menuList = this.getMeunList(this.routerList)
        this.menuList = menuList[0].children
        this.selectedKeys = [this.$route.path]
    },
    methods: {
        // 获取路由列表
        getMeunList(routerList) {
            const menuList = routerList.filter(item => {
                if (!item.hidden) {
                    if (item.children && item.children.length) {
                        console.log(item.children);
                        item.children = this.getMeunList(item.children);
                    }
                    return true
                }
                return false
            });
            return menuList
        },

        // 折叠展开导航栏
        onCollapse() {
            this.collapsed = !this.collapsed
        },

        // 路由跳转
        onClickMenuItem(key) {
            this.selectedKeys = [key]
            this.$router.push({
                path: key
            })
        },

    }


});
</script>

<style lang="less" scoped>
    .basic {
        width: 100%;
        min-height: 100vh;
        background-color: #fff;
        :deep(.arco-layout-sider) .logo {
            display: flex;
            align-items: center;
            width: 100%;
            height: 64px;
            padding: 0 10px;
            overflow: hidden;
            
            // border-bottom: 1px solid #e8e8e8;
            box-shadow: 1px 1px 1px #ccc;
            transition: all .3s;
            img {
                width: 30px;
                height: 30px;
            }
            .logo-title {
                font-size: 16px;
                font-weight: 600;
                margin-left: 10px;
                display: inline-block;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        :deep(.arco-layout-header) {
            height: 64px;
            line-height: 64px;
            background: var(--color-bg-3);
        }

        .basic-layout {
            padding: 20px;
            // min-height: calc(100vh- 64px);
            background-color: #f2f2f2;

            :deep(.arco-layout-content) {
                width: 100%;
                min-height: 500px;
                padding: 24px;
                font-size: 14px;
                background-color: #fff;
            }
        }
    }
</style>
