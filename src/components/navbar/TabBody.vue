<template>
<div>
    <!-- 匿名插槽，默认插槽 -->
    <slot></slot>
    <!-- 具名插槽 -->
    <div class="header">
        <!-- <slot name="header" :user="user"> 
            {{ user.name }}
        </slot> -->
    </div>
    
</div>

</template>

<script>
export default{
    name: 'TabBody',
    data: function() {
        return {
            user: {
                name: '告警消息'
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.header {
    color: red;
}

</style>

