<template>
  <div>
    <div class="child-container">
      <span class="tech-title">{{title}}</span>
      <slave-device-list ref="slaveDeviceList"></slave-device-list>
    </div>
  </div>

</template>

<script>
  import ElButton from 'element-ui/packages/button/src/button.vue'
  import slaveDeviceList from './slaveDeviceList.vue'

  export default {
    components: {
      ElButton,
      slaveDeviceList
    },
    data () {
      return {
        title: ''
      }
    },
    methods: {
      passToSlave (row) {
        this.title = row.deviceTypeDesc + '-' + row.deviceCode + '-从属设备'
        this.$refs.slaveDeviceList.loadSlaveDeviceTableData(1, 10, row.uuid)
      }
    }
  }
</script>

