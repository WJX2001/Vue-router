<template>
  <div class="header-container">
    <div class="logo">
      <img class="img1"
        src="https://ei.phncdn.com/www-static/images/pornhub_logo_straight.svg?cache=2022121401"
      />
    </div>
    <div class="tianchong"></div>


    
    <div class="content">
      
      <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#000"
  text-color="#fff"
  active-text-color="#ff9000">
  <el-menu-item index="1" >发现</el-menu-item>
  <el-submenu index="2">
    <template slot="title">图片及动图</template>
    <el-menu-item index="2-1">评价最好的图</el-menu-item>
    <el-menu-item index="2-2">浏览最多的图</el-menu-item>
    <el-menu-item index="2-3">制作自己的动图</el-menu-item>
   </el-submenu>
  <el-submenu index="3">
    <template slot="title">视频</template>
    <el-menu-item index="3-1">推荐视频</el-menu-item>
    <el-menu-item index="3-2">最热门</el-menu-item>
    <el-menu-item index="3-3">最多次观看</el-menu-item>
  </el-submenu>
  <el-submenu index="4">
      <template slot="title">分类</template>
      <el-menu-item index="4-1">动画片</el-menu-item>
      <el-menu-item index="4-2">动作片</el-menu-item>
      <el-menu-item index="4-3">爱情片</el-menu-item>
    </el-submenu>
  <el-menu-item index="5" >社区动态</el-menu-item>
  
</el-menu>

    </div>
    <div class="info">
      <el-tooltip  effect="dark" :content="email" placement="bottom-end">
        <div><i class="el-icon-user-solid"></i></div>
      </el-tooltip>
      

    </div>
  </div>
</template>


<script>
export default {
  name: "HeaderView",
  data: function() {
    return  {
        email: '',
        activeIndex: '1',
        activeIndex2: '1'
    }
  },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
  mounted() {
    this.email = this.$route.query.email;
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  widows: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  div {
    height: 100%;
  }

  .logo {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content{
    flex-grow: 1;
    display: flex;
    // justify-content: center;
    // align-items: center;
  }
  .tianchong {
    width: 70px;
  }

  .info {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;

    div {
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .info:hover{
    cursor: pointer;
  }


}
</style>