<template>
  <div class="bottom-bt">
    <div :class="['nav-tabs','tc']" :style="{ position:buttomShow ? '' : 'relative' }">
      <router-link to="/" tag="div">
        <p></p>
      </router-link>
      <router-link to="/chart" tag="div">
      <p></p>
      </router-link>
      <router-link to="/mine" tag="div">
        <p></p>
      </router-link>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({})

export default class navTabs extends Vue {
  docDefaultHeight:any = document.documentElement.clientHeight
  showHeight:any = document.documentElement.clientHeight
  buttomShow:boolean = true
  created () {}
  mounted () {
    window.onresize = () => {
      return (() => {
        this.showHeight = document.documentElement.clientHeight
      })()
    }
  }
  @Watch('showHeight', { immediate: true, deep: true })
  onClientHeight (val:any, oldVal:any) {
    if (this.docDefaultHeight > this.showHeight) {
      this.buttomShow = false
    } else {
      this.buttomShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-tabs {
    position:fixed;
    bottom:0;
    width:100%;
    display:flex;
    height:.5rem;
    max-width:1200px;
    div {
      flex-grow:1;
      font-size:.14rem;
      color:#fff;
      line-height:.5rem;
      align-items:center;
      img {
        margin-top:0.09rem;
        width:.2rem;
      }
      p {

        height:.5rem;
        background-repeat:no-repeat;
        background-size:.2rem;
        background-position: 50% .09rem;
      }
      &:first-child {
        width:1.25rem;
        background-image: linear-gradient(-180deg, #5AC5FF 0%, #0075FF 100%);
        p{
          background-image:url(("./../assets/img/index-bt@3x.png"))
        }
        &.router-link-exact-active{
          p{
           background-image:url(("./../assets/img/index-active-bt@3x.png"));
          }
        }
      }
      &:nth-child(2) {
        font-size:.2rem;
        width:1.25rem;
        p{
          background-image:url(("./../assets/img/chart-bt@3x.png"));
          background-size:.3rem;
        }
        &.router-link-exact-active {
          p{
           background-image:url(("./../assets/img/chart-active-bt@3x.png"));
          }
        }
        // background-image: linear-gradient(-180deg, #FED073 0%, #FF5646 100%);
        background-image: linear-gradient(-180deg, #5AC5FF 0%, #0075FF 100%);
      }
      &:last-child {
        p{
          background-image:url(("./../assets/img/mine-bt@3x.png"))
        }
        width:1.25rem;
        background-image: linear-gradient(-180deg, #5AC5FF 0%, #0075FF 100%);
      }
      &.router-link-exact-active {
        background-image: linear-gradient(-180deg, #E4F6FF 0%, #C7EDFF 49%, #A9E4FF 99%);
      }
    }
  }
  .bottom-bt {
    height: .47rem;
  }
</style>
