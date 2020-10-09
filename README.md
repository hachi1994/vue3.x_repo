<!--
 * @Author: your name
 * @Date: 2020-09-30 15:00:06
 * @LastEditTime: 2020-10-09 10:56:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3.x_repo\vuedemo1\README.md
-->
# Vue 3.x & typeScript 自学

## setup() 和 fef()
<p>
setup() setup 这个函数是在beforeCreate和created之前运行的,所以你可以用它来代替这两个钩子函数。
</p>
<p>ref可以让我们在template中使用我们定义得变量，定义好变量需要在setup中返回。</p>

```
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const girls = ref(["大脚", "刘英", "晓红"]);
    //定义一个变量
    const selectGirl = ref("");
    //绑定方法，改变变量的值
    const selectGirlFun = (index: number) => {
      selectGirl.value = girls.value[index];
    };
    return {
      girls
    };
  },
});
```
<p>在页面中使用</p>
```
<button
      v-for="(item, index) in girls"
      v-bind:key="index"
      @click="selectGirlFun(index)"
    >
      {{ index }} : {{ item }}
    </button>
  </div>
  <div>你选择了【{{ selectGirl }}】</div>
```
<p>总结:</p>
<p>
    <ol>
        <li>setup 函数的用法，可以代替 Vue2 中的 date 和 methods 属性，直接把逻辑卸载 setup 里就可以</li>
        <li>ref 函数的使用，它是一个神奇的函数，我们这节只是初次相遇，要在template中使用的变量，必须用ref包装一下。</li>
        <li>return出去的数据和方法，在模板中才可以使用，这样可以精准的控制暴漏的变量和方法。</li>
    </ol>
</p>
### reactive 对代码进行优化
<p>
使用reactive对返回的值进行包装之后，只需要返回一个data即可，也不需要使用.value来获取变量的值了。
</p>
```
import { ref, reactive } from "vue";
export default {
  name: "App",
  setup() {
    const data = reactive({
      girls: ["大脚", "刘英", "晓红"],
      selectGirl: "",
      selectGirlFun: (index: number) => {
        data.selectGirl = data.girls[index];
      },
    });

    return {
      data,
    };
  },
};
<template>
  <div>
    <button
      v-for="(item, index) in data.girls"
      v-bind:key="index"
      @click="data.selectGirlFun(index)"
    >
      {{ index }} : {{ item }}
    </button>
  </div>
  <div>你选择了【{{ data.selectGirl }}】</div>
</template>
```

### 使用toRefs继续优化代码
<p>之前代码中还需要使用data. 来获取变量的值，如果不想通过.value获取，则要使用toRefs来</p>
```
<script lang="ts">

import { reactive, toRefs } from "vue";
interface DataProps {
  girls: string[];
  selectGirl: string;
  selectGirlFun: (index: number) => void;
}
const data: DataProps = reactive({
      girls: ["大脚", "刘英", "晓红"],
      selectGirl: "",
      selectGirlFun: (index: number) => {
        data.selectGirl = data.girls[index];
      },
    });
    const refData = toRefs(data);

    return {
      ...refData,
    };
    </script>

    
<template>
  <div>
    <button
      v-for="(item, index) in girls"
      v-bind:key="index"
      @click="selectGirlFun(index)"
    >
      {{ index }} : {{ item }}
    </button>
  </div>
  <div>你选择了【{{ selectGirl }}】</div>
</template>
```

### 生命周期、
<ul>
        <li>setup() :开始创建组件之前，在beforeCreate和created之前执行。创建的是data和method</li>
        <li>onBeforeMount() : 组件挂载到节点上之前执行的函数。</li>
        <li>onMounted() : 组件挂载完成后执行的函数。</li>
        <li>onBeforeUpdate(): 组件更新之前执行的函数。</li>
        <li>onUpdated(): 组件更新完成之后执行的函数。</li>
        <li>onBeforeUnmount(): 组件卸载之前执行的函数。 </li>
        <li>onUnmounted(): 组件卸载完成后执行的函数</li>
        <li>onActivated(): 被包含在<keep-alive>中的组件，会多出两个生命周期钩子函数。被激活时执行。</li>
        <li>onDeactivated(): 比如从 A 组件，切换到 B 组件，A 组件消失时执行。</li>
        <li>onErrorCaptured(): 当捕获一个来自子孙组件的异常时激活钩子函数。</li>
    </ul>
    <p>
        生命周期要卸载setup方法中
    </p>
```
<script lang="ts">

//....
const app = {
  name: "App",
  setup() {
    console.log("1-开始创建组件-----setup()");
    const data: DataProps = reactive({
      girls: ["1","2","3"],
      selectGirl: "",
      selectGirlFun: (index: number) => {
        data.selectGirl = data.girls[index];
      },
    });
    onBeforeMount(() => {
      console.log("2-组件挂载到页面之前执行-----onBeforeMount()");
    });

    onMounted(() => {
      console.log("3-组件挂载到页面之后执行-----onMounted()");
    });
    onBeforeUpdate(() => {
      console.log("4-组件更新之前-----onBeforeUpdate()");
    });

    onUpdated(() => {
      console.log("5-组件更新之后-----onUpdated()");
    });

    const refData = toRefs(data);

    return {
      ...refData,
    };
  },
};
export default app;
</script>
```

### onRenderTracked和onRenderTriggered
<p>这两个方法都是用于对组件进行状态跟踪，onRenderTracked是跟踪全部状态，onRenderTriggered只跟踪变化的值</p>   

### watch
<p>watch只能监听ref的值，不能直接监听reactive包装得值,如果要监听reactive里的值，需要在watch里通过函数返回一个值。</p>   
```
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref } from "vue";
interface DataProps {
  name: string;
  selectGirl: string;
}
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const data: DataProps = reactive({
      name:"123",
      selectGirl: "123"
    });
    const refData = toRefs(data);
    const title = ref("title1111");
    const changeTitle = () => {
      title.value = title.value + "9999";
      document.title = title.value;
    };
    watch([title, () => data.selectGirl], (nv, ov) => {
      console.log(nv, ov, 1234);
    });
    return {
      ...refData,
      title,
      changeTitle,
    };
  },

  props: {
    msg: String,
  },
});
</script>

```

### Vue 3.x 模块

<p>可以在src目录下，新建一个文件夹hooks(所有抽离出来的功能模块都可以放到这个文件夹里)，然后再新建一个文件useNowTime.ts,这里使用use开头是一个使用习惯，代表是一个抽离出来的模块。</p>

```
//定义的模块
<script lang="ts">
import { ref } from "vue";

const nowTime = ref("00:00:00");
const getNowTime = () => {
    const now = new Date();
    const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    const minu =
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    const sec =
        now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    nowTime.value = hour + ":" + minu + ":" + sec;

    setTimeout(getNowTime, 1000);
};

export { nowTime, getNowTime }
<script lang="ts">

//在.vue文件中引入
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref } from "vue";
import { nowTime, getNowTime } from "../hooks/useNowTime";
interface DataProps {

}
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const data: DataProps = reactive({
      
    });
    watch([nowTime], (nv, ov) => {
      console.log(nv, ov, 1234);
    });
    return {
      ...refData,
      nowTime,
      getNowTime
    };
  },

  props: {
    msg: String,
  },
});
</script>

//模板
<template>
<button @click="getNowTime">获取时间</button>
<div>{{nowTime}}</div>
</template>
```