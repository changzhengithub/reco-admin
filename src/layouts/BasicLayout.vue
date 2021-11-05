<template>
    <a-layout class="basic">
        <a-layout-sider hide-trigger collapsible :collapsed="collapsed">
            <div class="logo">
                <img src="@/assets/images/logo.png" alt="">
                <div class="logo-title">综合管理系统</div>
            </div>
            <a-menu
                :defaultOpenKeys="['1']"
                :defaultSelectedKeys="['0_3']"
                :style="{ width: '100%' }"
                @menuItemClick="onClickMenuItem"
            >
                <a-menu-item key="0_2">
                    <icon-menu-unfold />
                    Menu 2
                </a-menu-item>
                <a-menu-item key="0_3">
                    <icon-menu-unfold />
                    Menu 3
                </a-menu-item>
                <a-sub-menu key="1">
                    <template #title>
                        <span><icon-menu-unfold />Navigation 1</span>
                    </template>
                    <a-menu-item key="1_1">Menu 1</a-menu-item>
                    <a-menu-item key="1_2">Menu 2</a-menu-item>
                    <a-sub-menu key="2" title="Navigation 2">
                        <a-menu-item key="2_1">Menu 1</a-menu-item>
                        <a-menu-item key="2_2">Menu 2</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="3" title="Navigation 3">
                        <a-menu-item key="3_1">Menu 1</a-menu-item>
                        <a-menu-item key="3_2">Menu 2</a-menu-item>
                        <a-menu-item key="3_3">Menu 3</a-menu-item>
                    </a-sub-menu>
                </a-sub-menu>
                <a-sub-menu key="4">
                    <template #title>
                        <span><icon-menu-unfold />Navigation 4</span>
                    </template>
                    <a-menu-item key="4_1">Menu 1</a-menu-item>
                    <a-menu-item key="4_2">Menu 2</a-menu-item>
                    <a-menu-item key="4_3">Menu 3</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="padding-left: 20px">
                <a-button shape="round" @click="onCollapse">
                    <icon-menu-unfold v-if="collapsed" />
                    <icon-menu-fold v-else />
                </a-button>
            </a-layout-header>
            <a-layout class="basic-layout">
                <a-breadcrumb :style="{ margin: '16px 0' }">
                    <a-breadcrumb-item>Home</a-breadcrumb-item>
                    <a-breadcrumb-item>List</a-breadcrumb-item>
                    <a-breadcrumb-item>App</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content>
                    <router-view />
                </a-layout-content>

                <!-- <a-layout-footer>Footer</a-layout-footer> -->
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Message } from "@arco-design/web-vue";

export default defineComponent({
    components: {},
    
    setup() {
        const collapsed = ref(false);
        const onCollapse = () => {
            collapsed.value = !collapsed.value;
        };
        return {
            collapsed,
            onCollapse,
            onClickMenuItem(key) {
                Message.info({ content: `You select ${key}`, showIcon: true });
            },
        };
    },
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
            padding: 0 24px 24px 24px;
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
