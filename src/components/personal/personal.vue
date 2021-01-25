<template>
  <div class="perback">
    <div>
      <!-- <van-nav-bar title="个人中心" /> -->
      <div class="btonses_op">
        {{$t('m.Personal.Center1')}}
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="personaltitle">
      <div class="f-flex f-jc-sb box-shadow">
        <div class="f-flex user">
          <div>
            <div style="overflow: hidden;width:60px;height:60px;border-radius: 50%;box-sizing:border-box">
              <img class="avatar"
                   v-if="user.avatar == ''"
                   src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604036896786&di=21a84d9b1830176fbe43cec372fe9762&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F11%2F23%2Fe6827218cdf1b7379447940304afac77.jpg"
                   alt />
              <img class="avatar"
                   :src="user.avatar"
                   alt />

            </div>

          </div>
          <div>
            <p>{{ user.mobile }}</p>
            <!-- <p>{{ user.nickname }}</p> -->
          </div>
        </div>
        <div class="f-flex">
          <!-- <i @click="edit" class="el-icon-edit-outline"></i>
          <i class="el-icon-setting"></i> -->
          <p class="userGender">{{user.give}}</p>
        </div>
      </div>
      <div class="box-shadow"
           style="border-radius: 12px;margin-bottom: 14px;">
        <div>
          <p>
            {{$t('m.Personal.Center2')}}
            <span>{{ user.credit2 }}</span>
          </p>
          <p>
            <el-button type="primary"
                       @click="recharge">{{$t('m.Personal.Center3')}}</el-button>
            <el-button type="primary"
                       @click="withdraw">{{$t('m.Personal.Center4')}}</el-button>
            <el-button v-if="user.treasure_enabled == 1"
                       type="primary"
                       @click="treasure">{{$t('m.Personal.Center25')}}</el-button>
          </p>

        </div>
        <div>
          <ul class="f-flex">
            <li @click="selections(3)">
              <p>{{user.task}}</p>
              <p>{{$t('m.Personal.Center5')}}</p>
            </li>
            <li @click="selections(2)">
              <p>{{user.task_comm}}</p>
              <p>{{$t('m.Personal.Center6')}}</p>
            </li>
            <li @click="selections(4)">
              <p>{{user.meal}}</p>
              <p>{{$t('m.Personal.Center7')}}</p>
            </li>
            <li @click="selections('')">
              <p>{{user.all_money}}</p>
              <p>{{$t('m.Personal.Center8')}}</p>
            </li>
          </ul>
        </div>
        <div class="persoaltask f-flex"
             style="flex-wrap: wrap;">
          <div v-for="(item,index) in user.task_grade_count"
               :key="index">
            <p>{{item.task_grade_name}}</p>
            <p>{{item.task_count_perform}} / {{item.task_count}} </p>

            <p>{{$t('m.Personal.Center9')}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <!-- <div class="p20"> -->
    <!-- <div class="iconbar">
			<div class="icom_barlist" v-for="(item,index) in  link_base" :key="index" @click="go_order(item.type)">
				<div class="bar_imgsq">
					<img :src="item.i_url"/>
				</div>
				<span>{{item.name}}</span>
			</div>
		</div> -->
    <!-- 任务 -->

    <!-- 待付款 -->
    <!-- <div class="personalorder">
        <ul class="f-flex">
          <li>
            <p>
              <van-icon name="paid" />
            </p>
            <p>待付款</p>
          </li>
          <li>
            <p>
              <van-icon name="send-gift-o" />
            </p>
            <p>待发货</p>
          </li>
          <li>
            <p>
              <van-icon name="tosend" />
            </p>
            <p>待收货</p>
          </li>
          <li>
            <p>
              <van-icon name="sign" />
            </p>
            <p>已完成</p>
          </li>
          <li>
            <p>
              <van-icon name="orders-o" />
            </p>
            <p>我的订单</p>
          </li>
        </ul>
      </div> -->
    <!-- </div> -->
    <!-- 更多功能 -->
    <div class="or-lin"
         style="height: 4px;"></div>
    <div class="more">
      <!-- <div class="f-flex f-jc-sb" @click="selection(1)">
        <p class="f-flex">
          <van-icon name="point-gift" />
          <span>我的店铺</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div> -->
      <!-- <div class="f-flex f-jc-sb " @click="selection(2)">
        <p class="f-flex">
          <van-icon name="add-square" />
          <span>{{$t('m.Personal.Center10')}}</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div> -->
      <!-- <div class="f-flex f-jc-sb" @click="selection(3)">
        <p class="f-flex">
          <van-icon name="column" />
          <span>{{$t('m.Personal.Center11')}}</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div> -->
      <!-- <div class="f-flex f-jc-sb" @click="selection(11)">
	    <p class="f-flex">
	      <van-icon name="column" />
	      <span>我的购物车</span>
	    </p>
	    <p>
	      <van-icon name="arrow" />
	    </p>
	  </div> -->
      <p class="or-lin"
         style="height: 4px;"></p>

      <div class="f-flex f-jc-sb"
           @click="selection(4)">
        <p class="f-flex">
          <van-icon name="balance-list" />
          <span>{{$t('m.Personal.Center12')}}</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <div class="f-flex f-jc-sb"
           @click="selection(5)">
        <p class="f-flex">
          <van-icon name="gold-coin" />
          <span>{{$t('m.Personal.Center13')}}</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <div class="f-flex f-jc-sb"
           @click="selection(6)">
        <p class="f-flex">
          <van-icon name="invition" />
          <span>{{$t('m.Personal.Center14')}}</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <div class="f-flex f-jc-sb"
           @click="selection(7)">
        <p class="f-flex">
          <van-icon name="friends" />
          <span>{{$t('m.Personal.Center15')}}</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <!-- <div class="f-flex f-jc-sb" @click="selection(8)">
        <p class="f-flex">
         <van-icon name="medal" />
          <span>中奖记录</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
        <div class="f-flex f-jc-sb" @click="selection(9)">
        <p class="f-flex">
          <van-icon name="cart-circle" />
          <span>团购记录</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div> -->
      <div class="f-flex f-jc-sb"
           @click="selection(14)">
        <p class="f-flex">
          <van-icon name="cart-circle" />
          <span>{{$t('m.Personal.Center16')}}</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <!-- <div class="f-flex f-jc-sb" @click="selection(13)">
	    <p class="f-flex">
	      <van-icon name="cart-circle" />
	      <span>收货地址</span>
	    </p>
	    <p>
	      <van-icon name="arrow" />
	    </p>
	  </div> -->

      <div v-if="user.treasure_enabled == 1"
           class="f-flex f-jc-sb"
           @click="selection(12)">
        <p class="f-flex">
          <van-icon name="cart-circle" />
          <span>{{$t('m.Personal.Center26')}}</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <div class="f-flex f-jc-sb"
           @click="changePwd">
        <p class="f-flex">
          <van-icon name="friends" />
          <span>{{$t('m.Personal.Center28')}}</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <!-- <div class="f-flex f-jc-sb" @click="selection(10)">
        <p class="f-flex">
         <van-icon name="photograph" />
          <span>我的晒单</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>  -->

    </div>

    <div class="exit">
      <el-button type="primary"
                 @click="displayout">{{$t('m.Personal.Center17')}}</el-button>
    </div>

    <!-- 退出提示框 -->
    <div class="outBox_mask"
         v-if="outbox">
      <div class="outbox">
        <p class="out_Tips">{{$t('m.Personal.Center22')}}</p>
        <div class="out_btn_box">
          <p class="cancel"
             @click="hideout">{{$t('m.Personal.Center24')}}</p>
          <p class="determine"
             @click="exit">{{$t('m.Personal.Center23')}}</p>
        </div>
      </div>
    </div>
    <div style="width:100%;height:98px"></div>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from '@/components/index/footer'

export default {
  components: {
    Foot
  },
  data () {
    return {
      user: "",
      link_base: [
        {
          name: this.$t('m.Personal.Center18'),
          type: 3,
          i_url: require("../../assets/pick.png")
        },
        {
          name: this.$t('m.Personal.Center19'),
          type: 4,
          i_url: require("../../assets/send.png")
        },
        {
          name: this.$t('m.Personal.Center20'),
          type: 5,
          i_url: require("../../assets/complet.png")
        },
        {
          name: this.$t('m.Personal.Center21'),
          type: 0,
          i_url: require("../../assets/order.png")
        }],
      // host:process.env.NODE_ENV=='development'?'http://5114.chac.xyz/':`${location.protocol}//${location.host}`,
      host: 'https://app.goodjobsapp.com',
      outbox: false
    };
  },
  mounted () {
    this.getinfo();
    this.level()
  },
  methods: {
    changePwd () {
      this.$router.push({ path: '/changePwd' })
    },
    go_order (e) {
      this.$router.push({ name: "orderlist", query: { type: e } });
    },
    getinfo () {
      this.$api.Post("getinfo").then(res => {
        if (res.status == 1) {
          this.user = res.result.list;
        }
      });
    },
    //编辑
    edit () {
      location.href = `${this.host}/app/index.php?i=4&c=entry&do=profile&m=weliam_indiana`
    },

    level () {
      this.$api.Post('level').then(res => {

      })
    },
    mytask (e) {
      //this.$router.push({ name: "task",query:{takeid:e} });
    },
    //更多功能
    selection (e) {
      var language = window.localStorage.getItem('language');
      var lang;
      if (language == "" || language == "cn-CN") {
        lang = "cn"
      } else {
        lang = "en"
      }

      if (e == 2) {
        this.$router.push({ name: "issue" });
      }
      if (e == 3) {
        this.$router.push({ name: "manage" });
      }
      if (e == 4) {
        this.$router.push({ name: "record" });
      }
      if (e == 5) {
        this.$router.push({ name: "financial" });
      }
      if (e == 6) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&method=shares&p=commission&m=sz_yi&do=plugin&lang=` + lang
      }
      if (e == 7) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&method=team&p=commission&m=sz_yi&do=plugin&lang=` + lang
      }
      if (e == 8) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&do=order_get&m=weliam_indiana`
      }
      if (e == 9) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&do=order&m=weliam_indiana`
      }
      if (e == 10) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&do=myshare&m=weliam_indiana`
      }
      if (e == 11) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&op=cart_detail&do=cart&m=weliam_indiana`
      }
      if (e == 12) {
        this.$router.push({ name: "payRecords" });
      }
      if (e == 13) {
        location.href = `${this.host}/app/index.php?i=4&c=entry&do=address&m=weliam_indiana`
      }
      if (e == 14) {
        this.$router.push({ name: "financial", query: { type: 4 } });
      }
    },
    selections (e) {
      this.$router.push({ name: "financial", query: { type: e } });
    },

    //提现
    withdraw () {
      this.$router.push({ name: 'withdraw', query: { money: this.user.credit2 } })
    },
    //充值
    recharge () {
      this.$router.push({ name: 'recharge' })
    },
    treasure () {
      this.$router.push({ name: 'treasure' })
    },
    // 点击显示退出框
    displayout () {
      this.outbox = true;
    },
    // 点击隐藏退出框
    hideout () {
      this.outbox = false;
      console.log(this.outbox)
    },
    //退出登录
    exit () {
      this.$api.Post('logout').then(res => {
        this.delCookie('openid')
        this.$router.push({ path: '/' })
      })
    },
    delCookie (c_name) {
      this.setCookie(c_name, "", -1);
    },
    setCookie (c_name, value, expire) {
      var date = new Date()
      date.setSeconds(date.getSeconds() + expire)
      document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()

    },
  }
};
</script>

