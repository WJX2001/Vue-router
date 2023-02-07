<template>
  <div class="container">
    <div class="title">
        
        <h2><span>¶</span><slot></slot></h2>
    </div> 
    <p class="sub-title"><slot name="sub"></slot></p>
    <!-- <slot name="second"></slot> --> 


  </div>
</template>

<script>
export default {
  name: "MainTitle",
};
</script>

<style lang="scss" scoped>

.container {

    .title{
        h2 {
            font-weight: 400;
            font-size: 28px;
            color: #1f2f3d;
            // margin: 10px 0px;
            span {
                opacity: 0;
            }
        }
        h2:hover {
            cursor: pointer;
            span {
                opacity: 0.5;
                margin-right: 5upx;
            }
        }
    }
    .sub-title{
        margin-top: 14px;
        margin-bottom: 14px;
        font-size: 14px;
        color: #5e6d82;
        line-height: 1.5em;
        margin-left: 13px;
    }
}

</style>