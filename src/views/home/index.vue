<template>
    <div class="home">
        <a-space>
            <a-button type="primary">Primary</a-button>
            <a-button>Secondary</a-button>
            <a-button type="dashed">Dashed</a-button>
            <a-button type="outline">Outline</a-button>
            <a-button type="text">Text</a-button>
        </a-space>
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    components: {
        // HelloWorld,
    },
};
</script>

<style lang="less" scoped>
.box {
    display: flex;
    img {
        width: 100px;
        height: 100px;
    }
}
</style>
