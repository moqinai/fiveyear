<template>
  <div class="home">
    <!-- <HelloWorld :style="{width:'80%',margin:'0 auto'}" msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <div>
      <p>
    <button @click="test" :style="{
      width:'80px',
      height:'40px',
      color:'#fff',
      background:'#ff8200'
    }">点击截图</button>
    </p>
    <p>
    <button @click="chooseImg"
    :style="{
      width:'80px',
      height:'40px',
      color:'#fff',
      background:'#ff8200'
    }"

    >选择图片</button>
    <input id="photo" type="file" accept="image/*">
    </p>
    </div>
    <div class="canvas-wrap" v-show="captureShow" id="canvas-wrap">
      <div class="close" @click="captureShow = !captureShow">X</div>
      <div class="canvas-content" id="canvas-content"></div>
    </div>
    <div class="user-choose-img" v-show="userImgShow">
      <button @click="saveCanvas">确定</button>
      <img :src="chooseImgSrc" alt="" id="image">
    </div>
    <div class="cropper-img">
      <img :src="corpperImg" alt="">
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import html2canvas from 'html2canvas'
import wx from 'weixin-js-sdk'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import testImg from '@/assets/1.jpg'
import testImg2 from '@/assets/logo.png'
@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  captureShow:boolean = false
  chooseImgSrc:string = testImg
  userImgShow:boolean =true
  cropper:any
  corpperImg:string = ''
  testImg:string =testImg
  testImg2:string = testImg2
  mounted () {
    let url:string = window.location.href.split('#')[0];
    (this as any).$post('/wx/rank/getRankList', {
      url: encodeURIComponent(url)
    }).then((res:any) => {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx882fc431aabb74fc', // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表
      })
    })
    this.$nextTick(() => {
      this.imgCropper()
    })
  }

  test () {
    let test:any = document.querySelector('.hello')

    html2canvas(test, {
    }).then((canvas:any) => {
      (document.querySelector('#canvas-content') as HTMLElement).appendChild(canvas)
      this.captureShow = true
    })
  }
  chooseImg () {
    var that = this
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res:any) {
          var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          //
          // that.chooseImgSrc = localIds[0]
          that.chooseImgSrc = that.testImg2
          that.userImgShow = true
          that.cropper.replace(testImg2)
        }
      })
    })
  }
  imgCropper () {
    let image:any = document.querySelector('#image')
    this.cropper = new Cropper(image, {
      viewMode: 2,
      aspectRatio: 12 / 16,
      background: false
    })
  }
  saveCanvas () {
    let str:string = this.cropper.getCroppedCanvas({
      width: 160,
      height: 90,
      minWidth: 256,
      minHeight: 256,
      maxWidth: 4096,
      maxHeight: 4096,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high'
    }).toDataURL()
    this.corpperImg = str
    this.userImgShow = false
  }
}
</script>

<style lang="scss" scoped>
button{
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
}

.canvas-wrap{
  padding-top:40px;
  position: fixed;
  left:40px;
  right:40px;
  bottom: 40px;
  top:40px;
  background: rgba(0,0,0,.5);
  .close{
    border-radius: 50%;
    background: #fff;
    width:20px;
    height:20px;
    position: absolute;
    right:10px;
    top:10px;
    cursor: pointer;
  }
  .canvas-content{
    width:100%;
  }
}
.user-choose-img{
  position: absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
  width:100%;
  background: rgba(0,0,0,1);
  img{
    max-width: 100%;
  }
}

</style>
