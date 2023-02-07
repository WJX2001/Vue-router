<template>
    <div :style="{color: color}" :class="{container: isBig}">{{ title }}</div>

</template>

<script>
    export default {
        name: 'TabHeader',
        props: ['title','color'],
        data: function() {
            return {
                colorful: 'blue',
                isBig: false
            }
        },
        mounted() {
            setTimeout(()=> {
                this.colorful = 'red'
                // this.isBig='true'
            },3000)
        }
    } 
</script>

<style lang="scss" scoped>
.container{
    font-size: 40px;
    font-weight: 700px;
}



</style>