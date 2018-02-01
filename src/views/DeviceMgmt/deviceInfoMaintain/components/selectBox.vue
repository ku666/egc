<template>
  <div class="item-container">
    <span class="sub-title">{{title}}<span v-show="required" style="color:red">*</span>：</span>
    <span class="dropdown">
            <el-select class="devicemgmSelect" v-model="value" placeholder="请选择" :disabled='disabled'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      },
      code: {
        type: String
      },
      options: {
        type: Array
      },
      disabled: {
        type: Boolean
      },
      initValue: {
        type: String
      },
      required: {
        type: Boolean
      }
    },
    data () {
      return {
        value: this.initValue
      }
    },
    watch: {
      value () {
        var data = {}
        data[this.code] = this.value
        this.$emit('listenToInput', data)
      },
      isClear (curVal, oldVal) {
        if (curVal === true) {
          this.value = ''
        }
      },
      initValue (curVal, oldVal) {
        this.value = curVal
      }
    },
    methods: {
      clearBox () {
        this.value = ''
      }
    }
  }
</script>

