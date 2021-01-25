<template>
  <div class="perback">
    <!-- 轮播 -->
    <div>
      <div class="van-nav-bar van-hairline--bottom"
           style="z-index: 1;">
        <div class="van-nav-bar__left"></div>
        <div class="van-nav-bar__title van-ellipsis">{{$t('m.Homepage.home1')}}</div>
        <div class="van-nav-bar__right"></div>
      </div>
    </div>
    <!-- 宣传栏 -->
    <div>
      <van-swipe class="my-swipe"
                 :autoplay="3000"
                 indicator-color="white">
        <van-swipe-item v-for="(item,index) in indexdata.advs"
                        :key="index">
          <img :src="item.thumb"
               alt
               srcset />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 公告  -->
    <div class="noticesBox">
      <van-notice-bar left-icon="volume-o"
                      :scrollable="false"
                      style="background: #171c2f !important; color:#fff; height: 1rem;">
        <van-swipe vertical
                   class="notice-swipe"
                   :autoplay="3000"
                   :show-indicators="false">
          <van-swipe-item v-for="(item,index) in indexdata.notices"
                          :key="index">
            {{item.title}}
          </van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
    <!-- 四个板块 -->
    <div class="p10 mt_do">
      <ul class="f-flex f-jc-sb plate4">
        <li @click="module(1)">
          <p>
            <img src="../../assets/notice.png"
                 alt />
          </p>
          <p>{{$t('m.Homepage.home2')}}</p>
        </li>
        <li @click="module(3)">
          <p>
            <img src="../../assets/video.png"
                 alt />
          </p>
          <p>{{$t('m.Homepage.home16')}}</p>
        </li>
        <li @click="module(2)">
          <p>
            <img src="../../assets/friends.png"
                 alt />
          </p>
          <p>{{$t('m.Homepage.home3')}}</p>
        </li>
        <li @click="module(4)">
          <p>
            <img src="../../assets/service.png"
                 alt />
          </p>
          <p>{{$t('m.Homepage.home5')}}</p>
        </li>
      </ul>
    </div>
    <!-- 任务 -->
    <div class="taskp">
      <div class="van-notice-bar title">VIP Level</div>
      <div class="f-flex task">
        <p @click="task(item.id)"
           v-for="(item,index) in tasklist_grade"
           :key="index">
          <img src="../../assets/vip1.png"
               alt />{{item.title}}
        </p>
      </div>

    </div>
    <!-- 列表 -->
    <div class="zylist p10">
      <van-list v-model="loading"
                :finished="finished"
                :finished-text="$t('m.Homepage.home6')"
                :loading-text="$t('m.mission.mission21')"
                @load="onLoad">
        <div class="f-flex zyitem box-shadow"
             v-for="(item,index) in tasklist"
             :key="index">
          <div>
            <!-- <img :src="item.type==0?dy:ks"
                 alt /> -->
            <img v-if="item.type == 0" src="../../assets/Tiktok.png" alt="">
            <img v-else-if="item.type == 1" src="../../assets/Zantine.png" alt="">
            <img v-else-if="item.type == 2" src="../../assets/whatsapp.png" alt="">
            <img v-else-if="item.type == 3" src="../../assets/ins.png" alt="">
            <img v-else src="../../assets/zalo.jpg" alt="">
            <span>{{item.grade}}</span>
          </div>
          <div>
            <p>
              {{$t('m.Homepage.home7')}}：{{item.id}}
              <span style="white-space: nowrap;">{{$t('m.Homepage.home8')}}:{{item.number}}</span>
            </p>
            <p>{{$t('m.Homepage.home16')}}：{{item.needs}}</p>
            <p v-show="item.uid=='0'?false:true">{{$t('m.Homepage.home9')}}：{{item.mobile}}</p>
          </div>
          <div>
            <p><i>INR</i> {{item.money}}</p>
            <p>
              <el-button type="primary"
                         @click="draw(item.id)">{{$t('m.Homepage.home11')}}</el-button>
            </p>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 领取任务弹窗 -->
    <van-dialog v-model="xinx"
                show-cancel-button
                @confirm="confirms"
                :confirmButtonText="$t('m.Personal.Center23')"
                :cancelButtonText="$t('m.Personal.Center24')">
      <div class="xinx">
        <p class="renwu_color">
          <van-icon name="question" /> {{$t('m.Homepage.home12')}}
        </p>
      </div>
    </van-dialog>
    <div style="width:100%;height:98px"></div>
    <Foot></Foot>
    <!-- 首次进入展示框 -->
    <div class="firstMesBox" v-if="$store.state.firstMes">
      <h1>{{$t('m.firstMes.firstMesTitle')}}</h1>
      <div class="firstMesCon" v-html="firstMessage.content">{{firstMessage.content}}</div>
      <img class="firstMesBtn" src="../../assets/close.png" alt="" @click="$store.state.firstMes = false">
      <img class="firstMesClose" src="../../assets/close2.png" alt="" @click="$store.state.firstMes = false">
    </div>
  </div>
