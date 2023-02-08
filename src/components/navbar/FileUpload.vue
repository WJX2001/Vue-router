<template>
  <div>
    <el-button @click="openInput">选择单文件</el-button>
    <input
      ref="visible"
      class="input-layout"
      type="file"
      @change="getFileInfo($event)"
    />
    <el-button @click="upload">上传</el-button>
    <hr/>
    <el-button @click="openMulti">选择多个文件</el-button>
    <input
      multiple
      ref="multy"
      class="input-layout"
      type="file"
      @change="getMulFile($event)"
    />
    <el-button @click="uploadMulti">点击上传{{ fileList.length }}个文件</el-button>

    <div>
      <el-carousel  v-show="urls.length!==0">
        <el-carousel-item v-for="url in urls" :key="url">
            <img :src="url" />
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <!-- 原生写法 -->
    <!-- <div><img width="120px" height="150px" v-show="urls" :src="urls" /></div> -->
  </div>
</template>

<script>
import { http } from "@/utils/http";

export default {
  name: "FileUpload",

  data: function () {
    return {
      // 是一个file对象，继承自blob
      file: null,
      urls: [],
      fileList: []
    };
  },
  methods: {

    async uploadMulti() {
        const allData = new FormData()
        this.fileList.forEach((file,index) => {
            allData.append(`multi${index}`,file)
        })
        // 一次性上传
        const { data: result } = await http.post("/upload/multi",  /**放file文件 */ allData);
        this.urls = result.data.urls
    },

    openMulti() {
        this.$refs.multy.click()
    },

    getMulFile(event) {
      console.log(event.target.files[0]);
      // array-like object
      // 改变this指向
      Array.prototype.forEach.call(event.target.files,file => 
            this.fileList.push(file))
      console.log(this.fileList)
    },

    openInput() {
      this.$refs.visible.click();
    },
    getFileInfo(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    async upload() {
      // form-data
      // 1.通过input type="file"获取到用户上传的文件信息
      // 2.构造http请求体，FormData刚好满足传输文件 传文件才需要formdata
      const formData = new FormData();
      formData.append("name", "wjx");
      // 此处的key file是后端取文件信息时的key
      formData.append("file", this.file);

      // 3.直接将formdata 防止axios post方法的参数中
      const { data: result } = await http.post(
        "/upload",  /**放file文件 */ formData
      );
      console.log(result.data.netUrl);
      //原始 取图片
      // this.urls = result.data.netUrl;

      // 通过el组件设置图片
      this.urls.push(result.data.netUrl)
    },
  },
};
</script>

<style lang="scss">
.input-layout {
  height: 0;
  width: 0;
}





</style>