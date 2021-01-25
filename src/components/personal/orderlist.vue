<template>
	<div>
		<div >
			 <van-nav-bar :title="$t('m.order.list1')" left-text left-arrow @click-left="$router.go(-1)" />
		</div>
		<div class="f-flex navtask">
			<p :class="[type==3?'active':'']" @click="taskde(3)">{{$t('m.order.list2')}}</p>
			<p :class="[type==4?'active':'']" @click="taskde(4)">{{$t('m.order.list3')}}</p>
			<p :class="[type==5?'active':'']" @click="taskde(5)">{{$t('m.order.list4')}}</p>
			<p :class="[type==0?'active':'']" @click="taskde(0)">{{$t('m.order.list5')}}</p>
		</div>
			<van-list
			  v-model="loading"
			  :finished="finished"
			  :finished-text="$t('m.order.list6')"
			  @load="onLoad"
			>
			<div class="order-content junia" >
					<div class="order-reis" v-for="(item,index) in finanlist" :key="index">
							<div class="title_se">
								<span>{{$t('m.order.list7')}}：{{item.periods}}</span>
								<span>{{statusobj[item.status]}}</span>
							</div>
							<div class="zhu-conten">
								<div class="zhu-img"><img :src="item.goods_img" width="76px"/></div>
								<div class="zhu-title">{{item.title}}</div>
								<div class="zhu-riove">
									<!-- <div class="pris">INR 0.0.1</div>
									<span>x1</span> -->
								</div>
							</div>
							<div class="confilw">
								<span>{{$t('m.order.list8')}}</span>
							</div>
							<div class="pawer">
								<van-button plain color="#666666" round size="small" @click="saidan_ps()" v-if="item.status == 5">{{$t('m.order.list9')}}</van-button>
								<van-button plain color="#666666" round size="small" @click="hack_cainiao(item.express,item.expressn)" v-if="item.status == 4">{{$t('m.order.list10')}}</van-button>
								<van-button plain color="#666666" round size="small" @click="ause_cainiao(item.id)" v-if="item.status == 4">{{$t('m.order.list11')}}</van-button>
							</div>
						</div>
					</div>
			</van-list>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				host:process.env.NODE_ENV=='development'?'http://5016.yesswl.top':`${location.protocol}//${location.host}`,
				type:this.$route.query.type||0,
				finanlist: [],
				loading: false,
				finished: false,
				page:0,
				statusobj:{
					 "3":this.$t('m.order.list2'),
					 "4":this.$t('m.order.list12'),
					 "5":this.$t('m.order.list4')
				}		
			}
		},
		methods:{
			taskde(e) {
			   this.page=0;
			   this.type = e;
			   this.finished = false;
				 this.finanlist = [];
			   this.onLoad()
			},
			saidan_ps(){
				location.href=`${this.host}/app/index.php?i=4&c=entry&do=myshare&m=weliam_indiana`
			},
			hack_cainiao(express,expressn){
				this.$router.push({name:'copys',params:{
					express,
					expressn
				}})
			},
			ause_cainiao(id){
	       this.$dialog.confirm({
					title: this.$t('m.order.list11'),
					message: this.$t('m.order.list13'),
				}).then(() => {
					
					location.href=`${this.host}/app/index.php?i=4&c=entry&op=confirmm&pid=${id}&do=order_get&m=weliam_indiana`
						 // this.$api	 
						 // 	.Get("sureorder", {
							// 	pid:id
						 // 	})
						 // 	.then(res => {
						 // 		if (res.status == 1) {
									
						 // 		}
						 // 	});
					})
					.catch(() => {
						// on cancel
					});
			},
			onLoad() {
					// 异步更新数据
          this.page++;
          this.$api
            .Post("order", {
              status: this.type,
              page: this.page
            })
            .then(res => {
              if (res.status == 1) {
                this.finanlist = this.finanlist.concat(res.result.list);
                // 数据全部加载完成
                if (res.result.list.length < 10) {
                  this.finished = true;
                }
              }
            });
          // 加载状态结束
          this.loading = false;
				}
		},

	}
</script>
<style lang="less">
	.junia{
		// height: 100vh;
		// background: #f3f3f3;
	}
.order-reis{
	margin-top: 12px;
	background: #fff;
	.title_se{
		padding: 8px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
		
		span:nth-child(1){
			color:#a3a3a3;
			font-size: 14px;
		}
		span:nth-child(2){
			color:#ff5555;
			font-size: 14px;
		}
	}
	.zhu-conten{
		display: flex;
		padding: 8px 5px;
		border-bottom: 1px solid #eee;
		.zhu-img{
			padding-left: 8px;
		}
		.zhu-title{
			padding-left: 8px;
			font-size: 14px;
		}
		.zhu-riove{
			flex: 2;
			text-align: right;
			padding-right: 8px;
			span{
				color: #a3a3a3;
				font-size: 12px;
			}
		}
	}
	
	.confilw{
		color: #a3a3a3;
		padding: 8px 5px;
		border-bottom: 1px solid #eee;
		text-align: right;
		.sp12{
			color: #ff5555;
		}
	}
	.pawer{
		display: flex;
		flex-direction: row-reverse;
		padding: 8px 5px;
		button{
			margin-right: 9px;
		}
	}
}
.navtask {
  border-bottom: 1px solid #1e243d;
  padding: 10px;
  .active {
    color: #57a1ec;
    background-color: #171c2f;
  }
  > p {
    width: 33%;
    text-align: center;
    padding: 0.3rem 0;
    border-radius: 0.16667rem;
  }
}
.meallist .f-jc-sb:nth-child(1){
  background: #171c2f;
}

</style>