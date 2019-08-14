<template>
  <div class="chart">
    <div v-if="!iscitydialog">
      <div class="top-banner">
        <!-- <img src="@/assets/img/Bitmap@2x.png" alt=""> -->
        <swiper-tel />
      </div>
      <div class="activity-info-wrap">
        <div class="activity-info">
          <div class="activity-number">
            <p class="info-title">参赛人数</p>
            <p class="info-num">{{addMember.add_count}}</p>
          </div>
          <div class="activity-poll">
            <p class="info-title">累计票数</p>
            <p class="info-num">{{addMember.vote_count}}</p>
          </div>
        </div>
      </div>
      <div class="activity-content-wrap" :class="{ 'activity-content-bottom': bottomStatus }">
        <div class="select-area">
          <div class="city-type-area">
            <div class="city-area">
              <div class="city-choose" @click="selectCityFun">
                <p class="city-name">{{ activeCityName }}</p>
                <p class="city-select-icon"><img src="@/assets/img/select-icon@2x.png" alt=""></p>
              </div>
              <div class="school-choose" v-clickoutside="handleClose">
                <p class="school-name" @click.stop="show = !show">{{levelText}}</p>
                <p class="school-select-icon" @click.stop="show = !show"><img src="@/assets/img/select-icon@2x.png" alt=""></p>
                <ul v-show="show">
                  <li v-if="Object.keys(leveldata).length === 0" @click="choose($event,'')" class="emptySchool">请选择</li>
                  <li v-else v-for="(list,key) in leveldata" :key="key" :class="{'other':key === '00' && Object.keys(leveldata).length === 1}" :alt="leveldata[0]" @click="choose($event,key)">{{list}}</li>
                </ul>
              </div>
            </div>
          <div class="type-area">
              <p v-for="(item, i) in userType"
                :key="i"
                :class="{ 'active-type' : activeType === item.type }"
                @click="changeTypeFun(item, i)"
              >
              {{item.name}}
              </p>
            </div>
          </div>
        </div>
        <div class="stu-area" v-if="!loading">
            <ul class="ranking-list" v-if="rankList.length">
              <li class="top-list" v-for="(item,s) in rankList.slice(0, 3)"  :key="s">
                <router-link :to="'/personalVote/'+item.user_event_id">
                  <div class="vote-list">
                    <div :class="['top-img'+s,'stu-img']">
                      <img :src="item.user_event_thumb" alt="">
                    </div>
                    <div class="base-info">
                      <p><span v-show="activeType===1">{{item.user_name || item.user_class_code}}</span>({{item.user_city_name}})</p>
                      <p>ID:{{item.user_code}}</p>
                      <p>{{item.user_event_vote_num}}票</p>
                    </div>
                    <div class="votes">
                      <button class="vote-bt">
                        <img src="@/assets/img/vote.png" alt="">
                      </button>
                    </div>
                  </div>
                </router-link>
              </li>
              <li class="stu-list" v-for="(item,index) in rankList.length > 3 ? rankList.slice(3) : []" :key="'0'+index">
                <router-link :to="'/personalVote/'+item.user_event_id">
                  <div>
                    <span>{{item.rank_num}}</span>
                    <span v-if="item.user_name">{{item.user_name | ellipsis }}<span>({{item.user_city_name}})</span></span>
                    <span v-if="item.user_class_code"><span v-show="activeType===1">{{item.user_class_code | ellipsis}}</span><span>({{item.user_city_name}})</span></span>
                    <span>ID:{{item.user_code}}</span>
                    <span>|</span>
                    <span>{{item.user_event_vote_num}}票</span>
                    <button class="vote-bt">
                      <img src="@/assets/img/vote.png" alt="">
                    </button>
                  </div>
                </router-link>
              </li>
            </ul>
            <div v-else class="noneData">
              <p>暂无数据</p>
            </div>
        </div>
        <v-loading v-if="loading"></v-loading>
      </div>
      <div class="personal-ranking" v-show="isjoin" :style="{ position: buttomShow ? '' : 'relative' }">
        <div>
          <span>{{myList.rank_num}}</span>
          <span>{{myList.user_name || myList.user_class_code}}</span>
          <span>ID:{{myList.user_code}}</span>
          <span></span>
          <span>{{myList.user_event_vote_num}}票</span>
        </div>
      </div>
      <!-- <div class="personal-ranking">
        <div>
          <span>4</span>
          <span>前三一</span>
          <span>ID:555</span>
          <span>|</span>
          <span>22334票</span>
        </div>
      </div> -->
      <div class="go-top" v-if="btnFlag"><img src="@/assets/img/gotop-bt@2x.png" alt="" @click="backTop"></div>
      <nav-tabs></nav-tabs>
    </div>
    <!-- <router-view/> -->
    <city-list
      :provinceList= "cityList1"
      @chooseCity= "chooseCity"
      v-if="iscitydialog"
    />
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import navTabs from '@/components/navTabs.vue'
import cityList from '@/components/cityList.vue'
import swiperTel from '@/components/swiper.vue'

