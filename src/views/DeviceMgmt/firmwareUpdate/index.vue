<template>
  <div class="container">
    <firmware-import></firmware-import>
  </div>
</template>

<script>
  import firmwareImport from './components/firmwareImport'
  export default {
    components: {
      firmwareImport
    }
  }
</script>

<style>
  @import "../deviceInfoMaintain/assets/css/devicemgmt.less";
</style>
