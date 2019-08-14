<template>
  <!-- 提示弹层 -->
  <div class="tips" v-show="tips.show">
    <h3>{{tips.title}}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class Tips extends Vue {
  // @State('tips') stateTips: any
  @State tips: any
}
</script>
<style  lang="scss" scoped>
.tips{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  color: #fff;
  h3{
    padding: .08rem .2rem;
    max-width: 80%;
    font-size: .12rem;
    font-weight: 400;
    background-color: rgba(0,0,0,0.6);
    border-radius: 4px;
  }
}
</style>
