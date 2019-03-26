<template>
	<div class="footercontent">
		<li class="tabItem" :class="{hover:img1}" @click="set(1);">
			<img :src="img11" alt="" v-if="!img1">
			<img :src="img1Hover" alt="" v-if="img1" style="width: 72px;height: 72px;"><br><span v-if="!img1">推荐</span>
        </li>
        <li class="tabItem" :class="{hover:img2}" @click="set(2);">
        	<img :src="img22" alt="" v-if="!img2">
			<img :src="img2Hover" alt="" v-if="img2" style="width: 72px;height: 72px;"><br><span v-if="!img2">首页</span>
        </li>
        <li class="tabItem" :class="{hover:img3}" @click="set(3);">
        	<img :src="img33" alt="" v-if="!img3">
			<img :src="img3Hover" alt="" v-if="img3" style="width: 72px;height: 72px;"><br><span v-if="!img3">我的</span>
        </li>
	</div>
</template>

<script>
import $ from 'jquery'
import { mapState, mapMutations, mapGetters } from 'vuex';
	export default{
		data() {
			return {
				img11:require("@/assets/imgs/tuitui.png"),
				img1Hover:require("@/assets/imgs/tuijian.png"),
				img22:require("@/assets/imgs/bofan.png"),
				img2Hover:require("@/assets/imgs/shou.png"),
				img33:require("@/assets/images/my1_icon@2x.png"),
				img3Hover:require("@/assets/imgs/my.png"),
			}
    	},
		mounted(){
		},
		computed: {
			...mapGetters([
          		'img1','img2','img3'
			])
			// img1() {
			// 	return window.localStorage.getItem("img1Show");
			// },
			// img2() {
			// 	return window.localStorage.getItem("img2Show");
			// },
			// img3() {
			// 	return window.localStorage.getItem("img3Show");
			// },
		},
		watch: {
			
		},
		created () {
		},
		methods: {
			set(num) {
				if(num === 1){
					window.localStorage.setItem("img1Show", true);
					this.$store.dispatch('SETIMG1', { img1: true});
					window.localStorage.setItem("img2Show", false);
					this.$store.dispatch('SETIMG2', { img2: false});
					window.localStorage.setItem("img3Show", false);
					this.$store.dispatch('SETIMG3', { img3: false});
					this.$router.push('/index');
				}
				if(num === 2){
					window.localStorage.setItem("img2Show", true);
					this.$store.dispatch('SETIMG2', { img2: true});
					window.localStorage.setItem("img1Show", false);
					this.$store.dispatch('SETIMG1', { img1: false});
					window.localStorage.setItem("img3Show", false);
					this.$store.dispatch('SETIMG3', { img3: false});
					this.$router.push('/debt/debtList');
				}
				if(num === 3){
					window.localStorage.setItem("img3Show", true);
					this.$store.dispatch('SETIMG3', { img3: true});
					window.localStorage.setItem("img1Show", false);
					this.$store.dispatch('SETIMG1', { img1: false});
					window.localStorage.setItem("img2Show", false);
					this.$store.dispatch('SETIMG2', { img2: false});
					this.$router.push('/my/personalCenter');
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.footercontent{
	    width: 750px;
		display: flex;
        display: -webkit-flex;
		height: 102px;
		background:rgba(255,255,255,1);
		position: fixed;
		bottom: 0;
		border-top:1px solid rgba(225,225,225,1);
		z-index: 99;
		.tabItem{
			flex: 1;
			font-size: 20px;
			height: 102px;
			width: 50px;
			color: rgba(151,151,151,1);
			font-size:22px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			//list-style: none;
			text-align: center;
			&>img{
				width: 48px;
				height: 48px;
				margin-top: 15px;
			}
			// .tab_img{
			// 	width: 0.48px;
			// 	height: 0.48px;
			// 	&>img{
			// 		width: 0.48px;
			// 		height: 0.48px;
			// 	}
			// }
			// .title{
			// 	margin-top: 0.08px;
			// 	height: 0.21px;
			// 	width: 100%;
			// }
		}
		.hover{
			color: rgba(86,132,252,1);
		}
	}
	// .footercontent li a{
	// 	text-decoration: none;
	// 	color: black;
	// 	padding-top: 0.6px;
	// 	display: block;
	// }
	// .footercontent li .router-link-exact-active{
	// 	color: #15b038;
		
	// }
</style>


