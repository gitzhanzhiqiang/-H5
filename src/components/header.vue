 <template>
    <div class="breadcrumb" v-if="!isWeiXi">
        <span :key="item.path" v-for="(item, index) in list">{{item.title}}
        </span>
        <img :src="img" alt="" class="back" @click="$router.go(-1);">
    </div>
</template>

<script>
import isWeiXin from '@/assets/js/commin';
export default {
    data() {
        return {
            img: require("@/assets/images/back_icon@2x.png"),
            isWeiXi: false,
        }
    },
    created() {
		this.isWeiXi = isWeiXin();
	},
    computed: {
        list() {
            let result = [];
            // console.log(this.$route);
            for (var index = 0; index < this.$route.matched.length; index++) {//根据路由获取
                var item = this.$route.matched[index];
                if (index === 2) {
                    result.push({
                        title: item.meta.title,
                        path: item.path,
                    });
                }
            }
            return result;
        },
        //判断是否是微信端
        // isWeiXin() {
        //     //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        //     var ua = window.navigator.userAgent.toLowerCase();
        //     //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        //     if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        //     return false;
        //     }else{
        //     return true;
        //     }
        // }
    },
    methods: {
        //判断是否是微信端
        WeiXin() {
            //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
            var ua = window.navigator.userAgent.toLowerCase();
            //通过正则表达式匹配ua中是否含有MicroMessenger字符串
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                this.isWeiXin = false;
            }else{
                this.isWeiXin = true;
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.breadcrumb {
    height: 90px;
    background: rgba(255, 255, 255, 1);
    height: 31px;
    font-size: 31px;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    height: 90px;
    background: rgba(255, 255, 255, 1);
    line-height: 90px;
    width: 100%;
    text-align: center; // position: relative;
    position: fixed;
    top: 0;
    .back {
        width: 18px;
        height: 32px;
        position: absolute;
        left: 36px;
        top: 31px;
    }
}
</style>