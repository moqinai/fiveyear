<template>
  <div class="lpc-city">
    <div class="province" ref="province">
      <ul>
        <li v-for="(item, index) in provinceList" :key="index" :class="active === index ? 'activeLi' : ''" @click="selectProvince(item, index)">{{ item.city_name }} <span> <img src="@/assets/img/next-copy@2x.png" alt=""> </span></li>
      </ul>
    </div>
    <div class="city" ref="city">
      <ul>
        <li v-for="(list, i) in cityList" :key="i" @click="selectCity(list,i)" :class="activeCity === i ? 'activeLi' : ''">{{ list.city_name }}</li>
      </ul>
      <!-- <div class="lpc-cancel" @click="returnStep">
        <div>
          <p>返回上一步</p>
        </div>
      </div> -->
      <v-loading v-show="dataLoading"></v-loading>
    </div>
    <div class="btn-wrap">
      <!--这里放两个按钮-->
      <p @click="cancel">取消</p>
      <p @click="confirm">确认</p>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import BScroll from 'better-scroll'

@Component({})

export default class cityList extends Vue {
  @Mutation changeTips: any
  @Prop({}) provinceList!:any // 接收省数据
  @Prop({}) iscitydialog!:any //
  // provinceList:Array<any> = [] // 省级数据
  cityList:Array<any> = [] // 市级数据
  cityShow:boolean = false // 是否显示城市
  province:string = '' // 省code
  provinceName:string ='' // 省name
  scrollY:number = 0 // 用来存储foods区域的滚动的Y坐标
  scroll:any = ''
  cityScroll:any = ''
  @Mutation changeCityData: any
  active:number = 0
  activeCity:number=0
  show:boolean = false
  dataLoading:boolean = true
  /* @State('provinceList') provinceList: any
  @Mutation provinceListFun: any */
  activeItem:any=''

  @Emit('chooseCity') send (item:any) {} // 传给父组件
  created () {
    // 获取省级数据
    // console.log(localStorage.getItem('provinceList'));
    /* (this as any).$post('/wx/User/get_province_list').then((res:any) => {
      this.provinceList = res.data;
       this.$nextTick(() => {
          this._initScroll()
          this.selectProvince(this.provinceList[0], 0)
        })
      // localStorage.setItem('provinceList', 'aaa')
      // (this as any).provinceListFun(res.data)
    }) */
  }

  mounted () {
    if (this.provinceList.length) {
      this.$nextTick(() => {
        this._initScroll()
        this.selectProvince(this.provinceList[0], 0)
      })
    }
  }

  cancel () {
    this.send({})
  }
  confirm () {
    if (!this.activeItem.city_code) {
      this.changeTips({ show: true, title: '请选择城市' })
      return
    }
    this.send(this.activeItem)
  }
  selectProvince (item:any, index:number):void { // 请求市级数据
    this.dataLoading = true
    this.province = item.city_code // 获取省code
    this.provinceName = item.city_name // 省name
    this.active = index;
    (this as any).$post('/wx/User/get_city_list', { city_code: this.province }).then((res:any) => {
      if (res.status) {
        this.cityList = res.data
        this.dataLoading = false
        this.activeCity = -1
        this.$nextTick(() => {
          this.cityScroll = new BScroll(this.$refs.city, { click: true })
        })
      }
    })
  }
  _initScroll () { // 插件使用
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.province, { click: true })
    })
  }
  returnStep ():void { // 返回上一步
    this.cityShow = false
  }
  selectCity (item:any, i:any):void {
    item.proCode = this.province // 设置省code
    item.proName = this.provinceName
    item.iscitydialog = false
    this.activeCity = i
    // let val:string = '北京'
    this.activeItem = item
    // this.send(item)
    // this.$router.go(-1); // 返回上一层index
    // (this as any).changeCityData(item)
  }
}
</script>

<style lang="scss" scoped>
  .lpc-city {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background-color: #FFF;
    display: flex;
    padding-bottom:.5rem;
    box-sizing:border-box;
    .city {
    padding-bottom:.5rem;
      flex: 1;
      position: relative;
      .loading {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        background-color: #FFF;
        padding: 49vh 0;
      }
    }
    .province {
    padding-bottom:.5rem;
      // flex: 0 0 1.8rem;
      width:38%;

      border-right: 1px solid #eee;
    }
    .city,.province {
      // height: 100vh;
      overflow: hidden;
      /* overflow-y: scroll;
      overflow: hidden scroll;
      position: relative; */
      ul {
        background: #FFF;
        li {
          line-height: .52rem;
          border-bottom: 1px solid #D8D8D8;
          padding: 0 .2rem;
          span {
            float: right;
            color: #969494;
            width: .14rem;
            height: .26rem;
            img {
              width:.07rem;
              vertical-align: middle;
            }
          }
        }
        li.activeLi {
          background: #f1f1f1;
          color: #00ACF9;
        }
        li:last-child {
          border: none;
        }
      }
      .lpc-cancel {
        position: fixed;
        top: .6rem;
        right: .5rem;
        & > div {
          border: 1px solid #3a38382e;
          padding: 3px;
          line-height: normal;
          font-size: .12rem;
          border-radius: 10px;
          background: rgba(103, 103, 103, 0.09);
        }
      }
    }
    .city{
      ul{
        li{
        line-height: .4rem;
        border-bottom: 1px solid #eee;
      }}
    }
    .btn-wrap{
      height:.5rem;
      position:absolute;
      bottom:0;
      left:0;
      width:100%;
      p{
        height:.5rem;
        line-height:.5rem;
        text-align:center;
        width:50%;

        display:inline-block;
        &:first-child{

          background:#dfdfdf;
        }
        &:last-child{
          background:#ff784d;
          color:#fff;
        }
      }
    }
  }
</style>
