<template>
<div class="tips-wrap" v-if="serviceShow">
  <div class="apponment-tips">
    <!-- <div class="tips-title"> -->
    <span @click="closeTips"><img src="@/assets/img/close-bt@2x.png"></span>
    <p class="content-title">朴新教育五周年活动服务条款</p>
    <div class="tips-content">
      <p>1.朴新教育科技集团有限公司（以下称：朴新教育）将按照本服务条款的相关规定服务于参赛者。参赛者在进行上传提交照片的过程中点击“同意”按钮即表示参赛者完全接受本服务条款的全部内容。</p>

      <p>2.参赛者提交信息后，朴新教育将提供每个参赛者一个专有编码，编码与参赛者真实信息关联，参赛者上传的图片，需积极健康，不违反国家法律法规。</p>

      <p>3.如发生下列任何一种情形，朴新教育将中断或终止参赛者参与本次活动，并保留采取其它处理方式的权利，无需对参赛者或任何第三方承担任何责任：</p>

      <p>3.1 参赛者提供的个人资料不真实；</p>

      <p>3.2 参赛者上传照片不符合活动主题；</p>

      <p>3.3 参赛者存在刷票作弊情况。</p>

      <p>4.参赛者在参与朴新教育活动时，需提供准确、真实的个人资料，如个人资料有任何变动，请务必及时更新。</p>

      <p>5.参赛者应上传本人照片，由于网络投票无法确认是否为本人上传，获奖礼品将直接发放给上传照片的参赛者。</p>

      <p>6.参赛者在参加活动过程中，必须遵循以下原则：</p>

      <p>6.1 遵守中国有关的法律和法规；</p>

      <p>6.2 遵守所有与网络服务相关的服务条款、规定和程序；</p>

      <p> 6.3 不得为任何非法目的而使用活动相关素材与资料；</p>

      <p>6.4 不得利用朴新教育活动，进行任何可能对移动网正常运转造成不利影响的行为；</p>

      <p>6.5不得利用朴新教育提供的移动网服务上传、展示或传播任何虚假的、骚扰性的、中伤他

      人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料；</p>

      <p>6.6 不得侵犯其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益；</p>

      <p>6.7 朴新教育有权对参赛者使用移动网服务的情况进行审查和监督，如参赛者在使用移动网服务时违反任何上述规定，朴新教育或其授权的人有权要求参赛者改正或直接采取一切必要的措施以减轻参赛者不当行为造成的影响。</p>

      <p>7.知识产权：朴新教育提供的移动网服务中包含的任何文本、图片、图形、音频和/或视

      频资料均受版权、商标和/或其它财产所有权法律的保护，未经相关权利人同意，上述资料均不得在任何媒体直接或间接发布、播放、出于播放或发布目的而改写或再发行，或者被用于其他任何商业目的。所有这些资料或资料的任何部分仅可作为私人和非商业用途而保存在某台计算机内。朴新教育不就由上述资料产生或在传送或递交全部或部分上述资料过程中产生的延误、不准确、错误和遗漏或从中产生或由此产生的任何损害赔偿，以任何形式，向参赛者或任何第三方负责。</p>

      <p>8.活动授权</p>

      <p>8.1 参赛者为肖像权人，自愿拍摄符合朴新教育活动主题的照片，并同意朴新教育以正当方式将该照片用于各项业务及宣传活动(如：使用在朴新教育品牌的电子商务、户外广告、电视媒体、海报单页、易位宝、画册等印刷企业内部资料及订单选样等宣传载体)。</p>

      <p>8.2肖像使用权自参赛者上传照片起有效。</p>

      <p>8.3 朴新教育有权根据实际情况的需要对于参赛者照片进行技术处理、修改，不需经过参赛者同意。</p>

      <p>9.隐私保护</p>

      <p>9.1 保护参赛者隐私是朴新教育此项活动的一项基本政策，朴新教育保证不对外公开或向第三方提供单个参赛者的注册资料及参赛者在使用移动网服务时存储在朴新教育的内部非公开内容，但下列情况除外：</p>
      <p>9.1.1 事先获得参赛者的明确授权；</p>

      <p>9.1.2 根据有关的法律法规要求；</p>

      <p>9.1.3 按照相关政府主管部门的要求；</p>

      <p>9.1.4 为维护社会公众的利益；</p>

      <p>9.1.5 为维护朴新教育的合法权益。</p>

      <p>9.2 在不透露单个参赛者隐私资料的前提下，朴新教育有权对整个参赛者数据库进行分析并对参赛者数据库进行商业上的利用。</p>

      <p>10.免责声明</p>

      <p>10.1 朴新教育无法承诺移动网服务一定能满足参赛者的要求，也无法担保移动网服务不会中断，对移动网服务的及时性、安全性、准确性也都不作担保。</p>

      <p>10.2 对于因不可抗力或朴新教育不能控制的原因造成的移动网服务中断或其它缺陷，朴新教育不承担任何责任，但将尽力减少因此而给参赛者造成的损失和影响。</p>

      <p>11.通知送达：朴新教育对于参赛者获奖的所有通知均通过朴新教育官方服务号对外公布，请参赛者及时、主动关注，同时确保手机畅通。</p>

      <p>12.其他规定：如本服务条款中的任何条款无论因何种原因完全或部分无效或不具有执行力，本服务条款的其余条款仍应有效并且有约束力。</p>

      <p>13.本服务条款中的标题仅为方便而设，在解释本服务条款时应被忽略。</p>
    </div>
    <!-- <div class="tips-bottom">
      <button class="tips-button" @click="closeTips">我知道了</button>
    </div> -->
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({})
export default class tipsDialog extends Vue {
  @Prop({}) serviceShow!:boolean

  closeTips () {
    // this.tipsShow = false
    this.$emit('closeService', false)
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
    width:3.4rem;
    // height:1.43rem;
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
    margin:.1rem .15rem;
    // text-align: center;
    height: 4.5rem;
    overflow: scroll;
    font-family: 'MicrosoftYaHei';
    font-size: .12rem;
    color: #4A4A4A;
    letter-spacing: 0;
    p{
      // text-indent: .2rem
      margin: .1rem 0;
    }
  }
  .content-title{
    margin-top:.3rem;
    font-family: 'PingFangSC-Medium';
    font-size: .14rem;
    text-align: center;
    line-height: .21rem;
    color: #0075FF;
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
