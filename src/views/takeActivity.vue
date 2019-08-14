<template>
  <div :style="{'background':'#fff','min-height':'100vh'}">
    <div v-show="!iscitydialog">
      <h3 class="activity-title tc">参赛信息</h3>
      <div class="activity-info">
        <div class="form-group">
          <p class="lpc-tabSwitch">
            <span @click="tabSwitchClick('personal')" :class="tabSwitch === 'personal' ? 'active' : ''">个人</span>
            <span @click="tabSwitchClick('class')" :class="tabSwitch === 'class' ? 'active' : ''">班级</span>
          </p>
        </div>
        <div class="form-group img-group">
          <p class="group-title">参赛照片<span>*</span></p>
          <div class="group-content">
            <div class="image-wrap" @click="userChooseImage" :style="{'backGroundImage':'url(@/assets/img/add-bt@2x.png)'}">
              <div v-show="userImageShow" class="user-image-wrap  r-pos">
                <img :src="cropImageData" alt=""  class="user-image">
                <span class="dib edit-image-bt-wrap a-pos">
                  <img src="@/assets/img/edit-image-bt@2x.png" alt="" class="edit-image-bt">
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group" v-if="tabSwitch === 'personal'">
          <div class="group-content input-group-content-wrap">
            <p class="group-title">真实姓名<span>*</span></p>
            <input type="text" placeholder="请输入真实姓名" v-model="userName" :readonly="isJoin">
          </div>
        </div>
        <div class="form-group" v-if="tabSwitch === 'class'">
          <div class="group-content  input-group-content-wrap">
            <p class="group-title">班级编码<span>*</span></p>
            <input type="text" placeholder="请输入班级编码（ERP）" v-model="classCode">
          </div>
        </div>
        <div class="form-group">

          <div class="group-content  input-group-content-wrap">
            <p class="group-title">
              联系电话<span>*</span>
            </p>
            <input type="text" placeholder="请输入联系电话" v-model="mobile" :readonly="isJoin">
          </div>
        </div>
        <div class="form-group" v-show="tabSwitch === 'personal'">
        <!--
          <p class="group-title">
            <span>*</span>选择机构
          </p>
          -->
          <div class="group-content select-group-content" >
            <div class="stuen-selected stuen-selectedgrade" id="trigger">
                <span>请选择年级</span>
            </div>
            <!--<span class="select-bt-img-wrap"><img src="@/assets/img/select-bt@2x.png" alt="" class="select-bt-img"></span>-->
          </div>
        </div>
        <div class="form-group">
        <!--
          <p class="group-title">
            <span>*</span>选择城市
          </p>
          -->
          <div class="group-content "  @click="selectCityFun">
            <input type="text" placeholder="请选择所在城市"  v-model="activeCityName" readonly="readonly" :style="{paddingLeft:'0.15rem'}">
            <span class="select-bt-img-wrap"><img src="@/assets/img/right-bt@2x.png" alt="" class="select-bt-img"></span>
          </div>
        </div>
        <div class="form-group">
        <!--
          <p class="group-title">
            <span>*</span>选择机构
          </p>
          -->
          <div class="group-content select-group-content">
            <div class="stuen-selected stuen-selectedorg" id="triggerorg">
                <span>请选择机构</span>
            </div>
            <!--<span class="select-bt-img-wrap"><img src="@/assets/img/select-bt@2x.png" alt="" class="select-bt-img"></span>-->
          </div>
        </div>
        <div class="form-group">
        <!--
          <p class="group-title">
            <span>*</span>拉票宣言
          </p>
        -->
          <div class="group-content act-word">
            <div class="word-wrap">
              <p>{{ declareShowItem.declaration }}</p>
            </div>
            <div class="change-word-btn" @click="changeDeclareFun">
              <p>
              <img src="@/assets/img/change-declare-image@2x.png" alt="" class="change-declare-image">
              <!--
                <span></span>
                <span></span>
                <span></span>
                -->
              </p>
            </div>
          </div>
        </div>
        <div class="form-group ">
          <p class="group-tips">请正确填写参赛信息，便于获奖后及时与您取得联系！</p>
        </div>
        <div class="form-group">
          <div class="agree-ment" @click="checkAgreeStatus = !checkAgreeStatus">
            <span>
              <img v-if="!checkAgreeStatus" src="@/assets/img/no-check-agree@2x.png" alt="">
              <img v-else src="@/assets/img/check-agree@2x.png" alt="">
            </span>
            <span>我接受并同意</span>
          </div>
          <div class="lpc-termsOf" @click="lookMes">
            <span>《朴新教育五周年活动服务条款》</span>
          </div>
        </div>
      </div>
      <div class="activity-submit">
        <p class="submit-btn" @click="submitInfo">确认提交</p>
      </div>
      <div class="submit-loading" v-show="vLoading">
        <v-loading></v-loading>
      </div>
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
    </div>
    <city-list
      :provinceList="cityList1"
      @chooseCity="chooseCity"
      v-if="iscitydialog"
    />
    <service-contract
      @closeService="closeService"
      :serviceShow="serviceShow"
    />
    <!-- <router-view/> -->
  </div>
