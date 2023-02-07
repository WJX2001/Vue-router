<template>
    <div ref="default" class="default">    
        <div ref="top">

            <main-title>
                {{ $t("msg.todayWh") }}
                store: {{ globalData.token }}
                <template v-slot:sub>
                    
                    <cite>
                        {{ $t("msg.subMsg") }}
                    </cite>
                </template>
            </main-title>
            <!-- <tab-header :title="msg" color="red"/>
            <tab-header title="这是第二个父亲传递的" color="green"/> -->
        </div>
        <div class="body">

            <main-body></main-body>






            <!-- <tab-body>
                 正常写法
                <template v-slot:header="fromSlot">
                    <h1>{{ fromSlot.user.name }}</h1>
                </template>

                结构写法
                <template v-slot:header="{ user }">
                    <h1>{{ user.name }}</h1>
                </template>
            </tab-body> -->
        </div>
        <div v-show="needTopBtn" class="back"><el-button type="primary" @click="returnTop">回到顶部</el-button></div>
    </div>
</template>
<script>
import TabHeader from './TabHeader.vue';
import TabBody from './TabBody.vue';
import MainTitle from './MainTitle.vue';
import MainBody from './MainBody.vue';
import { state } from '@/store/index';

export default {
    name: 'DefaultTab', 
    components: {
        TabHeader,
        TabBody,
        MainTitle,
        MainBody
    },
    data: function() {
        return {
            needTopBtn: false,
            msg: '这是绑定在slot当中的父组件的变量',
            globalData: state,
        }
    },
    mounted() {
        // 原生的事件绑定
        this.$refs.default.addEventListener('scroll',this.setButton)
        // this.$refs.default.onscroll = this.setButton
    },
    methods: {
        returnTop() {
            this.$refs.top.scrollIntoView(true,{
                behavior: 'smooth'
            });
            
        },
        setButton() {
            // 可优化
        //     if(this.$refs.default.scrollTo > 0){
        //         this.needTopBtn = true
        //     }else{
        //         this.needTopBtn = false;
        //     }
        // }
        // 和上面的逻辑等价
        this.needTopBtn = this.$refs.default.scrollTop > 0;
    }
}
}
    
</script>

<style lang="scss" scoped>   

.back {
    position: fixed;
    right: 40px;
    bottom: 40px;
}
.default{
    height: 100%;
    overflow-y: auto;
    padding: 0 20px;
}



</style>