<template>
  <div class="p20" style="position: relative;">
    <p class="logo">
      <img class="logoImg" :src="logoimg" alt />
    </p>
    <div class="memberlogin mt4">
      <p>{{$t('m.loginpage.login1')}}</p>
      <p>
        <i class="el-icon-user"></i>91
        <input type="text"  v-model="mobile" maxlength="18" :placeholder="$t('m.loginpage.login2')"/>
      </p>
      <p class="f-flex">
        <i class="el-icon-lock"></i>
        <input type="password" v-model="password" :placeholder="$t('m.loginpage.login3')" />

      </p>
      <p>
        <el-button type="primary" @click="login">{{$t('m.loginpage.login5')}}</el-button>
      </p>
      <p>
        <!-- <span @click="forget">{{$t('m.loginpage.login4')}}</span> -->
      <br><span @click="goset">{{$t('m.loginpage.login6')}}</span>
      <br><span><a :href="loginUrl" style="color:#5d70bd">{{$t('m.loginpage.login11')}}</a></span>
      </p>
      <p>
        <!-- <a href="http://www.nicejobsapp.com/nicejobsapp.apk">{{$t('m.loginpage.login7')}}</a>  -->
        <a href="https://app.goodjobsapp.com/goodjobsapp.apk">{{$t('m.loginpage.login7')}}</a> 
        
      </p>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
           mobile:localStorage.getItem('mobile') || '',
           password:'',
           logoimg:'',
           lang:'en-US',
           loginUrl:''
      }
    },
    updated(){
      window.localStorage.setItem("language", "en-US");
      var language_val = localStorage.getItem("language");
      this.lang = language_val;
    },
    mounted(){
      let islogin=this.getCookie3("openid") || false;
      if(islogin!=false){
        this.$router.push({name:'index'})
      }
      this.logo()
    },
    methods:{
      logo(){
        this.$api.Post('logo').then(res=>{
           this.logoimg=res.result.logo
           this.loginUrl = res.result.loginurl
        })
      },
      login(){
        let that = this;
        if(that.mobile==''){
            that.$toast(that.$t('m.loginpage.login8'))
            return;
        }
        if(that.password==''){
         that.$toast(that.$t('m.loginpage.login9'))
        }
        that.$api.Post('login',{
            mobile:that.mobile,
            password:that.password
        }).then(res=>{
            if(res.status==1){
            that.$toast(that.$t('m.loginpage.login10'))
                that.setCookie('openid',res.result.openid)                
                that.$router.push({name:'index'})
            }else{
                that.$toast(res.result.message)
            }
        })
       
      },
      //注册
      goset(){
        this.$router.push({name:'register'})
      },
     //忘记密码
     forget(){
         this.$router.push({name:'forget'})
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

    // 语言切换
    changeLangEvent(){
      var that = this;
      if ( that.lang == 'cn-CN' ) {
          that.lang = 'cn-CN';
          this.$i18n.locale = that.lang;//关键语句
          window.localStorage.setItem("language", that.lang);
       }else {
          that.lang = 'en-US';
          this.$i18n.locale = that.lang;//关键语句
          window.localStorage.setItem("language", that.lang);
       }
    },

    setCookie(c_name,value,expire) {
        var date=new Date()
        date.setSeconds(date.getSeconds()+expire)
        document.cookie=c_name+ "="+escape(value)+"; expires="+date.toGMTString()
    }

    }
};
</script>

<style lang="less">
body{
  background-color: #0f1427;
}
.logo {
  position: relative;
  text-align: center;
  margin: 20px auto;
}
.logoImg{
  display: inline-block;
  width: 270px !important;
}
.select_box{
  position: absolute;
  right: 40px;
  top: 20px;
  height: 25px;
}
.select_box select{
  height: 100%;
}
.memberlogin {
  color: #58a1eb;
  > p:nth-child(1) {
    font-weight: 600;
    font-size: 20px;
  }
  > p:nth-child(2) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 30px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(3) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 60%;
      height: 100%;
    }
    span {
      padding: 14px 10px;
    }
  }
  > p:nth-child(4) {
    margin: 30px auto;
    button {
      width: 100%;
      border-radius: 4px;
      padding: 15px;
    }
  }
    > p:nth-child(5) {
      margin-top: 10px;
      text-align: center;
      color: #5d70bd;
      line-height: 1.8;
  }
  >p:nth-child(6){
      margin-top: 30px;
      text-align: center;
      color: #c98954;
      font-size: 16px;
      i{
          padding: 0;
      }
      a{
        color:#c98954;
        padding: 8px 20px;
        border: 1px #c98954 solid;
        border-radius: 4px;
      }
  }
  i {
    font-size: 22px;
    padding: 14px 10px;
  }
}
</style>
