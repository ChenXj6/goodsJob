<template>
  <div>
    <div>
      <van-nav-bar
        :title="$t('m.treasure.treasure1')"
        left-text
        left-arrow
        @click-left="onClickLeft"
      />
    </div>	
    <div class="p20" style="padding-top:5px">
      <van-list
        v-model="loading"
        :finished="finished"
        :loading-text="$t('m.mission.mission21')"
        :finished-text="$t('m.treasure.treasure8')"
        @load="onLoad"
      >
        <div
          class="financiallist treasureList"
          v-for="(item, index) in treasureList"
          :key="index"
        >
          <div style="width:100%;height:0;position: relative;">
            <el-button type="success" round class="payBtn" size="mini" @click="payTreasure(item.id)">{{$t('m.treasure.treasure9')}}</el-button>
          </div>
          <div>{{item.financial_name}}</div>
          <div>{{$t('m.treasure.treasure2')}}INR{{item.min_money}}</div>
            <div>{{$t('m.treasure.treasure3')}} {{item.daily_rate}}%</div>
            <div>{{$t('m.treasure.treasure4')}} {{item.pay_day}}{{$t('m.treasure.treasure5')}}</div>
            <div v-if="lang">{{$t('m.treasure.treasure6')}}{{item.pay_day}}{{$t('m.treasure.treasure7')}}</div>
            <div v-else>{{$t('m.treasure.treasure6')}}{{$t('m.treasure.treasure7')}}{{item.pay_day}} {{$t('m.treasure.treasure5')}}</div>
            

        </div>
      </van-list>
    </div>
    <van-dialog v-model="xinx" show-cancel-button @confirm="confirms" :confirmButtonText="$t('m.Personal.Center23')" :cancelButtonText="$t('m.Personal.Center24')">
      <div class="xinx">
        <p style="color:#000;"><van-icon name="question" /> {{$t('m.Setmeal.meal8')}}</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: this.$route.query.type||'',
	    bvaseTy:this.$t('m.Capital.detailed4'),
      page: 1,
      loading: false,
      finished: false,
      xinx: false,
      id:'',
      lang:localStorage.getItem('language') == 'cn',
	  showPicker: false,
      option1: [
        { text: this.$t('m.Capital.detailed4'), value: "" },
        { text: this.$t('m.Capital.detailed5'), value: 0 },
        // { text: "提现", value: 1 },
        { text: this.$t('m.Capital.detailed6'), value: 2 },
        { text: this.$t('m.Capital.detailed7'), value: 3 },
        { text: this.$t('m.Capital.detailed8'), value: 4 }
      ],
      treasureList: []
    };
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value*1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  mounted() {
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    payTreasure(id){
      this.xinx = true;
      this.id = id;
    },
    confirms() {
      this.xinx=false;
      setTimeout(()=>{
         this.$api.Post("paytreasure", { id: this.id }).then(res => {
        if (res.status == 0) {
          this.$toast(res.result.message);
        }
        if (res.status == 1) {
          this.$toast(this.$t('m.Setmeal.meal9'))
            this.$router.go(0);
        }
      });
      },500)
    },
    //请求明细接口
    treasure() {
      this.$api
        .Post("treasure", { type: this.type, page: this.page })
        .then(res => {
          this.treasureList = res.result.list;
        });
    },
    onLoad() {
      // 异步更新数据
      this.page++;
      this.$api
        .Post("treasure", {
          type: this.type,
          page: this.page
        })
        .then(res => {
          if (res.status == 1) {
            this.treasureList = this.treasureList.concat(res.result.list);
            // 数据全部加载完成
            if (res.result.list.length < 10) {
              this.finished = true;
            }
          }
        });
      // 加载状态结束
      this.loading = false;
    }
  }
};
</script>

<style lang="less">
.financiallist {
  border-bottom: 1px solid #171c2f;
  padding: 10px 0;
  font-size: 14px;
  > p:nth-child(1) {
    > span:nth-child(2) {
      color: #f90;
      font-weight: 500;
      font-size: 16px;
    }
  }
  > p:nth-child(2) {
    margin-top: 6px;
    color: #999;
  }
}
.source {
  position: relative;
  // border-bottom: 1px solid #eee;
  > p {
    padding-top: 15px;
    font-size: 16px;
  }
}
.van-dropdown-menu__title {
  font-size: 16px !important;
}
.treasureList{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 130px;
  background-color: #42518d;
  padding: 5px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border-radius: 5px;
}
.payDays{
  display: flex;
  justify-content: space-between;
  height: 30px;
}
.payBtn{
  position:absolute;
  right: 0;
  top: 65px;
  min-width: 80px;
}
</style>
