<template>
  <div class="container">
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

<style>
  @import "./assets/css/devicemgmt.less";
</style>
