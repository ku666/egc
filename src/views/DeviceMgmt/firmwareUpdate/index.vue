<template>
  <div class="ui-common">
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

<style scoped>
  @import "../deviceInfoMaintain/assets/css/devicemgmt.less";
</style>
