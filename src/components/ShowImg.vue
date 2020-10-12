<!--
 * @Author: your name
 * @Date: 2020-10-12 13:47:08
 * @LastEditTime: 2020-10-12 14:33:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.x_repo\vuedemo1\src\components\ShowImg.vue
-->
<template>
  <div>
    显示图片
    <button @Click="getImg">1122</button>
    <img width="200" v-if="loaded" :src="result.message" />
  </div>
</template>
<script lang="ts">
import { defineComponent} from "vue";
import useUrlAxios from "../hooks/showImg";
export default defineComponent({
  name: "ShowImg",
  setup() {
    const { result, loading, loaded } = useUrlAxios(
      "https://dog.ceo/api/breeds/image/random"
    );

    return { result, loading, loaded };
  },
});
</script>