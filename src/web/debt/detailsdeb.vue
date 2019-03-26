<template>
	<div class="cash">
		<headCon></headCon>
		<blank></blank>
		<div class="details">
			<div class="details_top">
				<img v-if="detailData.logoUrl" :src="detailData.logoUrl" width="83" height="77" />
				<img v-if="!detailData.logoUrl" src="~@/assets/images/moren.png" />
				<p>
					<button class="danbao">担保</button>
					<button class="dingxiang" v-if="detailData.orientFlag">定向</button>
					<button class="yufu" v-if="detailData.prepayFlag">预付</button>
					<span>订单号：{{orderId}}</span>
				</p>
			</div>
			<div class="details_bottom">
				<ul>
					<li>
						<p>{{detailData.amount}}</p>
						<span>转让金额(元)</span>
					</li>
					<li>
						<p>{{detailData.discountAmount}}</p>
						<span>折扣金额(元）</span>
					</li>
					<li>
						<p>{{detailData.discountRate}}</p>
						<span>转让折扣</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="interest">
			<ul>
				<li>
					<span>年化率</span>{{detailData.annualRate}}%
				</li>
				<li>
					<span>剩余期限</span>{{detailData.surplusPeriodLeftDay}}天
				</li>
				<li>
					<span style="margin-right:19px;">还款方式</span>
					<span style="margin:0;" v-if="detailData.repaymentType ==0">一次性还本付息</span>
					<span style="margin:0;" v-if="detailData.repaymentType ==1">先息后本</span>
					<span style="margin:0;" v-if="detailData.repaymentType ==2">等额本息</span>
					<span style="margin:0;" v-if="detailData.repaymentType ==3">等额本金</span>
				</li>
				<li>
					<span>转让有效期</span>{{detailData.effDay}}天
				</li>
			</ul>
		</div>

		<button class="chenjieren" v-if="detailData.status === 0" @click="underTake()">立即承接</button>
		<button class="chenjieren lock" v-if="detailData.status>10">锁定中</button>
		<button class="yizhuanran" v-if="detailData.status === 4">已下架</button>
		<img class="guizhe" src="~@/assets/images/guize.png" />
		<!-- 输入债权密码 -->
		<div class="delay" v-if="delayData.delayShow">

		</div>
		<div class="msgBox" v-if="delayData.delayShow">
			<div class="msgBox_header">
				<div class="title">
					请输入债权密码
				</div>
			</div>
			<div class="msgBox_content">
				<div class="msgBox_message">
					<span>债权密码:</span>
					<input maxlength="6" type="password" placeholder="请输入债权密码" class="saledebt-ma" v-model="delayData.tranPwd" />
				</div>
			</div>
			<div class="msgBox_btn">
				<div class="msgBox-cancel" @click="delayData.delayShow=false;">取消</div>
				<div class="msgBox-confirm" @click="confirmPwd();">确定</div>
			</div>
		</div>
		<messageBox :isShow="isFalse" :message="message"></messageBox>
		<!-- <a href="www.baidu.com" style="display:none;" @click="gourl()">跳转页面</a> -->
	</div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import messageBox from '@/components/alertxox.vue';
import blank from '@/components/blank.vue';
import { Toast, MessageBox } from 'mint-ui';
import isWeiXin from '@/assets/js/commin';
export default {
	components: {
		headCon,
		messageBox,
		blank
	},
	data() {
		return {
			isWeiX: null,
			orderId: '',
			userId: '',
			isBindCard: "",
			detailData: {},
			isFalse: false,
			message: '',
			delayData: {
				delayShow: false,
				tranPwd: ''
			}
		}
	},
	computed: {},
	created() {

		this.isWeiX = isWeiXin();
		let data = this.$route.query.data ? JSON.parse(this.$route.query.data) : '';
		this.orderId = data.id;

		this.detailData = data;
		window.localStorage.setItem("title", this.detailData.pfName);
		this.getApplyList();
	},
	mounted() { },
	methods: {
		//获取详情数据
		getApplyList() {
			ajax({
				url: "orderTransfer/debtDetail",
				optionParams: {
					orderId: this.orderId,//JSON.parse(this.$route.query.data).id,
				}
			}).post()
				.then(res => {
					console.log(res);
					if (res.code === 200) {
						this.detailData = res.data;
						window.localStorage.setItem("title", this.detailData.pfName);
					} else {
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		gourl(val) {
			if (val.indexOf('http') != -1 || val.indexOf('www') != -1) {
				window.location.href = 'http://' + val;
			} else {
				Toast('平台债权链接地址有误');

			}
		},
		// 1.是否登录，未登录跳出登录页面；
		// 2.是否绑定银行卡，未绑定跳出绑定页面；
		// 3.是否为定向交易，如为定向交易，出现弹窗，要求输入债权密码；
		// 4.是否为预付债转，如为预付债转，直接跳转至设置的债权平台的债权链接地址，跳转后项目状态更改为【锁定中】
		// 5.是否为一般债权，如为一般债权，弹出弹窗提示，并且项目状态更改为【锁定中】
		//立即承接
		underTake() {
			this.getApplyList();
			this.getTable();
			if (this.userId === this.detailData.userId) {
				//不能承接自己的债转
				console.log(33333);
				Toast('不可承接本人发布的债权');
				return false;
			}
			if (this.detailData.orientFlag === 1) {
				this.delayData.delayShow = true;
			} else if (this.detailData.prepayFlag === 1) {
				ajax({
					url: "orderTransfer/holdDebt",
					optionParams: {
						orderId: this.orderId,
						tranPwd: ''
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							let obj = {
								id: this.orderId
							}
							MessageBox({
								title: '承接确认',
								message: '您已确认承接该债转，请耐心等待转让人支付折扣金额至担保账户。',
								showCancelButton: false,
							}).then(action => {
								if (action == 'confirm') {     //确认的回调
									this.$router.push({ path: '/my/detailUnderTakeLock', query: { data: JSON.stringify(obj) } })
								}
							}).catch(err => {
								if (err == 'cancel') {     //取消的回调
									console.log(2);
								}
							});

							this.getApplyList();
						} else {
							Toast(res.message)
						}
					})
					.catch(error => {
						console.log(error)
					})

				// 				



			} else if (this.detailData.assureFlag === 1) {
				ajax({
					url: "orderTransfer/holdDebt",
					optionParams: {
						orderId: this.orderId,
						tranPwd: ''
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							this.getApplyList();
							MessageBox({
								title: '承接确认',
								message: '您已确认承接该债转，请耐心等待转让人支付折扣金额至担保账户。',
								showCancelButton: false,
							}).then(action => {
								if (action == 'confirm') {     //确认的回调
									this.$router.push({ path: '/my/detailUnderTakeLock', query: { data: JSON.stringify(obj) } })
								}
							}).catch(err => {
								if (err == 'cancel') {     //取消的回调
									console.log(2);
								}
							});
						} else {
							Toast(res.message);
						}
					})
					.catch(error => {
						console.log(error)
					})
				
			} else {
			}

		},
		// 2.是否绑定银行卡，未绑定跳出绑定页面；
		goBindCard() {
			this.$router.push('/my/bankcard');
		},
		// 3.是否为定向交易，如为定向交易，出现弹窗，要求输入债权密码；
		confirmPwd() {
			ajax({
				url: "orderTransfer/holdDebt",
				optionParams: {
					orderId: this.orderId,
					tranPwd: this.delayData.tranPwd
				}
			}).post()
				.then(res => {
					if (res.code === 200) {
						// this.isFalse = true;
						this.delayData.delayShow = false;
						MessageBox({
							title: '承接确认',
							message: '您已确认承接该债转，请耐心等待转让人支付折扣金额至担保账户。',
							showCancelButton: false
						}).then(action => {
							if (action == 'confirm') {     //确认的回调
								if (this.detailData.prepayFlag === 1) {
									let obj = {
										id: this.orderId
									}
									this.$router.push({ path: '/my/detailUnderTakeLock', query: { data: JSON.stringify(obj) } })
								}
							}
						}).catch(err => {
							if (err == 'cancel') {     //取消的回调
							}
						});
						// this.message = res.message;
						// setTimeout(() => {
						// 	this.isFalse = false;
						// }, 1200)
						this.getApplyList();
					} else {
						Toast(res.message);
						this.delayData.delayShow = true;
						
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//是否绑卡
		getTable() {
			ajax({
				url: 'tAppUser/userInfo',
				optionParams: {}
			}).fetch()
				.then(res => {
					if (res.code === 200) {
						this.isBindCard = res.data.isBindCard;
						this.userId = res.data.userId;
						if (this.isBindCard != 1) {
							//未绑卡
							this.goBindCard();
						}
						console.log(this.userId);
					} else {
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
.guizhe {
	width: 680px;
	display: block;
	margin: 0 auto;
	margin-top: 20px;
	margin-bottom: 30px;
}

.yizhuanran {
	width: 680px;
	height: 90px;
	display: block;
	background: rgba(191, 191, 191, 1);
	border-radius: 8px;
	margin: 0 auto;
	font-size: 30px;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 72px;
	margin-top: 90px;
	border: 1px solid #BFBFBF;
}

.chenjieren {
	width: 680px;
	height: 90px;
	display: block;
	background: rgba(86, 132, 252, 1);
	border-radius: 8px;
	margin: 0 auto;
	font-size: 30px;
	font-family: PingFang-SC-Regular;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 72px;
	margin-top: 90px;
	border: 1px solid #5684FC;
}

.lock {
	background: rgba(135, 145, 170, 1);
}

.cash {
	width: 100%;
	height: 100%;
	background: rgba(246, 244, 250, 1);
}

.details {
	width: 100%;
	height: 344px;
	background: white;
	margin-top: 3px;
	.details_top {
		width: 100%;
		height: 166px;
		img {
			width: 100px;
			height: 100px;
			margin-top: 34px;
			margin-left: 32px;
			margin-right: 48px;
			float: left;
		}
		p {
			width: 550px;
			height: 100%;
			float: left;
			button {
				width: 90px;
				height: 42px;
				border-radius: 20px;
				background: #fff;
				font-size: 18px;
				margin: 35px 22px 0px 0px;
				float: left;
			}
			span {
				display: block;
				font-size: 28px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 30px;
				margin-top: 100px;
			}
		}
	}

	.details_bottom {
		width: 628px;
		height: 138px;
		background: rgba(255, 255, 255, 1);
		border-radius: 8px;
		box-shadow: 2px 0px 21px rgba(157, 157, 157, 0.11);
		margin: 0 auto;
		li {
			width: 208px;
			float: left;
			p {
				font-size: 26px;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 40px;
				text-align: center;
				margin-top: 35px;
			}
			span {
				font-size: 22px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(102, 102, 102, 1);
				line-height: 35px;
				text-align: center;
				display: block;
			}
		}
	}
}

.dingxiang {
	border: 1px solid #F52E2A;
	color: #F52E2A;
}

.yufu {
	border: 1px solid #F7BB51;
	color: #F7BB51;
}

.danbao {
	border: 1px solid #5684FC;
	color: #5684FC;
}

.interest {
	width: 100%;
	overflow: hidden;
	background: white;
	li {
		width: 374px;
		height: 110px;
		float: left;
		font-size: 28px;
		font-family: PingFang-SC-Regular;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 110px;
		border-bottom: 1px solid #f6f4fa;
		border-right: 1px solid #f6f4fa;
		span {
			font-size: 28px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			margin-left: 34px;
			margin-right: 49px;
		}
	}
}

.delay {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: .8;
	background: #000;
	z-index: 2012;
}

.msgBox {
	position: fixed;
	top: 50%;
	left: 50%;
	-webkit-transform: translate3d(-50%, -50%, 0);
	transform: translate3d(-50%, -50%, 0);
	background-color: #fff;
	width: 60%;
	border-radius: 3px;
	font-size: 16px;
	-webkit-user-select: none;
	overflow: hidden;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-transition: .2s;
	transition: .2s;
	z-index: 9999;
	.msgBox_header {
		width: 100%;
		padding: 15px 0 0;
		.title {
			text-align: center;
			padding-left: 0;
			margin-bottom: 0;
			font-size: 16px;
			font-weight: 700;
			color: #333;
		}
	}
	.msgBox_content {
		width: 100%;
		padding: 10px 20px 15px;
		text-align: center;
		border-bottom: 1px solid #ddd;
		min-height: 36px;
		position: relative;
	}
	.msgBox_btn {
		width: 100%;
		text-align: center;
		line-height: 40px;
		height: 40px;
		font-size: 16px;
		font-weight: 700;
		display: flex;
		display: -webkit-flex;
		.msgBox-cancel {
			flex: 1;
			border-right: 1px solid #ddd;
			display: block;
		}
		.msgBox-confirm {
			flex: 1;
			color: #26a2ff;
			display: block;
		}
	}
}
</style>