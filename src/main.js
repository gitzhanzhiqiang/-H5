import 'babel-polyfill'; //开发环境显示  360和ie
import App from './App'
import Vuex from 'vuex';
import Vue from 'vue';
import router from './router';
import store from './store';
import * as filters from './filters/index.js'
import '@/assets/scss/reset.scss'; //重置样式
import Cookies from 'js-cookie';
import Swiper from 'swiper';
import MintUI from 'mint-ui';

import 'mint-ui/lib/style.css'

Vue.use(MintUI)
    // 赋值到Vue的原型上面，在页面就可以使用this.$ + name获取到了
Vue.prototype.$Swiper = Swiper;
Vue.prototype.$Cookies = Cookies;

//全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.use(Vuex);

/* eslint-disable no-new */


//全局钩子作用于所有路由，里面的参数to表示即将要进入的路由对象，from表示即将要离开的路由对象 路由进入之前
router.beforeEach((to, from, next) => {
    // if (to.path == '/') {
    //   next();
    // }
    /* 路由发生变化修改页面meta */ //搜索关键字什么的可以使用
    if (to.meta.content) {
        let head = document.getElementsByTagName('head');
        let meta = document.createElement('meta');
        meta.content = to.meta.content;
        head[0].appendChild(meta)
    }
    /* 路由发生变化修改页面title */ //document.title = window.localStorage.getItem("token")?window.localStorage.getItem("token"):'';
    if (to.meta.title) {
        if (to.path.indexOf('/debt/detailsdeb') != -1) {
            document.title = window.localStorage.getItem("title") ? window.localStorage.getItem("title") : '';
        } else {
            document.title = to.meta.title;
        }

    }

    //登录且有用户信息
    if (store.getters.loginCode) {
       // console.log(11112);
        if (!to.name) {
            // 404

        }
        // if (to.path === '/my/personalCenter') {
        //     console.log(11111);
        //     next();

        // } else {
        //     // headerSelected(to, vm);
        //     // detailLink(to);
        //     console.log(11113);
        //     next();
        // }
        next();
    } else if (!store.getters.loginCode && window.localStorage.getItem("loginCode")) {
        // 登录且没有用户信息
        //console.log(11113);
        store.dispatch('SETTOKEN', { loginCode: window.localStorage.getItem("loginCode") });
        if (to.path.indexOf('/index') != -1) {
            store.dispatch('SETIMG1', { img1: true });
            store.dispatch('SETIMG2', { img2: false });
            store.dispatch('SETIMG3', { img3: false });
        } else if (to.path.indexOf('/debt/') != -1) {
            store.dispatch('SETIMG1', { img1: false });
            store.dispatch('SETIMG2', { img2: true });
            store.dispatch('SETIMG3', { img3: false });
        } else if (to.path.indexOf('/my/') != -1) {
            store.dispatch('SETIMG1', { img1: false });
            store.dispatch('SETIMG2', { img2: false });
            store.dispatch('SETIMG3', { img3: true });
        } else {

        }
        next();
    } else if (to.path.indexOf('/index') != -1 || to.path.indexOf('/debt/') != -1 || to.path.indexOf('/my/personalCenter') != -1 || to.path.indexOf('/my/login') != -1 || to.path.indexOf('/my/register') != -1) {
        //console.log(11115);
        if (to.path.indexOf('/index') != -1) {
            store.dispatch('SETIMG1', { img1: true });
            store.dispatch('SETIMG2', { img2: false });
            store.dispatch('SETIMG3', { img3: false });
        } else if (to.path.indexOf('/debt/') != -1) {
            store.dispatch('SETIMG1', { img1: false });
            store.dispatch('SETIMG2', { img2: true });
            store.dispatch('SETIMG3', { img3: false });
        } else if (to.path.indexOf('/my/') != -1) {
            store.dispatch('SETIMG1', { img1: false });
            store.dispatch('SETIMG2', { img2: false });
            store.dispatch('SETIMG3', { img3: true });
        } else {

        }
        // store.dispatch('SETIMG1', { img1: window.localStorage.getItem("img1Show") });
        // store.dispatch('SETIMG2', { img2: window.localStorage.getItem("img2Show") });
        // store.dispatch('SETIMG3', { img3: window.localStorage.getItem("img3Show") });
        store.dispatch('SETISCOLLAPSE', { isCollapse: false });
        next();
    } else {
        //console.log(11116);
        store.dispatch('SETISCOLLAPSE', { isCollapse: false });
        next('/my/personalCenter');

    }
});
// //路由进入之后
router.afterEach((to, from) => {

});


new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})