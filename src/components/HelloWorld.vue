<!--
 * @Author: your name
 * @Date: 2020-09-30 14:59:25
 * @LastEditTime: 2020-10-09 10:26:11
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
    <div>{{ msg }}</div>
    <button @Click="changeTitle">11</button>
    <div>{{ title }}</div>
    <button @click="getNowTime">获取时间</button>
    <div>{{nowTime}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref } from "vue";
import { nowTime, getNowTime } from "../hooks/useNowTime";
interface DataProps {
  girls: string[];
  selectGirl: string;
  selectGirlFun: (index: number) => void;
  deleteGirl: (index: number) => void;
  setName: () => void;
  overText: string;
  overTextAction: () => void;
  name: string;
}
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const data: DataProps = reactive({
      girls: ["1", "2", "3"],
      overText: "title",
      overTextAction() {
        data.overText = data.overText + "123";
        document.title = data.overText;
      },
      name: "lhc",
      selectGirl: "",
      selectGirlFun: function (index: number) {
        data.selectGirl = data.girls[index];
      },
      deleteGirl: function (index: number) {
        data.girls.splice(index, 1);
      },
      setName: function () {
        data.name = data.name === "jhc" ? "lhc" : "jhc";
      },
    });
    const refData = toRefs(data);
    const title = ref("title1111");
    const changeTitle = () => {
      title.value = title.value + "9999";
      document.title = title.value;
    };
    watch([title, () => data.selectGirl,nowTime], (nv, ov) => {
      console.log(nv, ov, 1234);
    });
    return {
      ...refData,
      title,
      changeTitle,
      nowTime,
      getNowTime
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
