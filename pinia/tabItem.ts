// tabItemStore.ts
import { defineStore } from 'pinia';

export const useTabItemStore = defineStore('tabItemStore', {
    state: () => {
        return {
            tabItem: 0,
        }
    },
    persist: true,
    //计算
    getters: {},

    //方法
    actions: {
        //这里放登录的异步请求逻辑
    },
});
