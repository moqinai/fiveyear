<template>
  <div>
    <div class="mine" v-show="dataShow">
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
          <img :src="userImage" alt="">
          <span class="dib edit-image-bt-wrap a-pos" @click="updateImgTips"><!-- userChooseImage -->
            <img src="@/assets/img/edit-image-bt@2x.png" alt="" class="edit-image-bt">
          </span>
          <div class="user-wrong" v-show="wrongUserShow">
            <div class="wrong-img-wrap">
              <img src="@/assets/img/wrong-user-tips@2x.png" alt="">
            </div>
            <div class="wrong-word-wrap">
              <p class="wrong-word">您的参赛作品因不符合参赛规则暂被下架。</p>
              <p class="wrong-word">请点击右上“编辑”按钮，重新上传照片</p>
            </div>
          </div>
        </div>
        <div class="lpc-Message">
          <p>
            <span>{{ studentName }}</span>
            <span>ID:{{ studentCode }}</span>
          </p>
          <p>我的宣言</p>
          <p>{{ declaration }}</p>
        </div>
        <!-- <div class="lpc-content-footer">
          <div class="lpc-left-text">
            <p>参加朴新教育五周年庆</p>
            <p>你也有机会赢大奖</p>
            <p>
              <span><img src="@/assets/img/personal/heart@2x.png" alt=""></span>
              <span>长按识别二维码 投我一票</span>
            </p>
          </div>
          <div class="lpc-right-img">
            <div id="qrCode" ref="qrCode"></div>
          </div>
        </div> -->
        <div class="lpc-joinImg" v-if="pageData.is_join">
          <p @click="continueAdd">继续添加参赛图片</p>
        </div>
        <div class="lpc-joinList" v-if="pageData.is_join" :class="pageData.workList.lenght > 3 ? 'heightScroll' : ''">
          <div v-for="(list, index) in pageData.workList" :key="index" class="lpc-list" >
            <div class="list-content" @click="joinListClick(list, index)" :class="activeList === index ? 'joinListActive' : ''">
              <div class="content-leftImg">
                <img :src="list.user_event_thumb" alt="">
                <div class="soldOutMsg" v-if="list.status === 2">已被下架</div>
              </div>
              <div class="content-rightText">
                <p class="joinmsg">参赛编码：{{list.user_event_code}}</p>
                <p class="joinmsg">参赛时间：{{list.join_timestr}}</p>
                <div class="text-msg">
                  <div class="text-wrap">
                    <p class="text-title">全国排名</p>
                    <p class="text-content">{{list.rank_num}}</p>
                  </div>
                  <div class="text-line"></div>
                  <div class="text-wrap">
                    <p class="text-title">累计票数</p>
                    <p class="text-content">{{list.user_event_vote_num}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="list-btn">
              <p class="active" v-if="list.status === 1">
                <img src="@/assets/img/xiazai@2x.png" alt="">
                <span @click="goPersonal(list.user_event_id)">查看分享海报</span>
              </p>
              <p class="soldOut" v-else><span>请重新上传照片</span></p>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="share-button">
        <p @click="goPersonal">查看分享海报</p>
      </div>
      <div class="user-vote-num">
        <div class="rank-wrap">
          <p class="vote-num-title">全国排名</p>
          <p class="vote-num-content">{{userRankNum}}</p>
        </div>
        <div class="vote-line"></div>
        <div class="vote-wrap">
          <p class="vote-num-title">累计票数</p>
          <p class="vote-num-content">{{userVoteNum}}</p>
        </div>
      </div> -->

      <!--
      <div class="risk-me-wrap" v-show="voteList.length >0">
        <p class="risk-me-title">谁在支持我</p>
        <div class="risk-me-img-wrap">
          <div v-for="(item, index) in voteList" :key="index" class="risk-me-img">
          -->
            <!-- <img :src="item.user_avatar" alt="who"> -->
            <!--
            <img src="@/assets/1.jpg" alt="">
          </div>
        </div>
      </div>
      -->
      <!-- <div class="bottom-ads">
        <p>这里留广告位这里留广告</p>
        <div>
          <div class="lpc-left">

          </div>
          <div class="lpc-center">

          </div>
          <div class="lpc-right">
            <div id="qrCode" ref="qrCode"></div>
          </div>
        </div>
      </div> -->
      <div class="crop-image-wrap" v-show="cropImageShow">
          <img :src="localImage" alt="" id="image">
          <div class="bottom-opa-area">
            <p @click="closeCropImg">
              <img src="@/assets/img/crop-close-bt@2x.png" alt="">
            </p>
            <p @click="cropImg">
              <img src="@/assets/img/crop-right-bt@2x.png" alt="">
            </p>
          </div>
      </div>
      <nav-tabs></nav-tabs>
    </div>
    <tips-img v-if="showTips" :showTips="showTips" @tipsMessage="tipsMessage"/>
  </div>
</template>

<script lang="ts">
import 'cropperjs/dist/cropper.css'
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import wx from 'weixin-js-sdk'
import Cropper from 'cropperjs'
import navTabs from '@/components/navTabs.vue'
import defaultImg from '@/assets/img/personal/voteImg@2x.png'
import tipsImg from '@/components/tipsImg.vue'

@Component({
  components: {
    navTabs, tipsImg
  },
  filters: {
    schoolNameFilter (value:any) {
      if (value === '其他') {
        return ''
      }
      return value
    }
  }
})
export default class Mine extends Vue {
  @Mutation changeTips: any
  isAuth:boolean = false
  schoolName:string = '' // 机构名
  studentName:string = '' // name
  studentCode:string = '' // id
  declaration:string = '' // 宣言
  locationHref:string = ''
  userRankNum:number = 300
  userVoteNum:number=3000
  userImage:string = ''
  voteList:Array<any> = [1, 2]
  userId:any = ''

  userEventId: any = ''
  pageData: any = {} // 页面数据
  activeList: number = 0 // 当前默认选中

  // 裁剪图片部分内容
  cropImageShow:boolean = false
  cropImageData:any = ''
  localImage:any = ''
  cropper:any=''
  showTips:boolean = false // 是否展示提醒flag
  dataShow:boolean = false

  wrongUserShow:boolean = false
  created () {
    this.getUserInfo() // 请求个人信息
  }
  mounted () {
    this.initConfig()
    this.imgCropper()
    //
  }
  initConfig () {
    let url:string = window.location.href.split('#')[0];
    (this as any).$post('/wx/home/getSignPackage/pbid/1', {
      url: encodeURIComponent(url)
    }).then((res:any) => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appId, // 'wx882fc431aabb74fc', // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: ['chooseImage', 'uploadImage'] // 必填，需要使用的JS接口列表
      })
    })
  }
  updateImgTips ():void { // 更改图片前提示
    this.showTips = true
  }
  tipsMessage (data:any):void { // 接收子组件信息方法
    this.showTips = data.showTips
    if (data.upload) { // 如果是选择的继续修改
      this.userChooseImage()
    }
  }
  userChooseImage ():void { // 更改图片
    var _that:any = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res:any) {
        var localIds = res.localIds
        wx.uploadImage({
          localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: (res:any) => {
            var serverId:any = res.serverId; // 返回图片的服务器端ID
            (_that as any).$post('/wx/user/getMediaImage', { media_id: serverId }).then((res:any) => {
              if (res.status === 1) {
                let img:any = res.data
                _that.cropper.replace(img)
                _that.cropper.replace(img)
                _that.cropImageShow = true
              }
            })
          }
        })
      }
    })
  }
  imgCropper () {
    let image:any = document.querySelector('#image')
    this.cropper = new Cropper(image, {
      viewMode: 2,
      aspectRatio: 1 / 1,
      background: false
    })
  }
  cropImg () {
    let str:any = this.cropper.getCroppedCanvas({
      width: 700,
      height: 700,
      minWidth: 256,
      minHeight: 256,
      maxWidth: 4096,
      maxHeight: 4096,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high'
    }).toDataURL()
    // 替换现有图片
    // 先保存服务器，再刷新

    this.updateUserImage(str).then((value:any) => {
      this.userImage = str
      // this.userImageShow = true
      this.cropImageShow = false
      this.wrongUserShow = false
    }, (value:any) => {
      this.changeTips({ show: true, title: value })
    })
  }
  closeCropImg () {
    this.cropImageShow = false
  }
  updateUserImage (picStr:string):any {
    let that:any = this
    return new Promise((resolve:any, reject:any) => {
      (that as any).$post('/wx/user/resetUserWorksInfor', {
        picture: picStr,
        user_event_id: this.userEventId
      }).then((res:any) => {
        if (res.status === 1) {
          resolve()
        } else {
          reject(new Error('上传失败，请重新选择'))
        }
      })
    })
  }
  getUserInfo () {
    // 不传参数，直接返回接口数据
    (this as any).$post('/wx/rank/getUserCenter').then((res:any) => {
      if (res.status === 1) {
        if (res.data instanceof Object) {
          let resData:any = res.data
          // console.log(resData)
          if (resData.is_join) { // is_join为1时已参赛 0未参赛
            this.$router.replace('/mine')
          } else {
            if (resData.user_type === 1) { // 则跳转至参赛信息填写页面 // 判断是1个人 班级2
              this.$router.replace('/takeActivity/personal')
            } else {
              this.$router.replace('/takeActivity/class')
            }
          }
          this.pageData = res.data
          this.pageData.workList[0].user_type === 1 ? this.studentName = resData.user_name : this.studentName = this.pageData.workList[0].class_code // 判断是班级还是个人，显示相应信息
          // this.schoolName = res.data.workList[0].
          this.schoolName = resData.user_school_name // 机构名
          this.declaration = this.pageData.workList[0].declaration // 宣言
          this.pageData.workList[0].user_type === 1 ? this.studentCode = this.pageData.workList[0].user_event_code : this.studentCode = this.pageData.workList[0].user_event_code // id
          this.userImage = this.pageData.workList[0].user_envet_pictrue // 大图
          // this.thumnImg = this.pageData.workList[0].user_envet_thumn // 缩略图
          // this.userRankNum = resData.rank_num // 全国排名
          // this.userVoteNum = resData.user_event_vote_num // 累计票数
          this.userEventId = this.pageData.workList[0].user_event_id
          // this.voteList = resData.voteList // 谁在支持我图片信息
          this.dataShow = true
          if (this.pageData.workList[0].status === 2) {
            this.wrongUserShow = true
          }
        }
      }
    })
  }
  joinListClick (list: any, ind: number): void { // joinList点击事件
    this.activeList = ind
    this.schoolName = list.user_school_name // 机构名
    this.declaration = list.declaration // 宣言
    this.userImage = list.user_envet_pictrue // 大图
    list.user_type === 1 ? this.studentName = this.pageData.user_name : this.studentName = list.class_code // 判断是班级还是个人，显示相应信息
    // list.user_type === 1 ? this.studentCode = this.pageData.user_code : this.studentCode = this.pageData.class_code // id
    this.studentCode = list.user_event_code
    list.status === 2 ? this.wrongUserShow = true : this.wrongUserShow = false
    this.userEventId = list.user_event_id
  }
  /* getUserInfo ():void { // 获取个人信息
    (this as any).$post('/wx/rank/getIsAuthUserInfo').then((res:any) => {
        if (res.status === 1) {
          // if (res.data.is_join === 1) { // is_join为1时已参赛 0未参赛
           // this.$router.replace('/mine')
          // }
          if (res.data instanceof Object) {
            let resData:any = res.data
            if (!resData.is_join) {  // 1参加 0未参加
              if (resData.user_type) {  // 则跳转至参赛信息填写页面 // 判断是1个人 班级0
                this.$router.replace('/takeActivity/personal')
              } else {
                this.$router.replace('/takeActivity/class')
              }
            } else { // 已参加
              resData.user_type ? this.studentName = resData.user_name : this.studentName = resData.user_class_name // 判断是班级还是个人，显示相应信息
              this.schoolName = resData.user_school_name // 机构名
              this.declaration = resData.event_name
              this.studentCode = resData.user_code
              this.userRankNum = resData.rank_num
              this.userVoteNum = resData.user_event_vote_num
              this.userImage = resData.user_envet_pictrue
              this.userId = resData.user_event_id
              this.voteList = resData.voteList // 谁在支持我图片信息
            }
          }
        } else { // 请求失败进个人
          this.$router.replace('/takeActivity/personal')
        }
      })
  } */
  errorImage () {
    this.userImage = defaultImg
  }
  goPersonal (userId: string) { // 查看分享海报
    this.$router.push({ name: 'personal', params: { 'id': userId } })
  }
  continueAdd (): void { // 继续参赛
    if (this.pageData.user_type === 1) {
      this.$router.push('/takeActivity/personal')
    } else {
      this.$router.push('/takeActivity/class')
    }
  }
  // beforeRouteEnter (to:any, from:any, next:any) {
  //   // ...
  //   console.log(1)
  //   next((vm:any) => {
  //     vm.getUserInfo()
  //   })
  // }
}
</script>

