 <template>
  <div>
    <el-input v-model="aimValue"></el-input>
    <el-button @click="change">点我变更状态</el-button>
    <div>{{ $store.state.sentence }}</div>
    <img v-for="(url,index) in imgUrls" :src="url" :key="index" />
    <!-- <div>这是通过mapstate实现的：{{ sentence }}</div> -->
    <file-upload></file-upload>
  </div>
</template>

 <script>
 import { mapGetters,mapMutations, mapState } from 'vuex'; 
import FileUpload from './FileUpload.vue';
 

export default {
    name: "DataTab",
    components: {
      FileUpload
    },
    data: function () {
        return {
            aimValue: ""
        };
    },
    computed: {
        ...mapState(["sentence"]),
        ...mapGetters(["imgUrls"]),
    },
    // computed: {
    //   imgUrls: function() {
    //     return this.$store.state.imgArr.map((imgInt) =>{
    //         return  require(`@/assets/weather-img/${imgInt}.png`)
    //     })
    //   }
    // },
    methods: {
        // 解构写法
        ...mapMutations(["changeSentence"]),
        change() {
            // mutation中的函数需要commit调用，带上payload
            // this.$store.commit('changeSentence',{name: this.aimValue})
            // 解构写法
            this.changeSentence({ name: this.aimValue });
            this.$store.dispatch("asyncUpdate");
            // console.log(this.imgUrls) 
            // console.log(mapGetters(['imgUrls'])) 
        }
    },
    components: { FileUpload }
};
</script>