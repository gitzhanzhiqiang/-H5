<template>
	<div>
		<headCon></headCon>
		<blank></blank>
		<!--表单开始-->
		<div class="saledebt">
			<div class="saledebt-div">
				<ul>
					<li style="position:relative;">
						<span>平台名称</span>
						<input type="text" placeholder="请输入债权平台名称" v-model="params.pfName" class="saledebt-div-input" v-on:input="getPlatform()" @blur.prevent="changeCount()" />
						<ul v-if="pfNameList" style="position: absolute;left:130px;top:86px;width:557px;z-index:999;background-color:#ccc;">
							<li style="height:86px;line-height:86px;" v-for="(item,index) in pfNameList" :key="index" :value="item" v-text="item" @click="params.pfName = item;pfNameList = [];"></li>
						</ul>
					</li>
					<li>
						<span>转让金额</span>
						<input type="text" placeholder="请输入转让金额" v-model.number="params.amount" class="saledebt-div-input" />
					</li>
					<li>
						<span>标的年化</span>

						<input style="width:60%;" type="text" v-model.number="params.annualRate" placeholder="请输入标的历史年化" class="saledebt-div-input" />
						<span style="text-align: right;">%</span>
					</li>
					<li>
						<span>债权到期日</span>
						<div @click="openPicker" style="width:100%;height:100%;line-height:86px;"> {{time | parseTime('{y}-{m}-{d}')}}</div>

						<!-- <input type="text" v-model="params.surplusPeriod" placeholder="请输入标的历史年化" class="saledebt-div-input" /> -->
					</li>
					<!-- <li>
							<span>剩余期限</span>
							<label class="single"><input type="radio" name="sex" value="1" checked="checked" v-model="params.surplusPeriodType" />日</label>
							<label class="single"><input type="radio" name="sex" value="2" v-model="params.surplusPeriodType" />月</label>
						</li>
						<li v-if="params.surplusPeriodType === '1'||params.surplusPeriodType === '2'">
							<span>剩余期限</span>
							<input type="text" v-model="params.surplusPeriod" placeholder="请输入剩余期限" class="saledebt-div-input" />
						</li> -->
					<li>
						<span>还款方式</span>
						<select class="select" v-model="params.repaymentType" placeholder="请选择还款方式">
							<option value="0">一次性还本付息</option>
							<option value="1">先息后本</option>
							<option value="2">等额本息</option>
							<option value="3">等额本金</option>
						</select>
					</li>
					<li>
						<span>转让折扣</span>
						<input type="text" v-model.number="params.discountRate" v-on:input="getAmount()" placeholder="请输入转让折扣" class="saledebt-div-input" />
					</li>
					<li>
						<span>折扣金额</span>
						<input type="text" disabled v-model="params.discountAmount" placeholder="请输入折扣金额" class="saledebt-div-input" />
					</li>
					<li>
						<span>转让有效期</span>
						<select class="select" v-model="params.effDay" placeholder="请选择转让有效期">
							<option v-for="(item,index) in 10" :value="item" :key="index">{{item}}天</option>
						</select>
					</li>
					<li>
						<span>债转链接</span>
						<input type="text" v-model="params.link" placeholder="请输入在债权平台发布的债权链接" class="saledebt-div-input" />
					</li>
					<li>
						<span>定向债权</span>
						<label class="single"><input type="radio" name="ding" value="1" checked="checked" v-model="params.orientFlag" />是</label>
						<label class="single"><input type="radio" name="ding" value="0" checked="checked" v-model="params.orientFlag" />否</label>
					</li>
					<li v-if="params.orientFlag==='1'">
						<span>债权密码</span>
						<input type="password" maxlength="6" v-model="params.tranPwd" placeholder="请输入六位数数字和字母组合" class="saledebt-div-input" />
					</li>
					<li>
						<span>是否预付</span>
						<label class="single"><input type="radio" name="yufu" value="1" checked="checked" v-model="params.prepayFlag" />是</label>
						<label class="single"><input type="radio" name="yufu" value="0" v-model="params.prepayFlag" />否</label>
					</li>
					<li>
						<span>验证码</span>
						<input type="text" placeholder="请输入图形验证码" class="saledebt-ma" v-model="params.captcha" />
						<p class="salededt-tu" @click="reLoad();">
							<img :src="imgUrl" id="valideImg" />
						</p>
					</li>
				</ul>

				<div class="saledebt-btn">
					<button class="saledebt-on" @click="debtTrans">立即债转</button>
				</div>
				<mt-datetime-picker ref="picker" v-model="params.surplusPeriod" type="date" @confirm="handleConfirm">
				</mt-datetime-picker>
			</div>
		</div>
		<!--支付框-->
		<balancePay :confirmBox="confirmBox" :params="params"></balancePay>
	</div>
