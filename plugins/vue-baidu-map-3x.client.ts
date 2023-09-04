//对象语法
import {defineNuxtPlugin, useNuxtApp } from 'nuxt/app';
import BaiduMap from 'vue-baidu-map-3x'
import { serviceContainer } from '~/pinia/feedback/FeedbackServiceContainer';
import { commentFeedbackHandler } from '~/pinia/feedback/handlers/commentFeedbackHandler';
import { commentReplyFeedbackHandler } from '~/pinia/feedback/handlers/commentReplyFeedbackHandler';
import {questionFeedbackHandler} from "~/pinia/feedback/handlers/questionFeedbackHandler";
import {answerFeedbackHandler} from "~/pinia/feedback/handlers/answerFeedbackHandler";
import {complaintFeedbackHandler} from "~/pinia/feedback/handlers/complaintFeedbackHandler";
import {complaintReplyFeedbackHandler} from "~/pinia/feedback/handlers/complaintReplyFeedbackHandler";

export default defineNuxtPlugin({
    name: 'vue-baidu-map-3x',
    enforce: 'post',
    async setup(nuxtApp: { vueApp: { use: (arg0: { install(Vue: any, options?: {} | undefined): void; }, arg1: { ak: string; v: string; }) => void; }; }) {
        nuxtApp.vueApp.use(BaiduMap, {
            ak: 'R3bu7tpSHLZPTwYV2HuLr46YYVEXWNom',
            v: '2.0',  // 默认使用3.0
        });
    },
    hooks: {
        'app:created'() {
            const nuxtApp = useNuxtApp()
            console.log('插件被注册')
            // 在此可以进行一些当应用被创建时的操作，如果有需要的话
            serviceContainer.registerHandler('question', questionFeedbackHandler);
            serviceContainer.registerHandler('commentReply', commentReplyFeedbackHandler);
            serviceContainer.registerHandler('comment', commentFeedbackHandler);
            serviceContainer.registerHandler('answer', answerFeedbackHandler);
            serviceContainer.registerHandler('complaint', complaintFeedbackHandler);
            serviceContainer.registerHandler('complaintReply', complaintReplyFeedbackHandler);
            console.log(serviceContainer);
            console.log(`Handler for 'comment' registered successfully.`);
        }
    }
})
