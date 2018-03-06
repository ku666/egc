<template>
  <div>
    <!-- 中间件名称	中间件版本	中间件安装路径	服务器主机名称	描述	所在服务器UUID	中间件提供者
    name	version	path	hostname	desc	uuid	provider -->

    <el-form :inline="true" :model="operMainDetails">
      <template v-if=" operMainDetails.courtDto !== null">
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
        <el-input class="upgrade_el-input" v-model="operMainDetails.remark" :maxlength="maxlength"></el-input>
      </el-form-item>
      <template v-if="operMainDetails.extDataList !== null">
        <el-form-item :label="item.fieldName" v-for="item in operMainDetails.extDataList" :key="item.fieldName" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="item.fieldValue" :maxlength="maxlength"></el-input>
        </el-form-item>
      </template>
      <div style="text-align: center">
        <el-button @click="callBackCloseDialogEvent" class="cancel-btn" type="primary">取 消</el-button>
        <el-button class="action-btn" @click="updateMiddlewareInfo" type="primary">保 存</el-button>
        <el-popover ref="newCIEventPop" visible="showAddNewCIPop" placement="right" width="160" :hide="clearData" v-model="showAddNewEvent">
          <div>
            <div>
              <el-input :autofocus="true" placeholder="请输入新增项名称" size="small" v-model="fieldName"></el-input>
            </div>
            <div class="margin-top-5">
              <el-input placeholder="请输入新增项值" size="small" v-model="fieldValue"></el-input>
            </div>
          </div>
          <div class="text-right margin-top-5">
            <el-button size="mini" type="text" @click="clearData">取消</el-button>
            <el-button type="primary" size="mini" @click="addNewEvent">添加</el-button>
          </div>
        </el-popover>
        <a v-popover:newCIEventPop>
          <span>
            <el-button icon="el-icon-circle-plus-outline" style="margin-center: 10px" plain type="primary">添加</el-button>
          </span>
        </a>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    operMainDetails: undefined
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
    updateMiddlewareInfo () {
      this.$emit('saveMiddlewareInfoEvent', this.operMainDetails, 'save')
      // if (this.tempRemark !== this.operMainDetails.remark || this.tempExtDataList !== this.operMainDetails.extDataList) {
      //   this.$emit('saveMiddlewareInfoEvent', this.operMainDetails)
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
        if (this.operMainDetails.extDataList === null) {
          this.operMainDetails.extDataList = []
        }
        this.operMainDetails.extDataList.push({
          fieldName: this.fieldName,
          fieldValue: this.fieldValue
        })
        console.info(JSON.stringify(this.operMainDetails))
      }
    },
    clearData () {
      console.info('clear data')
      this.showAddNewEvent = false
      this.newLabel = ''
      this.newValue = ''
    },
    callBackCloseDialogEvent () {
      this.$emit('saveMiddlewareInfoEvent', this.operMainDetails, 'cancel')
    }
  },
  watch: {
    operMainDetails (newValue, oldValue) {
      this.operMainDetails = newValue
    }
  },
  mounted () {
    this.tempRemark = this.operMainDetails.remark
    this.tempExtDataList = this.operMainDetails.extDataList
  }
}
</script>