</template>

<script lang="ts">
import 'cropperjs/dist/cropper.css'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import cityList from '@/components/cityList.vue'
import serviceContract from '@/components/serviceContract.vue'
import { State, Mutation } from 'vuex-class'
import wx from 'weixin-js-sdk'
import Cropper from 'cropperjs'
import testImg from '@/assets/1.jpg'
import noCheckImg from '@/assets/img/no-check-agree@2x.png'
import checkImg from '@/assets/img/check-agree@2x.png'
import MobileSelect from 'mobile-select'
let gradeList:Array<any> = [
  { grade_id: 1, grade_name: '幼儿园' },
  { grade_id: 2, grade_name: '小一' },
  { grade_id: 3, grade_name: '小二' },
  { grade_id: 4, grade_name: '小三' },
  { grade_id: 5, grade_name: '小四' },
  { grade_id: 6, grade_name: '小五' },
  { grade_id: 7, grade_name: '小六' },
  { grade_id: 8, grade_name: '初一' },
  { grade_id: 9, grade_name: '初二' },
  { grade_id: 10, grade_name: '初三' },
  { grade_id: 11, grade_name: '高一' },
  { grade_id: 12, grade_name: '高二' },
  { grade_id: 13, grade_name: '高三' },
  { grade_id: 14, grade_name: '大一' },
  { grade_id: 15, grade_name: '大二' },
  { grade_id: 16, grade_name: '大三' },
  { grade_id: 17, grade_name: '大四' },
  { grade_id: 18, grade_name: '研究生' },
  { grade_id: '00', grade_name: '其他' }

]
@Component({
  components: { cityList, serviceContract }
})
export default class takeActivity extends Vue {
  @Mutation changeTips: any
  @State('cityData') cityData: any
  @Prop() readonly classOrPersonal!:any // 判断个人or班级
  tabSwitch:string = this.classOrPersonal // 顶部切换判断个人or班级
  userImageShow:boolean = false
  cropImageShow:boolean = false
  cropImageData:any = ''
  localImage:any = ''
  cropper:any=''
  declareList:Array<any> = [
    {
      'declare_id': 1,
      'declaration': '不负青春、不负己'
    },
    {
      'declare_id': 2,
      'declaration': '只有为目标流过汗水，才能在跑道上尽情奔驰'
    },
    {
      'declare_id': 3,
      'declaration': '努力，世界都会让步'
    },
    {
      'declare_id': 4,
      'declaration': '由自己来决定前进的方向'
    }
  ]
  declareShowItem:any = {} // 拉票宣言
  activeDeclareIndex :number = 0 // 当前显示拉票宣言
  checkAgreeStatus:boolean = false
  iscitydialog:boolean = false
  activeCityName:string = '请选择城市'
  proCode:string = '' // 省code
  cityCode:string=''
  activeSchool:string = ''
  proName:string = ''
  activeSchoolCode:string = ''
  schoolList:any = [{ school_code: '00', school_name: '其他' }]
  cityList1:Array<any> = []
  userName:any = '' // 用户名
  classCode:any = '' // 班级编码
  mobile:any = ''
  serviceShow:boolean = false // 服务条款
  vLoading:boolean= false
  gradeList:any=gradeList
  schoolSelect:any= ''