<style lang="less">
.persoaltask div:nth-child(odd) {
}
.iconbar {
  display: flex;
  padding: 5px 0px;
  justify-content: space-between;
}
.iconbar span {
  font-size: 14px;
  margin-top: 4px;
  display: inline-block;
}
.iconbar img {
  width: 30px;
  display: block;
  margin: 0 auto;
}
.btonses_op {
  // background: #37a2f0;
  line-height: 42px;
  text-align: center;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
}
.personaltitle {
  position: relative;
  // background: #37a2f0;
  // border-radius: 0 0 30px 30px;
  padding: 0 15px 0 15px;
  overflow: hidden;
  > div:nth-child(1) {
    color: #fff;
    margin-top: 20px;
    background: #171c2f;
    padding: 15px;
    border-radius: 8px;
    > div:nth-child(1) {
      //头像及账号
      line-height: 28px;
      img {
        width: 65px;
        height: 65px;
        margin: -5px 0 0 -5px;
        display: inline-block;
        background: #1e243d;
      }
    }
    > div:nth-child(2) {
      font-size: 26px;
      padding-top: 15px;
      > i:nth-child(2) {
        margin-left: 25px;
      }
    }
  }
  > div:nth-child(2) {
    margin-top: 20px;
    background: #171c2f;
    padding: 15px;
    border-radius: 8px 8px 0 0;
    text-align: center;
    > div:nth-child(1) {
      > p:nth-child(1) {
        span {
          color: #f90;
          font-weight: 600;
          font-size: 0.6rem;
        }
      }
      button {
        padding: 10px 10px;
        margin: 10px;
      }
    }
    > div:nth-child(2) {
      margin-top: 10px;
      border-radius: 8px;
      overflow: hidden;
      li {
        width: 25%;
        text-align: center;
        //  color: #666;
        font-size: 12px;
        background: #1e243d;
        padding: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
        > p:nth-child(1) {
          font-weight: 700;
          color: #c98954;
          font-size: 20px;
          margin-bottom: 8px;
          white-space: nowrap;
        }
      }
    }
  }
}
.persoaltask {
  // background: #ffffff;
  border-radius: 8px;
  line-height: 30px;
  padding: 15px 0;
  > div {
    width: 49%;
    text-align: center;
    background-color: #1e243d;
    border-radius: 8px;
    margin: 0.5%;
    padding: 5px 0 10px;
    > p:nth-child(1) {
      font-size: 12px;
      color: #1e95c9;
    }
    > p:nth-child(2) {
      font-weight: 700;
      font-size: 22px;
      margin: 6px auto;
    }
    > p:nth-child(3) {
      font-size: 12px;
      line-height: 14px;
      color: #fff;
    }
  }
  > div:nth-child(1) {
    // border-right: 1px solid #ccc;
  }
}
.personalorder {
  margin-top: 20px;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.15);
  background: #ffffff;

  li {
    width: 20%;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    i {
      font-size: 30px;
    }
  }
}
.more {
  > div {
    padding: 0.3rem 0.42rem;
    font-size: 0;
    // background: #ffffff;
    // border-bottom: 1px solid #eee;
    span {
      display: inline-block;
      font-size: 16px;
    }
    i {
      font-size: 22px;
      margin-right: 10px;
    }
  }
}
.perback {
  background: #f2f2f2;
}
.exit {
  button {
    width: 100%;
  }
}
// 退出框
.outBox_mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.outbox {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 111px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  white-space: nowrap;
}
.out_Tips {
  width: 100%;
  text-align: center;
  line-height: 45px;
  padding: 10px 0;
  border-bottom: 1px solid #e5e5e5;
  color: #000;
}
.out_btn_box {
  height: 45px;
  line-height: 45px;
}
.out_btn_box p {
  display: inline-block;
  width: 50%;
  height: 100%;
  text-align: center;
  color: #000;
}
.cancel {
  border-right: 1px solid #e5e5e5;
}
.exit {
  margin: 15px;
}
.userGender {
  color: #c98954;
  font-size: 20px;
  line-height: 20px;
}
</style>
