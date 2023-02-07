<template>
  <div class="container">
    <div style="display:flex">
      <el-input style="width:400px" v-model="city" />
      <el-button @click="getWeather">{{ $t("msg.search") }}</el-button>
    </div>

    <el-table stripe :data="tableData">
      <el-table-column prop="name" :label="$t('msg.whItem')"></el-table-column>
      <el-table-column prop="property" :label="$t('msg.key')"></el-table-column>
      <el-table-column prop="value" :label="$t('msg.current')">
        <template v-slot:default="scope">
          <img :src="imgFormat(scope.row.value)" v-if="scope.row.property === 'img'" />
          <div v-else>{{ scope.row.value }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { http } from "@/utils/http";
const keyMap = {
  img: "天气图片",
  city: "城市",
  cityid: "城市ID",
  citycode: "城市代码",
  date: "日期",
  humidity: "湿度",
  weatehr: '晴',
  temp: '温度',
  pressure:'压力',
  
};
export default {
  name: "MainBody",
  data: function () {
    return {
      tableData: [],
      city: "",
      // 如果以变量的形式传递路径，并且路径在src/asserts下，需要将路径用require包裹
      imgUrl: require('@/assets/weather-img/0.png')

    };
  },
  // mounted() {
  //   this.getWeather();
  // },
  methods: {
    imgFormat(imgNum) {
      return require(`@/assets/weather-img/${imgNum}.png`)
    },
    imgFormatByPublic(imgNum) {
      return '/weather-img/${imgNum}.png'
    },
    view(scope){
      console.log(scope)
      return '啦啦啦'
    },
    async getWeather() {
      // 白名单方式
      const removeKey = [
        "index",
        "aqi",
        "daily",
        "hourly",
        "week",
        
        "temphigh",
        "templow",
      ];
      const { data } = await http.get("/weather/query", {
        params: { city: this.city },
      });
      console.log(data.result);

      const tmp = []
      Object.entries(data.result).forEach(([key, value]) => {
        console.log(key, value);
        if (!removeKey.includes(key)) {
          tmp.push({
            property: key,
            value,
            name: keyMap[key] || "待完成",
          });
        }
      });
      this.tableData = tmp
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
