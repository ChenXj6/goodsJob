<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.payRecords.record1')"
                   left-text
                   left-arrow
                   @click-left="onClickLeft" />
    </div>
    <div>
      <div>
        <div class="source f-flex">
          <p>{{$t('m.payRecords.record4')}}: INR {{total_of.total_money || 0.00}}</p>
          <p>{{$t('m.payRecords.record5')}}: INR {{total_of.rate_money || 0.00}}</p>
        </div>
      </div>
    </div>

    <div class="p20"
         style="padding-top:10px">
         
      <van-list v-model="loading"
                :finished="finished"
                :loading-text="$t('m.mission.mission21')"
                :finished-text="$t('m.payRecords.record6')"
                @load="onLoad">
        <div class="recordllist"
             v-for="(item, index) in payRecordsList"
             :key="index">
            <p>{{$t('m.payRecords.record2')}} &nbsp; {{item.paytime | formatDate}}</p>
            <p>{{$t('m.payRecords.record3')}} &nbsp;{{item.financial_name}}&nbsp;INR {{item.min_money}}</p>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      payRecordsList: [],
      type: '',
      page: 1,
      loading: false,
      finished: false,
      total_of:{
        rate_money: '',
        total_money: ""
      }
    };
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value * 1000);
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
  created () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1);
    },
    //请求明细接口
    getpaytreasurelog () {
      this.$api
        .Post("paytreasurelog", { status: this.type, page: this.page })
        .then(res => {
          this.payRecordsList = res.result.list;
          this.total_of = res.result.total_of
        });
    },
    onLoad () {
      // 异步更新数据
      this.page++;
      this.$api
        .Post("paytreasurelog", {
          type: this.type,
          page: this.page
        })
        .then(res => {
          if (res.status == 1) {
            this.payRecordsList = this.payRecordsList.concat(res.result.list);
            this.total_of = res.result.total_of
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
.source {
  border-bottom: 1px solid #eee;
  width: 100%;
  padding: 10px 3px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  > p {
    padding-top: 15px;
    font-size: 12px;
  }
}
.recordllist{
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 10px;
}
</style>
