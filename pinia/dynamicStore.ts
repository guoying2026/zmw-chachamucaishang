// dynamicStore.ts
import { defineStore } from 'pinia';
import { DynamicStore } from '@/types/dynamicStore';
import {Dynamic} from "~/types/dynamicType";
import {CategoryKeys} from "~/types/dynamicCategories";

export const useDynamicStore = defineStore('dynamicStore', {
    state: () => {
        return {
            dynamics : [
                {
                    id: 1,
                    category: "招投标",
                    subCategory: "中标结果",
                    level: "利好",
                    content: "[终结公告]广东广物木材产业股份有限公司713.99万股",
                    updateTime: "2022-12-16",
                },
                {
                    id: 2,
                    category: "风险",
                    subCategory: "新增开庭公告",
                    level: "警示",
                    content: "开庭时间：2022-10-11",
                    updateTime: "2022-11-21",
                },
                {
                    id: 3,
                    category: "经营",
                    subCategory: '新增企业公告',
                    level: "提示",
                    content: "公告名称：[临时公告]广物木材:董事、监事换届公告<br/> 公告日期：2022-09-18<br/> 公告名称：[临时公告]广物木材:监事换届公告<br/>  公告日期：2022-09-18",
                    updateTime: "2022-11-21",
                },
                {
                    id: 4,
                    category: '经营',
                    subCategory: '新增企业公告',
                    level: "提示",
                    content: "公告名称：[临时公告]广物木材:董事、监事换届公告<br/> 公告日期：2022-09-18<br/> 公告名称：[临时公告]广物木材:监事换届公告<br/>  公告日期：2022-09-18",
                    updateTime: "2022-11-21",
                },
                {
                    id: 5,
                    category: '风险',
                    subCategory: "被列入严重执法",
                    level: "高风险",
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
        // 根据分类和子分类筛选动态
        getDynamicsByCategoryAndSubCategory(category: string, subCategory: string,isMore: Boolean) {
            console.log(category);
            console.log(this.dynamics)
            if(category === '全部'){
                return this.dynamics;
            } else if(category === '全部类型'){
                return this.dynamics;
            } else if(!isMore){
                return this.dynamics.filter(dynamic =>
                    dynamic.category === category
                );
            } else if(isMore){
                if(subCategory === '全部'){
                    return this.dynamics.filter(dynamic =>
                        dynamic.category === category
                    );
                } else {
                    return this.dynamics.filter(dynamic =>
                        dynamic.category === category && dynamic.subCategory === subCategory
                    );
                }
            }
        },
        getPcDynamicsByCategoryAndSubCategory(category: string, subCategory: string){
            if(category === '全部'){
                return this.dynamics;
            } else if(category === '全部类型'){
                return this.dynamics;
            } else{
                if(subCategory === '全部'){
                    return this.dynamics.filter(dynamic =>
                        dynamic.category === category
                    );
                } else {
                    return this.dynamics.filter(dynamic =>
                        dynamic.category === category && dynamic.subCategory === subCategory
                    );
                }
            }
        }
    },
});
