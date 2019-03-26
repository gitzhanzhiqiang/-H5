<template>
	<div class="personCenter">
		<div class="home-title">
			<img class="imgdaohan" :src="imgdaohan" @click="chuxian" />
			<img class="imglogo" :src="imglogo" v-show="imgsc"/>
			<img class="imgshous" :src="imgshous" @click="chuxiana(1)" v-show="imgsc"/>
			
			<p v-show="imgsca">
				<img class="zuedaohous" :src="imgshous"/>
				<input type="text" v-model="prame.movieName" @keypress="accountLogin()" placeholder="搜索" />
				<span @click="chuxiana(2)">X</span>
			</p>
		</div>
		<div class="bofan" @scroll="woListScroll($event)" ref='homePage'>
			<p style="text-align: center;font-size: 40px;line-height: 200px;" v-show="shuju">没有数据</p>
			<div class="bobo" v-for="(itm,index) in homepageData">
				<div class="bofan_bobo">
					<p class="tit">
						<span style="color: #333333;">{{itm.movieName}} </span>
						<img v-if='itm.collect == 0' :src="xin" @click="soucang(itm)" />
						<img v-else :src="xina" @click="soucang(itm)" />
					</p>
					<div class="vido">
						<video :id="myvideo(index)" v-show='aude' crossOrigin="anonymous" class="avd" :src="dizhi + itm.movieUrl" :poster="dizhi + itm.movieJpg" preload="auto" height="400" width="710" x5-video-player-fullscreen="" x5-video-orientation="portraint"  x5-playsinline='true' playsinline='true' x-webkit-airplay="true" webkit-playsinline="true" controls="controls">
							your browser does not support the video tag
						</video>
						<div class="zhanding" @click="bfl(itm,index)"></div>
					</div>
					<p class="foot">
						<span style="color: #999999;">访问量：{{itm.pageView}}</span>
						<span style="color: #F95645;margin-left: 80px;">好评率：{{itm.goodRate}}%</span>
						<b>
							<img v-if='itm.dotState == 1 || itm.dotState == 0' :src="bzana" @click="dianzanb(itm)"/>
							<img v-else :src="bzan"/>
						</b>
						<b style="margin-right: 60px;">
							<img v-if='itm.dotState == 2 || itm.dotState == 0' :src="zan" @click="dianzana(itm)"/>
							<img v-else :src="zana"/>
						</b>
					</p>
				</div>
			</div>

		</div>
		<div class="box" v-if='dengrua'>
			<img :src="xx" class="xxa" @click="shandiao"/>
			<img :src="phone" class="phone" />
			<span>更多精彩，登陆后展现</span>
			<p @click="$router.push('/my/login')">登录</p>
		</div>
		<div id="maxl" v-if='dengru' @click="xiaoshi"></div>
		<div class="zuedao" v-if='dengru'>
			<p>
				类型
			</p>
			<div class="xian"></div>
			<ul>
				<li v-for="itm in fenleida" :class="{'acrt':itm.atr}" @click="xuanze(itm)">{{itm.className}}</li>
			</ul>
		</div>
		<foot></foot>
	</div>
