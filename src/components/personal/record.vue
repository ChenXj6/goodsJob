<template>
  <div>
    <div>
      <van-nav-bar
        :title="$t('m.Withdrawal.record1')"
        left-text
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <div>
        <div class="source f-flex f-jc-c">
          <p>{{$t('m.Withdrawal.record2')}}</p>
          <van-dropdown-menu>
            <van-dropdown-item
              @change="selects(type)"
              v-model="type"
              :options="option1"
            />
          </van-dropdown-menu>
        </div>
      </div>
    </div>
    <div class="p20" style="padding-top:5px">
      <van-list
        v-model="loading"
        :finished="finished"
        :loading-text="$t('m.mission.mission21')"
        :finished-text="$t('m.Withdrawal.record3')"
        @load="onLoad"
      >
        <div
          class="recordllist"
          v-for="(item, index) in finanlist"
          :key="index"
        >
          <p class="f-flex f-jc-sb">
            <!-- <span>{{ item.title }}</span> -->
            <span>{{ item.money }}</span>
            <span>{{
              item.status == "1"
                ? $t('m.Withdrawal.record4')
                : item.status == "2"
                ? $t('m.Withdrawal.record5')
                : $t('m.Withdrawal.record6')
            }}</span>
          </p>
          <p class="f-flex f-jc-sb">
            <span>{{ (item.createtime * 1) | formatDate }}</span>
            
          </p>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "",
      page: 1,
      loading: false,
      finished: false,
      option1: [
        { text: this.$t('m.Withdrawal.record7'), value: "" },
        { text: this.$t('m.Withdrawal.record6'), value: -1 },
        { text: this.$t('m.Withdrawal.record4'), value: 1 },
        { text: this.$t('m.Withdrawal.record5'), value: 2 },
      ],
      finanlist: []
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
    this.record();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    //请求明细接口
    record() {
      this.$api
        .Post("record", { status: this.type, page: this.page })
        .then(res => {
          this.finanlist = res.result.list;
        });
    },
    //分类切换
    selects(e) {
      this.page=1;
       this.loading = false;
      this.record();
    },
    onLoad() {
      // 异步更新数据
      this.page++;
      this.$api
        .Post("record", {
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
  }
};
</script>

<style lang="less">
.recordllist {
  border-bottom: 1px solid #171c2f;
  padding: 10px 0;
  font-size: 14px;
  > p:nth-child(1) {
    > span:nth-child(2) {
      color: #1e95c9;
    //   font-weight: 500;
    //   font-size: 20px;
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
.van-dropdown-menu{
  padding: 0 20px;
}
</style>
