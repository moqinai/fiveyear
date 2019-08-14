<template>
  <div class="lpc-personal">
    <div v-show="canvasImgShow">
      <div class="lpc-header-text">
        <p>恭喜您报名成功！</p>
        <p>快去请身边的朋友帮你投票吧！</p>
      </div>
      <!-- <div class="lpc-content">
        <div class="lpc-content-header">
          <div class="lpc-content-header-img">
            <img src="@/assets/img/personal/logo@2x.png" alt="">
          </div>
          <div class="lpc-content-header-text">
            {{ schoolName }}
          </div>
        </div>
        <div class="lpc-five-img">
          <img src="@/assets/img/personal/five@2x.png" alt="">
        </div>
        <div class="lpc-voteImg">
          <img src="@/assets/img/personal/voteImg@2x.png" alt="" id="man-1">

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
        </div>
      </div> -->

      <div style="display: none;">
        <img src="@/assets/img/personal/sy.png" class="man man-2" id="man-2" alt="">
        <img src="@/assets/img/personal/bj1.png" id="bg1" alt="">
        <img src="@/assets/img/personal/bj2.png" id="bg2" alt="">
        <img src="@/assets/img/personal/voteImg@2x.png" alt="" id="man-1">
        <!-- <img src="@/assets/img/personal/sy.png" id="qrCode" alt=""> -->
        <!-- <img :src="userImage" alt="" id="man-1"> -->
        <img alt="" id="man-1">
        <img alt="" id="qrCode">
        <!-- 二维码 -->
      </div>
      <div class="lpc-creatImg">
        <canvas id="myCanvas"></canvas>
      </div>
      <div class="lpc-footer-text">
        <p>长按保存图片至手机</p>
      </div>
    </div>
    <div></div>
    <v-loading v-show="dataLoading"></v-loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import QRCode from 'qrcodejs2'
import html2canvas from 'html2canvas'
import domtoimage from 'dom-to-image'

@Component({
  components: { QRCode, domtoimage }
})

export default class cityList extends Vue {
  schoolName:string = ''
  studentName:string = ''
  studentCode:string = ''
  declaration:string = ''
  locationHref:string = ''
  canvasImgShow:boolean = false
  userId:string = ''
  userImage:string = '' // require('@/assets/img/personal/voteImg@2x.png') // 图
  qrImageHref:string = '' // 二维码地址
  dataLoading:boolean = true

  created () {
    // this.locationHref = location.href
    // console.log(location.href)
    // console.log(window.location.host)
    // this.locationHref = 'http://' + window.location.host + '/#/personalVote/' + this.$route.params.id
    this.userId = this.$route.params.id
  }
  mounted () {
    this.getVoteInfo()
  }
  getVoteInfo () {
    (this as any).$post('/wx/rank/getUserVoteInfo', { user_event_id: this.userId }).then((res:any) => {
      if (res.status === 1) {
        if (res.data instanceof Object) {
          let resData:any = res.data
          resData.user_type === 1 ? this.studentName = resData.user_name : this.studentName = resData.class // 判断是班级还是个人，显示相应信息
          this.schoolName = resData.user_school_name // 机构名
          if (this.schoolName === '其他') {
            this.schoolName = ''
          }
          this.declaration = resData.declaration
          this.studentCode = resData.user_code
          this.userImage = resData.user_envet_pictrue // 图
          // this.locationHref = resData.code_url // 二维码生成地址
          this.qrImageHref = resData.code_url
          // this.qrcode()
          this.$nextTick(() => {
            var man1:any = document.getElementById('man-1')
            man1.setAttribute('crossOrigin', 'anonymous')
            man1.src = this.userImage
            var qrImage:any = document.getElementById('qrCode')
            qrImage.setAttribute('crossOrigin', 'anonymous')
            qrImage.src = this.qrImageHref
            setTimeout(() => {
              this.createdImageFun()
            }, 3000)
          })
        }
      }
    })
  }