<style lang="scss" scoped>
    .mine {
      height:100%;
      background:#fff;
    }
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
          /* &:after {
            content: '';
            height: .4rem;
            line-height: .4rem;
            border-right: 1px solid red;
            margin: 0 .1rem;
          } */
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
        // width:100%;
        min-height: 3.4rem;
        position:relative;
        .edit-image-bt-wrap{
          z-index:100;
          position:absolute;
          right:0;
          width:.38rem;
          height:.38rem;
          background-image: linear-gradient(-180deg, #FED073 0%, #FF5646 100%);
          border-radius: 0 6px 0 6px;
          box-sizing:border-box;
          padding:0.09rem;
          .edit-image-bt{
            width:.2rem;
            height:.2rem;
          }
        }
        img {
          vertical-align:middle;
          height: 100%;
          width: 100%;
        }
        .user-wrong{
          position:absolute;
          top:0;
          left:0;
          bottom:0;
          right:0;
          background:rgba(0,0,0,.8);
          padding-top:50%;
          .wrong-img-wrap{
            position:absolute;
            right: 10%;
            top: 10%;
            img{
              width:.74rem;
              height:.76rem;
            }
          }
          .wrong-word-wrap{
            transform:translateY(-50%);
          }
          .wrong-word{
            font-size:.14rem;
            color: #FF784D;
            text-align:center;
          }
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
      .lpc-joinImg {
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center;
        margin-bottom: .15rem;
        p {
          width: 1.91rem;
          text-align: center;
          border-radius: .05rem;
          background: #ff8056;
          padding: .05rem 0;
          color: #FFF;
        }
      }
      .heightScroll {
        height: 4.41rem;
        overflow-y: auto;
      }
      .lpc-joinList { /* 参加列表 */
        padding: 0 .16rem;
        margin-bottom: .2rem;
        .lpc-list {
          margin-bottom: .1rem;
          .list-content {
            padding: .08rem;
            height: .9rem;
            background: #00ACF9;
            border-radius: .05rem .05rem 0 0;
            display: flex;
            .content-leftImg {
              // width: .9rem;
              height: .9rem;
              flex: 0 0 .9rem;
              margin-right: .2rem;
              position: relative;
              img {
                height: 100%;
                width: 100%;
              }
              .soldOutMsg {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center; /* 水平居中 */
                align-items: center;     /* 垂直居中 */
                opacity: 0.81;
                background: #000000;
                font-family: MicrosoftYaHei;
                font-size: .14rem;
                color: #FF784D;
                letter-spacing: 0;
              }
            }
            .content-rightText {
              flex: 1;
              height: .9rem;
              p.joinmsg {
                font-family: MicrosoftYaHei;
                font-size: .14rem;
                color: #FFFFFF;
                letter-spacing: 0;
              }
              .text-msg {
                display: flex;
                margin-top: .07rem;
                .text-line {
                  flex: 0 0 .02rem;
                  margin: .05rem 0;
                  background: rgba(255,255,255,0.6);
                }
                div:first-child {
                  flex: 0 0 .95rem;
                }
                div:last-child {
                  flex: 1;
                  text-align: center;
                }
                .text-wrap {
                  .text-title {
                    font-family: MicrosoftYaHeiLight;
                    font-size: .12rem;
                    color: #FFFFFF;
                    letter-spacing: 1px;
                    text-align: center;
                  }
                  .text-content {
                    font-family: MicrosoftYaHei-Bold;
                    font-size: .2rem;
                    color: #FFFFFF;
                    letter-spacing: -0.67px;
                    text-align: center;
                  }
                }
              }
            }
          }
          .joinListActive {
            background: #0075e3!important;
          }
          .list-btn {
            margin-top: .02rem;
            p {
              border-radius: 0 0 6px 6px;
              text-align: center;
              span {
                font-family: MicrosoftYaHei;
                font-size: .14rem;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
                padding: .07rem 0;
                line-height: normal;
                display: inline-block;
              }
              img {
                width: .16rem;
                height: .2rem;
                margin-right: .15rem;
                vertical-align: middle;
                display: inline-block;
              }
            }
            p.active {
              background-image: linear-gradient(-180deg, #FED073 0%, #FF5646 100%);
            }
            p.soldOut {
              background: #b0b0b0;
            }
          }
        }
      }
    }
    .share-button{
      padding-bottom:.25rem;
      p{
      text-align:center;
      color:#fff;
      font-size: 14px;
      margin:0 auto;
      width:1.91rem;
      height:.44rem;
      line-height:.44rem;
      background-image: linear-gradient(-180deg, #FED073 0%, #FF5646 100%);
      border-radius: 73.53px;
      }
    }
    .user-vote-num{
      display:flex;
      height:.7rem;
      margin:0 .16rem;
      border-radius: 6px;
      overflow:hidden;
      background: #00ACF9;
      margin-bottom:.15rem;
      >div{
        padding-top:.09rem;
        flex-grow:1;
        color:#fff;

      }
      .vote-line{
        padding-top:0px;
        margin-top:.15rem;
        margin-bottom:.15rem;
        width:0.02rem;
        flex-grow:0;
        background:rgba(255,255,255,0.6);
      }
      .vote-num-title{
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 1px;
        text-align: center;
        font-weight:300;
      }
      .vote-num-content{
        margin-top:-.05rem;
        font-size: 30px;
        color: #FFFFFF;
        letter-spacing: -1px;
        text-align: center;
        font-weight:600;
      }

    }

    .risk-me-wrap{
      padding:0 .16rem;
      .risk-me-title{
        font-size: 16px;
        color: #4A4A4A;
        font-weight:500;
        padding:0px 0px 15px 0px;
      }
      .risk-me-img-wrap{
        display:flex;
        flex-wrap:wrap;
        // justify-content:space-between;

        .risk-me-img{
          width:15%;
          border-radius:50%;
          margin-bottom:.07rem;

          img{
            width:.4rem;
            height:.4rem;
            border-radius:50%;
            overflow:hidden;
          }
        }
        .risk-me-img:nth-child(7n){
          margin-right:0;
        }
        &:after{
          content:'-';
          font-size:0;
          display:block;
          flex-grow:1;
        }
      }
    }
    .bottom-ads{
      height:1.2rem;
      background: #F2F2F2;

    }
    .crop-image-wrap {
      z-index:100;
      position:fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background:rgba(0,0,0,0.8);
      #image{
        width:100%;
        height:auto;
      }
    .bottom-opa-area {
      position:absolute;
      bottom:0;
      background:rgba(0,0,0,1);
      width:100%;
      color:#fff;
      p{
        height:.4rem;

        img{
          margin-top:.1rem;
          height:.18rem;
        }
      }
      p:first-child{
        float:left;
        margin-left:.2rem;

      }
      p:last-child{
        float:right;
        margin-right:.2rem;
      }
    }
  }
</style>
