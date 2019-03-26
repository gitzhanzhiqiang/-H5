import store from '@/store';
import Router from 'vue-router'
import baseURL from '@/assets/js/ajax/baseURL';
export default loginout => {
    // token
    // store.dispatch('SETUSER',{user: ''});
    store.dispatch('SETTOKEN', { token: '' });
    window.localStorage.removeItem("token");
    store.dispatch('SETISCOLLAPSE', { isCollapse: true });
    // Router.push('/index');
    // store.dispatch('SETIMG1', { img1: window.localStorage.getItem("img1Show") });
    // store.dispatch('SETIMG2', { img2: window.localStorage.getItem("img2Show") });
    // store.dispatch('SETIMG3', { img3: window.localStorage.getItem("img3Show") });
    window.location.href = "http://192.168.1.55:8089/#/my/personalCenter";
    // window.location.href = "http://192.168.0.121:8081/H5debt/#/my/personalCenter";
}