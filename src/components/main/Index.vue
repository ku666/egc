<template>
  <div id="index">
    <div style="height:600px;min-height:450px;text-align: right;font-size: 60px; padding-top: 500px;padding-right: 150px; ">
      <span>欢迎进入恒大集团智慧小区平台</span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  mounted () {
    this.open()
  },
  methods: {
    open () {
      const h = this.$createElement

      this.$notify({
        title: '欢迎光临',
        message: h('i', { style: 'color: teal' }, '欢迎进入恒大集团智慧云平台'),
        offset: 200
      })
    }
  }
}
</script>
