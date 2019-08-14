<template>
  <div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide><img src="http://cdn.xr3.puxinjy.com/static/build/img/bitmap.png" class="swiper-img"></swiper-slide>
      <swiper-slide><img src="http://cdn.xr3.puxinjy.com/static/build/img/swiper2@2x.40c079fc.png" class="swiper-img"></swiper-slide>
      <swiper-slide><img src="http://cdn.xr3.puxinjy.com/static/build/img/swiper3@2x.d68343b1.png" class="swiper-img"></swiper-slide>
      <swiper-slide><img src="http://cdn.xr3.puxinjy.com/static/build/img/swiper4@2x.40a9216c.png" class="swiper-img"></swiper-slide>
      <!--<div class="swiper-pagination" slot="pagination"></div>-->
    </swiper>
    <div class="lpc-text" @click.stop="joinRule">
      <div>
        <p>参赛规则</p>
      </div>
    </div>
    <div class="lpc-want-img" @click.stop="wantJoinFun">
      <div>
        <img src="http://cdn.xr3.puxinjy.com/static/build/img/wantJoin@2x.4f831cc8.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swiperComponent',
  data () {
    return {
      swiperOption: {
        autoplay: true,
        speed: 1000,
        pagination: { // 分页器挂载到swiper-pagination类对应的元素上
          el: '.swiper-pagination'
        },
        loop: true // 开启轮播图前后循环模式
      }
    }
  },
  methods: {
    joinRule () {
      // console.log(1)
      // 此处等周一新增一个页面
      this.$router.push('/rules')
    },
    wantJoinFun () {
      this.$router.push('/takeActivity/personal')
      // this.$post('/wx/User/doContinueCompete').then((res) => { // 跳转前请求判断
        // if (res.status === 1) {
          // if (res.data.is_join) { // is_join为1时已参赛 0未参赛
          //   this.$router.push('/mine')
          // } else {
            // if (res.data.user_type === 1) { // 则跳转至参赛信息填写页面 // 判断是1个人 班级2
            //   this.$router.push('/takeActivity/personal')
            // } else {
            //   this.$router.push('/takeActivity/class')
            // }
          // }
        // }
      // })
      // this.$router.replace('/takeActivity/personal')
    }
  }
}
</script>
<style>
.wrapper >>> .swiper-pagination-bullet-active {
   background:#fff
}
</style>

<style lang='scss' scoped>
  .wrapper {
    overflow:hidden;
    width: 100%;
    height: 2.61rem;
    position: relative;
    .swiper-img {
      width:100%
    }
    .lpc-text {
      position: absolute;
      right: 0;
      top: .2rem;
      z-index: 999;
      width: .8rem;
      padding: .05rem 0;
      line-height: normal;
      font-family: MicrosoftYaHeiLight;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
      background: #FF784D;
      border-radius: 16px 0 0 16px;
    }
    .lpc-want-img {
      position: fixed;
      right: .07rem;
      top: 2rem;
      // bottom: 0;
      z-index: 999;
      width: .65rem;
      height: .65rem;
    }
  }
</style>