</template>
<script>
import ajax from '@utils/config';
import headCon from '@/components/header.vue';
import blank from '@/components/blank.vue';
import isWeiXin from '@/assets/js/commin';
import baseURL from '@/assets/js/ajax/baseURL';
import balancePay from '@/components/balancePay.vue';
import { parseTime } from '@/filters';
import { DatetimePicker } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
	components: {
		headCon,
		balancePay,
		blank
	},
	data() {
		return {
			isWeiX:null,
			imgUrl: '',
			alertData: {
				isShow: false,
				message: '',
			},
			time: null,
			pickerValue: null,
			params: {
				advanceChargeStatus: '',
				amount: '',
				annualRate: '',
				captcha: "",
				discountAmount: '',
				discountRate: '',
				effDay: 1,
				extendFlag: '',
				insUserId: 0,
				link: "",
				tranPwd: "",
				logoUrl: "",
				orientFlag: 0,
				payType: "",
				pfName: "",
				prepayFlag: 0,
				repaymentType: 0,
				surplusPeriod: new Date(),
				surplusPeriodType: "",
				updUserId: 0,
				userCardId: '',
				userId: 0,
				userTransPassword: ""
			},
			pfNameList: [],
			confirmBox: {//确认支付弹框
                isShow: false,
                realAmount: '',
                str: '',
                suffix:'',
                fare: '0.00',
                amount: '',
                bankCardNo:'',
                validatecode: '',
				requestno: '',
				userCardId: '',
				payType: 2,
				transPassword:'',
				id:'',
			},
			count: '',
			isShow: false,
			productlist: '',
			requestnoStatus:false,
			payStyleBox: {//支付方式
				isShow: false,
				bankList:[]
			},
			// itemImg1Show: true,
			// itemImg2Show: false,
			cardCheckList: [],
			isBindCard: ''//是否绑卡
		}
	},
	computed: {},
	created() {
		this.isWeiX = isWeiXin();
		this.params.surplusPeriod = parseTime(this.params.surplusPeriod, '{y}-{m}-{d} {h}:{i}:{s}');
		this.reLoad();
		this.getBanklist();
	},
	mounted() {
	},
	methods: {
		func() {
			history.go(-1)
		},
		//刷新图片
		reLoad() {
			let xmlhttp;
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", baseURL() + "orderTransfer/captcha", true);
			xmlhttp.responseType = "blob";
			xmlhttp.setRequestHeader("token", window.localStorage.getItem("token"));
			let that = this;
			xmlhttp.onload = function() {

				if (this.status == 200) {
					let blob = this.response;
					let img = document.getElementById("valideImg");
					img.src = window.URL.createObjectURL(blob);
				}
			}
			xmlhttp.send();
		},
		//债转
		debtTrans() {
			console.log(this.params)
			if (!this.params.pfName) {
				Toast('请输入债权平台名称');
				return false;
			}
			if (!this.params.amount) {
				Toast('请输入转让金额');
				return false;
			}
			if (!this.params.annualRate) {
				Toast('请输入标的历史年化');
				return false;
			}
			if (!this.time) {
				Toast('请输入债权到期日');
				return false;
			}
			if (this.params.repaymentType==="") {
				Toast('请选择还款方式');
				return false;
			}
			if (!this.params.discountRate) {
				Toast('请输入转让折扣');
				return false;
			}
			if (!this.params.effDay) {
				Toast('请选择转让有效期');
				return false;
			}
			if (!this.params.link) {
				Toast('请输入在债权平台发布的债权链接');
				return false;
			}
			if (this.params.orientFlag!=0&&this.params.orientFlag!=1) {
				Toast('请选择定向债权');
				return false;
			}
			// if (!this.params.tranPwd) {
			// 	Toast('请输入交易密码');
			// 	return false;
			// }
			if (this.params.prepayFlag!=0&&this.params.prepayFlag!=1) {
				Toast('请选择是否预付');
				return false;
			}
			if (!this.params.captcha) {
				Toast('请输入图形验证码');
				return false;
			}
			if (this.params.orientFlag==='1'&&!this.myfunction(this.params.tranPwd)){
				Toast('请输入六位数数字和字母组成的验证码');
				return false;
			}
			this.params.surplusPeriod = parseTime(this.params.surplusPeriod, '{y}-{m}-{d} {h}:{i}:{s}');
			this.params.orientFlag = Number(this.params.orientFlag);
			this.params.prepayFlag = Number(this.params.prepayFlag);
			this.params.repaymentType = Number(this.params.repaymentType);
			//是否预付
			if(this.params.prepayFlag === 1) {
				this.confirmBox.amount = this.params.discountAmount;
				this.confirmBox.isShow = true;
				if(this.isBindCard===0){
					this.$router.push('/my/bankcard');
				}
			}
			if(this.params.prepayFlag === 0) {
				this.transfer();
			}
			this.params.orientFlag=this.params.orientFlag+'';
		},
		//出售债转
		transfer() {

			ajax({
				url: "orderTransfer",
				optionParams: this.params
			}).post()
				.then(res => {
					if (res.code === 200) {
						Toast('发布成功');
						this.$router.push('/index');
					}else {
						Toast(res.message);
						this.confirmBox.isShow = true;
						this.confirmBox.validatecode = '';
						this.confirmBox.transPassword = '';
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//blob对象转url
		fileOrBlobToDataURL(blob) {
			var a = new FileReader();
			a.readAsDataURL(blob);
			a.onload = function(e) {
				console.log(e.target.result);
			};
		},
		//是否绑卡
		getBanklist() {
            ajax({
                url: 'tAppUser/userInfo',
                optionParams: {}
            }).fetch()
                .then(response => {
                    if (response.code === 200) {
                        this.isBindCard = response.data.isBindCard;
                    } else {
                        console.log(response)
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        },
		//时间选择器事件
		openPicker() {
			this.$refs.picker.open();
		},
		//时间选择器确定事件
		handleConfirm() {
			this.params.surplusPeriod = parseTime(this.params.surplusPeriod, '{y}-{m}-{d} {h}:{i}:{s}');
			this.time = this.params.surplusPeriod;
		},
		//计算折扣金额
		getAmount() {
			if(this.params.amount&&this.params.discountRate) {
				this.params.discountAmount = this.formatMoney(this.params.amount - this.params.amount * this.params.discountRate / 10);
			} else {
				Toast('请输入转让金额或转让折扣');
				this.params.discountAmount = '';
				return false;
			}
			
		},
		//m模糊查询平台列表
		getPlatform() {
			if (this.params.pfName) {
				ajax({
					url: "orderTransfer/findPfNames",
					optionParams: {
						name: this.params.pfName
					}
				}).post()
					.then(res => {
						if (res.code === 200) {
							this.pfNameList = res.data;
						} else {
							this.pfNameList = [];
						}
					})
					.catch(error => {
						console.log(error)
					})
			}

		},
		//
		changeCount() {
			this.pfNameList = [];
		},
		//金钱过滤
		formatMoney(val) {
		return val.toFixed(2);
		},
		//6位数字字母校验
		myfunction(value){
			if(value.match("([0-9](?=[0-9]*?[a-zA-Z])\\w{5})|([a-zA-Z](?=[a-zA-Z]*?[0-9])\\w{5})")){
				return true;
			} else {
				return false;
			}
		}
	},
	filters: {
		//银行卡显示四位
        bankCardShow(bankCardNo) {
            return bankCardNo.substring(bankCardNo.length-4);
        },
	}
}
</script>
<style lang='scss' scoped>
@import './scss/userManage.scss';
.home-title {
	width: 100%;
	height: 80px;
	text-align: center;
	line-height: 80px;
	font-size: 32px;
	font-weight: 400;
	color: #000;
	text-indent: -2em;
	border-bottom: 1px solid rgba(217, 217, 217, 1);
}

.home-title button {
	width: 100px;
	height: 80px;
	float: left;
}

.home-title img {}

.home-di {
	width: 100%;
	height: 110px;
	background: #fff;
}

.saledebt {
	width: 100%;
	//padding: 110px 0;
	background: #F6F4FA;
}

.saledebt-div {
	width: 100%;
	padding: 10px 0;
	background: #fff;
	overflow: hidden;
}

.saledebt-div ul {
	width: 92%;
	margin: 0 auto;
}

.saledebt-div ul li {
	width: 100%;
	height: 85px; // overflow: hidden;
	border-bottom: 1px solid rgba(217, 217, 217, 1);
}

.saledebt-div ul li span {
	overflow: hidden;
	width: 20%;
	height: 80px;
	float: left;
	font-size: 24px;
	line-height: 80px;
}

.saledebt-div-input {
	width: 80%;
	height: 80px;
	float: left;
	font-size: 24px;
	border: 0;
	line-height: 80px;
}

.single {
	float: left;
	margin: 10px 100px 0 0;
	font-size: 22px;
	line-height: 65px;
}

.single input {
	width: 25px;
	height: 25px;
}

.select {
	width: 80%;
	height: 80px;
	border: 0;
	font-size: 22px;
	background: #fff;
}

.saledebt-ma {
	width: 49%;
	height: 80px;
	float: left;
	font-size: 24px;
	border: 0;
	line-height: 80px;
}

.salededt-tu {
	width: 30%;
	border: 1px solid rgba(217, 217, 217, 1);
	height: 70px;
	float: left;
	margin-top: 6px;
	&>img {
		width: 100%;
		height: 100%;
	}
}

.salededt-tu img {
	width: 100%;
	height: 100%;
}

.saledebt-btn {
	width: 100%;
	height: 160px;
	text-align: center;
	margin-top: 40px;
}

#valideImg {
	&>img {
		width: 100%;
		height: 100%;
	}
}

.saledebt-on {
	width: 60%;
	height: 80px;
	background: #007AFF;
	color: #fff;
	border-radius: 20px;
	font-size: 22px;
}

</style>