<template>
	<div>
		<div class="bofan" ref='homePage'>
			<div class="bobo">
				<div class="bofan_bobo">
					<div class="vido">
						<video id="myvideo" ref='outsideComponentRef' crossOrigin="anonymous" preload="auto" class="avd" :src="dizhi + videoSrc" :poster="dizhi + videoImg" height="100%" width="100%" x5-video-player-fullscreen="" x5-video-player-type="h5" x5-video-orientation="portraint" x5-playsinline='true' playsinline='true' x-webkit-airplay="true" webkit-playsinline="true" controls="controls">
							your browser does not support the video tag
						</video>
						<div class="zhanding" @click="bfl()"></div>
					</div>
					<p class="foot">
						<b>
							<img :src="xina" @click="soucang"/>
						</b>
					</p>
				</div>
			</div>
			<div id="output"></div>
		</div>
	</div>
</template>
<script>
	import ajax from '@utils/config'
	import foot from '@/components/footer.vue';
	import headCon from '@/components/header.vue';
	import isWeiXin from '@/assets/js/commin';
	export default {
		components: {
			foot,
			headCon
		},
		data() {
			return {
				//收藏传值
				addorColl: {
					loginCode: '',
					movieId: '',
					token: '',
					userId: '',
				},
				message: '555',
				isShow: true,
				imgdaohan: require("@/assets/imgs/daohan.png"),
				imglogo: require("@/assets/imgs/logo.png"),
				imgshous: require("@/assets/imgs/shous.png"),
				xina: require("@/assets/imgs/xina.png"),
				_dom: "",
				videoSrc: "",
				dizhi:'/video/',
				videoImg: '',
				controls: true,
				fontSize: '',
				bofxian: '1',
				clientHeight: '',
			}
		},
		computed: {

		},
		created() {
			let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
			this.addorColl.userId = window.localStorage.getItem("userId")
			this.addorColl.loginCode = window.localStorage.getItem("loginCode") //收藏
			this.addorColl.movieId = data.movieId //收藏
			this.videoSrc = data.movieUrl;
			this.videoImg = data.movieJpg;
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
			bfl() {
				console.log(this.bofxian)
				if(this.bofxian == 1) {
					var audio = document.querySelector('#myvideo');
					audio.play();
					this.bofxian = 2
					ajax({
							url: "mine/addFlow",
							optionParams: this.addorColl
						}).post()
						.then(res => {
							if(res.code === 200) {

								return false
							} else {
								return false
							}
						})
						.catch(error => {
							console.log(error)
						})
				} else {
					var audio = document.querySelector('#myvideo');
					audio.pause();
					this.bofxian = 1
				}

				// audio.pause();// 这个就是暂停
			},
			//收藏
			soucang() {
				ajax({
						url: "mine/addorColl",
						optionParams: this.addorColl
					}).post()
					.then(res => {
						if(res.code === 200) {
							this.$router.push('/my/registera')
						} else {
							Toast({
								message: res.msg,
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
			//金钱过滤
			formatMoney(val) {
				return val.toFixed(2);
			}
		}
	}

	//
</script>
<style lang='scss' scoped>
	.swiper-container {
		.swiper-slide {
			img {
				width: 100%;
			}
		}
	}
	
	.home-title {
		width: 100%;
		height: 80px;
		text-align: center;
		line-height: 80px;
		font-size: 32px;
		font-weight: 400;
		color: #000;
		position: fixed;
		z-index: 999;
	}
	/*弹框*/
	
	.zhanding {
		position: absolute;
		width: 630px;
		height:1000px;
		background:rgba(255,255,255,0);
		z-index: 88;
		left: 0;
		bottom: 0;
		z-index: 99999;
	}
	
	.imgdaohan {
		width: 45px;
		height: 42px;
		float: left;
		margin-left: 20px;
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
		background: rgba(246, 244, 250, 1);
	}
	
	.bobo {
		width: 750px;
		height: 100%;
		margin: 0 auto;
		background: white;
	}
	
	.bobo .bofan_bobo {
		width: 750px;
		height: 100%;
		margin: 0 auto;
		position: relative;
	}
	
	.bobo .bofan_bobo p.tit {
		width: 100%;
		line-height: 80px;
	}
	
	.bobo .bofan_bobo p.tit span {
		font-size: 30px;
		font-family: PingFang-SC-Medium;
		font-weight: bold;
	}
	
	.bobo .bofan_bobo p.tit img {
		width: 45px;
		height: 43px;
		float: right;
		margin-top: 20px;
	}
	
	.bobo .bofan_bobo p.foot {
		height: 371px;
		width: 74px;
		position: absolute;
		top: 55%;
		right: 17px;
	}
	
	.bobo .bofan_bobo p.foot b {
		width: 71px;
		height: 71px;
		display: block;
		margin-bottom: 73px;
	}
	
	.bobo .bofan_bobo p.foot b img {
		width: 71px;
		height: 71px;
	}
	
	.bobo .bofan_bobo p.foot span {
		font-size: 24px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
	}
	
	.bobo .bofan_bobo .vido {
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.bobo .bofan_bobo .vido span {
		width: 50px;
		height: 50px;
		background: #000000;
		display: inline-block;
	}
</style>