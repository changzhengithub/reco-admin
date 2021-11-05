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
                        <a-button type="primary" size="large" html-type="submit" long>Submit</a-button>
                    </a-form-item>
                </a-form>
                
            </div>
        </div>
    </div>
</template>
<script>
// eslint-disable-next-line
import { defineComponent, ref } from 'vue'
import { mapMutations } from 'vuex'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { captchaApi, loginApi} from '@/api/login'

import storage from 'store'

export default defineComponent({
    name: 'empower',
    components: {},
    setup() {},
    data() {
        return {
            formData: {
                userName: 'admin',
                password: 'Xiao987321',
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
        // mutation方法
        ...mapMutations(['setToken']),

        // 登录
        handleSubmit({ errors }) {
            if (errors) return
            const {userName, password, code, key} = this.formData;
            const params = {
                name: userName,
                password,
                code,
                key,
            }

            loginApi(params)
            .then(res => {
                if (res.code != 200) {
                    this.$notification.error({
                        title: '错误',
                        content: res.msg
                    })
                    return false
                }
                console.log(res);
                this.$message.success('登录成功!');
                const token = res.token
                console.log(token);

                // 缓存token
                this.setToken(token);
                storage.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
                
                // 跳转到首页
                this.$router.push({ path: '/' })
            })
            .catch(err => {
                this.$notification.error({
                    title: '错误',
                    content: '验证码请求出错!'
                })
                console.log(err)
            })

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
});
</script>
<style lang="less" scoped>
    .empower {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #f2f2f2;

        .empower-login {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 9;
            width: 500px;
            padding: 20px;
            text-align: center;
            background-color: #fff;
            transform: translate(-50%, -100%);

            .login-title {
                font-size: 24px;
                color: #165DFF;
                margin-bottom: 30px;
            }
        }

 
    }
</style>
