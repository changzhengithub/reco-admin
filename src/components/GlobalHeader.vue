<template>
    <div class="global-header">
        <div class="header-left">
            <a-button shape="round" @click="onCollapse">
                <icon-menu-unfold v-if="collapsed" />
                <icon-menu-fold v-else />
            </a-button>
            <a-breadcrumb :style="{ marginLeft: '20px' }">
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item>List</a-breadcrumb-item>
                <a-breadcrumb-item>App</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="header-right">
            <a-dropdown trigger="hover" position="br">
                <a-space>
                    <a-avatar :size="30" v-if="userInfo.avatar">
                        <img alt="avatar" :src="baseUrl+userInfo.avatar" />
                    </a-avatar>
                    <a-avatar :size="30" :style="{ backgroundColor: '#3370ff' }" v-else>
                        <icon-user />
                    </a-avatar>
                    <a-typography-text bold>{{userInfo.username}}</a-typography-text>
                </a-space>
                <template #content>
                    <a-doption style="width: 150px;">
                        <template #icon>
                            <icon-settings />
                        </template>
                        个人信息
                    </a-doption>
                    <a-doption @click="logout">
                        <template #icon>
                            <icon-export />
                        </template>
                        退出登录
                    </a-doption>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed  } from "vue"
import { useStore } from 'vuex'

export default defineComponent({
    name: 'GlobalHeader',
    components: {},
    emits: ['COLLAPSE_EVENT'],
    setup(props, context) {
        const store = useStore()

        const baseUrl = window.api
        const collapsed = ref(false)
        // 折叠展开导航栏
        const onCollapse = () => {
            collapsed.value = !collapsed.value
            context.emit('COLLAPSE_EVENT')
        }
        // 退出登录
        const logout = () => {
            store.dispatch('Logout').then(() => {
                window.location.href = '/'
            }).catch(() => {
                window.location.href = '/'
            })
        }
        return {
            baseUrl,
            collapsed,
            userInfo: computed(() => store.state.info),
            onCollapse,
            logout,
        }
    }
});
</script>

<style lang="less" scoped>
.global-header {
    .flex_vertical_center_horizontal_between();
    width: 100%;
    height: 100%;
    padding: 0 24px;
}
</style>