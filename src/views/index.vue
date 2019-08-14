<template>
  <div class="index">
    <div v-if="!iscitydialog">
      <div class="top-banner">
        <!-- <img src="@/assets/img/Bitmap@2x.png" alt=""> -->
        <swiper-tel />
      </div>
      <div class="activity-info-wrap">
        <div class="activity-info">
          <div class="activity-number">
            <p class="info-title">参赛人数</p>
            <p class="info-num">{{addMember}}</p>
          </div>
          <div class="activity-poll">
            <p class="info-title">累计票数</p>
            <p class="info-num">{{voteCount}}</p>
          </div>
        </div>
      </div>
      <div class="activity-content-wrap">
        <div class="select-area">
          <div class="input-area">
            <!-- <form action=""> -->
              <input type="text" class="search-input" :placeholder="tip" v-model="keyWord"  @keyup.enter="inputSearch">
              <img src="@/assets/img/search.png" alt="" @click="inputSearch">
            <!-- </form> -->
          </div>
          <div class="city-type-area">
            <div class="city-area" @click="selectCityFun">
              <p class="city-name">{{ activeCityName }}</p>
              <p class="city-select-icon"><img src="@/assets/img/select-icon@2x.png" alt=""></p>
            </div>
            <div class="type-area">
              <p v-for="(item, index) in userType"
                :key="index"
                :class="{'active-type':activeType ===  item.type}"
                @click="changeTypeFun(item, index)"
              >
              {{item.name}}
              </p>
            </div>
          </div>
        </div>
        <div class="stu-area" v-if="!dataLoading">
          <div class="stu-item tc"
          v-for="(item,index) in recommendList"
          :class="{}"
          :key="index">
          <router-link :to="'/personalVote/'+item.user_event_id">
            <div class="stu-image-wrap">
              <img :src="item.user_event_thumb" alt="">
              <p class="stu-poll-num">{{item.user_event_vote_num}}票</p>
            </div>
            <p class="stu-name " v-show="activeType === 2">{{item.user_code}}</p>
            <p class="stu-name " v-show="activeType === 1">{{item.user_name}}</p>
            <div class="vote-button-wrap">
              <span class="vote-btn">
                <img src="@/assets/img/heart@2x.png" alt="">
                <span>+1票</span>
              </span>
            </div>
          </router-link>
          </div>
          <div v-show="noneData && recommendList.length ===0" class="noneData">
            <p>暂无数据</p>
          </div>
        </div>
        <v-loading v-if="dataLoading"></v-loading>
        <div class="go-top" v-if="btnFlag"><img src="@/assets/img/gotop-bt@2x.png" alt="" @click="backTop"></div>
      </div>
      <nav-tabs></nav-tabs>
    </div>
    <tips-undo v-if="showTips" :showTips="showTips" @tipsMessage="tipsMessage"/>
    <!-- <router-view/> -->
    <city-list
      :provinceList= "cityList1"
      @chooseCity= "chooseCity"
      v-if="iscitydialog"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import navTabs from '@/components/navTabs.vue'
import cityList from '@/components/cityList.vue'
import { State, Mutation } from 'vuex-class'
import swiperTel from '@/components/swiper.vue'
import { Store } from 'vuex'
import tipsUndo from '@/components/tipsUndo.vue'
// import loading from '@/components/loading.vue'

@Component({
  components: {
    navTabs, cityList, swiperTel, tipsUndo
  }
})

export default class Index extends Vue {
  @State personalVoteCity:any // 获取store数据
  @Mutation selectCity: any
  recommendList:Array<Object> = []
  userType:Array<Object> = [
    { type: 1, name: '个人', tips: '请输入姓名或参赛编码' },
    { type: 2, name: '班级', tips: '请输入参赛编码' }
  ]
  // @State('cityData') cityData: any
  // 提交数据参数
  addMember:string = ''
  voteCount:string = ''
  keyWord:string = ''
  cityCode:string = '' // 市code
  schoolCode:string='' // 学校code
  proCode:string = '' // 省code
  activeType:number=1
  activePage:number = 1
  refresh:boolean = false
  // 城市列表筛选
  iscitydialog:boolean = false
  currentPage:number = 1
  cityList1:Array<any> = []
  domain:string = window.location.host
  activeCityName:string = '请选择城市'
  scrollTop:number=1
  btnFlag:boolean = false
  tip:string='请输入姓名或参赛编码'
  dataLoading:boolean = true
  noneData:boolean = true
  initRequest:boolean = false // 判断是否请求
  showTips:boolean = false // 下架后是否展示提醒flag

