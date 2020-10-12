<!--
 * @Author: your name
 * @Date: 2020-09-30 14:59:25
 * @LastEditTime: 2020-10-12 14:10:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.x_repo\vuedemo1\src\App.vue
-->
<template>
  <div>
    <ShowImg/>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <h1 v-on:click="text">4444</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import ShowImg from './components/ShowImg.vue'
export default defineComponent({
  name: "App",
  methods: {
    text(): number {
      let ratio = 0
      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
      } else if (
        window.outerWidth !== undefined &&
        window.innerWidth !== undefined
      ) {
        ratio = window.outerWidth / window.innerWidth;
      }

      if (ratio) {
        ratio = Math.round(ratio * 100);
      }
      console.log(ratio,14);
      return ratio;
    },
  },
  components: {
    HelloWorld,
    ShowImg
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
