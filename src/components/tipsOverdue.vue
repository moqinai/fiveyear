<template>
  <div class="tips-wrap" v-if="tipsShow">
    <div class="apponment-tips">
      <span @click="closeTips"><img src="@/assets/img/close-bt@2x.png"></span>
      <div class="tips-content">
        <div class="focus">
          <h2>感谢您的关注</h2>
          <p>本活动已于2019-08-31结束</p>
        </div>
        <p>关注我们的公众号</p>
        <p class="official">朴新教育</p>
        <p>可以及时查看投票结果</p>
        <!-- <p class="content-title" v-html='tipsContents.title'></p> -->
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
 @Prop({
   type: [Object, String],
   default: {
     title: '',
     content: '',
     btn: '',
     cancelBtnShow: false,
     cancelBtn: '确定'
   }

 }) tipsContents!:any

  tipsShow:boolean = true

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
  div.tips-wrap{
    z-index:10000;
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: rgba(0,0,0,0.9);
  }
  .apponment-tips{
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
    .focus{
      padding: .25rem 0 .3rem 0;
      h2{
      font-size: .22rem;
      }
    }
    .official{
      font-size: .14rem;
      color: #00ACF9;
      letter-spacing: 0;
    }

  }
  .content-title{
    margin-top:.3rem;
    font-family: 'PingFangSC-Medium';
    font-size: .14rem;
    color: #333333;
    text-align: center;
    line-height: .21rem;
    font-weight: 600;
    padding:0px .3rem;
  }
  .content-content{
    margin-top:.12rem;
    font-family: 'PingFangSC-Regular';
    font-size: .12rem;
    color: #5D5D5D;
    text-align: center;
    line-height: .21rem;
  }
  .tips-bottom{
    width:100%;
    bottom:.2rem;
    position:absolute;
    text-align: center;
  }
  button.tips-button{
    width:1.91rem;
  }
  .tips-title{
    width: 1.15rem;
  }
  button.tips-button,.tips-title{
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

  button.cancel-tips-btn{
    background: #fff;
    color:#FF8200;
    border:1px solid #FF8200;
    margin-right: .1rem;

  }

</style>
