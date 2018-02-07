<template>
  <div class="item-container">
    <span class="sub-title">{{title}}<span v-show="required" style="color:red">*</span>：</span>
    <el-input v-model.trim="input"
              class="devicemgmInput"
              :placeholder="(disabled)? '':'请输入内容'"
              :disabled=disabled
              :maxlength=maxlength
              :clearable="!disabled"
              :type="type"
              @blur="callbackInput">
      <template v-if="append" slot="append">{{append}}</template>
    </el-input>
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
      },
      append: {
        type: String
      },
      required: {
        type: Boolean
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

