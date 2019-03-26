<template>
    <div class="loginCon">
        <div class="home-title">
        	<img src="../../assets/images/back_icon@2x.png" @click="$router.push('/my/personalCenter')"/>
			我的收藏
		</div>
        <div class="lie_home" @scroll="woListScroll($event)">
        		<ul>
	        		<li v-for="itm in homepageData" @click="$router.push({path:'/my/bofanga', query:{data: JSON.stringify(itm)}})">
	        			<img :src="dizhi + itm.movieJpg"/>
	        			<p>{{itm.movieName}}</p>
	        			<span>{{itm.createTime | parseTime('{y}-{m}-{d}')}}</span>
	        		</li>
	        	</ul>
        </div>
       
    </div>
</template>
<script>
import ajax from '@utils/config';
import Swiper from 'swiper';
import store from '@/store';
import { Toast } from 'mint-ui';
export default {
    components: {
    },
    data() {
        return {
            //列表传值
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
			dizhi:'/video/',
			homepageData:[],
			videoImg:require("@/assets/imgs/bibi.jpg"),
			tite:'',
			mun:''
        }
    },
    computed: {
    },
    created() {
    	this.prame.userId = window.localStorage.getItem("userId")
    	
    	 	this.accountLogin()
    	 
    },
    mounted() {
    	
    },
    methods: {
        woListScroll(event) {
			if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
				this.prame.pageSize = (Number(this.prame.pageSize) + 4) 
		     	this.accountLogin();
			}
		    if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 1) {
		     	this.prame.pageSize = (Number(this.prame.pageSize) + 4) 
		     	this.accountLogin();
		    }
		},
       //我的收藏
		 accountLogin() {
            ajax({
                url: "mine/collectData",
                optionParams: this.prame
            }).post()
                .then(res => {
                    if (res.code === 200) {
                    this.homepageData = res.data ? res.data:[]
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
    width: 750px;
    height: 100%;
    background: rgba(246, 244, 250, 1);
}
.home-title {
	width: 750px;
	height: 80px;
	background: white;
	text-align: center;
	line-height: 80px;
	font-size: 32px;
	font-weight: 400;
	color: #000;
	border-bottom: 1px solid rgba(217, 217, 217, 1);
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
.lie_home{
	width: 710px;
	height: 1240px;
	overflow-y:auto ;
	margin: 0 auto;
	padding-top: 95px;
}
.lie_home  ul li{
	width: 346px;
	height: 279px;
	margin-bottom: 10px;
	background:rgba(255,255,255,1);
	border-radius:12px;
}
.lie_home  ul{
	overflow: hidden;
}
.lie_home  ul li:nth-child(odd){
	float: left;
}
.lie_home  ul li:nth-child(even){
	float: right;
}
.lie_home  ul li p{
	font-size:30px;
	font-family:PingFang-SC-Medium;
	font-weight:bold;
	color:rgba(51,51,51,1);
	text-indent: 0.5em;
	line-height: 45px;
	width: 100%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
}
.lie_home  ul li span{
	font-size:20px;
	font-family:PingFang-SC-Regular;
	font-weight:400;
	color:rgba(153,153,153,1);
	text-indent: 0.8em;
	display: block;
	line-height: 35px;
}
.lie_home ul li img{
	width:346px;
	height:195px;
	border-radius:12px 12px 0px 0px;
	display: block;
}
</style>


