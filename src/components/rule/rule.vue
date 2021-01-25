<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.Rule.rule1')" />
    </div>
    <div class="p20" >
      <div v-html="rule.content" class="content">{{rule.content}}</div>
    </div>
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
      rule:''
    };
  },
  created(){
    this.getRule()
  },
  mounted() {

  },
  methods: {
    getRule() {
      this.$api.Post("rule").then(res => {
        if (res.status == 1) {
          this.rule = res.result.result;
        }
      });
    },
  }
};
</script>

<style lang="less">
.p20{
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  background-color: #1e243d;
  > .content{
    overflow: hidden;
  }
}
</style>
