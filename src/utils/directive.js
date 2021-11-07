/**
 * 自定义指令
 * 
 * */ 

export default {
    install(app){
        // 自动获取焦点
        app.directive('focus', {
            inserted(e) {
                e.focus()
            }
        })
        // app.directive('xxxx', {})
    }
}