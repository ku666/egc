<template>
  <div class="item-container">
    <span class="sub-title">{{title}}：</span>
    <el-input v-model="input"
              class="devicemgmInput"
              placeholder="请输入内容"
              :disabled=disabled
              :maxlength=maxlength
              clearable="true"
              :type='type'
              @blur="callbackInput"></el-input>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String
      },
      value: {
        type: String
      },
      code: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      type: {
        type: String
      },
      maxlength: {
        type: Number
      }
    },
    data () {
      return {
        input: this.value
      }
    },
    watch: {
//      input () {
//        var data = {}
//        data[this.code] = this.input
//        this.$emit('listenToInput', data)
//      },
      value (curVal, oldVal) {
        if (curVal) {
          this.input = curVal
        }
      }
    },
    methods: {
      callbackInput () {
        var data = {}
        data[this.code] = this.input
        this.$emit('listenToInput', data)
      },
      clearBox () {
        this.input = ''
      }
    }
  }
</script>