</template>
<script>
	import ajax from '@utils/config';
	import foot from '@/components/footer.vue';
	import headCon from '@/components/header.vue';
	import blank from '@/components/blank.vue';
	import isWeiXin from '@/assets/js/commin';
	import { Toast } from 'mint-ui';
	export default {
		components: {
			foot,
			headCon,
			blank,
		},
		data() {
			return {
				//列表传值
				prame: {
					beginTime: '',//开始束时间 -查询
					classId: '',//视频分类
					endTime: '',
					loginCode: '',//登录名(唯一)
					movieName: '',//视频名
					pageIndex: '1',
					pageSize: '4',
					token: '',
					userId: '',
				},
				shuju:false,
				aude:true,
				//收藏传值
				addorColl: {
					loginCode: '',
					movieId: '',
					token: '',
					userId: '',
				},
				//踩
				addorColla: {
					dotState: '2',
					loginCode: '',
					movieId: '',
					token: '',
					userId: '',
				},
				//赞
				addorCollb: {
					dotState: '1',
					loginCode: '',
					movieId: '',
					token: '',
					userId: '',
				},
				//播放量
				addorCollf: {
					loginCode: '',
					movieId: '',
					token: '',
					userId: '',
				},
				homepageData: [],
				message: '555',
				isShow: true,
				imgdaohan: require("@/assets/imgs/daohan.png"),
				imglogo: require("@/assets/imgs/logo.png"),
				imgshous: require("@/assets/imgs/shous.png"),
				xin: require("@/assets/imgs/xin.png"),
				xina: require("@/assets/imgs/xina.png"),
				zan: require("@/assets/imgs/zan.png"),
				zana: require("@/assets/imgs/zana.png"),
				bzan: require("@/assets/imgs/bzan.png"),
				bzana: require("@/assets/imgs/bzana.png"),
				xx: require("@/assets/imgs/xx.png"),
				phone: require("@/assets/imgs/phone.png"),
				//phonea: require("@/assets/imgs/biye.mp4"),
				dengru: false,
				dengrua: false, //弹框
				_dom: "",
				videoSrc:'',
				//videoImg: '',
				videoImg: require("@/assets/imgs/bibi.jpg"),
				fontSize: '', //手机高度
				fenleida:[],
				clientHeight: '',
				dizhi:'/video/',
				bofxian:'1',
				imgsc:true,
				imgsca:false,
			}
		},
		computed: {},
		created() {
			if( window.localStorage.getItem("userId") == '' || window.localStorage.getItem("userId") == null){
				this.dengrua = true
			}
			this.prame.userId = window.localStorage.getItem("userId")
			this.addorColl.userId = window.localStorage.getItem("userId")
			this.addorColl.loginCode = window.localStorage.getItem("loginCode") //收藏
			this.addorColla.userId = window.localStorage.getItem("userId")
			this.addorColla.loginCode = window.localStorage.getItem("loginCode") //点赞
			this.addorCollb.userId = window.localStorage.getItem("userId")
			this.addorCollb.loginCode = window.localStorage.getItem("loginCode") //点踩
			this.addorCollf.userId = window.localStorage.getItem("userId")
			this.addorCollf.loginCode = window.localStorage.getItem("loginCode") //播放量
			this.accountLogin()
			this.fenlei()
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
				console.log(clientHeight - 197);
				var clientHeighta = clientHeight - 197
				this.$refs.homePage.style.height = clientHeighta + 'px';
			},
			//获取列表
			accountLogin() {
				ajax({
						url: "homepage/homepageData",
						optionParams: this.prame
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.dengru = false
							this.homepageData = res.data ? res.data : []
							console.log(this.homepageData)
							if(this.homepageData.length == 0){
								this.shuju = true
							}else{
								this.shuju = false
							}
//							this.homepageData.map((item)=> {
//								this.$set(item, 'videoImg', '')
//							})
//							this.$nextTick(()=> {
//								this.fist_img();
//							})
						} else {
							this.dengrua = true
							return false
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			fist_img () {
	            var scale = 0.8;
	            let video = document.querySelectorAll('.avd');
	            let that = this;
                 for(let i = 0; i < video.length; i++) {
	                video[i].addEventListener("loadeddata", function(){
		    	            let cvs = document.createElement('canvas');
				            let ctx = cvs.getContext('2d');
				            cvs.width = this.videoWidth;
				            cvs.height = this.videoHeight;
				            ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
				            let url = cvs.toDataURL('image/jpg');
				            console.log(url)
				            that.homepageData[i].videoImg = url;
			        })
	            }

			},
			//分类
			fenlei() {
				ajax({
						url: "mine/getClassType",
						optionParams: this.prame
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.fenleida = res.data ? res.data : []
							this.fenleida.map((item) => {
									this.$set(item, 'atr', false)
						 	})
						} else {
							this.dengrua = true
							return false
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			//收藏
			soucang(row) {
				this.addorColl.movieId = row.movieId
				ajax({
						url: "mine/addorColl",
						optionParams: this.addorColl
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.accountLogin()
							Toast({
								message: res.msg,
								position: 'bottom',
							});
						} else {
							this.dengrua = true
							this.aude =false
							return false
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			xiaoshi() {
				this.dengru = false
			},
			chuxian() {
				this.dengru = true
			},
			chuxiana(num) {
				if(num == 1){
					this.imgsc = false
					this.imgsca = true
				}else{
					this.imgsc = true
					this.imgsca = false
					this.prame.movieName = ''
				}
			},
			//赞
			dianzana(row) {
				this.addorCollb.movieId = row.movieId
				ajax({
						url: "mine/addorDot",
						optionParams: this.addorCollb
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.accountLogin()
							Toast({
								message: res.msg,
								position: 'bottom',
							});
							return false
						} else {
							this.dengrua = true
							this.aude =false
							return false
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			//踩
			dianzanb(row) {
				this.addorColla.movieId = row.movieId
				ajax({
						url: "mine/addorDot",
						optionParams: this.addorColla
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.accountLogin()
							Toast({
								message: res.msg,
								position: 'bottom',
							});
							return false
						} else {
							this.dengrua = true
							this.aude =false
							return false
						}
					})
					.catch(error => {
						console.log(error)
					})

			},
			shandiao(){
				this.dengrua = false
				this.aude = true
			},
			//搜索选择
			xuanze(row) {
				this.fenleida.map((item) => {
					if(row.id == item.id) {
						item.atr = true
						this.prame.classId = item.id
						this.accountLogin()
					} else {
						item.atr = false
					}
				})
			},
			woListScroll(event) {
				if(event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
					this.prame.pageSize = (Number(this.prame.pageSize) + 4) 
			     	this.accountLogin();
				}
			    if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 1) {
			     	this.prame.pageSize = (Number(this.prame.pageSize) + 4) 
			     	this.accountLogin();
			    }
			},
			myvideo(index){
				return "myvideo_" +index
			},
			bfl(row,num){
				//console.log(this.bofxian)
				if(this.bofxian == 1){
					var audio =document.querySelector('#myvideo_'+num);
					audio.play();
					this.bofxian = 2
					this.addorCollf.movieId = row.movieId
					ajax({
						url: "mine/addFlow",
						optionParams: this.addorCollf
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.accountLogin()
							Toast({
								message: res.msg,
								position: 'bottom',
							});
							return false
						} else {
							this.dengrua = true
							this.aude =false
							return false
						}
					})
					.catch(error => {
						console.log(error)
					})
				}else{
					var audio =document.querySelector('#myvideo_'+num);
					audio.pause();
					this.bofxian = 1
				}
				
				// audio.pause();// 这个就是暂停
			},
			//
			// loadBottom: function() {
			// 	this.$refs.loadmore.onBottomLoaded();
			// 	this.optionParams.limit = this.optionParams.limit + 5;
			// 	this.getApplyList();
			// },
		},
		filters: {
			//金钱过滤
			formatMoney(val) {
				return val.toFixed(2);
			}
		}
	}
</script>
<style lang='scss' scoped>
	@import './scss/userManage.scss';
	.personCenter {
		width: 750px;
		height: 100%;
		margin: 0 auto;
		background: rgba(246, 244, 250, 1);
	}
	/*弹框*/
	.zhanding{
		width: 100%;
		height: 100%;
		background:rgba(255,255,255,0);
		top: 0;
		left: 0;
		z-index: 1;
	}
	.avd{
		position: absolute;
		display: block;
	    top: 0px;
	    left: 0px;
	    background: #000;
	    object-fit: fill;
	}
	#maxl {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 90;
	}
	
	.box {
		width: 620px;
		height: 663px;
		background: rgba(255, 255, 255, 1);
		border-top-left-radius: 20px;
		border-bottom-right-radius: 20px;
		border-bottom-left-radius: 20px;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		z-index: 99;
	}
	
	.box img.xxa {
		width: 96px;
		height: 96px;
		float: right;
	}
	
	.box img.phone {
		width: 285px;
		height: 321px;
		display: block;
		margin-left: 180px;
		margin-top: 40px;
	}
	
	.box span {
		width: 100%;
		display: block;
		font-size: 36px;
		font-family: SourceHanSansCN-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 100px;
		text-align: center;
		margin-bottom: 30px;
	}
	
	.box p {
		width: 467px;
		height: 100px;
		background: linear-gradient(45deg, rgba(255, 90, 78, 1) 0%, rgba(255, 122, 25, 1) 100%);
		box-shadow: 1px 11px 77px 0px rgba(0, 0, 0, 0.18);
		border-radius: 15px;
		font-size: 33px;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 100px;
		margin: 0 auto;
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
	.home-title p{
		width:601px;
		height:60px;
		border: 2px solid rgba(255, 90, 78, 1);
		border-radius: 25px;
		float: right;
		margin-right: 20px;
		margin-top: 12px;
	}
	.home-title p img.zuedaohous{
		float: left;
		margin-top: 14px;
		margin-left: 18px;
		width: 31px;
		height: 30px;
	}
	.home-title p input{
		width: 440px;
		height: 50px;
		float: left;
		margin-top: 1px;
		margin-left: 20px;
			background: none;
		outline: 0;
		border: none;
		font-size: 28px;
		color: #ff5a4e;
	}
	.home-title p span{
		font-size: 28px;
		width: 70px;
		height: 60px;
		display: inline-block;
		float: right;
		text-align: center;
		color: #ff5a4e;
		line-height: 60px;
	}
	.imgdaohan {
		width: 45px;
		height: 42px;
		float: left;
		margin-left: 20px;
		margin-top: 19px;
	}
	
	.imglogo {
		width: 115px;
		height: 47px;
		margin-top: 19px;
	}
	
	.imgshous {
		width: 44px;
		height: 43px;
		float: right;
		margin-right: 20px;
		margin-top: 19px;
	}
	
	.bofan {
		width: 750px;
		overflow-y: auto;
		background: rgba(246, 244, 250, 1);
		padding-top: 95px;
	}
	
	.bobo {
		width: 750px;
		height: 562px;
		margin: 0 auto;
		background: white;
		margin-bottom: 10px;
	}
	
	.bobo .bofan_bobo {
		width: 710px;
		overflow: hidden;
		margin: 0 auto;
	}
	
	.bobo .bofan_bobo p.tit {
		width: 100%;
		line-height: 80px;
		position: relative;
	}
	
	.bobo .bofan_bobo p.tit span {
		font-size: 30px;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
		width: 560px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.bobo .bofan_bobo p.tit img {
		width: 45px;
		height: 43px;
		position: absolute;
		right: 0;
		top: 14px;
	}
	
	.bobo .bofan_bobo p.foot {
		width: 100%;
		line-height: 70px;
	}
	
	.bobo .bofan_bobo p.foot b {
		float: right;
		margin-top: 13px;
		width: 42px;
		height: 40px;
	}
	
	.bobo .bofan_bobo p.foot b img {
		width: 42px;
		height: 40px;
	}
	
	.bobo .bofan_bobo p.foot span {
		font-size: 24px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
	}
	
	.bobo .bofan_bobo .vido {
		width: 710px;
		height: 400px;
		position: relative;
	}
	
	.bobo .bofan_bobo .vido span {
		width: 50px;
		height: 50px;
		background: #000000;
		display: inline-block;
	}
	/*zuoce*/
	
	.zuedao {
		width: 400px;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: linear-gradient(0deg, rgba(250, 191, 175, 1) 0%, rgba(247, 204, 175, 1) 100%);
		box-shadow: 0px 8px 21px 0px rgba(255, 108, 0, 0.25);
		z-index: 999999;
	}
	
	.zuedao p {
		width: 360px;
		height: 50px;
		position: relative;
		margin-top: 55px;
		margin-bottom: 39px;
		margin-left: 19px;
		color:rgba(0,0,0,1);
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		line-height: 50px;
	}
	
	.zuedao p img {
		position: absolute;
		width: 36px;
		height: 36px;
		left: 13px;
		top: 8px;
	}
	.zuedao .xian {
		width: 100%;
		height: 2px;
		background: rgba(124, 124, 124, 0.2);
		display: block;
	}
	
	.zuedao ul {
		width: 100%;
		height: 100%;
		overflow-y:scroll ;
	}
	
	.zuedao ul li {
		width: 100%;
		height: 80px;
		line-height: 80px;
		text-indent: 3.5em;
	}
	
	.zuedao ul li.acrt {
		background: rgba(255, 255, 255, 0.3);
	}
</style>