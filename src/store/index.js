
const store = Symbol('store')


const state = {

    store: {
        token: '1234567'
    },

    commit(key,value,compName) {
        console.log(compName,key,value) // 标准输出，输出到文件中
        // 使用symbol修改变量，vue2中的响应式丢失了
        this.store[key] = value
    },

    gettter(key) {
        return this.store[key]
    }
    
}


// state.commit('token',123213,'dada')

// 方案一
// 不让用户修改token，提供方法让用户使用
// 在方法中记录修改的日志
export {state};