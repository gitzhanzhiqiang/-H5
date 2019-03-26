<template>
    <div class="personCenter">
       <div class="tou">
       
       </div>
       <img :src="videoImga"/>
 		<div class="xia">
 			<p>{{prame.loginCode}}</p>
 			<ul>
 				<li @click="$router.push('/my/registera')">
 					<i class="zan" :style="zan"></i>
 					我的收藏
 				</li>
 				<li @click="$router.push('/my/register')">
 					<i class="shoucan" :style="shoucan"></i>
 					我的喜爱
 				</li>
 			</ul>
 			<span @click="tuichu">退出登录</span>
 		</div>
     	

        <foot></foot>
    </div>
</template>
<script>
import ajax from '@utils/config';
import foot from '@/components/footer.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
    components: {
        foot
    },
    data() {
        return {
        	prame:{
					beginTime:'',
					classId:'',
					endTime:'',
					loginCode:'',
					movieName:'',
					pageIndex:'1',
					pageSize:'4',
					token:'',
					userId:'',
				},
          zan: {
                backgroundImage: "url(" + require("@/assets/imgs/xina.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            shoucan: {
                backgroundImage: "url(" + require("@/assets/imgs/zana.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
           videoImg:require("@/assets/imgs/bibi.jpg"),
            videoImga:require("@/assets/imgs/touxiang.png"),
           
        }
    },
    computed: {
       
    },
    created() {
    	if( window.localStorage.getItem("userId") == '' || window.localStorage.getItem("userId") == null){
			 this.$router.push('/my/login')
    	}
    	this.prame.userId = window.localStorage.getItem("userId")
    	this.prame.loginCode = window.localStorage.getItem("loginCode")
    },
    mounted() {
    },
    methods: {
    	
        tuichu(){
        	 this.$store.dispatch('SETTOKEN', { loginCode: '' });
        	window.localStorage.setItem("img1Show",'');
            window.localStorage.setItem("img2Show",'');
            window.localStorage.setItem("img3Show",'');
        	window.localStorage.setItem("token","" );
            window.localStorage.setItem("userId", "");
            window.localStorage.setItem("loginCode", "");
            this.$router.push('/my/login')
        },
        
    },
    filters: {
        //手机号码脱敏显示
        phoneFilter(val) {
            return val.substr(0, 3) + '****' + val.substr(7);
        },
        //金钱过滤
        formatMoney(val) {
            if (typeof (val) != Number) {
                return val;
            } else {
                return val.toFixed(2);
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.personCenter {
    width: 750px;
    height: 100%;
    background: rgba(246, 244, 250, 1);
   position: relative;
}
.tou{
	width: 750px;
	height: 412px;
	background:linear-gradient(-23deg,rgba(255,90,78,1) 0%,rgba(255,119,109,1) 100%);
}
.personCenter img{
	width:236px;
height:236px;
background:rgba(255,255,255,1);
border-radius:50%;
position: absolute;
z-index: 99;
top: 0;
left: 50%;
transform: translateX(-50%);
top: 135px;
}
.xia{
	width:750px;
	height:1048px;
	background:rgba(255,255,255,1);
	border-radius:12px 12px 0px 0px;
	position: absolute;
	top: 249px;
}
.xia p{
	padding-top: 145px;
	text-align: center;
	font-size:36px;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(0,0,0,1);
	line-height:75px;
}
.xia ul{
	margin-bottom: 250px;
	margin-top: 80px;
}
.xia ul li{
	width: 100%;
	height: 110px;
	border: 1px solid #E6E6E6;
	line-height: 100px;
}
.xia ul li i{
	display: inline-block;
	background-size: 100% 100%;
	float: left;
	margin-top: 20px;
	margin-left: 73px;
	margin-right: 27px;
}
.xia ul li i.zan{
	width: 62px;
	height: 59px;
}
.xia ul li i.shoucan{
	width: 57px;
	height: 54px;
}
.xia span{
	width:600px;
height:80px;
background:rgba(255,255,255,1);
border:1px solid rgba(217,217,217,1);
border-radius:40px;
font-size:26px;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
line-height:80px;
text-align: center;
display: block;
margin: 0 auto;
}
</style>


