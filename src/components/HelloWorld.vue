<!--
 * @Author: your name
 * @Date: 2020-09-30 14:59:25
 * @LastEditTime: 2020-09-30 16:07:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.x_repo\vuedemo1\src\components\HelloWorld.vue
-->
<template>
  <div>
    <div
      @Click="selectGirlFun(index)"
      v-for="(item, index) in girls"
      v-bind:key="index"
    >
      {{ item }}
    </div>
    <div>你选择了【{{ selectGirl }}】为你服务</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
interface DataProps {
  girls: string[];
  selectGirl: string;
  selectGirlFun: (index: number) => void;
}
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const data: DataProps = reactive({
      girls: ["1", "2", "3"],
      selectGirl: "",
      selectGirlFun: function (index: number) {
        data.selectGirl = data.girls[index];
      },
    });
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
