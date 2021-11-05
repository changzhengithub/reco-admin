<template>
    <div class="app">
        <!-- 左侧菜单 -->
        <div class="left_menu">
            <left-menu> </left-menu>
        </div>
        <!-- 右侧列表 -->
        <div class="right_list">
            <right-list></right-list>
        </div>
    </div>
</template>
<script>
import leftMenu from "./component/leftMenu.vue";
import rightList from "./component/rightList.vue";
export default {
    data() {
        return {};
    },
    components: {
        leftMenu,
        rightList,
    },
};
</script>

<style lang="less" scoped>
.app {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .left_menu {
        // background-color: red;
        height: 100%;
        width: 20%;
        border-right: 1px solid #000;
        padding: 0 20px 0 0;
    }
    .right_list {
        // background-color: black;
        width: 80%;
        height: 100%;
    }
}
</style>