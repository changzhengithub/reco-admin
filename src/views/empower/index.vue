<template>
    <div class="empower">
        <div class="empower-login">
            <div class="login-title">
                登录
            </div>

            <div class="login-form">
                <a-form ref="formRef" :model="formData" :rules="formRules" @submit="handleSubmit">
                    <a-form-item field="userName" label="用户名"
                        :rules="[{required:true,message:'name is required'},{minLength:5, message:'must be greater than 5 characters'}]"
                        :validate-trigger="['change','input']"
                    >
                        <a-input v-model="formData.userName" placeholder="请输入" />
                    </a-form-item>
                    <a-form-item field="password" label="密码"
                        :rules="[{required:true,message:'name is required'},{minLength:5, message:'must be greater than 5 characters'}]"
                        :validate-trigger="['change','input']"
                    >
                        <a-input v-model="formData.password" type="password" placeholder="请输入" />
                    </a-form-item>

                    <a-form-item field="code" label="验证码"
                        :rules="[{required:true,message:'name is required'},{minLength:4, message:'must be greater than 5 characters'}]"
                        :validate-trigger="['change','input']"
                    >
                        <a-input v-model="formData.code" placeholder="请输入" />
                        <div class="verify-img" @click="getVerifyCode">
                            <img :src="formData.verifyImg" alt="验证码" />
                        </div>
                    </a-form-item>

                    <a-form-item>
                        <a-space>
                            <a-button html-type="submit">Submit</a-button>
                            <a-button @click="$refs.formRef.resetFields()">Reset</a-button>
                        </a-space>
                    </a-form-item>
                </a-form>
                
            </div>
        </div>


        <h1>登录</h1>
    </div>
</template>
<script>
import { captchaApi, } from '@/api/login'
export default {
    data() {
        return {
            formData: {
                userName: '',
                password: '',
                code: '',
                key: '',
                verifyImg: '',
            },
        }
    },
    created() {
        this.getVerifyCode();
    },
    methods: {
        // 登录
        handleSubmit({ values, errors }) {
            if (errors) return
            const {userName, password, code} = values;
            console.log(userName);
            console.log(password);
            console.log(code);

            
        },
        // 获取验证码
        getVerifyCode() {
            // 清空验证码输入框
            captchaApi()
                .then(res => {
                    if (res.code != 200) {
                        this.$notification.error({
                            title: '错误',
                            content: res.msg
                        })
                        return false
                    }
                    const data = res.data
                    console.log(data);
                    this.formData.verifyImg = data.img
                    this.formData.key = data.key
                    this.formData.code = ''
                })
                .catch(err => {
                    this.$notification.error({
                        title: '错误',
                        content: '验证码请求出错!'
                    })
                    console.log(err)
                })
        },
    }
}

// import { defineComponent, ref } from "vue";

// export default defineComponent({
//     name: 'empower',
//     components: {},
//     setup() {
//         const collapsed = ref(false);
//         const onCollapse = () => {
//             collapsed.value = !collapsed.value;
//         };
//         return {
//             collapsed,
//             onCollapse,
//             onClickMenuItem(key) {
//                 Message.info({ content: `You select ${key}`, showIcon: true });
//             },
//         };
//     },
// });
</script>
<style lang="less" scoped>
    .empower {
        width: 100%;
        height: 100%;

        .empower-login {
            width: 500px;
            margin: 100px auto;
        }

 
    }
</style>
