//dynamicCategoriesStore
import { defineStore } from 'pinia';
import {CategoryKeys} from "~/types/dynamicCategories";
import {useDynamicStore} from "~/pinia/dynamicStore";

export const useDynamicCategoriesStore = defineStore('dynamicCategoriesStore', {
    state: () => ({
        selectedMoreCategory: 'ALL' as CategoryKeys,
        selectedCategory: 'ALL' as CategoryKeys,
        showMoreTypes: false, // 新增状态
        selectedSubCategory:'全部',
        moreTriangleUpOrDown: 1,
        MOBILE_CATEGORIES:{
            ALL: '全部类型',
            BUSINESS: '工商',
            RISK: '风险',
            OPERATION: '经营',
            TENDER: '招投标',
            NEWS: '新闻',
        },
        CATEGORIES: {
            ALL: '全部类型',
            BUSINESS: '工商',
            RISK: '风险',
            OPERATION: '经营',
            TENDER: '招投标',
            NEWS: '新闻',
            MORE: '更多类型'
        } as Record<CategoryKeys, string>,
        SUB_CATEGORIES: {
            ALL: ['全部'],
            BUSINESS: ['全部', '法定代表人变更', '主要成员变更', '股东变更', '大股东变更', '实际控制人变更', '最终受益人变更', '对外投资变更', '注册资本变更','经营范围变更','企业名称变更','企业地址变更','企业类型变更'],
            RISK: ['全部', '被列入失信被执行人', '被限制高消费', '被限制出境', '被列入被执行人', '新增裁判文书', '新增法院公告-状诉副本及开庭传票','新增法院公告-裁判文书公告', '新增开庭公告', '新增送达公告', '新增股权冻结','股权冻结失效','股权冻结解除', '新增立案','新增诉前调解','新增终本案件','被列入经营异常','股权出质无效','股权出质有效','新增股权出质','被行政处罚','动产抵押','新增担保信息', '严重违法', '被环保处罚','新增税收违法','新增土地抵押','欠税公告','新增简易注销','公示催告','新增股权质押','受到违规处理','新增司法拍卖','新增破产重整','询价评估','新增注销备案','公安通告','票据违约','资产拍卖','新增产品召回','食品抽检不合格','相关产品被禁止入境'],
            OPERATION: ['全部', '融资动态', '企业公告', '抽查检查', '行政许可', '双随机抽查'],
            TENDER: ['全部', '招标公告', '中标结果', '拟建项目', '其他'],
            NEWS: ['全部', '积极', '中立', '消极']
        }
    }),
    getters: {
        // 任何与分类相关的计算属性或方法
        specificCategoryKeys(): CategoryKeys[] {
            // 这是你想要显示的特定分类键
            return ['BUSINESS', 'RISK', 'OPERATION', 'TENDER'];
        },
        pcCategoryKeys():CategoryKeys[] {
            return ['ALL','BUSINESS', 'RISK', 'OPERATION', 'TENDER','NEWS'];
        },
    },
    persist: true,
    actions: {
        // 任何与分类相关的操作或方法
        // 这里只是基于你提供的代码进行修改
        toggleCategory(category: CategoryKeys) {
            console.log('toggleCategory');

            if (this.selectedCategory === category) {
                this.selectedCategory = 'ALL';  // 若已选择该分类，则切换回全部
            } else if(this.selectedCategory === 'MORE'){
                this.showMoreTypes = false;
                this.selectedCategory = category;
            } else {
                this.selectedCategory = category;
            }
            this.selectedSubCategory = '全部';
            this.moreTriangleUpOrDown = 1;
            // const dynamicStore = useDynamicStore();
            // return dynamicStore.getPcDynamicsByCategoryAndSubCategory(
            //     this.CATEGORIES[this.selectedCategory],
            //     this.selectedSubCategory,
            // );
        },
        toggleMoreTypes() { // 更多
            console.log('toggleMoreTypes');

            this.showMoreTypes = !this.showMoreTypes;
            if(this.showMoreTypes){
                this.moreTriangleUpOrDown = 2;
            } else {
                this.moreTriangleUpOrDown = 1;
            }
            this.selectedCategory = 'MORE';
            // const dynamicStore = useDynamicStore();
            // if(this.selectedCategory === 'MORE'){
            //     return dynamicStore.getDynamicsByCategoryAndSubCategory(
            //         this.CATEGORIES[this.selectedMoreCategory],
            //         this.selectedSubCategory,
            //         true,
            //     )
            // }
            // return dynamicStore.getDynamicsByCategoryAndSubCategory(
            //     this.CATEGORIES[this.selectedCategory],
            //     this.selectedSubCategory,
            //     false,
            // );
        },
        toggleMoreCategory(category: CategoryKeys){
            console.log('toggleMoreCategory');

            this.selectedMoreCategory = category;
            this.moreTriangleUpOrDown = 1;
            // const dynamicStore = useDynamicStore();
            // if(this.selectedCategory === 'MORE'){
            //     return dynamicStore.getDynamicsByCategoryAndSubCategory(
            //         this.CATEGORIES[this.selectedMoreCategory],
            //         this.selectedSubCategory,
            //         true,
            //     )
            // }
            // return dynamicStore.getDynamicsByCategoryAndSubCategory(
            //     this.CATEGORIES[this.selectedCategory],
            //     this.selectedSubCategory,
            //     false,
            // );
        },
        // ... 其他方法
        selectSubCategory(subCategory: string) {
            console.log('selectSubCategory');
            this.selectedSubCategory = subCategory;  // 选中子分类
            this.showMoreTypes = false; // 隐藏选择面板
            this.moreTriangleUpOrDown = 1;
            // const dynamicStore = useDynamicStore();
            // dynamicStore.getPcDynamicsByCategoryAndSubCategory(
            //     this.CATEGORIES[this.selectedCategory],
            //     this.selectedSubCategory,
            // );
        },
    }
});
