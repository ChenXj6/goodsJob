<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.Setmeal.meal1')" />
    </div>
    <!-- 轮播 -->
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in setmeallist.advs" :key="index">
          <img :src="item.thumb" alt srcset />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- <div class="mealimg">
         <img src="../../assets/logo1.png" alt />
    </div>-->
    <div class="p20">
      <div
        class="meallist"
        v-for="(item, index) in setmeallist.setmeal"
        :key="index"
      >
        <div class="f-flex f-jc-sb">
          <p>
            <img :src="item.thumb" alt />
            {{ item.setmealname }}
          </p>
          <p>
            {{$t('m.Setmeal.meal2')}}
            <span>INR {{ item.price }}</span>
          </p>
        </div>
        <div>
          <!-- <p>{{$t('m.Setmeal.meal3')}}:{{ item.number }}</p> -->
          <p>{{$t('m.Setmeal.meal4')}}:{{ item.money }}</p>
          <!-- <el-button class="f-flex f-jc-sb"><span>赠送(每天6条接单任务)</span>   <el-button type="primary">购买</el-button></p> -->
          <p style="margin-bottom: 10px;">
            <span>{{$t('m.Setmeal.meal5')}}{{ item.setmealname }}{{$t('m.Setmeal.meal6')}}{{ item.give }}</span>
            <br>
            <span>Contains the number of low-level VIP jobs</span>
          </p>
          <el-button type="primary" @click="buy(item.id)">{{$t('m.Setmeal.meal7')}}</el-button>
        </div>
      </div>
    </div>
    <!-- 确认信息 -->
    <van-dialog v-model="xinx" show-cancel-button @confirm="confirms" :confirmButtonText="$t('m.Personal.Center23')" :cancelButtonText="$t('m.Personal.Center24')">
      <div class="xinx">
        <p style="color:#000;"><van-icon name="question" /> {{$t('m.Setmeal.meal8')}}</p>
      </div>
    </van-dialog>
    <div style="width:100%;height:98px"></div>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from '@/components/index/footer'

export default {
  components:{
    Foot
  },
  data() {
    return {
      setmeallist: "",
      reward: "",
      xinx: false,
      id: ""
    };
  },
  mounted() {
    this.setmeal();
  },
  methods: {
    setmeal() {
      this.$api.Post("setmeal").then(res => {
        if (res.status == 1) {
          this.setmeallist = res.result;
        }
      });
    },
    buy(e) {
      this.xinx = true;
      this.id = e;
    },
    confirms() {
      this.xinx=false;
      setTimeout(()=>{
         this.$api.Post("pay_setmeal", { id: this.id }).then(res => {
        if (res.status == 0) {
          this.$toast(this.$t('m.Setmeal.meal11'));
        }else if(res.status == 1) {
          this.$toast(this.$t('m.Setmeal.meal9'))
            this.$router.go(0);
        }else if(res.status == 9){
          this.$toast(res.result.message)
          setTimeout(()=>{
            this.$router.push({path:'recharge'})
          },1000)
        }
      });
      },500)
    }
  }
};
</script>

<style lang="less">
.mealimg {
  text-align: center;
  img {
    width: 200px;
  }
}
.meallist {
  border-radius: 8px;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  background-color: #1e243d;
  font-size: 14px;
  > div:nth-child(1) {
    // background: #57a1ec;
    border-radius: 8px 8px 0 0;
    padding: 12px;
    color: #fff;
    img {
      width: 40px;
      margin-right: 10px;
    }
    > p:nth-child(2) {
      padding-top: 6px;
      color: #f90;
      span {
        font-weight: 700;
        font-size: 18px;
      }
    }
  }
  > div:nth-child(2) {
    padding: 15px;
    line-height: 1.8;
    > button {
      display: block;
      width: 100%;
    }
  }
}
.xinx {
  padding: 20px;
  i {
    color: #ffbf00;
    vertical-align: middle;
    margin-right: 10px;
    font-size: 27px;
  }
  > p:nth-child(2) {
    width: 80%;
    margin-left: 40px;
    font-size: 14px;
  }
}
</style>
