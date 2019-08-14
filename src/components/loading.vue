<template>
  <div class="loading modal" v-show="loading">
    <!--添加loading-->
    <img src="@/assets/img/loading/loading.svg">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
@Component
export default class loading extends Vue {
@State loading: any
}
</script>
<style lang="scss">
  .loading{
    padding:.4rem 0;
      text-align:center;
    img{

    }
  }
</style>
