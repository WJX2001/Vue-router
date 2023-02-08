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
    <el-button @click="uploadMultiSeq">点击上传{{ fileList.length }}个文件</el-button>

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
    // 并行化传输   两个请求没有依赖关系时，应该尽可能快的发起
    async uploadMultiTogether() {
      // 没办法直到哪个请求最后完成
      // this.fileList.forEach(async (file) => {
      //   const data = new FormData()
      //   data.append('file',file)
      //   const {data: result} = await http.post("/upload",  /**放file文件 */ data);
      //   this.urls.push(result.data.netUrl)
      // })
      // promise.all
      
        const asyncTask = []
        this.fileList.forEach((file) => {
            const data = new FormData()
            data.append('file',file)

            // 此时的task就是一个promise,如果想取到后面的结果需要 .then
            // 而await是通过语法糖的形式直接拿到后面的参数 赋值给前面的变量
            const task = http.post("/upload",  /**放file文件 */ data)
            asyncTask.push(task)
        })

        // 并发传输由于找不到适合的时机 找到一个同时结束的时间点，所以用Promise.all
        const result = await Promise.all(asyncTask)
        console.log(result)
        // 每一个arr对应着 http的post请求后的task的返回值
        // Promise.all(asyncTask).then((arr) => {

        // })
          


      // 同时拿到两个netUrl
    },

    // 序列化上传
    async uploadMultiSeq() {
      for(let i=0;i<this.fileList.length;i++) {
        const data = new FormData()
        data.append('file',this.fileList[i])
        const {data:result} = await http.post("/upload",  /**放file文件 */ data);
        this.urls.push(result.data.netUrl)
        console.log(result)
      }
    },
    
    // 多文件一次性上传
    async uploadMulti() {
        const allData = new FormData()
        this.fileList.forEach((file,index) => {
            allData.append(`multi${index}`,file)
        })
        
        const { data: result } = await http.post("/upload/multi",  /**放file文件 */ allData);
        this.urls = result.data.urls
        console.log(result)
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