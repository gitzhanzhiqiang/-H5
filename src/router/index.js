import Vue from 'vue'
import Router from 'vue-router'
import APP from '../App';
import index from '@/web/index/index.js';
import index1 from '@/web/index/index.vue';
import debt from '@/web/debt';
import my from '@/web/my';
Vue.use(Router)
const defaultRoute = {
    path: '/',
    component: APP,
    children: [
        debt,
        index,
        my
    ]
};
export default new Router({ //路由懒加载 
    // mode: 'history', //去掉# //需后台配合 nginx
    routes: [{
            path: '/index',
            name: 'index',
            component: index1,
            meta: {
                title: '推荐'
            }
        },
        {
            path: '/',
            redirect: '/index' //重定向
        },
        defaultRoute
    ],
    scrollBehavior(to, from, savedPosition) { //第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
        if (savedPosition) { //前进后退按钮  保持原样
            return savedPosition;
        } else {
            return { x: 0, y: 0 } //跳转   回顶部
        }
    }
})