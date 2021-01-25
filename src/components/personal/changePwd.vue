<template>
  <div class="bje">
    <div>
      <van-nav-bar :title="$t('m.changepwd.changepwd1')"
                   left-text
                   left-arrow
                   @click-left="onClickLeft" />
    </div>
    <p class="division"></p>
    <div class="with-type">
      <p>
        <van-field v-model="orgpassword"
                   maxlength="30"
                   type="password"
                   :placeholder="$t('m.changepwd.changepwd5')"
                   :label="$t('m.changepwd.changepwd2')" />
      </p>
      <p>
        <van-field maxlength="30"
                   v-model="newpassword"
                   type="password"
                   :placeholder="$t('m.changepwd.changepwd6')"
                   :label="$t('m.changepwd.changepwd3')" />
      </p>
      <p>
        <van-field maxlength="30"
                   v-model="yesnewpassword"
                   type="password"
                   :placeholder="$t('m.changepwd.changepwd7')"
                   :label="$t('m.changepwd.changepwd4')" />
      </p>
    </div>
    <div class="with-btn">
      <el-button type="primary"
                 @click="changepwd()">{{$t('m.changepwd.changepwd8')}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      orgpassword: '',
      newpassword: '',
      yesnewpassword: '',
    }
  },
  methods: {
    changepwd () {
      if (this.orgpassword == '') {
        this.$toast(this.$t('m.changepwd.changepwd5'))
        return
      }
      if (this.newpassword == '') {
        this.$toast(this.$t('m.changepwd.changepwd6'))
        return
      }
      if (this.yesnewpassword == '') {
        this.$toast(this.$t('m.changepwd.changepwd7'))
        return
      }
      if (this.newpassword != this.yesnewpassword) {
        this.$toast(this.$t('m.changepwd.changepwd9'))
        return
      }
      this.$api.Post('changePwd', { orgpassword: this.orgpassword, newpassword: this.newpassword, yesnewpassword: this.yesnewpassword })
        .then(res => {
          if (res.status == 1) {
            this.$toast(this.$t('m.changepwd.changepwd10'))
            setTimeout(()=>{
              this.$api.Post('logout').then(res => {
              this.delCookie('openid')
              this.$router.push({path:'/login'})
            })
            },1000)            
          } else {
            this.$toast(this.$t('m.changepwd.changepwd11'))
          }
        })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    delCookie (c_name) {
      this.setCookie(c_name, "", -1);
    },
    setCookie (c_name, value, expire) {
      var date = new Date()
      date.setSeconds(date.getSeconds() + expire)
      document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()
    }
  },
  mounted () {
  },
  watch: {

  }
}
</script>
<style scoped>
</style>