<template>
  <div>
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item name="index" @click="index" icon="home-o">{{$t('m.footer.publictab1')}}</van-tabbar-item>
        <van-tabbar-item name="mytask" @click="mytask" icon="sign">{{$t('m.footer.publictab2')}}</van-tabbar-item>
        <van-tabbar-item name="rule" @click="rule" icon="gift-o" >{{$t('m.footer.publictab5')}}</van-tabbar-item>
        <van-tabbar-item name="setmeal" @click="setmeal" icon="apps-o">{{$t('m.footer.publictab3')}}</van-tabbar-item>
        <van-tabbar-item name="personal" @click="personal" icon="manager-o">{{$t('m.footer.publictab4')}}</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      active: this.$route.name,
	    // host:process.env.NODE_ENV=='development'?'http://5016.yesswl.top':`${location.protocol}//${location.host}`
    };
  },
 watch: {
      active(val) {
      
      },
      $route(to,from){
          this.active=to.name
      }
    },
    created(){
      var that = this;
    },
    methods:{
        mytask(){
			      this.$router.push({ name: "mytask",query:{grade:1} });
        },
        setmeal(){
            this.$router.push({name:'setmeal'})
        },
        index(){
            this.$router.push({name:'index'})
        },
        personal(){
            this.$router.push({name:'personal'})
        },
        rule(){
          this.$router.push({name:'rule'})
        },
        getCookie3(name){
        //可以搜索RegExp和match进行学习
        var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    },
    
};
</script>

<style lang="less">
.van-tabbar-item__icon{
    font-size: 30px;
}
.van-tabbar{
    height: 70px;
    // border-top: 2px solid #ccc;
}
.j-btm{
    margin-bottom: 75px;
}
.van-tabbar-item{
  background-color: #0e1526;
  color: #fff;
}
.van-tabbar-item--active {
    color: #1989fa;
}
</style>