  // onscroll:string=''
  // activeCityCode:number = -1
  created () {
    this.getMember()
    if (this.$route.query.personalVoteFlag) {
      this.iscitydialog = false
      this.activeCityName = this.personalVoteCity.city_name || '请选择城市'
      this.cityCode = this.personalVoteCity.city_code
      this.proCode = this.personalVoteCity.proCode
      this.initRequest = false // 放开请求
      // this.selectCity(item) // 将选择的数据存到store
    }
    this.dataLoading = true
    this.getRecommendList() // 请求数据
    this.getAuthFun() // 请求判断是否被下架
  }
  tipsMessage (data:any):void { // 接收子组件信息方法
    this.showTips = data.showTips
    if (data.upload) { // 如果是选择的继续修改
      // this.userChooseImage()
      this.$router.push('/mine')
    }
  }
  mounted () {
    // this.activeCityName === '请选择城市' ? this.iscitydialog = false : this.iscitydialog = true
    window.addEventListener('scroll', this.scrollToTop)
    window.addEventListener('scroll', this.scrollGetList)
  }
  activated () {
    window.addEventListener('scroll', this.scrollToTop)
    window.addEventListener('scroll', this.scrollGetList)
  }
  deactivated () {
    window.removeEventListener('scroll', this.scrollToTop)
    window.removeEventListener('scroll', this.scrollGetList)
  }
  scrollGetList () {
    var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    // 滚动条滚动距离
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    // 窗口可视范围高度
    var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
    if (scrollHeight - (clientHeight + scrollTop) < 15 && !this.iscitydialog) {
      if (this.initRequest) {
        this.initRequest = false
        this.activePage += 1
        this.getRecommendList()
      }
    }
  }

  getAuthFun ():void { // 请求个人信息判断是否下架
    (this as any).$post('/wx/rank/isDisplayBox').then((res:any) => { // 跳转前请求判断
      if (res.status === 1) {
        if (res.data.is_join && res.data.is_down) { // is_join为1时已参赛 0未参赛 is_down 是否下架
          (this as any).$post('/wx/rank/updateWorkState').then((res:any) => {}) // 请求后台将其第一次访问重置
          this.showTips = true
          // this.$router.push('/mine')
        }
      }
    })
  }
  selectCityFun () {
    // (this as any).$router.push({ path: '/cityList' })
    // console.log(localStorage.getItem('provinceList'));
    // if (localStorage.getItem('provinceList')) {
    //   let list:any = localStorage.getItem('provinceList')
    //   this.cityList1 = JSON.parse(list)
    //   this.iscitydialog = true;
    // } else {
    (this as any).$post('/wx/User/get_province_list').then((res:any) => {
      this.cityList1 = res.data
      this.iscitydialog = true
      // localStorage.setItem('provinceList', JSON.stringify(this.cityList1))
    })
    // }
  }
  getMember () {
    (this as any).$post('/wx/User/get_item_slide').then((res:any) => {
      if (res.status === 1) {
        this.addMember = res.data.add_count
        this.voteCount = res.data.vote_count
      }
    })
  }
  inputSearch () {
    this.activePage = 1
    this.dataLoading = true
    this.initRequest = false // 放开请求
    this.getRecommendList()
  }
  getRecommendList () {
    if (this.noneData && this.initRequest) { // 数据为空且请求过
      return
    }
    let page = this.activePage
    let formData:any = {}
    if (this.activeType === 1) {
      formData.userType = this.activeType
      formData.page = this.activePage
      formData.keyword = this.keyWord
      formData.cityCode = this.cityCode
      formData.proCode = this.proCode
      formData.schoolCode = this.schoolCode
    } else {
      formData.userType = this.activeType
      formData.page = this.activePage
      formData.keyword = this.keyWord
      formData.cityCode = this.cityCode
      formData.proCode = this.proCode
      formData.schoolCode = this.schoolCode
    }
    (this as any).$post('/wx/rank/getRecommendList', formData).then((res:any) => {
      this.initRequest = true
      this.currentPage = res.data.current_page
      this.noneData = !(res.data.length > 0)
      if (page === 1) {
        this.recommendList = res.data
      } else {
        this.recommendList = this.recommendList.concat(res.data)
      }
      this.dataLoading = false
    })
  }
  changeTypeFun (item:any, index:number) {
    if (this.activeType === item.type) {
      return
    }
    this.dataLoading = true
    this.activeType = item.type
    this.activePage = 1
    this.tip = item.tips
    this.refresh = true
    this.initRequest = false // 放开请求
    this.getRecommendList()
  }
  chooseCity (item:any) {
    // document.body.scrollTop = document.documentElement.scrollTop = 0
    this.iscitydialog = false
    this.activeCityName = item.city_name || '请选择城市'
    this.cityCode = item.city_code
    this.proCode = item.proCode
    this.initRequest = false // 放开请求
    this.activePage = 1
    this.selectCity(item) // 将选择的数据存到store
    this.dataLoading = true
    this.getRecommendList() // 请求数据
  }
  backTop () {
    let that = this
    let timer = setInterval(() => {
      let ispeed = Math.floor(-that.scrollTop / 5)
      document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
      if (that.scrollTop === 0) {
        clearInterval(timer)
      }
    }, 16)
  }
  scrollToTop () {
    let that = this
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    that.scrollTop = scrollTop
    if (that.scrollTop > 300) {
      that.btnFlag = true
    } else {
      that.btnFlag = false
    }
  }
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
    window.removeEventListener('scroll', this.scrollGetList)
    // window.onscroll()
  }
}
</script>

