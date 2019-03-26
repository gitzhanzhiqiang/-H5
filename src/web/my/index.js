import Template from '@/template';
export default {
    path: '/my',
    component: Template,
    meta: {
        title: '我的'
    },
    children: [{
            path: 'personalCenter',
            name: 'my_personalCenter',
            component: resolve => require(['./personalCenter'], resolve),
            meta: {
                title: '个人中心'
            }
        },
        {
            path: 'register',
            name: 'my_register',
            component: resolve => require(['./register'], resolve),
            meta: {
                title: '我的喜爱'
            }
        },
        {
            path: 'registera',
            name: 'my_registera',
            component: resolve => require(['./registera'], resolve),
            meta: {
                title: '我的收藏'
            }
        },
        {
            path: 'login',
            name: 'my_login',
            component: resolve => require(['./login'], resolve),
            meta: {
                title: '登录'
            }
        },{
            path: 'bofang',
            name: 'my_bofang',
            component: resolve => require(['./bofang'], resolve),
            meta: {
                title: '播放'
            }
        },
       {
            path: 'bofanga',
            name: 'my_bofanga',
            component: resolve => require(['./bofanga'], resolve),
            meta: {
                title: '播放'
            }
        },
    ]

}