<template>
    <div class="app">
        <!-- 头部搜索框 start-->
        <div class="top_select">
            <a-space direction="vertical" size="large">
                <a-input-search
                    :style="{ width: '304px' }"
                    placeholder="搜索成员和部门"
                    v-model="searchValue"
                    @search="inputSearch"
                />
            </a-space>
        </div>
        <!-- 头部搜索框 end-->

        <!-- 中间菜单 start-->
        <div class="canter_menu">
            <a-tree
                :blockNode="true"
                :data="newTreeData.length == 0 ? treeData : newTreeData"
            >
                <template #extra="nodeData">
                    <icon-more-vertical
                        class="icon_more_vertical"
                        @click="() => onIconClick(nodeData)"
                    />
                </template>
            </a-tree>
        </div>
        <!-- 中间菜单 end-->

        <!-- 底部添加按钮 start -->
        <div class="bottom_button">
            <a-button type="outline" long>添加团队</a-button>
        </div>
        <!-- 底部添加按钮 end -->
    </div>
</template>

<script>
import { ref, h } from "vue";
export default {
    name: "leftMenu",
    setup() {
        // 定义变量
        // 菜单图标
        const IconStar = <icon-user-group />;
        // 输入框绑定值
        let searchValue = ref("");
        // 菜单树数据源
        let treeData = ref([
            {
                title: "销售子组",
                key: "0-0",
                icon: () => h(IconStar),
            },
            {
                title: "销售2组",
                key: "0-1",
                icon: () => h(IconStar),
            },
            {
                title: "ATK",
                key: "0-2",
                icon: () => h(IconStar),
                children: [
                    {
                        title: "子团队",
                        key: "0-2-1",
                        icon: () => h(IconStar),
                    },
                ],
            },
        ]);
        let newTreeData = ref([]);
        // 定义方法
        // 点击菜单栏头部输入框搜索
        function inputSearch(value) {
            if (newTreeData.value.length == 0) {
                cycleTree(treeData.value, value);
            } else {
                newTreeData.value = [];
                cycleTree(treeData.value, value);
            }
            if (value == "") {
                newTreeData.value = [];
            }
        }
        function cycleTree(tree, value) {
            // tree 需要遍历的树
            // value 输入框输入的值
            tree.forEach((item) => {
                // 成功匹配字段
                if (item.title.indexOf(value) !== -1) {
                    // 匹配成功
                    newTreeData.value.push({
                        title: item.title,
                        key: item.key,
                        icon: () => h(IconStar),
                    });
                    //  再次判断有没有子级
                    if (item.children) {
                        // 有子级 调用自己再次循环
                        cycleTree(item.children, value);
                        console.log("成功匹配,有子级");
                    } else {
                        // 没有子级
                        console.log("成功匹配,没有子级");
                    }
                } else {
                    // 未匹配到字段
                    //  再次判断有没有子级
                    if (item.children) {
                        // 有子级 调用自己再次循环
                        cycleTree(item.children, value);
                        // 匹配失败有子级
                        console.log(" 匹配失败,有子级");
                    } else {
                        // 没有子级
                        console.log("匹配失败,没有子级");
                    }
                }
            });
        }
        // 点击菜单树右侧编辑
        function onIconClick(nodeData) {
            // 当前行信息
            console.log(nodeData);
        }
        // api

        return {
            onIconClick,
            inputSearch,
            treeData,
            searchValue,
            newTreeData,
        };
    },

    data() {
        return {};
    },
};
</script>

<style lang="less" scoped>
.app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top_select {
        height: 50px;
    }
    .canter_menu {
        flex: 1;
        .icon_more_vertical {
            position: absolute;
            right: 8px;
            font-size: 19px;
            top: 10px;
        }
    }
    .bottom_button {
        margin-top: 20px;
        height: 40px;
    }
}
</style>