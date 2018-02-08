<template>
  <div class="ui-common">
    <device-base-info></device-base-info>
  </div>
</template>

<script>
  import deviceBaseInfo from './components/deviceBaseInfo'
  export default {
    components: {
      deviceBaseInfo
    }
  }
</script>

<style scoped>
  @import "./assets/css/devicemgmt.less";
</style>
