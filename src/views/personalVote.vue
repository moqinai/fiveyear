<template>
  <div class="lpc-personal">
    <div>
      <div class="lpc-content">
        <div class="lpc-content-header">
          <div class="lpc-content-header-img">
            <img src="@/assets/img/personal/logo@2x.png" alt="" :style="{'border-right':schoolName==='其他'?'0px':''}">
          </div>
          <div class="lpc-content-header-text">
            {{ schoolName | schoolNameFilter}}
          </div>
        </div>
        <div class="lpc-five-img">
          <img src="@/assets/img/personal/five@2x.png" alt="">
        </div>
        <div class="lpc-voteImg">
          <img :src="userImage"  alt="">
        </div>
        <div class="lpc-Message">
          <p>
            <span>{{ studentName }}</span>
            <span>ID:{{ studentCode }}</span>
          </p>
          <p>我的宣言</p>
          <p>{{ declaration }}</p>
        </div>
        <div class="lpc-content-footer">
          <div class="lpc-left-text">
            <p>全国排名</p>
            <p>{{ chinaRanking }}</p>
          </div>
          <hr/>
          <div class="lpc-right-text">
            <p>累计票数</p>
            <p>{{ cumulativetTcket }}</p>
          </div>
        </div>
        <div class="lpc-footer-bottom">
          <div class="lpc-btn-text" @click="lookOther">查看其他</div>
          <div class="lpc-bottom-img" @click="voteFun">
            <img :src="srcVoteSuccess" alt="" v-show="isVote===1">
            <img :src="srcImg" alt="" v-show="isVote===0">
          </div>
          <div class="lpc-btn-text" @click="join">我要参与</div>
        </div>
      </div>
    </div>
    <tips-content :tipsContents="tipsContents" :tipsShow="tipsShow" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import QRCode from 'qrcodejs2'
import html2canvas from 'html2canvas'
import domtoimage from 'dom-to-image'
import defaultImage from '@/assets/img/personal/voteImg@2x.png'
import tipsContent from '@/components/tipsContent.vue'
import md5 from 'md5'

@Component({
  components: { QRCode, domtoimage, tipsContent },
  filters: {
    schoolNameFilter (value:any) {
      if (value === '其他') {
        return ''
      }
      return value
    }
  }
})

export default class cityList extends Vue {
  @Mutation changeTips: any
  @Prop() readonly userId!:any
  schoolName:string = '' // 机构名
  studentName:string = '' // 姓名
  studentCode:string = '' // ID
  declaration:string = '' // 宣言
  chinaRanking:string = '' // 全国排名
  cumulativetTcket:string = '' // 累计票数
  userVoteNum:any = 0
  userImage:string = ''
  tipsContents:string = '您已成功为ta投票！'
  tipsShow:boolean = false // 是否显示提示
  srcImg:string = require('@/assets/img/vote-bt01@2x.png') // 投票按钮
  srcVoteSuccess:string = require('@/assets/img/vote-success@2x.png') // 投票成功
  isVote:number = 0 // 0为头 1已投
  rankStr:string = ''

  created () {
    this.getVoteInfo()
  }
  mounted () {

  }

  getVoteInfo () {
    let formData = {
      user_event_id: this.userId
    };
    (this as any).$post('/wx/rank/getUserVoteInfo', formData).then((res:any) => {
      // console.log(res)
      if (res.status === 1) {
        if (res.data instanceof Object) {
          let resData:any = res.data
          this.studentName = resData.user_name
          resData.user_type === 2 ? this.studentName = resData.user_class_code : this.studentName = resData.user_name
          this.declaration = resData.declaration
          this.studentCode = resData.user_code // user_type =2 时取code， =1 时取name
          this.chinaRanking = resData.rank_num
          this.cumulativetTcket = resData.user_event_vote_num
          this.userImage = resData.user_envet_pictrue
          this.isVote = resData.is_vote
          this.schoolName = resData.user_school_name
          this.rankStr = resData.rand_str
        }
      }
    })
  }
  imageError ():void {
    this.userImage = defaultImage
  }
  lookOther ():void { // 查看其他
    (this as any).$post('/wx/user/getButtonrecord', { opus_id: this.userId, btn_type: 2 }).then((res:any) => {});
    (this as any).$router.push('/')
  }
  voteFun ():void {
    if (this.isVote === 1) {
      return
    }
    this.tipsShow = false
    let formData = {
      user_event_id: this.userId,
      key_str: md5('WF%8RHjDW*%N0o7i' + this.rankStr)
    };
    (this as any).$post('/wx/rank/dealUserVoteRecord', formData).then((res:any) => {
      if (res.status) {
        this.cumulativetTcket = (Number(this.cumulativetTcket) + 1).toString()
        this.tipsShow = true
        // this.srcImg = srcVoteSuccess
        this.isVote = 1
      } else {
        this.changeTips({ show: true, title: res.msg })
      }
    })
  }
  join ():void { // 我要参与
    (this as any).$post('/wx/user/getButtonrecord', { opus_id: this.userId, btn_type: 1 }).then((res:any) => {});
    (this as any).$router.push({ path: '/takeActivity/personal' })
  }
}
</script>

