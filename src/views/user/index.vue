<template>
    <div class="about">
        <h1>用户信息</h1>
        <div class="box">
            <input type="text" v-focus>
            <div>11111</div>
            <div>222222222</div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    components: {},
    data() {
        return {
            
        }
    },
 

    created() {
        
    },
    methods: {

        // 折叠展开导航栏
        onCollapse() {
            this.collapsed = !this.collapsed
        },


    }


});
</script>

<style lang="less" scoped>
    .about {
        .box {
            // .flex();
            .flex_direction();
            // display: flex;
            // flex-direction: column;
        }
       
    }
</style>