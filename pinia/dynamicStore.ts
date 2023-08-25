// dynamicStore.ts
import { defineStore } from 'pinia';
import { DynamicStore } from '@/types/dynamicStore';
import {Dynamic} from "~/types/dynamicType";

export const useDynamicStore = defineStore('dynamicStore', {
    state: () => {
        return {
            dynamics : [
                {
                    level: "利好",
                    type: "中标结果",
                    content: "[终结公告]广东广物木材产业股份有限公司713.99万股",
                    updateTime: "2022-12-16",
                },
                {
                    level: "警示",
                    type: "新增开庭公告",
                    content: "开庭时间：2022-10-11",
                    updateTime: "2022-11-21",
                },
                {
                    level: "提示",
                    type: "新增企业公告",
                    content: "公告名称：[临时公告]广物木材:董事、监事换届公告<br/> 公告日期：2022-09-18<br/> 公告名称：[临时公告]广物木材:监事换届公告<br/>  公告日期：2022-09-18",
                    updateTime: "2022-11-21",
                },
                {
                    level: "提示",
                    type: "新增企业公告",
                    content: "公告名称：[临时公告]广物木材:董事、监事换届公告<br/> 公告日期：2022-09-18<br/> 公告名称：[临时公告]广物木材:监事换届公告<br/>  公告日期：2022-09-18",
                    updateTime: "2022-11-21",
                },
                {
                    level: "高风险",
                    type: "被列入严重执法",
                    content: "列入原因: 未依照《企业信息公示暂行条例》第八条规定的期限公示年度报告<br/>列入日期: 2021-06-11",
                    updateTime: "2022-11-21",
                }
            ],
        }
    },

    //方法
    actions: {
        // 设置动态的方法
        setDynamics(dynamics: any) {
            this.dynamics = dynamics;
        },
        addDynamic(this: DynamicStore, dynamic: Dynamic) {
            this.dynamics.unshift(dynamic);
        },
        getDynamic(this: DynamicStore, index: number | string){
            return this.dynamics[index];
        },
    },
});