export default {
  name: 'chart',
  components: { navTabs, cityList, swiperTel },
  data () {
    return {
      userType: [{ type: 1, name: '个人' }, { type: 2, name: '班级' }], // 个人班级
      activeType: 1, // 类型：班级 个人
      type: 1,
      addMember: {}, // 参赛人数以及投票人数
      rankList: [], // 列表数据
      myList: {}, // 个人排名
      show: false,
      isjoin: false, // 查看人是否参加
      levelText: '学校',
      levelId: '', // 机构id
      leveldata: {},
      iscitydialog: false, // 城市列表
      activeCityName: '城市',
      activeCityCode: '',
      proCode: '',
      btnFlag: false,
      cityList1: [],
      bottomStatus: false,
      domain: window.location.host,
      loading: true,
      buttomShow: true, // 个人排行固定判断
      docDefaultHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight
    }
  },
  computed: {
    scrollHeight () {
      return this.$store.state.chartScrollHeight
    }
  },
  watch: {
    showHeight: function (val) {
      if (this.docDefaultHeight > this.showHeight) {
        this.buttomShow = false
      } else {
        this.buttomShow = true
      }
    }
  },
  created () {
    this.getRankList()
    // this.getCity()
    // this.getMyList()
    this.getMember()
  },
  mounted () {
    document.addEventListener('resize', () => {
      return (() => {
        this.showHeight = document.documentElement.clientHeight
      })()
    })
    // console.log(this.cityData)
    // console.log(this.proCode)
    // this.activeCityName === '城市' ? this.iscitydialog = false : this.iscitydialog = true
    window.addEventListener('scroll', this.scrollToTop)
  },
  methods: {
    // 获取参赛认数
    getMember () {
      // this.$post('')
      this.$post('/wx/User/get_item_slide').then((res) => {
        if (res.status === 1) {
          this.addMember = res.data
        }
      })
    },
    // 获取排行榜列表
    getRankList () {
      this.$post('/wx/rank/getRankList', { userType: this.type, cityCode: this.activeCityCode, schoolCode: this.levelId, proCode: this.proCode }).then((res) => {
        if (res.status === 1) {
          this.rankList = res.data
          this.loading = false
          if (this.scrollHeight) {
            this.$nextTick(() => {
              // document.documentElement.scrollTop = document.body.scrollTop = this.scrollHeight
              // this.$store.dispatch('chageChartScroll', 0)
            })
          }
        }
      })
    },
    // 获取个人当前排名
    getMyList () {
      this.$post('/wx/rank/getIsAuthUserInfo').then((res) => {
        if (res.status === 1) {
          if (res.data.is_join === 1) {
            this.isjoin = true
            this.myList = res.data
            this.bottomStatus = true
            // console.log(this.myList.length)
          }
        } else {
          this.isjoin = false
          // this.bottomStatus = true
        }
      })
    },
    // 班级个人切换
    changeTypeFun (item, index) {
      this.activeType = item.type
      this.type = item.type
      this.loading = true
      // console.log(this.activeType)
      this.getRankList()
    },
    handleClose () {
      this.show = false
    },
    // 学校下拉选择
    choose (e, key) {
      e.preventDefault()
      this.show = false
      let target = event.target
      let t = e.currentTarget.innerHTML
      this.levelText = t.substring(0, 3)
      this.levelId = key || ''
      this.loading = true
      // console.log(this.levelId)
      // console.log(this.levelText)
      this.getRankList()
    },
    // 获取学校
    getSchool () {
      this.levelText = '请选择'
      this.levelId = ''
      // console.log(this.activeCityCode)
      if (this.activeCityCode) {
        this.$post('/wx/User/get_school_list', { city_code: this.activeCityCode }).then((res) => {
          if (res.status === 1) {
            this.leveldata = res.data
            this.getRankList()
          }
        })
      } else {
        this.getRankList()
      }
    },
    // 切换选择城市
    selectCityFun () {
      this.$post('/wx/User/get_province_list').then((res) => {
        this.cityList1 = res.data
        this.iscitydialog = true
      })
    },
    // 返回顶部
    backTop () {
      let that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    scrollToTop () {
      let that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 300) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },
    chooseCity (item) { // 选择城市返回信息
      // document.body.scrollTop = document.documentElement.scrollTop = 0
      this.iscitydialog = false
      this.activeCityName = item.city_name || '城市'
      this.activeCityCode = item.city_code || ''
      this.proCode = item.proCode || ''
      this.loading = true
      this.getSchool()
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
    window.onscroll = null
  },
  directives: {
    clickoutside: {
      bind: function (el, binding, vnode) {
        function documentHandler (e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }
        el._vueClickOutside_ = documentHandler
        document.addEventListener('click', documentHandler)
      },
      unbind: function (el, binding) {
        document.removeEventListener('click', el._vueClickOutside_)
        delete el._vueClickOutside_
      }
    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 4) {
        return value.slice(0, 4) + ''
      }
      return value
    }
  },

  // 导航守卫
  beforeRouteLeave (to, from, next) {
    // console.log(this.scrollHeight)

    // if (to.path.match('/personalVote/')) {
    //   // 记录相关页面位置
    //   let windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    //   this.$store.dispatch('chageChartScroll', windowScrollTop)
    // } else {
    //   this.$store.dispatch('chageChartScroll', 0)
    // }
    next()
  },
  beforeRouteEnter (to, from, next) {
    // ...
    if (from.path.match('/personalVote/')) {
      next()
    } else {
      next(vm => {
        // vm.$store.dispatch('chageChartScroll', 0)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .chart {
    min-height:100vh;
    background:#00ACF9;
    border: 1px solid #00ACF9;
    // position:relative;
  }
  .top-banner{
    width:100%;
    img {
      width:100%;
    }
  }
  .activity-info {
    display: flex;
    >div {
     flex: 1;
    }
    p{
      color:#fff;
      text-align:center;
    }
    p.info-title{
      height:.16rem;
      line-height:.16rem;
      font-size:.12rem;
      font-weight:300;
    }
    p.info-num{
      height:.4rem;
      font-size: .3rem;
      font-weight:bold;
      line-height:.4rem;
    }
  }
  .activity-content-wrap{
    background:#fff;
    margin:0 .08rem .1rem;
    // height:200px;
    border-radius:  6px 6px 0 0;
    // padding:.1rem;
    .search-input{
      width:100%;
      height:.35rem;
      background: #F2F2F2;
      border-radius: 6px;
    }
    .city-type-area {
      padding:.1rem;
      display: flex;
      justify-content:space-between;
      margin-top:.1rem;
      p {
        display:inline-block;
        height:.3rem;
        line-height:.3rem;
        font-size:.14rem;
      }
      .city-area {
        /* .city-choose{
          display: inline-block;
        }
        p,.school-name {
          background: #F2F2F2;
          font-size:.14rem;
          text-align:center;
        }
        .city-name,.school-name {
          width:.58rem;
          border-radius:6px 0 0 6px;
          color: #989898;
          font-weight:300;
        } */
        .city-choose, .school-choose {
          display: inline-block;
        }
        .city-choose {
          .city-name {
            width:.58rem;
            border-radius:6px 0 0 6px;
            color: #989898;
            font-weight:300;
          }
          p {
            background: #F2F2F2;
            font-size:.14rem;
            text-align:center;
          }
        }
        .school-choose {
          /* border-radius:6px 0 0 0;*/
          margin-left: .1rem;
          position: relative;
          .school-name {
            width: .58rem;
            border-radius: 6px 0 0 6px;
            color: #989898;
            font-weight: 300;
          }
          p {
            background: #F2F2F2;
            font-size:.14rem;
            text-align:center;
          }
          ul {
            // display:none;
            position: absolute;
            // width:.90rem;
            max-height: 1rem;
            overflow-y: scroll;
            background: #FFFFFF;
            border: .01rem solid #E8E8E8;
            box-shadow: 0 .01rem .04rem 0 rgba(0,0,0,0.20);
            border-radius: .04rem;
            li {
              padding: .05rem .07rem;
              font-family: 'PingFang-SC-Regular';
              font-size: .12rem;
              color: #9D9D9D;
              width: 1.5rem;
              height: .2rem;
              line-height: .2rem;
              &:hover{
                background: #E8E8E8;
                color: #333333;
                cursor:pointer
              }
            }
            .emptySchool,.other {
              width:.75rem;
            }
          }
        }
        .city-select-icon,.school-select-icon{
          margin-left:.02rem;
          width:.3rem;
          border-radius: 0 6px 6px 0 ;
          img{
            padding-top:.09rem;
            width:.07rem;
            vertical-align:top;
          }
        }
      }
      .type-area{
        p{
          cursor:pointer;
          width:.55rem;
          font-weight:300;
          text-align:center;
          background-image: linear-gradient(-180deg, #E4F6FF 0%, #A9E4FF 99%);
          color: #0075E3;
          &:first-child{
            border-radius: 6px 0 0 6px;
          }
          &:last-child{
            border-radius: 0 6px 6px 0;
          }
          &.active-type{
            color:#fff;
            background-image: linear-gradient(-180deg, #5AC5FF 0%, #0075FF 100%);
          }
        }
      }
    }
    .stu-area{
      display:flex;
      flex-wrap:wrap;
      justify-content: flex-start;
      padding-top:.1rem;
      // border: 1px solid red;
      // padding-bottom:.5rem;
      .noneData {
        flex: 1;
        text-align: center;
        /* margin: 0 auto;
        height: calc(100vh - 500px); */
        p {
          line-height: 1.84rem;
          font-size:.16rem;
          font-family: 'PingFang-SC-Regular';
        }
      }
    }
  }
  .activity-content-bottom{
    margin-bottom: .5rem
  }
  .top-list, .stu-list{
     float: left;
     width: 3.65rem;
     border-bottom: 2px solid #00ACF9;
  }
  .vote-list{
    float: left;
    // margin: .15rem 0;
    padding:.1rem;
    width:3.43rem;
    height: .9rem;
    .stu-img,.base-info{
      float: left;
    }
    .votes{
      float:right;
    }
    .stu-img{
      position: relative;
      width: .9rem;
      height: .9rem;
      img{
        width: .9rem;
        height: .9rem;
      }
        // &:nth-child(1):before{
        //   content:'';
        //   width: .44rem;
        //   height:.47rem;
        //   background:url('../assets/img/sub01.png') top center no-repeat;
        //   position:absolute;
        //   top: 0;
        //   left: 0;
        //   // transform: scale(0.5)
        // }
    }
     .top-img0{
      &:before{
         content:'';
          width: .44rem;
          height:.47rem;
          background:url('../assets/img/sub01.png') top center no-repeat;
          position:absolute;
          top: 0;
          left: 0;
          background-position:top left;
      }
    }
    .top-img1{
      &:before{
         content:'';
          width: .44rem;
          height:.47rem;
          background:url('../assets/img/sub02.png') top center no-repeat;
          position:absolute;
          top: 0;
          left: 0;
          background-position:top left;
      }
    }
    .top-img2{
      &:before{
         content:'';
          width: .44rem;
          height:.47rem;
          background:url('../assets/img/sub03.png') top center no-repeat;
          position:absolute;
          top: 0;
          left: 0;
          background-position:top left;
      }
    }
    .base-info{
      margin-left:.1rem;
      p{
        font-family: 'MicrosoftYaHei';
        font-size: .14rem;
        color: #666666;
        letter-spacing: 0;
        &:nth-child(1){
          span{
            display:inline-block;
            max-width:1rem;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            vertical-align: top;
          }
        }
        &:nth-child(2){
          margin:.05rem 0 .08rem 0;
        }
        &:nth-child(3){
          font-family: 'MicrosoftYaHei';
          font-size: .18rem;
          color: #00ACF9;
          letter-spacing: 0;
        }
      }
    }
    .votes{
      margin: .33rem 0;
    }
  }
  .stu-list{
    div{
      width: 3.43rem;
      margin: .15rem 0;
      padding: 0 .1rem;
      font-family: 'MicrosoftYaHeiLight';
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0;
      >span{
        &:nth-child(1){
          text-align:center;
          display:inline-block;
          width:.2rem;
        }
        &:nth-child(2){
          overflow:hidden;
          vertical-align:middle;
          white-space:nowrap;
          text-overflow:ellipsis;
          display:inline-block;
          width:.85rem;
          margin: 0 .08rem;
          height:.21rem;
        }
        &:nth-child(4){
          margin: 0 .05rem;
        }
         &:nth-child(5){
          // margin: 0 .05rem;
          font-family: 'MicrosoftYaHei';
          font-size: .16rem;
          color: #00ACF9;
          letter-spacing: 0;
        }
      }
      span{

      }
      button{
        float: right;
        img{
          vertical-align: middle;
        }
      }
    }
    &:last-child{
      border: none;
      margin: 0;
    }
  }
  .vote-bt{
    width: .68rem;
    height: .25rem;
    background: transparent;
    img{
      width: .68rem;
      height: .25rem;
    }
  }
  .personal-ranking{
    // float: left;
    // position: fixed;
    // margin: 0 .1rem;
    position: fixed;
    bottom: .5rem;
    width: 100%;
    height: .47rem;
    background:#00ACF9;
    text-align: center;
    line-height:.47rem;
    span{
      vertical-align:middle;
      // font-family: 'MicrosoftYaHeiLight';
      font-size: .16rem;
      color: #FFFFFF;
      letter-spacing: 0;
      &:nth-child(1){
        padding-left:.16rem;
        float:left;
        font-size: .26rem;
      }
      &:nth-child(2){
        font-weight:300;
        float:left;
       margin:0 .09rem;
       color:#fefefe;
      }
      &:nth-child(3){
        color:#fdfdfd;
        font-weight:300;
        float:left;
        margin-left:.1rem;
      }
      &:nth-child(4){
        float:left;
        margin: 0 .05rem;
      }
      &:nth-child(5){
        padding-right:.16rem;
        float:right;
        font-size: .26rem;
      }
    }

  }
  .go-top{
    width: .25rem;
    height: .25rem;
    position: fixed;
    bottom: 1rem;
    right: .2rem;
    img{
      width: .25rem;
      height: .25rem;
    }
  }
</style>