<style lang="scss" scoped>
  .index{
    min-height:calc(100vh + 0.1rem);
    background:#00ACF9;
    /* border: 1px solid red; */
    // position:relative;
  }
  .top-banner{
    width:100%;
    img{
      width:100%;
    }
  }
  .activity-info{
    display:flex;
    >div{
     flex-grow:1;
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
    margin:0 .08rem;
    // height:200px;
    border-radius: 6px;
    padding:.1rem;
    .input-area {
      position: relative;
       .search-input{
        padding-left:.1rem;
        width:100%;
        height:.35rem;
        background: #F2F2F2;
        border-radius: 6px;
        box-sizing:border-box;
      }
      img{
        position: absolute;
        top: .07rem;
        right: .15rem;
        width: .2rem;
        height: .2rem;
      }
    }
    .city-type-area{
      display:flex;
      justify-content:space-between;
      margin-top:.1rem;
      p{
        display:inline-block;
        height:.3rem;
        line-height:.3rem;
        font-size:.14rem;
      }
      .city-area{
        p{
          background: #F2F2F2;
          font-size:.14rem;
          text-align:center;
        }
        .city-name{
          width:1.1rem;
          border-radius:6px 0 0 6px;
          color: #989898;
          font-weight:300;
        }
        .city-select-icon{
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

    .stu-area {
      display:flex;
      flex-wrap:wrap;
      justify-content:flex-start;
      padding-top:.1rem;
      // padding-bottom:.5rem;
      padding-bottom:.3rem;
      // min-height:100vh;
      .noneData {
        flex: 1;
        /* margin: .2rem auto; */
        text-align: center;
        /* height: calc(100vh - 600px); */
        p {
          line-height: 1.24rem;
          font-size:.16rem;
          font-family: 'PingFang-SC-Regular';
        }
      }
    }
    .stu-item{
      width:1.05rem;
      margin-bottom:.1rem;
      flex-shrink:0;
      margin-right:.12rem;
      .stu-image-wrap{
        background:#e4e4e4;
        height:1.35rem;
        position:relative;
        border-radius:6px ;
        overflow:hidden;
        img{
          width:100%;
        }
        p{
          position:absolute;
          width:100%;
          height:.3rem;
          line-height:.3rem;
          background: #00ACF9;
          border-radius: 0 0 6px 6px;
          bottom:0;
          color:#fff;
          font-size:.12rem;
        }
      }
      .stu-name{

        height:.25rem;
        line-height:.25rem;
        font-size: .12rem;
        color: #4A4A4A;
        width:1rem;
        text-align:center;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
         margin-left:auto;
         margin-right:auto;
      }
      .vote-btn{
        display:inline-block;
        width:.68rem;
        height:.28rem;
        line-height:.28rem;
        font-size: .14rem;
        color: #FFFFFF;
        font-weight:bold;
        background: #FF784D;
        border-radius: 1rem;
        cursor:pointer;
        img{
          padding-top:.07rem;
          vertical-align:top;
          width:.16rem;

        }
      }
      &:nth-child(3n+3){
        margin-right:0;
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
