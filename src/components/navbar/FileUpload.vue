<template>
    <div>
        <el-button @click="openInput">选择文件</el-button>
        <el-button @click="upload">上传</el-button>
        <div><input ref="visible" class="input-layout" type="file" @change="getFileInfo($event)"/></div>
        
    </div>
</template>

<script>
import {http} from '@/utils/http'

export default {
    name: "FileUpload",

    data: function() {
        return {
            // 是一个file对象，继承自blob
            file:null
        }

    },
    methods: {
        openInput() {
            this.$refs.visible.click()
        },
        getFileInfo(event){
            this.file = event.target.files[0]
            console.log(this.file)
        },
        async upload() {
            // form-data
            // 1.通过input type="file"获取到用户上传的文件信息
            // 2.构造http请求体，FormData刚好满足传输文件 传文件才需要formdata
            const formData = new FormData()
            formData.append('name','wjx')
            // 此处的key file是后端取文件信息时的key
            formData.append('file',this.file)

            // 3.直接将formdata 防止axios post方法的参数中
           const result = await http.post('/upload',/**放file文件 */formData)
           console.log(result)
        }

    }
}


</script>

<style lang="scss">
.input-layout {
    height: 0;
    width: 0;
}
</style>