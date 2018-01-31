<template>
  <div>
    <div class="child-container">
      <span class="tech-title">{{title}}</span>
      <sub-device-list ref="subDeviceList"></sub-device-list>
    </div>
  </div>

</template>

<script>
  import ElButton from 'element-ui/packages/button/src/button.vue'
  import subDeviceList from './subDeviceList.vue'

  export default {
    components: {
      ElButton,
      subDeviceList
    },
    data () {
      return {
        title: ''
      }
    },
    methods: {
      passToChild (row) {
        this.title = row.deviceTypeDesc + '-' + row.deviceCode + '-子设备'
        this.$refs.subDeviceList.loadChildDeviceTableData(1, 10, row.uuid)
      }
    }
  }
</script>
