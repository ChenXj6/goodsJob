<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.mission.mission1')" left-text left-arrow @click-left="onClickLeft" />
    </div>
    <div class="f-flex navtask">
      <p :class="[type==0?'active':'']" @click="taskde(0)">{{$t('m.mission.mission2')}}</p>
      <p :class="[type==1?'active':'']" @click="taskde(1)">{{$t('m.mission.mission3')}}</p>
       <p :class="[type==-1?'active':'']" @click="taskde(-1)">{{$t('m.mission.mission4')}}</p>
      <p :class="[type==2?'active':'']" @click="taskde(2)">{{$t('m.mission.mission5')}}</p>
     
    </div>
    <!-- 列表 -->
    <div class="zylist p20">
      <van-list v-model="loading" :finished="finished" :loading-text="$t('m.mission.mission21')" :finished-text="$t('m.mission.mission6')" @load="onLoad">
      <div class="taskall" v-for="(item,index) in tasklist" :key="index">
        <div class="title">
          <div class="float-r">
            <p><span>{{$t('m.mission.mission12')}}</span>INR {{item.money}}</p>
          </div>
          <span style=" color: #1e95c9">{{item.grade}}</span>
        </div>
        <div class="van-clearfix"></div>
        <div class="f-flex taskitem" >
          <div>
           <!-- <img :src="item.type==0?dy:ks" alt /> -->
            <img v-if="item.type == 0" src="../../assets/Tiktok.png" alt="">
            <img v-else-if="item.type == 1" src="../../assets/Zantine.png" alt="">
            <img v-else-if="item.type == 2" src="../../assets/whatsapp.png" alt="">
            <img v-else-if="item.type == 3" src="../../assets/ins.png" alt="">
            <img v-else src="../../assets/zalo.jpg" alt="">
          </div>
          <div>
            <p>
              {{$t('m.mission.mission7')}}：{{item.id}}<br/>
              <span>{{$t('m.mission.mission8')}}:{{item.number}}</span>
            </p>
            <p>{{$t('m.mission.mission9')}}：{{item.needs}}</p>
            <p>{{$t('m.mission.mission10')}}：{{item.createtime*1 | formatDate}}</p>
          </div>
        </div>
        <div class="mt1 copylink">
             <!-- <el-button type="warning">打开视频</el-button> -->
			        <el-button type="danger" @click="toshiping(item.link)" :data-link="item.link">{{$t('m.mission.mission13')}}</el-button>     
              <!-- <el-button type="info" v-clipboard:copy="item.link"  v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t('m.mission.mission14')}}</el-button>      -->
              <el-button type="primary" :disabled="type==0 || type==-1?false:true" @click="tjtask(item.id)">{{type==0?$t('m.mission.mission15'):type==1?$t('m.mission.mission16'):type==-1?$t('m.mission.mission17'):$t('m.mission.mission18')}}</el-button>   
        </div>
      </div>
      </van-list>
    </div>
    <div style="width:100%;height:98px"></div>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from '@/components/index/footer'
export default {
  data() {
    return {
      type: 0,
      page:1,
      tasklist:'',
      loading: false,
      finished: false,
      dy:require('../../assets/Tiktok.png'),
      ks:require('../../assets/Zantine.png'),
      grade:this.$route.query.grade
    };
  },
  components:{
    Foot
  },
  mounted(){
   this.my_task_list()
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
  methods: {
		toshiping(url){
      window.location.href=url;
			// if(url){
      //   var douyin = url.indexOf("douyin");
      //   var facebook = url.indexOf("facebook");
      //   if(douyin != -1){
      //     window.location.href="vnd.youtube://www.youtube.com/user/";
      //   }else if(facebook != -1){
      //     window.location.href="fb://profile/";
      //   }
      //   if(facebook != -1){
      //     window.location.href="fb://page/592266607456680";
      //   }else{
      //     
      //   }
			// }
		},
    onClickLeft() {
      this.$router.go(-1);
    },
    taskde(e) {
      this.page=1;
      this.type = e;
       this.finished = false;
      this.my_task_list()
    },
    // 获取数据
     my_task_list(){
		const {grade} = this;
		var grader = grade!='' ? grade:1;
       this.$api.Post('my_task_list',{
         page:this.page,
         status:this.type,
         grade:grader
       }).then(res=>{
         if(res.status==1){
           this.tasklist=res.result.list;
         }
       })
     },
     //复制
     onCopy(){
    
       this.$toast(this.$t('m.mission.mission19'))
     },
     onError(){
       this.$toast(this.$t('m.mission.mission20'))
     },
     //提交任务
     tjtask(e){
          this.$router.push({name:'taskdetail',query:{id:e}})
     },
      onLoad() {
      // 异步更新数据
      this.page++;
      this.$api
        .Post("my_task_list", {
          page:this.page,
        status:this.type
        })
        .then(res => {
          if (res.status == 1) {
            this.tasklist = this.tasklist.concat(res.result.list);
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
.navtask {
  border-bottom: 1px solid #1e243d;
  padding: 15px;
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
.taskall{
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #1e243d;
}
.taskitem {
  position: relative;
  padding: 10px;
  line-height: 26px;
  // margin-bottom: 20px;
  > div:nth-child(1) {
    width: 20%;
    span {
      position: absolute;
      left: 7px;
      top: 50px;

      color: #fff;
      //  padding: 5px 15px;
      font-size: 12px;
    }
  }
  > div:nth-child(2) {
    width: 60%;
    font-size: 14px;
    span {
      // border: 1px solid #57a4f4;
      color: #fff;
      padding: 5px 0;
      border-radius: 20px;
    }
  }
  > div:nth-child(3) {
    width: 22%;
    padding-top: 5px;
    text-align: center;
    > p {
      // color: #57a4f4;
      font-weight: 500;
    }
    span {
      color: #fff;
      font-size: 14px;
    }
  }
  img {
    width: 50px;
    // margin-top: 30px;
  }
}
.copylink{
  text-align: center;
  padding:0 10px 10px;
  button{
    
  }
}
.title .float-r { font-size: 16px; color: #f90;}
.title .float-r span{ font-size: 12px; color: #999; margin-right: 6px;}
</style>
