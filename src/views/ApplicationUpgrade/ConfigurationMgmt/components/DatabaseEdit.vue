<template>
  <div>
    <el-form :inline="true" :model="databaseEditDetails">
      <template v-if=" databaseEditDetails.courtDto !== null">
        <el-form-item label="省（直辖市）" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.courtDto.province"></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.courtDto.city"></el-input>
        </el-form-item>
        <el-form-item label="区" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.courtDto.district"></el-input>
        </el-form-item>
        <el-form-item label="小区名称" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.courtDto.name"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="数据库名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.name"></el-input>
      </el-form-item>
      <el-form-item label="数据库版本" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.version"></el-input>
      </el-form-item>
      <el-form-item label="数据库安装路径" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.path"></el-input>
      </el-form-item>
      <el-form-item label="服务器主机名称" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.server.name"></el-input>
      </el-form-item>
      <el-form-item label="所在服务器UUID" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" :disabled="isInptDisabled" v-model="databaseEditDetails.serverId"></el-input>
      </el-form-item>
      <el-form-item label="操作系统提供者" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="databaseEditDetails.provider" :maxlength="maxlength"></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input class="upgrade_el-input" v-model="databaseEditDetails.remark" :maxlength="maxlength"></el-input>
      </el-form-item>
      <template v-if="databaseEditDetails.extDataList !== null">
        <el-form-item :label="item.fieldName" v-for="item in databaseEditDetails.extDataList" :key="item.fieldName" :label-width="formLabelWidth">
          <el-input class="upgrade_el-input" v-model="item.fieldValue" :maxlength="maxlength"></el-input>
        </el-form-item>
      </template>

      <div style="text-align: center">
        <el-button class="action-btn" @click="updateDatabaseInfo" type="primary">保 存</el-button>
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
    databaseEditDetails: {
      type: Object
    }
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
    updateDatabaseInfo () {
      this.$emit('saveDatabaseInfoEvent', this.databaseEditDetails)
      // if (this.databaseEditDetails.remark !== this.tempRemark || this.tempExtDataList !== this.databaseEditDetails.extDataList) {
      //   this.$emit('saveDatabaseInfoEvent', this.databaseEditDetails)
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
        if (this.databaseEditDetails.extDataList === null) {
          this.databaseEditDetails.extDataList = []
        }
        this.databaseEditDetails.extDataList.push({
          fieldName: this.fieldName,
          fieldValue: this.fieldValue
        })
        console.info(JSON.stringify(this.databaseEditDetails))
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
    databaseEditDetails (val, oldValue) {
      this.databaseEditDetails = val
    }
  },
  mounted () {
    this.tempRemark = this.databaseEditDetails.remark
    this.tempExtDataList = this.databaseEditDetails.extDataList
  }
}
</script>