  qrcode () {
    let qrcodeDom = document.querySelector('.lpc-right-img') as HTMLElement
    // this.$nextTick(() => {
    // console.log(qrcodeDom.offsetHeight, qrcodeDom.offsetWidth)
    // })
    let qrcode = new QRCode('qrCode', {
      text: this.locationHref,
      width: 100, // qrcodeDom.offsetWidth - 10,
      height: 100 // qrcodeDom.offsetHeight - 10
    })
  }
  test () {
    let test:any = document.querySelector('.lpc-content')
    let qrcodeDom = document.querySelector('.lpc-content') as HTMLElement
    // console.log(qrcodeDom.offsetHeight) // width: qrcodeDom.offsetWidth, height: qrcodeDom.offsetHeight
    this.$nextTick(() => {
      html2canvas(test, { width: qrcodeDom.offsetWidth, height: 600 }).then((canvas:any) => {
        (document.querySelector('.lpc-creatImg') as HTMLElement).appendChild(canvas)
        this.canvasImgShow = false
      })
    })
    /**
    const u = navigator.userAgent; const app = navigator.appVersion
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isAndroid) {
      // 这个是安卓操作系统
      domtoimage.toPng(test).then(function (dataUrl:any) {
        var img = new Image()
        img.src = dataUrl
        // document.body.appendChild(img)
      })
    }
    if (isIOS) {
      // 这个是ios操作系统
      domtoimage.toPng(test, { filter: this.filterI }).then(function (dataUrl:any) {
        var img = new Image()
        img.src = dataUrl
        // document.body.appendChild(img)
      })
    } */
  }
  filterI (node:any) { // 过滤i标签元素
    return (node.tagName !== 'i')
  }
  createdImageFun ():void {
    // $('#myCanvas').show();
    let bodyDOM = document.querySelector('body') as HTMLElement
    const man1:any = document.getElementById('man-1')
    const man2 = document.getElementById('man-2')
    let canvasBg = document.getElementById('bg1')
    if (this.schoolName === '' || !this.schoolName) {
      canvasBg = document.getElementById('bg2')
    }
    const qrcodeImg:any = document.getElementById('qrCode')
    // console.log(a.lastChild)
    // const qrcodeImg:any = a.lastChild // document.getElementById("qrCode"); // 获取二维码
    // qrcodeImg.setAttribute('crossOrigin', 'anonymous');

    const canvas:any = document.getElementById('myCanvas')
    const ctx = canvas.getContext('2d')
    let qrImage = new Image() // 二维码图片
    canvas.width = 375 // bodyDOM.offsetWidth
    canvas.height = 714
    // 制作背景图
    const patBg = ctx.createPattern(canvasBg, 'repeat')
    ctx.rect(0, 0, 375, 714)
    ctx.fillStyle = patBg
    ctx.fill()
    // 将man1,man2,man3,man4,sen1,btn加入画布
    ctx.drawImage(man1, 0, 92, 375, 375)
    ctx.drawImage(man2, 189, 386, 175, 70)
    ctx.drawImage(qrcodeImg, 250, 595, 100, 100) // x ,y ,w, h
    const schoolname = this.schoolName

    const username = this.studentName
    const userid = 'ID:' + this.studentCode
    const memo = this.declaration
    ctx.font = ' 16px MicrosoftYaHei-Bold'
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText(schoolname, 127, 27, 80, 21)
    ctx.fillStyle = '#4A4A4A'
    ctx.fillText(username, 20, 494, 121, 21)
    ctx.fillStyle = '#4A4A4A'
    ctx.fillText(userid, 270, 494, 121, 21)
    ctx.fillStyle = '#00ACF9'
    ctx.fillText(memo, 20, 547, 324, 17)
    const newImg = new Image()
    newImg.src = canvas.toDataURL('image/png')
    canvas.style = 'display: none';
    (document.querySelector('.lpc-creatImg') as HTMLElement).appendChild(newImg)
    this.canvasImgShow = true
    this.dataLoading = false
  }
}
</script>

<style lang="scss" scoped>
  .lpc-personal {
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    padding-top: .1rem;
    /* padding: .1rem; */
    width: 100%;
    min-width: 375px;
    background-color: #FFF;
    .lpc-header-text {
      text-align: center;
      font-family: 'MicrosoftYaHei';
      color: #4A4A4A;
      letter-spacing: 0;
      margin-bottom: .1rem;
      p:first-child {
        font-size: .2rem;
      }
      p:last-child {
        font-size: .14rem;
      }
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
        height: 3.4rem;
        img {
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
          height: .32rem;
          line-height: .32rem;
          span:first-child {
            font-family: 'MicrosoftYaHei';
            font-weight: bold;
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
        height: 1.3rem;
        background: #0CAFF9;
        border-radius: 0 0 6px 6px;
        padding: .15rem .18rem;
        box-sizing: border-box;
        position: relative;
        .lpc-left-text {
          display: inline-block;
          font-family: MicrosoftYaHei;
          letter-spacing: 0;
          text-align: center;
          position: absolute;
          bottom: .15rem;
          p:first-child {
            font-size: .14rem;
            color: #FFFFFF;
          }
          p:nth-child(2) {
            font-size: .18rem;
            color: #FFFFFF;
            margin-bottom: .1rem;
          }
          p:last-child {
            background-color: #FFF;
            font-size: .13rem;
            color: #00ACF9;
            width: 1.88rem;
            /* height: .3rem;
            line-height: .3rem; */
            /* 为解决line-height在安卓机偏上的问题 */
            padding: .06rem 0;
            line-height: normal;
            border-radius: 1rem;
            span:first-child {
              margin-right: .05rem;
              img {
                width: .17rem;
                height: .14rem;
                vertical-align: middle;
              }
            }
          }
        }
        .lpc-right-img {
          float: right;
          vertical-align: middle;
          width: 1rem;
          height: 1rem;
          background-color: #FFF;
          border-radius: 6px;
          padding: .05rem;
          #qrCode {
            // width: 1rem;
            // height: 1rem;
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .lpc-creatImg {
      text-align: center;
      /* border: 1px solid red; */
    }
    .lpc-footer-text {
      text-align: center;
      font-family: 'MicrosoftYaHei';
      font-size: 16px;
      color: #989898;
      letter-spacing: 1px;
      padding: .2rem;
      line-height: normal;
    }
    .loading {
      // vertical-align: middle;
      height: 100vh;
      padding: 49vh 0;
    }
  }
</style>
