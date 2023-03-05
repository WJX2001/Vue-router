<template>
  <div class="aside-content">
    <el-menu :default-active="activeFlag" @select="active">
      <el-menu-item index="0">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("msg.index") }}</span>
      </el-menu-item>
      <el-menu-item index="1">
        <i class="el-icon-document"></i>
        <span slot="title">{{ $t("msg.dataMg") }}</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-menu>
    
    <div class="aside-footer">@Chrisjx 2023</div>
  </div>
</template>




<script>


export default {
  name: "AsideCop",
  data: function () {
    return {
      activeFlag: "0",
      routeMap: new Map()
    };
  },

  mounted() {
    // console.log('导航栏',this.$route.params)
    const pathVal = this.$route.params.userId;
    this.routeMap.set('0',`/main/${pathVal}/default`)
    this.routeMap.set('1',`/main/${pathVal}/data`)
    this.routeMap.set('2',`/main/${pathVal}/user`)
  },
  methods: {
    active(index) {
      this.activeFlag = index;

      if (this.routeMap.has(index)) {
        // 防止目标url与当前url相同时，push出错
        const aimUrl = this.routeMap.get(index);
        const currentUrl = this.$router.currentRoute.fullPath;
        //console.log(currentUrl+'我在这呢')
        if (aimUrl !== currentUrl) {
          this.$router.push(aimUrl);
        }
      }
    },
  },
};
</script>


<style lang="scss" scoped>

.aside-content {
    height: calc(100% - 60px);

    ul {
        overflow-y: auto;
        height: 100%;
        padding-bottom: 60px;
      }
}


.aside-footer {
    position: fixed;
    width: 264px;
    height: 60px;
    // background-color: aqua;
    left: 0;
    bottom: 0;
    border-top: 1px solid #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    
}


</style>