</template>

<script>
  import Foot from '@/components/index/footer'
export default {
  data () {
    return {
      indexdata: "",
      images: [],
      tasklist: [],
      tasklist_grade: [],
      page: 1,
      grade: "",
      loading: false,
      finished: false,
      money: "",
      xinx: false,
      id: '',
      dy: require('../../assets/Tiktok.png'),
      ks: require('../../assets/Zantine.png'),
      // host:process.env.NODE_ENV=='development'?'http://7230.iiio.top':`${location.protocol}//${location.host}`
      host: 'https://app.goodjobsapp.com', 

      firstMessage:''
    };
  },
  components:{
    Foot
  },
  mounted () {
  },
  created () {
    this.main();
    this.task_list();
    this.tasks_grade();
    this.getFirstMes();
  },
  methods: {
    // 获取首次进入
    getFirstMes(){
      this.$api.Post("firstMes").then(res => {
        if (res.status == 1) {
          this.firstMessage = res.result.result
        }
      });
    },
    //四个板块
    module (e) {
      if (e == 1) {
        this.$router.push({ name: "release" });
      }
      if (e == 2) {
        // this.$router.push({ name: "poster" });
        var language = window.localStorage.getItem('language');
        var lang;
        if (language == "" || language == "cn-CN") {
          lang = "cn"
        } else {
          lang = "en"
        }
        let isLogin = this.getCookie3('openid') || false;
        if(isLogin == false){
          let lang = localStorage.getItem('language') == 'yn' ? 'Làm ơn đăng nhập lại lần nữa!' : 'Please log in again!'
          this.$toast(lang)
          setTimeout(()=>this.$router.push({path:'/login'}),1000)
         }else{
           location.href = `${this.host}/app/index.php?i=4&c=entry&method=shares&p=commission&m=sz_yi&do=plugin&lang=` + lang
         }
      }
      if (e == 3) {
        this.$router.push({ name: "course" });
      }
      if (e == 4) {
        this.$api.Post("service").then(res => {
          if (res.status == 1) {
            location.href = res.result;
          }
        });
      }
    },
    //任务
    task (id) {
      this.$router.push({ name: 'task', query: { 'takeid': id } })
      // this.page = 1;
      // this.grade = e;
      // this.finished = false;
      // this.task_list();
    },
    main () {
      this.$api.Post("main").then(res => {
        if (res.status == 1) {
          this.indexdata = res.result;
        }
      });
    },
    task_list () {
      this.$api
        .Post("task_list", {
          type: "",
          grade: this.grade,
          page: this.page,
          psize: 10
        })
        .then(res => {
          if (res.status == 1) {
            this.tasklist = res.result.list;
            this.money = res.result.money;
          }
        });
    },


    tasks_grade () {
      this.$api
        .Post("tasks_grade", {
          type: "",
          grade: this.grade,
          page: this.page,
          psize: 10
        })
        .then(res => {
          if (res.status == 1) {
            this.tasklist_grade = res.result.list;

          }
        });
    },

    //领取
    draw (e) {
      this.id = e;
      this.xinx = true;
    },
    // 确定领取
    confirms () {
      this.$api.Post('receive_tasks', {
        id: this.id,
      }).then(res => {
        if (res.status == 0) {
          this.$toast(res.result.message)
        }
        if (res.status == 1) {
          this.$toast(this.$t('m.Homepage.home15'))
          setTimeout(() => {
            this.$router.push({path:'/mytask',query:{grade:1}})
          }, 1000)
        }
      })
    },

    onLoad () {
      // 异步更新数据
      this.page++;
      this.$api
        .Post("task_list", {
          type: "",
          grade: this.grade,
          page: this.page,
          psize: 10
        })
        .then(res => {
          if (res.status == 1) {
            this.tasklist = this.tasklist.concat(res.result.list);
            this.money = res.result.money;
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
.perback {
  background: #0f1427 !important;
}
.task {
  flex-wrap: wrap;
}
.task p {
  width: 49%;
  padding: 10px 0;
  margin: 0.1rem 0.5% 0;
  background-color: #1e243d;
  border-radius: 0.16667rem;
}
.mt_do {
  // background: #fff;
  color: #fff;
  padding: 0.1rem !important;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 160px;
  text-align: center;
  //   background-color: #39a9ed;
}
.my-swipe img {
  width: 100%;
}
.plate4 {
  > li {
    width: 24%;
    text-align: center;
    background-color: #1e243d;
    padding: 0.3rem 0;
    font-size: 0.333rem !important;
    border-radius: 0.16667rem;
    img {
      width: 32px;
      margin-bottom: 10px;
    }
  }
}
.task {
  > p {
    text-align: center;
    &:first-child {
    }
    img {
      width: 32px;
      margin-right: 20px;
    }
  }
}
.zyitem {
  // box-shadow: 0 0 5px #d3d3d3;
  border-radius: 14px;
  padding: 10px;
  position: relative;
  line-height: 26px;
  margin-bottom: 10px;
  background: #1e243d;
  > div:nth-child(1) {
    width: 23%;
    span {
      position: absolute;
      left: 0;
      top: 0;
      // background: #57a4f4;
      color: #1989fa;
      border-radius: 12px 0 0 0 !important;
      padding: 5px 0 3px 10px;
      font-size: 12px;
      border-radius: 4px 0 0 0;
    }
  }
  > div:nth-child(2) {
    width: 57%;
    font-size: 14px;
    span {
      // border: 1px solid #57a4f4;
      color: #fff;
      padding: 3px 0px;
      border-radius: 20px;
    }
  }
  > div:nth-child(3) {
    // flex:1;
    white-space: nowrap;
    padding-top: 5px;
    > p {
      color: #f90;
      font-weight: 600;
      font-size: 18px;
      text-align: right;
    }
    i {
      font-weight: normal;
      font-style: normal;
      font-size: 12px;
    }
    button {
      padding: 6px 20px;
      margin-top: 5px;
    }
  }
  img {
    width: 50px;
    margin-top: 20px;
  }
}
.el-button--primary {
}
.renwu_color {
  color: #000;
}
.van-ellipsis > .notice-swipe {
  width: 352px;
  height: 0.64rem;
}
.firstMesBox{
  width: 80%;
  height: 450px;
  // overflow: auto;
  min-height: 60%;
  position: fixed;
  left: 10%;
  top:10%;
  background-image: url(../../assets/firstMesBk.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0 20px;
}
.firstMesBox>h1{
  text-align: center;
  margin: 10px 0;
  height: 30px;
}
.firstMesBox>.firstMesCon{
  height: 400px;
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
  ::-webkit-scrollbar {
  display: none; /* Chrome Safari */
  }
.firstMesBox>.firstMesBtn{
  display: block;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 50%;
  bottom: -100px;
  transform: translate(-50%,-50%);
}
.firstMesBox>.firstMesClose{
  position: absolute;
  top:17px;
  right: 10px;
  display: block;
  width: 20px;
  height: 20px;
}
</style>