  activeGradeId:any =''
  activeGradeName:any=''

  gradeSelect:any=''
  domReady:boolean = false
  isJoin:boolean = false // 是否参赛

  beforeRouterEnter () {

  }
  created () {}
  tabSwitchClick (type: string): void { // 个人班级切换
    // this.classOrPersonal = type
    this.tabSwitch = type
  }
  submitInfo () {
    // if (this.validateForm() && !this.vLoading) {
    let formData:any = {}
    formData = {
      picture: this.cropImageData, // this.cropImageData,
      mobile: this.mobile,
      proCode: this.proCode,
      cityName: this.activeCityName,
      cityCode: this.cityCode,
      schoolCode: this.activeSchoolCode,
      schoolName: this.activeSchool,
      declareId: this.declareShowItem['declare_id'],
      declaration: this.declareShowItem['declaration'],
      grade_id: this.activeGradeId,
      grade: this.activeGradeName
    }
    if (this.tabSwitch === 'personal') { // 个人提交个人
      formData.userName = this.userName
      formData.user_type = 1
    } else if (this.tabSwitch === 'class') { // 班级提交班级
      formData.classCode = this.classCode
      formData.user_type = 2
    };
    this.vLoading = true;
    (this as any).$post('/wx/user/registerUserInfo', formData).then((res:any) => {
      if (res.status === 1) {
        // 返回user_event_id
        this.$router.push('/personal/' + res.data.user_event_id)
      } else {
        this.changeTips({ show: true, title: res.msg })
        this.vLoading = false
      }
    })
    // }
  }
  validateForm () {
    if (!this.cropImageData) {
      this.changeTips({ show: true, title: '请选择参赛图片' })
      return false
    }
    if (this.tabSwitch === 'personal') { // 个人提交个人
      if (!this.userName) {
        this.changeTips({ show: true, title: '请输入真实姓名' })
        return false
      }
    } else if (this.tabSwitch === 'class') { // 班级提交班级
      if (!this.classCode) {
        this.changeTips({ show: true, title: '请输入班级编码' })
        return false
      }
    };
    if (!this.mobile) {
      this.changeTips({ show: true, title: '请输入联系电话' })
      return false
    }
    if (!this.activeGradeId && !this.activeGradeName && this.tabSwitch === 'personal') {
      this.changeTips({ show: true, title: '请选择年级' })
      return false
    }
    if (!this.proCode || !this.cityCode) {
      this.changeTips({ show: true, title: '请选择城市' })
      return false
    }
    if (!this.activeSchoolCode && !this.activeSchool) {
      this.changeTips({ show: true, title: '请选择机构' })
      return false
    }
    if (!this.checkAgreeStatus) {
      this.changeTips({ show: true, title: '请勾选服务条款' })
      return false
    }
    return true
  }
  @Watch('cityCode', { deep: true })
  cityChange (val:any, oldVal:any) { // 监听cityCode
    if (!this.isJoin) {
      if (val !== oldVal) {
        this.activeSchoolCode = ''
        this.activeSchool = ''
        this.getSchoolList() // 请求机构
      }
    }
  }
  getSchoolList (type?:string) {
    if (type) {
      if ((document.querySelector('#triggerorg') as HTMLElement)) {
        (document.querySelector('#triggerorg') as HTMLElement).innerHTML = '<span>' + type + '</span>'
      }
    } else {
      if ((document.querySelector('#triggerorg') as HTMLElement)) {
        (document.querySelector('#triggerorg') as HTMLElement).innerHTML = '<span style="color: #b6ada8;">请选择机构</span>'
      }
      let formData = {
        city_code: this.cityCode
      };
      (this as any).$post('/wx/User/get_school_list', formData).then((res:any) => {
        if (res.status === 1) {
          let keys:any = Object.keys(res.data)
          let schoolListArr:any = []
          keys.forEach((key:any) => {
            schoolListArr.push({
              school_code: key,
              school_name: res.data[key]
            })
          })
          this.schoolList = schoolListArr
          this.schoolSelect.updateWheel(0, this.schoolList)
        }
      })
    }
  }
  mounted () {
    let that = this
    this.activeCityName === '请选择城市' ? this.iscitydialog = false : this.iscitydialog = true
    this.initConfig()
    this.imgCropper()
    this.getDeclareList()
    // this.isJoin
    // this.initSelect()
    this.$nextTick(() => {
      this.domReady = true
    })
    this.getUserMessageFun() // 判断是否参赛
  }

