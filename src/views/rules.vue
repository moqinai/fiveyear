<template>
  <div class="rule">
    <img src="http://cdn.xr3.puxinjy.com/static/build/img/rule_02.d2f79c3b.jpg" alt="">
    <img src="http://cdn.xr3.puxinjy.com/static/build/img/rule_03.1fa5107c.jpg" alt="">
    <img src="http://cdn.xr3.puxinjy.com/static/build/img/rule_04.49b7c7a0.jpg" alt="">
    <img src="http://cdn.xr3.puxinjy.com/static/build/img/rule_05.d2130c97.jpg" alt="">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({
  components: {
  }
})

export default class Index extends Vue {
}
</script>

<style lang="scss" scoped>
  .rule{
    min-height:100vh;
    img{
      width: 100%;
      display:block;
    }
  }
</style>
