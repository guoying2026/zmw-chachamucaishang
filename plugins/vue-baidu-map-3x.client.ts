// import BaiduMap from 'vue-baidu-map-3x'
//
// export default defineNuxtPlugin((nuxtApp) => {
//     nuxtApp.vueApp.use(BaiduMap, {
//         ak: 'R3bu7tpSHLZPTwYV2HuLr46YYVEXWNom',
//         v: '2.0',  // 默认使用3.0
//     })
// })
//对象语法
import BaiduMap from 'vue-baidu-map-3x'

export default defineNuxtPlugin({
    name: 'vue-baidu-map-3x',
    enforce: 'post',
    async setup(nuxtApp) {
        nuxtApp.vueApp.use(BaiduMap, {
            ak: 'R3bu7tpSHLZPTwYV2HuLr46YYVEXWNom',
            v: '2.0',  // 默认使用3.0
        });
    },
    hooks: {
        'app:created'() {
            const nuxtApp = useNuxtApp()
            // 在此可以进行一些当应用被创建时的操作，如果有需要的话
        }
    }
})