  initSelect () {
    let that = this
    this.gradeSelect = new MobileSelect({
      trigger: '#trigger',
      title: '选择年级',
      wheels: [
        { data: this.gradeList }
      ],
      keyMap: {
        id: 'grade_id',
        value: 'grade_name'
      },
      callback: function (indexArr:any, data:any) {
        let activeGrade = data[0]
        that.activeGradeId = activeGrade.grade_id
        that.activeGradeName = activeGrade.grade_name
        // that.gradeCode = data[0].id
      }
    })
    this.schoolSelect = new MobileSelect({
      trigger: '#triggerorg',
      title: '选择机构',
      wheels: [
        { data: this.schoolList }
      ],
      keyMap: {
        id: 'school_code',
        value: 'school_name'
      },
      callback: function (indexArr:any, data:any) {
        let activeSchool = data[0]
        that.activeSchoolCode = activeSchool.school_code
        that.activeSchool = activeSchool.school_name
        // that.gradeCode = data[0].id
      }
    })
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
  selectCityFun () {
    if (!this.isJoin) {
      (this as any).$post('/wx/User/get_province_list').then((res:any) => {
        this.cityList1 = res.data
        this.iscitydialog = true
      })
    }
  }
  userChooseImage () { // 选择图片
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
    /* var _that:any = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res:any) {
        // _that.cropper.destory()
        // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        if ((window as any).wxjs_is_wkwebview === true) {
          // 如果是苹果WKWebview内核，调用
          wx.getLocalImgData({
            localId: res.localIds, // 图片的localID
            success: function (res:any) {
              var localData = res.localData // localData是图片的base64数据，可以用img标签显示
              _that.localImage = localData
              _that.cropper.replace(_that.localImage[0])
              _that.cropImageShow = true
            }
          })
        } else {
          var localIds = res.localIds
          wx.uploadImage({
            localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: (res:any) => {
              var serverId:any = res.serverId // 返回图片的服务器端ID
              console.log(serverId);
              (_that as any).$post('/wx/user/getMediaImage', { media_id: serverId }).then((res:any) => {
                if (res.status === 1) {
                  let img:any = res.data
                  _that.cropper.replace(img)
                  _that.cropImageShow = true
                } else {

                }
              })
            }
          })

          // _that.localImage = localIds[0]
          // console.log(_that.localImage)
          //
          // _that.localImage = localIds[0]
          // _that.cropper.replace(testImg)
          // _that.cropper.replace(_that.localImage)
          // _that.imgCropper(testImg)
          // _that.cropImageShow = true
        }
      }
    }) */
  }
  imgCropper () {
    let image:any = document.querySelector('#image')
    this.cropper = new Cropper(image, {
      viewMode: 2,
      aspectRatio: 1 / 1,
      background: false
    })
  }
  getDeclareList () { // 获取拉票宣言
    this.declareShowItem = this.declareList[this.activeDeclareIndex] // 默认显示一个宣言
  }
  changeDeclareFun () { // 切换拉票宣言
    this.activeDeclareIndex += 1
    if (this.activeDeclareIndex >= this.declareList.length) {
      this.activeDeclareIndex = 0
    }
    this.declareShowItem = this.declareList[this.activeDeclareIndex]
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
    this.cropImageData = str
    this.userImageShow = true
    this.cropImageShow = false
  }
  closeCropImg () {
    this.cropImageShow = false
  }
  checkAgreeFun () {
    this.checkAgreeStatus = !this.checkAgreeStatus
  }
  destroyed () {
    // window.addEventListener('popstate', function (e) {})
  }
  chooseCity (item:any):void {
    // document.body.scrollTop = document.documentElement.scrollTop = 0
    this.iscitydialog = false
    this.activeCityName = item.city_name || '请选择城市'
    this.cityCode = item.city_code
    this.proCode = item.proCode
    this.proName = item.proName
  }
  getUserMessageFun ():void { // 获取信息/wx/rank/getIsAuthUserInfo
    (this as any).$post('/wx/User/doContinueCompete').then((res:any) => {
      if (res.status === 1) {
        if (res.data.is_join) { // is_join为1时已参赛 0未参赛
          this.isJoin = true
          // this.$router.replace('/mine')
          this.activeCityName = res.data.user_city_name || '请选择城市' // 城市名
          this.cityCode = res.data.user_city_code // 城市code
          this.proCode = res.data.user_province_code
          this.proName = res.data.user_province_name //
          this.activeSchoolCode = res.data.user_school_code // 机构code
          this.activeSchool = res.data.user_school_name // 机构名
          this.activeGradeName = res.data.grade // 年级
          this.activeGradeId = res.data.grade_id // id
          this.mobile = res.data.user_mobile // 电话
          this.userName = res.data.user_name // 姓名
          this.getSchoolList(res.data.user_school_name)
          if ((document.querySelector('#trigger') as HTMLElement)) {
            (document.querySelector('#trigger') as HTMLElement).innerHTML = '<span>' + res.data.grade + '</span>'
          }
          // this.proCode =
        } else {
          this.initSelect() // 年级机构插件初始化
          if (this.classOrPersonal === 'personal') { // 则跳转至参赛信息填写页面 // 判断是1个人 班级2
            this.$router.replace('/takeActivity/personal')
          } else if (this.classOrPersonal === 'personal') {
            this.$router.replace('/takeActivity/class')
          }
        }
      }
    })
  }
  lookMes ():void { // 查看条款
    this.serviceShow = true
  }
  closeService (data:any):void {
    this.serviceShow = data
  }
}
</script>

<style lang="scss" scoped>
  .submit-loading{
    position:fixed;
    top:50%;
    transform:translateY(-100px);
    width:100%;
  }

