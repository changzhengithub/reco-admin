import { createStore } from 'vuex'
// import storage from 'store'
// import { SET_TOKEN, SET_INFO } from './mutation-types'

export default createStore({
    state: {
        token: '', // token
        info: {}, // 用户信息
    },
    mutations: {
        setToken (state, token) {
            state.token = token
        },
        setInfo (state, info) {
            state.info = info
        },
        
    },
    actions: {

    },
    modules: {
    }
})