<style lang="scss" scoped>
  .lpc-personal {
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    padding: .1rem;
    background-color: #FFF;
    .lpc-content {
      border-radius: 6px;
      .lpc-content-header {
        height: .4rem;
        background: #0CAFF9;
        padding: 0 .18rem;
        border-radius: 6px 6px 0 0;
        .lpc-content-header-img {
          display: inline-block;
          line-height: .4rem;
          img {
            width: .7rem;
            vertical-align: middle;
            border-right: 1px solid #FFF;
            padding-right: .15rem;
          }
        }
        .lpc-content-header-text {
          display: inline-block;
          padding-left: .15rem;
          font-size: .15rem;
          line-height: .4rem;
          color: #FFF;
        }
      }
      .lpc-five-img {
        background: #FFF;
        height: .44rem;
        padding: .06rem .15rem;
        text-align: center;
        border-right: 1px solid #B0E6FF;
        border-left: 1px solid #B0E6FF;
        img {
          height: .32rem;
        }
      }
      .lpc-voteImg {
        min-height: 3.4rem;
        img {
          vertical-align:middle;
          height: 100%;
          width: 100%;
        }
      }
      .lpc-Message {
        background: #FFF;
        padding: .12rem .18rem;
        border-right: 1px solid #B0E6FF;
        border-left: 1px solid #B0E6FF;
        p:first-child {
          font-size: 14.63px;
          color: #4A4A4A;
          letter-spacing: 0;
          min-height: .32rem;
          line-height: .32rem;
          span:first-child {
            font-family: 'MicrosoftYaHei';
            font-weight: bold;
            display: inline-block;
            width: 60%;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          span:last-child {
            font-family: 'MicrosoftYaHeiLight';
            float: right;
          }
        }
        p:nth-child(2) {
          font-size: .1rem;
          color: #4A4A4A;
          letter-spacing: 0;
          text-align: justify;
        }
        p:last-child {
          font-family: 'MicrosoftYaHei-Bold';
          font-size: .15rem;
          color: #00ACF9;
          letter-spacing: 0;
          text-align: justify;
          line-height: .32rem;
          font-weight: bold;
        }
      }
      .lpc-content-footer {
        height: .7rem;
        background: #0CAFF9;
        border-radius: 0 0 6px 6px;
        padding: .09rem 0;
        display: flex;
        .lpc-left-text,.lpc-right-text {
          flex: 1;
          text-align: center;
          color: #FFFFFF;
          p:first-child {
            font-family: MicrosoftYaHeiLight;
            font-size: 12px;
            letter-spacing: 1px;
          }
          p:last-child {
            font-family: MicrosoftYaHei-Bold;
            font-size: 30px;
            letter-spacing: -1px;
          }
        }
        hr {
          height: .45rem;
          border: 1px solid #FFFFFF;
        }
      }
      .lpc-footer-bottom {
        padding: .26rem 0 .26rem 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .lpc-btn-text {
          flex: 1;
          height: .34rem;
          box-sizing: border-box;
          padding: .07rem 0;
          background-image: linear-gradient(-180deg, #E4F6FF 0%, #A9E4FF 99%);
          border-radius: 114.72px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #0075E3;
          letter-spacing: 0;
          line-height: normal;
          text-align: center;
        }
        .lpc-bottom-img {
          flex: 0 0 1.17rem;
          padding: 0 .17rem;
          height: .44rem;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
</style>
