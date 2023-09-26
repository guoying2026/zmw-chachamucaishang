// dynamicStore.ts
import { defineStore } from 'pinia';
import { DynamicStore } from '@/types/dynamicStore';
import {Dynamic} from "~/types/dynamicType";
import {CategoryKeys} from "~/types/dynamicCategories";

export const useDynamicStore = defineStore('dynamicStore', {
    state: () => {
        return {
            dynamics: [] as Dynamic[],
            // filteredDynamics: [] as Dynamic[],
        }
    },

    //方法
    actions: {
        // 设置动态的方法
        setDynamics(dynamics: Dynamic []) {
            this.dynamics = dynamics;
            // this.filteredDynamics = dynamics;
        },
        addDynamic(this: DynamicStore, dynamic: Dynamic) {
            this.dynamics.unshift(dynamic);
        },
        getDynamic(this: DynamicStore, index: number){
            return this.dynamics[index];
        },
        // 根据分类和子分类筛选动态
        // getDynamicsByCategoryAndSubCategory(category: string, subCategory: string, isMore: Boolean) {
        //     console.log('mobile');
        //     console.log(category);
        //     console.log(subCategory);
        //     if (category === '全部' || category === '全部类型') {
        //         this.filteredDynamics = this.dynamics;
        //         return;
        //     }
        //     if (!isMore) {
        //         this.filteredDynamics = this.dynamics.filter(dynamic =>
        //             dynamic.category === category
        //         );
        //     } else {
        //         if (subCategory === '全部') {
        //             this.filteredDynamics = this.dynamics.filter(dynamic =>
        //                 dynamic.category === category
        //             );
        //         } else {
        //             this.filteredDynamics = this.dynamics.filter(dynamic =>
        //                 dynamic.category === category && dynamic.subCategory === subCategory
        //             );
        //         }
        //     }
        // },
        // getPcDynamicsByCategoryAndSubCategory(category: string, subCategory: string){
        //     console.log('pc');
        //     console.log(category);
        //     console.log(subCategory);
        //     if(category === '全部' || category === '全部类型'){
        //         this.filteredDynamics = this.dynamics;
        //         console.log(this.filteredDynamics);
        //         return
        //     } else if(subCategory === '全部' || !subCategory){
        //         this.filteredDynamics = this.dynamics.filter(dynamic => dynamic.category === category);
        //         console.log(this.filteredDynamics);
        //     } else {
        //         this.filteredDynamics = this.dynamics.filter(dynamic =>
        //             dynamic.category === category && dynamic.subCategory === subCategory
        //         );
        //         console.log(this.filteredDynamics);
        //     }
        // }
    },
});
