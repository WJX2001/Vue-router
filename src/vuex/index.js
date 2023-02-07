import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// vuex的初始化

const stateIns = {
    sentence: '小用一下vuex🤣🤣🤣🤣🤣',
    imgArr: [0, 1, 2, 3, 4]

}

const obj = {
    // state: {
    //     // 全局状态变量
    //     sentence: '小用一下vuex🤣🤣🤣🤣🤣',
    //     imgArr: [0, 1, 2, 3, 4]
    // },
    // 通过拆分方式讲state 拆分
    state: stateIns,

    mutations: {
        // 第一个参数式state变量，第二个参数是playload
        changeSentence(state, payload) {
            state.sentence = payload.name
            console.log(payload)
        }
    },
    // 类比计算属性 
    getters: {
        imgUrls: (state) => {
            return state.imgArr.map((imgInt) => require(`@/assets/weather-img/${imgInt}.png`)

            )
        }
    },
    actions: {
        asyncUpdate(state) {
            console.log(state)
        }
    }
}

const obj2 = {

}
// 1.只使用一个状态变量，分理处state，mutation,action,getter
// 2.通过module机制，分理出多个状态
// 3.混合使用两种方法
const vuexStore = new Vuex.Store(obj)

// const vuexStore = new Vuex.Store({
//     modules: {
//         a: obj,
//         b: obj2
//     }
// })
export {
    vuexStore
}