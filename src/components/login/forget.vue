<template>
  <div class="p20">
    <p class="logo">
      <img class="logoImg" :src="logoimg" alt />
    </p>
    <div class="memberset1">
      <p>{{$t('m.Retrievepassword.Retrieve1')}}</p>

      <p>
        <i class="el-icon-phone"></i>
        <input
          type="text"
          v-model="zcdata.mobile"
          maxlength="20"
          :placeholder="$t('m.Retrievepassword.Retrieve2')"
        />
      </p>
      <p class="f-flex">
        <i class="el-icon-orange"></i>
        <input type="text" v-model="zcdata.code" :placeholder="$t('m.Retrievepassword.Retrieve3')" />
        <el-button type="primary" @click="getcode" :disabled="iscode"
          >{{ iscode ? $t('m.Retrievepassword.Retrieve4') : $t('m.Retrievepassword.Retrieve5') }}
        </el-button>
      </p>
      <p>
        <i class="el-icon-lock"></i>
        <input
          type="password"
          v-model="zcdata.password"
          :placeholder="$t('m.Retrievepassword.Retrieve6')"
        />
      </p>
      <p>
        <i class="el-icon-lock"></i>
        <input
          type="password"
          v-model="zcdata.password1"
          :placeholder="$t('m.Retrievepassword.Retrieve7')"
        />
      </p>
      <p>
        <el-button type="primary" @click="save">{{$t('m.Retrievepassword.Retrieve8')}}</el-button>
      </p>
      <p>
        <el-button type="primary" @click="back">{{$t('m.Retrievepassword.Retrieve9')}}</el-button>
      </p>
      <p>
        <a href="http://www.nicejobsapp.com/nicejobsapp.apk">{{$t('m.Retrievepassword.Retrieve10')}}</a></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zcdata: {
        mobile: "",
        password: "",
        password1: "",
        code: ""
      },
      iscode: false,
      logoimg:''
    };
  },
  mounted() {
    this.logo()
  },
  methods: {
     logo(){
        this.$api.Post('logo').then(res=>{
           this.logoimg=res.result.logo
        })
      },
    back() {
      this.$router.push({ name: "login" });
    },
    save() {
      // var isMobile = /^1[3|4|5|6|7|8|9][0-9]{9}$/;

      if (this.zcdata.mobile == "") {
        this.$toast(this.$t('m.Retrievepassword.Retrieve11'));
        return;
      }
      // if (!isMobile.test(this.zcdata.mobile)) {
      //   this.$toast(this.$t('m.Retrievepassword.Retrieve12'));
      //   return;
      // }
      if (this.zcdata.code == "") {
        this.$toast(this.$t('m.Retrievepassword.Retrieve3'));
        return;
      }
      if (this.zcdata.password == "") {
        this.$toast(this.$t('m.Retrievepassword.Retrieve6'));
        return;
      }
      if (this.zcdata.password != this.zcdata.password1) {
        this.$toast(this.$t('m.Retrievepassword.Retrieve13'));
        return;
      }
      this.$api.Post("forgetpwd", this.zcdata).then(res => {
        this.$toast(res.result.message);
        if (res.status == 1) {
          this.$router.push({ name: "login" });
        }
      });
    },
    //获取验证码
    getcode() {
      // var isMobile = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (this.zcdata.mobile == "") {
        this.$toast(this.$t('m.Retrievepassword.Retrieve2'));
        return;
      }
      // if (!isMobile.test(this.zcdata.mobile)) {
      //   this.$toast(this.$t('m.Retrievepassword.Retrieve12'));
      //   return;
      // }
      this.$api.Post("forgetcode", { mobile: this.zcdata.mobile }).then(res => {
        this.$toast(res.result.message);
        if (res.status == 1) {
          this.iscode = true;
        }
      });
    }
  }
};
</script>

<style lang="less">
.logo {
  position: relative;
  text-align: center;
  margin: 20px auto;
}
.logoImg{
  display: inline-block;
  width: 270px !important;
}
.memberset1 {
  color: #58a1eb;
  > p:nth-child(1) {
    font-weight: 700;
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
  > p:nth-child(3) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 10px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(4) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 10px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(5) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 10px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(6) {
    margin-top: 20px;
    button {
      width: 100%;
    }
  }
  > p:nth-child(7) {
    margin-top: 10px;
    button {
      width: 100%;
      background: none;
      border: 1px #409EFF solid;
      color: #409EFF;
    }
  }

  > p:last-child {
    margin-top: 30px;
    text-align: center;
    font-size: 18px;
    color:#c98954;
    padding: 8px 20px;
    border: 1px #c98954 solid;
    border-radius: 4px;
  }
  i {
    font-size: 22px;
    padding: 14px 10px;
  }
}
</style>
