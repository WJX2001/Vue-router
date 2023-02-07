<template>
  <div class="container">
     <!-- 解耦的方式取得 -->
    <header><header-cop /></header>
     <!-- 通过路径参数取得 -->
    <!-- <header>{{ $route.params.userId }}</header> -->
    <div class="body">
      <aside>
        <aside-cop></aside-cop>
      </aside> 
      <main>
       <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script>
import AsideCop from '@/components/AsideCop.vue'
import HeaderCop from '@/components/HeaderView.vue';
export default {
  name: 'MainView',
  components: {
    AsideCop,
    HeaderCop
  },
  // vue-router传递 props
  props:['userId'],

  beforeRouteLeave (to, from,next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
  
}
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100%;

  header {
    height: 60px;
    color:white;
    background-color:black;
  }
  

  .body {
    height: calc(100% - 60px);
    display: flex;

    aside {
      width: 264px;
      height: 100%;

    }

    main {
      width: calc(100% - 264px);
      // overflow-y: auto;
    }
  }

  // main {
  //   width: calc(100% - 264px)
  //   height: 
  // }
}
</style>
