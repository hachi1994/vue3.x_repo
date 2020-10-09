/*
 * @Author: your name
 * @Date: 2020-10-09 10:21:45
 * @LastEditTime: 2020-10-09 10:23:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue3.x_repo\vuedemo1\src\hooks\useNowTIme.ts
 */
import { ref } from 'vue';
const nowTime = ref("00:00:00");
const getNowTime = () => {
    const now = new Date();
    const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    const minu =
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    const sec =
        now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    nowTime.value = hour + ":" + minu + ":" + sec;
    setTimeout(getNowTime, 1000)
}
export { nowTime, getNowTime }