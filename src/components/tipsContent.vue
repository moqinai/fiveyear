<template>
<div class="tips-wrap" v-if="tipsShow">
  <div class="apponment-tips">
    <!-- <div class="tips-title"> -->
    <span @click="closeTips"><img src="@/assets/img/close-bt@2x.png"></span>
    <div class="tips-content">
      <p class="content-title" v-html='tipsContents'></p>
    </div>
    <div class="tips-bottom">
      <button class="tips-button" @click="closeTips">我知道了</button>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({})
export default class tipsDialog extends Vue {
  @Prop({}) tipsContents!:any
  @Prop({}) tipsShow!:boolean

  closeTips () {
    this.tipsShow = false
  }
  created () {
  }
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  div.tips-wrap {
    z-index:10000;
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: rgba(0, 0, 0, 0.9);
  }
  .apponment-tips{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width:2.49rem;
    height:1.43rem;
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
  .tips-title{
    height:.48rem;
    border: 1px solid #E9E9E9;
    line-height: .48rem;
    vertical-align: middle;
    position: absolute;
    top: -.22rem;
    left: .65rem;
  }
  .tips-content{
    margin:.25rem .36rem;
    text-align: center;
    font-family: 'MicrosoftYaHei';
    font-size: .14rem;
    color: #4A4A4A;
    letter-spacing: 0;
  }
  .content-title{
    margin-top:.3rem;
    font-family: 'PingFangSC-Medium';
    font-size: .14rem;
    text-align: center;
    line-height: .21rem;
    color: #4A4A4A;
    letter-spacing: 0.88px;
  }
  .tips-bottom{
    width:100%;
    bottom:.2rem;
    position:absolute;
    text-align: center;
  }
  button.tips-button{
    width:1.91rem;
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
    border:1px solid #FF8200;
  }

</style>
