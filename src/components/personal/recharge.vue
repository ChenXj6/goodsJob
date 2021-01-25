<!--  -->
<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.Recharge.Recharge1')"
                   left-text
                   left-arrow
                   @click-left="onClickLeft" />
    </div>
    <div class="ras f-flex">
      <div class="recharges">
        <!-- <p><el-input v-model="money" :placeholder="$t('m.Recharge.Recharge2')"></el-input></p>
         <p><el-button type="primary" @click="showPicker=true">充值方式</el-button></p> -->
        <form class="form-horizontal js-ajax-form margin-top-20">
          <input type="text"
                 class="form-control form-money"
                 name="amount"
                 placeholder="Please enter the top-up amount"
                 :disabled="!haveSign"
                 v-model="money">
          <input type="text" v-if="pay_type == 'moco'"
                 class="form-control form-hidden"
                 name="appid"
                 :value="accountName">
          <input type="text"
                 class="form-control form-hidden"
                 name="appid"
                 :value="appid">
          <input type="text"
                 class="form-control form-hidden"
                 name="out_trade_no"
                 :value="out_trade_no">
          <input type="text"
                 class="form-control form-hidden"
                 name="version"
                 :value="version">
          <input type="text"
                 class="form-control form-hidden"
                 name="pay_type"
                 :value="pay_type">
          <input type="text"
                 class="form-control form-hidden"
                 name="callback_url"
                 :value="callback_url">
          <input type="text"
                 class="form-control form-hidden"
                 name="success_url"
                 :value="success_url">
          <input type="text"
                 class="form-control form-hidden"
                 name="error_url"
                 :value="error_url">
          <input type="text"
                 class="form-control form-hidden"
                 name="sign"
                 :value="sign">
                 {{sign}}
          <p>
            <el-button type="primary"
                       @click="openDialong"
                       class="btn"
                       v-if="haveSign">Enter the amount</el-button>
          </p>
        </form>
      </div>

    </div>
    <van-popup v-model="showPicker"
               position="bottom">
      <van-picker show-toolbar
                  :columns="columns"
                  @confirm="onConfirm"
                  @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      money: '',
      value: '',
      columns: [],
      op: [],
      showPicker: false,
      host: process.env.NODE_ENV == 'development' ? 'http://5016.yesswl.top' : `${location.protocol}//${location.host}`,
      postData: {
      },
      money: '',
      sign: '',
      url: '',
      appid: '',
      out_trade_no: '',
      version: '',
      pay_type: '',
      callback_url: '',
      success_url: '',
      error_url: '',
      dislong: false,
      haveSign: true,
      maxmoney:'',
      minmoney:'',
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {
    this.logo()
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    
  },
  methods: {
    openDialong () {
      if (this.money == '') {
        this.$toast('Please enter the recharge amount!')
        return
      }else if(this.money < this.minmoney){
        this.$toast(this.$t('m.Recharge.Recharge6') + this.minmoney)
        return
      }else if(this.money > this.maxmoney){
        this.$toast(this.$t('m.Recharge.Recharge7') + this.maxmoney)
        return
      }
      this.$router.push({ name: 'rchange', query: { amount: this.money ,paytype:this.pay_type} })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    logo () {
      this.$api.Post('logo').then(res => {
        if(res.status == 1){
          this.pay_type = res.result.pay_type
          this.maxmoney = Number(res.result.maxmoney)
          this.minmoney = Number(res.result.minmoney)
        }
      })
    },
    onConfirm (value, index) {
      this.value = index;
      this.showPicker = false;
      this.recharges(this.op[this.value].val);
    },
    
    recharges (e) {
      if (this.money == '') {
        this.$toast(this.$t('m.Recharge.Recharge4'))
        return;
      }else if(this.money < this.minmoney){
        this.$toast(this.$t('m.Recharge.Recharge6') + this.minmoney)
        return
      }else if(this.money > this.maxmoney){
        this.$toast(this.$t('m.Recharge.Recharge7') + this.maxmoney)
        return
      }
      this.$api.Post('recharge', {
        money: this.money,
        PayType: e
      }).then(res => {
        if (res.status == 0) {
          this.$toast(res.result.message)
          return;
        }
        if (res.status == 1) {
          location.href = res.result.val;
        }
      })
    },
  },
}
</script>
<style lang="less">
.ras {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.recharges {
  margin-top: -150px;
  width: 80%;
  > p:nth-child(2) {
    margin-top: 30px;
    button {
      width: 100%;
    }
  }
  > p:nth-child(3) {
    margin-top: 15px;
    button {
      width: 100%;
    }
  }
}
.form-hidden {
  display: none;
}
.btn {
  width: 100%;
  height: 50px;
  background-color: #409eff;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  margin: 10px 0;
  box-sizing: border-box;
}
.form-money {
  width: 100%;
  background-color: azure;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #999;
  text-align: center;
}
</style>