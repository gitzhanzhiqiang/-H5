<template>
    <div class="loginCon" :style="zhuce" ref='homePage'>
    	<div class="home-title">
        	<img src="../../assets/images/back_icon@2x.png" @click="$router.push('/debt/debtList')"/>
		</div>
       <div class="zhuceye">
   			<div class="dao">
   				<p :class="{'act':active}" @click="quehuan(1)">登录</p>
   				<p :class="{'act':activea}" @click="quehuan(2)">注册</p>
	       	</div>
	        <div class="zhuce" v-if='num == 2'>
	        	<ul class="logininputlist">
	        		<li>
	        			<i class="phones" :style="phones"></i>
	        			<input type="text" v-model="atrfar.loginCode" placeholder="请输入用户名" maxlength="11">
	        		</li>
	        		<li style="border-top: 1px solid rgba(0,0,0,0.2);">
	        			<i class="suos" :style="suos"></i>
	        			<input type="password" v-model="atrfar.pwd" placeholder="请输入密码" maxlength="">
	        		</li>
	        	</ul>
	        	<p @click="getphonecodeId()">注册</p>
	        </div>
	         <div class="zhuce" v-if='num == 1'>
	        	<ul class="logininputlist">
	        		<li>
	        			<i class="phones" :style="phones"></i>
	        			<input type="text" v-model="atrfara.loginCode" placeholder="请输入用户名" maxlength="11">
	        		</li>
	        		<li style="border-top: 1px solid rgba(0,0,0,0.2);">
	        			<i class="suos" :style="suos"></i>
	        			<input type="password" v-model="atrfara.pwd" placeholder="请输入密码" maxlength="">
	        		</li>
	        	</ul>
	        	<p @click="accountLogin()">登录</p>
	        </div>
       </div>
    </div>
