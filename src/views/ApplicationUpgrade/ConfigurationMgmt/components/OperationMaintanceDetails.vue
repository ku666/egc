<template>
  <div>
    <el-form :inline="true" :model="operMainDetails">
      <template v-if="operMainDetails.courtDto !== null">
        <el-form-item label="省（直辖市）" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="operMainDetails.courtDto.province"></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="operMainDetails.courtDto.city"></el-input>
        </el-form-item>
        <el-form-item label="区" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="operMainDetails.courtDto.district"></el-input>
        </el-form-item>
        <el-form-item label="小区名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="operMainDetails.courtDto.name"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="中间件名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="operMainDetails.name"></el-input>
      </el-form-item>
      <el-form-item label="中间件版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="operMainDetails.version"></el-input>
      </el-form-item>
      <el-form-item label="中间件安装路径" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="operMainDetails.path"></el-input>
      </el-form-item>
      <el-form-item label="服务器主机名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="operMainDetails.server.name"></el-input>
      </el-form-item>
      <el-form-item label="所在服务器UUID" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="operMainDetails.serverId"></el-input>
      </el-form-item>
      <el-form-item label="中间件提供者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="operMainDetails.provider"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="operMainDetails.remark"></el-input>
      </el-form-item>
      <template v-if="operMainDetails.extDataList !== null">
        <el-form-item :label="item.fieldName" v-for="item in operMainDetails.extDataList" :key="item.fieldName" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="item.fieldValue" :disabled="isInptDisabled"></el-input>
        </el-form-item>
      </template>
    </el-form>
   <div style="text-align: center">
       <el-button type="primary" @click="closeDialog" class="cancel-btn">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    operMainDetails: {
      type: Object
    }
  },
  data () {
    return {
      formLabelWidth: '160px',
      isInptDisabled: true
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialogEvent')
    }
  },
  watch: {
    operMainDetails (newValue, oldValue) {
      this.operMainDetails = newValue
    }
  }
}
</script>