  .dib{
    display:inline-block;
  }
  .r-pos{
    position:relative;
  }
  .a-pos{
    position:absolute;
  }

  .crop-image-wrap{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:9999;
    background:rgba(0,0,0,0.8);

    .bottom-opa-area{
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

  .activity-title{
    font-size: 18px;
    color: #4A4A4A;
    padding-top:.1rem;
    padding-bottom:.04rem;
  }
  .activity-info{
    padding:.16rem;
    .image-wrap{
      width:2rem;
      height:2rem;
      margin:0 auto;
      background: #D8D8D8;
      background-image:url('./../assets/img/add-bt@2x.png');
      background-repeat:no-repeat;
      background-size:.52rem .52rem;
      background-position:50% 50%;
      border-radius: 6px;
      overflow:hidden;
      .user-image{
        width:100%;
      }
    }
    .form-group{
      position:relative;
      margin-bottom:.15rem;
      .lpc-tabSwitch {
        display: flex;
        span:first-child {
          border-radius: .05rem 0 0 .05rem;
        }
         span:last-child {
          border-radius: 0 .05rem .05rem 0;
        }
        span {
          flex: 1;
          color: #0678e4;
          text-align: center;
          background: #c9edff;
          padding: .05rem 0;
          line-height: normal;
        }
        span.active {
          color: #FFF;
          background: #2a9bff;
        }
      }
      &.img-group{
        padding-top:.4rem;
        .group-title{
          left:0.05rem;
          top:0px;
        }
      }
      // background: #F2F2F2;
      // border-radius: 6px;
    }
    .group-tips{
      color: #00ACF9;
    }
    .agree-ment {
      display: inline-block;
      img{
          padding-top:.05rem;
          width:.13rem;
          height:.13rem;
          vertical-align: top;
          margin-right:.05rem;
      }
    }
    .lpc-termsOf {
      display: inline-block;
      color: #00ACF9;
    }
    .group-title{
      z-index:3;
      position:absolute;
      margin-bottom:.05rem;
      height:.4rem;;
      line-height:.4rem;
      span {
        color:#ff0000;
      }
    }
    .group-content{
      width:3.43rem;
      position:relative;
      &.city-select-content-wrap{

      }
      &.input-group-content-wrap{
        border-radius:6px;
        padding-left:1rem;
        box-sizing:border-box;
        background: #F2F2F2;
        .group-title{
          left:0.15rem;
        }
        input{
          box-sizing:border-box;
          width:2.43rem;
          height:.4rem;

          border-radius: 6px;
          padding:0 .05rem;
        }
      }
      &.select-group-content{
        .select-bt-img-wrap{
        // border:0.01rem solid #fff;
        // border-left:0;
        // background:#fff;
        // z-index:3;
        }
      }

      .stuen-selected{
        height:.4rem;
        line-height:.4rem;
         background: #F2F2F2;
         padding:0 0 0  0.15rem;
         border-radius:6px;
         span{
           color:#b6ada8;
         }
      }

      .stuen-selected{
        background-image:url('./../assets/img/select-bt@2x.png');
        background-repeat:no-repeat;
        background-position:top right;
        background-size:.4rem .4rem;
      }

      .user-image-wrap {
        .edit-image-bt-wrap{
          right:0;
          width:.38rem;
          height:.38rem;
          background-image: linear-gradient(-180deg, #5AC5FF 0%, #0075FF 100%);
          border-radius: 0 6px 0 6px;
          box-sizing:border-box;
          padding:0.09rem;
          .edit-image-bt{
            width:.2rem;
            height:.2rem;
          }
        }
      }

      // input::-ms-input-placeholder{
      //   text-align: center;
      // }
      // input::-webkit-input-placeholder{
      //   text-align: center;
      // }
      input{
        box-sizing:border-box;
        width:3.43rem;
        height:.4rem;
        background: #F2F2F2;
        border-radius: 6px;
        padding:0 .05rem;
      }
      .select-bt-img-wrap{
        display:inline-block;
        position:absolute;
        top:0;
        right:0;
        img{
          height:.4rem;
          width:.4rem;
        }
      }
      select {
        width:3.43rem;
        height:.4rem;
        background: #F2F2F2;
        border-radius: 6px;
        padding:0 .05rem;
      }
      &.act-word {
        display:flex;
        align-items:top;
        justify-content:space-between;
      }
      .change-word-btn {
        width:.4rem;
        height:.4rem;
        background-image: linear-gradient(-180deg, #5AC5FF 0%, #0075FF 100%);
        border-radius: 6px;
        img {
          width:100%;
        }
        span {
          display:inline-block;
          width:.08rem;
          height:.08rem;
          background:#fff;
          border-radius:.04rem;
          vertical-align:top;
          &:first-child{
            margin-top:.02rem;
            margin-left:.02rem;
          }
          &:nth-child(2){
            margin-top:.11rem;
            margin-left:.01rem;
          }
          &:last-child{
            margin-top:.2rem;
            margin-right:.02rem;
          }
        }
      }
      .word-wrap{
        width:2.95rem;
        background: #F2F2F2;
        border-radius: 6px;
        padding:.11rem .15rem;
        box-sizing:border-box;
        p{
          color: #989898;
          text-align: justify;
          line-height: 21px;
        }
      }
    }
  }
  .activity-submit{
    margin-top:.03rem;
    .submit-btn{
      text-align:center;
      line-height:.5rem;
      width:3.75rem;
      height:.5rem;
      font-size: 16px;
      color: #FFFFFF;
      background-image: linear-gradient(-180deg, #5AC5FF 0%, #0075FF 100%);
    }
  }
</style>