</template>
<script>
import ajax from '@utils/config';
import Swiper from 'swiper';
import store from '@/store';
import { Toast  } from 'mint-ui';
export default {
    
    data() {
        return {
        	//注册
        	atrfar:{
        		loginCode:'',
        		pwd:'',
        	},
        	//登入
        	atrfara:{
        		loginCode:'',
        		pwd:'',
        	},
            zhuce: {
                backgroundImage: "url(" + require("@/assets/imgs/zhuce.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            phones: {
                backgroundImage: "url(" + require("@/assets/imgs/phones.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            suos: {
                backgroundImage: "url(" + require("@/assets/imgs/suos.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            yans: {
                backgroundImage: "url(" + require("@/assets/imgs/yans.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0px center"
            },
            isSend: true,
            active:true,
            activea:false,
            isshow: true,//倒计时
            count:'',
            num:'1',
            clientHeight: '',
            fontSize:'',
        }
    },
    computed: {
    	
    },
    created() {
    },
    mounted() {
    	// 获取浏览器可视区域高度
			this.clientHeight = `${document.documentElement.clientHeight}` //document.body.clientWidth;
			//console.log(self.clientHeight);
			window.onresize = function temp() {
				this.clientHeight = `${document.documentElement.clientHeight}`;
			};
    },
    watch: {
			// 如果 `clientHeight` 发生改变，这个函数就会运行
			clientHeight: function() {
				this.changeFixed(this.clientHeight)
			}
		},
    methods: {
    	changeFixed(clientHeight) { //动态修改样式
				console.log(clientHeight);
				var clientHeighta = clientHeight
				this.$refs.homePage.style.height = clientHeighta + 'px';

			},
    	quehuan(num){
    		if(num == 1){
    			this.active = true
    			this.activea = false
    			this.num = num
    			this.atrfar={
	        		loginCode:'',
	        		pwd:'',
	        	}
    			this.atrfara={
	        		loginCode:'',
	        		pwd:'',
	        	}
    		}else{
    			this.active = false
    			this.activea = true
    			this.num = num
    			this.atrfara={
	        		loginCode:'',
	        		pwd:'',
	        	}
    			this.atrfar={
	        		loginCode:'',
	        		pwd:'',
	        	}
    		}
    	},
        //注册
        getphonecodeId() {
        	if(this.atrfar.loginCode == ''){
        		Toast({
					message: "请输入手机号码",
					position: 'bottom',
				});
				return
        	}
        	if(this.atrfar.pwd == ''){
        		Toast({
					message: "请输入密码",
					position: 'bottom',
				});
				return
        	}
            ajax({
                url: "login/registerDo",
                optionParams:this.atrfar
            }).post()
                .then(res => {
                    console.log(res);
                    if (res.code === 200) {
                    	Toast({
							message:res.msg ,
							position: 'bottom',
						});
                    	this.num = 1
                    	this.active = true
                    	this.activea = false
                       window.localStorage.setItem("token", res.data.token);
                       window.localStorage.setItem("userId", res.data.userId);
                       window.localStorage.setItem("loginCode", res.data.loginCode);
                    } else {
                    	Toast({
							message:res.msg ,
							position: 'bottom',
						});
						return false
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //账号登录
        accountLogin() {
            ajax({
                url: "login/loginDo",
                optionParams: this.atrfara
            }).post()
                .then(res => {
                    if (res.code === 200) {
						window.localStorage.setItem("token", res.data.token);
                       window.localStorage.setItem("userId", res.data.userId);
                       window.localStorage.setItem("loginCode", res.data.loginCode);
                        window.localStorage.setItem("img1Show",false);
                        window.localStorage.setItem("img2Show",true);
                        window.localStorage.setItem("img3Show",false);
                         this.$store.dispatch('SETTOKEN', { loginCode: res.data.loginCode });
                        this.$store.dispatch('SETIMG1', { img1: false });
                        this.$store.dispatch('SETIMG2', { img2: true });
                        this.$store.dispatch('SETIMG3', { img3: false });
                        this.$router.push('/debt/debtList');
                        
                    } else {
                       Toast({
							message:res.msg ,
							position: 'bottom',
						});
						return false
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
       
    },
    filters: {

    }
}
</script>
<style lang='scss' scoped>
.loginCon {
    width: 100%;
    /*background: url(~@/assets/imgs/zhuce.png) no-repeat;*/
    background-size: 100% 100%;
}
.home-title {
	width: 750px;
	height: 80px;
	text-align: center;
	line-height: 80px;
	font-size: 32px;
	font-weight: 400;
	color: #000;
	position: fixed;
	z-index: 9;
}
.home-title img{
	width: 30px;
	height: 50px;
	position: absolute;
	left: 25px;
	top: 16px;
}
.zhuceye{
	width: 100%;
	overflow: hidden;
	padding-top: 70%;
	padding-bottom: 105px;
	position: relative;
}
.dao{
	width:433px;
	height:73px;
	background:rgba(0,0,0,0.15);
	border-radius:37px;
	margin: 0 auto;
	margin-bottom: 40px;
}
.dao p{
	width: 215px;
	height: 60px;
	font-size:30px;
	font-family:PingFang-SC-Regular;
	font-weight:bold;
	color: white;
	border-radius:30px;
	text-align: center;
	line-height: 60px;
	float: left;
	margin-top: 7px;
}
.dao p.act{
	background:rgba(255,255,255,1);
	color:rgba(0,0,0,1);
}
.zhuce{
	width:563px;
	height:360px;
	background:rgba(255,255,255,1);
	border-radius:15px;
	margin: 0 auto;
}
.zhuce ul {
	width: 480px;
	overflow: hidden;
	margin: 0 auto;
	padding-top: 30px;
}
.zhuce ul li {
	width: 100%;
	height: 129px;
	position: relative;
}
.zhuce ul li i{
	background-size: 100% 100%;
	margin-top: 40px;
	float: left;
}
.getcode {
	width:80px;
	height:45px;
	display: inline-block;
	cursor: pointer;
	position: absolute;
	font-size:28px;
font-family:PingFang-SC-Regular;
font-weight:400;
text-align: center;	
line-height: 45px;
color:rgba(255,94,72,1);
right: 0;
top: 40px;
	}
.zhuce ul li i.phones{
	width: 26px;
	height: 39px;
	display: inline-block;
}
.zhuce ul li i.suos{
	width: 27px;
	height: 42px;
	display: inline-block;
}
.zhuce ul li i.yans{
	width: 29px;
	height: 39px;
	display: inline-block;
}
.zhuce ul li input {
	border: 0;
	color: black;
	background: none;
	text-align: left;
	outline: 0;
	height: 50px;
	width: 85%;
	font-size: 24px;
	float: left;
	margin-top: 40px;
	margin-left:29px ;
}
.zhuce p{
	width:470px;
height:100px;
background:linear-gradient(45deg,rgba(255,90,78,1) 0%,rgba(255,122,25,1) 100%);
box-shadow:1px 11px 77px 0px rgba(0, 0, 0, 0.18);
border-radius:15px;
position: absolute;
left: 135px;
bottom: 55px;
text-align: center;
font-size:33px;
font-family:PingFang-SC-Medium;
font-weight:bold;
color:rgba(255,255,255,1);
line-height: 100px;
}
input::input-placeholder {
		background: none;
		font-size:26px;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(43,41,41,1);
opacity:0.5;
}

input::-webkit-input-placeholder {
	background: none;
	font-size:26px;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(43,41,41,1);
opacity:0.5;
}

input::-moz-input-placeholder {
	color: white;
	background: none;
	font-size:26px;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(43,41,41,1);
opacity:0.5;
}
/**/

</style>