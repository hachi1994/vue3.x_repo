/*
 * @Author: your name
 * @Date: 2020-10-12 14:12:42
 * @LastEditTime: 2020-10-12 14:18:30
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue3.x_repo\vuedemo1\src\hooks\showImg.ts
 */
import { ref } from 'vue'
import axios from 'axios'

function useUrlAxios(url: string) {
    const loading = ref(true)
    const result = ref(null)
    const loaded = ref(false)
    const error = ref(null)
    axios.get(url).then((res) => {
        loading.value = false
        loaded.value = true
        result.value = res.data
    }).catch((e) => {
        error.value = e
        loading.value = false
    })
    return {
        result,
        loading,
        loaded,
        error
    }
}
export default useUrlAxios