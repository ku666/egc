<template>
  <div>
    <el-form :inline="true" :model="osDetails">
      <template v-if=" osDetails.courtDto !== null">
        <el-form-item label="省（直辖市）" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.courtDto.province"></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.courtDto.city"></el-input>
        </el-form-item>
        <el-form-item label="区" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.courtDto.district"></el-input>
        </el-form-item>
        <el-form-item label="小区名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.courtDto.name"></el-input>
        </el-form-item>
      </template>
       <el-form-item label="操作系统名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.name"></el-input>
      </el-form-item>
       <el-form-item label="操作系统版本（服务包）" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.version"></el-input>
      </el-form-item>
       <el-form-item label="操作系统位数" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.dataLength"></el-input>
      </el-form-item>
       <el-form-item label="服务器主机名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.hostname"></el-input>
      </el-form-item>
      <el-form-item label="所在服务器UUID" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.uuid"></el-input>
      </el-form-item>
      <el-form-item label="操作系统提供者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="osDetails.updateUser"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input"  v-model="osDetails.remark" :maxlength="maxlength"></el-input>
      </el-form-item>
      <template v-if="osDetails.extDataList !== null">
        <el-form-item :label="item.fieldName" v-for="item in osDetails.extDataList" :key="item.fieldName" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="item.fieldValue" :maxlength="maxlength"></el-input>
        </el-form-item>
      </template>

      <div style="text-align: center">
        <el-button class="action-btn" @click="updateOsInfo" type="primary">保 存</el-button>

        <el-popover
            ref="newCIEventPop"
            visible="showAddNewCIPop"
            placement="right"
            width="160"
            :hide="clearData"
            v-model="showAddNewEvent">
            <div>
              <div><el-input :autofocus="true" placeholder="请输入新增项名称" size="small" v-model="fieldName"></el-input></div>
              <div class="margin-top-5"><el-input placeholder="请输入新增项值" size="small" v-model="fieldValue"></el-input></div>
            </div>
            <div class="text-right margin-top-5">
              <el-button size="mini" type="text" @click="clearData">取消</el-button>
              <el-button type="primary" size="mini" @click="addNewEvent" >添加</el-button>
            </div>
          </el-popover>
      <!-- <a v-popover:newCIEventPop class="blue cursor-hand"><i class="el-icon-plus"></i><span>新增CI项</span></a> -->
      <a v-popover:newCIEventPop><span><el-button icon="el-icon-circle-plus-outline" style="margin-center: 10px" plain type="primary">添加</el-button></span></a>

      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    osDetails: undefined
  },
  data () {
    return {
      formLabelWidth: '160px',
      isInptDisabled: true,
      maxlength: 30,
      tempRemark: undefined,
      showAddNewCIPop: false,
      fieldName: '',
      fieldValue: '',
      showAddNewEvent: false,
      tempExtDataList: undefined
    }
  },
  methods: {
    updateOsInfo () {
      console.log(JSON.stringify(this.osDetails))
      this.$emit('saveOsInfoEvent', this.osDetails)
      // if (this.tempRemark !== this.osDetails.remark || this.tempExtDataList !== this.osDetails.extDataList) {
      //   this.$emit('saveOsInfoEvent', this.osDetails)
      // } else {
      //   this.$message({
      //     message: '请修改数据后再提交',
      //     type: 'error'
      //   })
      // }
    },
    addNewEvent () {
      console.info('add new item')
      if (this.fieldName.trim() === '') {
        this.$message.error('请输入新增项名称')
      } else {
        if (this.osDetails.extDataList === null) {
          this.osDetails.extDataList = []
        }
        this.osDetails.extDataList.push({'fieldName': this.fieldName, 'fieldValue': this.fieldValue})
        console.info(JSON.stringify(this.osDetails))
      }
    },
    clearData () {
      console.info('clear data')
      this.showAddNewEvent = false
      this.newLabel = ''
      this.newValue = ''
    }
  },
  watch: {
    osDetails (newValue, oldValue) {
      this.osDetails = newValue
    }
  },
  mounted () {
    this.tempRemark = this.osDetails.remark
    this.tempExtDataList = this.osDetails.extDataList
  }
}
</script>
