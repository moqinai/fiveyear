<template>
  <div class="tips-wrap">
    <div class="apponment-tips-img">
      <span @click="closeTips"><img src="@/assets/img/close-bt@2x.png"></span>
      <p class="tips-title-img">重新上传图片提示</p>
      <div class="tips-content-img">
        <p>您的参赛作品因不符合参赛规则暂被下架。</p>
        <p>欢迎重新提交照片参与活动。</p>
        <!-- <p class="content-title" v-html='tipsContents.title'></p> -->
      </div>
      <div class="tips-bottom">
        <button class="tips-button-img" @click="goUser">个人中心</button>
        <!-- <button class="tips-button-img" @click="closeTips">我知道了</button>
        <button class="tips-button-img" @click="goUpload">上传照片</button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({})
export default class tipsUndo extends Vue {
  // @Prop({}) tipsContents!:any
  @Prop({}) showTips!:boolean

  closeTips () {
    const params = { 'showTips': false, 'upload': false } // upload判断是否继续替换的标识
    this.$emit('tipsMessage', params)
  }
  goUpload () {
    const params = { 'showTips': false, 'upload': true }
    this.$emit('tipsMessage', params)
  }
  goUser ():void { // 去个人中心
    const params = { 'showTips': false, 'upload': true }
    this.$emit('tipsMessage', params)
  }
  created () {
  }
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  div.tips-wrap{
    z-index:10000;
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: rgba(0,0,0,0.9);
  }
  .apponment-tips-img{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width:2.49rem;
    height:2.86rem;
    background: #FFFFFF;
    box-shadow: 0 .02rem .08rem 0 rgba(0,0,0,0.20);
    border-radius: .0441rem;
    span{
      position: absolute;
      top:-.15rem;
      right: -.15rem;
      display: inline-block;
      width: .28rem;
      height: .28rem;
      // font-color:
      line-height: .24rem;
      text-align: center;
      background: #fff;
      border-radius: 50%;
      border: 0 solid #F2F2F2;
      cursor: pointer;
      img{
        width: .10rem;
        height: .10rem;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
  .apponment-tips-img{
    width: 2.34rem;
    height: 2.24rem;
  }
  .tips-bottom{
    width:100%;
    bottom:.2rem;
    position:absolute;
    text-align: center;
  }
 .tips-title-img,.tips-button-img{
    // width:88px;
    height:.44rem;
    color:#fff;
    // background: #FF8200;
    background-image: linear-gradient(-180deg, #FED073 0%, #FF5646 100%);
    border-radius: 73.53px;
    // border-radius: 6px;
    font-family: 'PingFangSC-Regular';
    font-size: .14rem;
    color: #FFFFFF;
    text-align: center;
    line-height: .44rem;
    text-align: center;
    cursor: pointer;
    // border:1px solid #FF8200;
  }
  .tips-title-img{
    width: 1.54rem;
    height:.44rem;
    border: 1px solid #E9E9E9;
    line-height: .44rem;
    vertical-align: middle;
    position: absolute;
    top: -.24rem;
    left: .4rem;
  }
  .tips-content-img{
    margin:.25rem .25rem;
    // text-align: center;
    padding: .35rem 0;
    p{
      &:nth-child(1){
        // padding: .35rem 0 .24rem 0;
      }
      &:nth-child(2){
        font-size: .16rem;
      }
      font-family: MicrosoftYaHei;
      font-size: .14rem;
      color: #4A4A4A;
      letter-spacing: 0;
      line-height: 20.24px;
    }
  }
  .tips-button-img{
    width: .9rem;
    height: .44rem;
    &:nth-child(2){
      margin-left: .17rem;
    }
  }

</style>
