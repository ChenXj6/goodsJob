<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.Publish.task1')"
                   left-text
                   left-arrow
                   @click-left="$router.go(-1)" />
    </div>
    <div>
      <van-popup v-model="showPicker"
                 position="bottom">
        <van-picker show-toolbar
                    :columns="option3"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
                    :confirm-button-text="$t('m.Personal.Center23')"
                    :cancel-button-text="$t('m.Personal.Center24')" />
      </van-popup>
      <!--    <van-dropdown-menu >
       <van-dropdown-item v-model="value1"   :options="option1" @change="grade"/>
        <van-dropdown-item v-model="value2"  :options="option2" @change="category" />
      </van-dropdown-menu> -->
      <div class="van-dropdown-menu van-hairline--top-bottom">
        <div role="button"
             tabindex="0"
             class="van-dropdown-menu__item"
             @click="toshow1()">
          <span class="van-dropdown-menu__title">
            <div class="van-ellipsis">{{value_id1}}</div>
          </span>
        </div>
        <div role="button"
             tabindex="0"
             class="van-dropdown-menu__item"
             @click="toshow2()">
          <span class="van-dropdown-menu__title">
            <div class="van-ellipsis">{{value_id2}}</div>
          </span>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="zylist p20">
      <van-list v-model="loading"
                :finished="finished"
                :loading-text="$t('m.mission.mission21')"
                :finished-text="$t('m.Publish.task2')">
        <!-- @load="onLoad" -->
        <div class="f-flex zyitem box-shadow"
             v-for="(item,index) in tasklist"
             :key="index">
          <div>
            <!-- <img :src="item.type==0?dy:ks" alt /> -->
            <img v-if="item.type == 0"
                 src="../../assets/Tiktok.png"
                 alt="">
            <img v-else-if="item.type == 1"
                 src="../../assets/Zantine.png"
                 alt="">
            <img v-else-if="item.type == 2"
                 src="../../assets/whatsapp.png"
                 alt="">
            <img v-else-if="item.type == 3"
                 src="../../assets/ins.png"
                 alt="">
            <img v-else src="../../assets/zalo.jpg" alt="">
            <span>{{item.grade}}</span>
          </div>
          <div>
            <p>
              {{$t('m.Publish.task3')}}：{{item.tasksname}}
              <span>{{$t('m.Publish.task4')}}:{{item.number}}</span>
            </p>
            <p>{{$t('m.Publish.task5')}}：{{item.needs}}</p>
            <p v-show="item.uid=='0'?false:true">{{$t('m.Publish.task6')}}：{{item.mobile}}</p>
          </div>
          <div>
            <p>INR {{item.money}}{{$t('m.Publish.task7')}}</p>
            <p>
              <el-button type="primary"
                         @click="draw(item.id)">{{$t('m.Publish.task8')}}</el-button>
            </p>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 领取任务 -->
    <!-- <van-dialog v-model="xinx"
                show-cancel-button
                @confirm="confirms">
      <div class="xinx">
        <p>
          <van-icon name="question" /> {{$t('m.Publish.task9')}}
        </p>
      </div>
    </van-dialog> -->
      <van-dialog v-model="xinx" show-cancel-button @confirm="confirms" :confirmButtonText="$t('m.Personal.Center23')" :cancelButtonText="$t('m.Personal.Center24')">
      <div class="xinx">
        <p style="color:#000;"><van-icon name="question" />{{$t('m.Publish.task9')}}</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rnd: 1,
      value_id2: this.$t('m.Publish.task10'),
      value_id1: this.$t('m.Publish.task11'),
      vas: "",
      value: '',
      showPicker: false,
      takeid: this.$route.query.takeid,
      loading: false,
      finished: false,
      value1: "",
      value2: "",
      page: 1,
      xinx: false,
      id: '',
      money: "",
      option3: [],
      option1: [
        { text: this.$t('m.Publish.task12'), value: "" },
        { text: this.$t('m.Publish.task13'), value: 0 },
        { text: this.$t('m.Publish.task14'), value: 1 }
      ],
      option2: [
        { text: this.$t('m.Publish.task15'), value: "" },
        { text: this.$t('m.Publish.task16'), value: "0" },
        { text: this.$t('m.Publish.task17'), value: "1" }
      ],
      tasklist: [],
      dy: require('../../assets/Tiktok.png'),
      ks: require('../../assets/Zantine.png')
    };
  },
  mounted () {
    this.task_list();
    this.tasks_grade();
  },
  methods: {
    toshow1 () {
      this.rnd = 1;
      this.option3 = this.option1;
      this.showPicker = true;
    },
    toshow2 () {
      this.rnd = 2;
      this.option3 = this.option2;
      this.showPicker = true;
    },
    onConfirm (value) {
      this.value = value;
      if (this.rnd == 1) {
        this.value_id1 = value['text'];
        this.takeid = value['id'];
      } else {
        this.value_id2 = value['text'];
        this.type = value['value']
      }
      this.page = 1;
      this.psize = 10;
      this.task_list();
      this.showPicker = false;
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
            var options_ed = []
            res.result.list.forEach((item, index) => {
              var obj = {};
              obj['text'] = item.title;
              obj['id'] = item.id;
              options_ed.push(obj)
            });
            this.option1 = options_ed;
            this.value_id1 = this.option1[this.takeid - 1].text
          }
        });
    },
    onClickLeft () {
      this.$router.go(-1);
    },
    grade () {
      this.page = 1;
      this.finished = false;
      this.task_list();
    },
    category () {
      this.page = 1;
      this.finished = false;
      this.task_list();
    },
    task_list () {
      this.$api
        .Post("task_list", {
          type: this.type,
          grade: this.takeid,
          page: this.page,
          psize: 10
        })
        .then(res => {
          if (res.status == 1) {
            this.tasklist = res.result.list;
            this.money = res.result.money;
            if (res.result.list.length < 10) {
              this.finished = true;
            }
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
          this.$toast(this.$t('m.Publish.task18'))
          setTimeout(() => {
            this.$router.go(0)
          }, 500)

        }
      })
    },
    onLoad() {
      this.page++;
      this.$api
        .Post("task_list", {
          type: this.value2,
          grade: this.value1,
          page: this.page,
          psize: 10
        })
        .then(res => {
          console.log(res.result)
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

<style>
.van-dropdown-menu__title {
  color: #ffffff !important;
}
</style>