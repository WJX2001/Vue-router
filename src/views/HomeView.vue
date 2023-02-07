<template>
  <!-- 0.v-bind -->
  <div class="page">
    <div class="bg-video">
      <video src="../assets/HomeVideo.mp4" autoplay loop></video>
      
    </div>
    <div class="container">
      <!-- <ChildComp></ChildComp> -->
      <div class="desc"></div>
      <div class="login">
        <div class="login-wrapper">
          <el-form :model="form" label-width="80px">
            <el-form-item :label=" $t('msg.name') ">
              <el-input v-model="form.name" placeholder="请输入用户名"  ></el-input>
            </el-form-item>
            <el-form-item :label="$t('msg.email')" >
              <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <el-form-item :label="$t('msg.passwd')">
              <el-input v-model="form.passwd" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
          <div class="operator">
            <el-button  size="small"  @click="login" :disabled="canLogin"
              >{{ $t("msg.login") }}</el-button
            >
            <el-select  style="width:125px" v-model="selectedLang" placeholder="请选择语言" @change="changeLang">
              <!-- 个人写法 -->
              <el-option v-for="(lang, index) in langArr" :label="lang.label" :value="lang.value" :key="index"></el-option>
              <!-- 官方写法 -->
              <!-- <el-option v-for="item in langArr" :label="item.label" :value="item.value" :key="item.value"></el-option> -->
                 <!-- <el-option label="中文站" value="zh"></el-option>
                 <el-option label="英文站 " value="en"></el-option> -->
            
            </el-select>
          </div>
          <div>
            <!-- <el-input v-model="globalData.token"></el-input> -->
            <!-- {{ globalData.token}} -->
          </div>
          <div class="forget">
            <div class="first"><el-button type="text" @click="open1">{{ $t("msg.retrieve_passwd") }}</el-button></div>
            <div class="second"><el-button type="text" @click="open2">{{ $t("msg.rigister") }}</el-button></div>
            <div class="third"><el-button type="text" @click="open3">{{ $t("msg.comment") }}</el-button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/store';
import { state } from '@/store/index.js'
import {http} from '@/utils/http/'

export default {
  // 预定义属性
  name: "HomeView",
  // 组件当中所有的响应式数据
  data: function () {
    return {
      form: {
        name: "",
        email: "",
        passwd: "",
      },
      isShowChild: true,
      pInfo: "这是用来设置默认的input框的值",
      langArr: [
        { label: '中文站', value: 'zh' },
        { label: '英文站', value: 'en' }
      ],
      selectedLang: '',
      globalData: state.store
    }
  },
  mounted() {
    console.log(this.globalData)
    this.globalData.store={
      token: '直接对象',
    }
    // setTimeout(() => this.globalData.commit('token','vuex','HomeView'), 3000);
  },

  computed: {
    canLogin() {
      const {email,name,passwd} = this.form;
      return !(email && name && passwd) ;

      // if (this.form.email && this.form.name && this.form.passwd) {
      //   return false;
      // } else {
      //   return true;
      // }
    },
  },

  // 方法
  methods: {
    // TODO: 更改国际化语言
    changeLang(lang) {
      // console.log(this.$i18n.locale, this.$root.$i18n.locale)
      // 可以更新根语言环境
      this.$root.$i18n.locale = lang

      // 不会更新根语言环境，只会对当前组件有效
      // this.$i18n.locale = lang
      // TODO: 更改国际化语言
    },

    async login() {
      
      // 提供isAuthenticated
      // TODO: 网络请求
      // 此时并不能成功，因为此时存在跨域问题，需要通过vue的proxy解决
      const result = await http.post('/login', {username: this.form.name, password: this.form.passwd})
      const data = result.data;
      if (data.success) {
        const token = data.data.token
        sessionStorage.setItem('token', token)
        this.$router.push({ path: `main/${this.form.name}`, query: { email: this.form.email } })
      } else {
        this.$message('失败')
      }
      console.log(result)


      // const token = await getToken()

      // sessionStorage.setItem('token',token)
      // this.$router.push({
      //   // TODO: 跳转至主页面
      //   path: `main/${this.form.name}`,
      //   // 提供isAuthenticated
      //   query: { email: this.form.email },
      // });
      // // router.push({path: 'about'})
      
    },
    open1() {
        this.$alert('丢了就别找了',  {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
            //  message: `action: ${ action }`
            message: '下次小心点'
            });
          }
        });
      },

      open2() {
        this.$alert('我还没做好呢',  {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              // message: `action: ${ action }`
              message: '此功能暂不支持'
            });
          }
        });
      },

      open3() {
        this.$alert('不准提意见',  {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              // message: `action: ${ action }`
              message: '此功能暂不支持'
            });
          }
        });
      }

  },
};
</script>


<style lang="scss" scoped>
/**
使用了scoped关键字，当前样式只应用于此组件以及子组件，不会影响父组件
*/

.container {
  display: flex;
}

.operator {
  display: flex;
  justify-content: center;
  .el-button{
          background-color: #09f;
          color: #fff;
        }
}

.desc {
  width: 60%;
}

.login {
  padding-top: 134px;

  .login-wrapper {
    background-color: #fff;
    width: 300px;
    padding: 40px;
    border-radius: 10px;

    .forget{
      height: 16px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      padding-top: 15px;
      .el-button{
          font-size: 12px;
        }
      .first{
        width: 48px;
        height: 13.6px;
        display: flex;
        justify-content: center;
        align-items: center;
        
      }
      .first:hover{
        cursor: pointer;
      }
      .second{
        width: 48px;
        height: 13.6px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .second:hover{
        cursor: pointer;
      }
      .third{
        width: 48px;
        height: 13.6px;
        
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .third:hover{
        cursor: pointer;
      }
    }
  }
}

.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  
  video {
    width: 100%;
  }
}
</style>
