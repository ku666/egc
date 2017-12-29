<template>
  <div>
    <div style="width: 100%">
      <el-form ref="form" v-model="form" label-width="80px">
        <el-form-item label="事件方式" style="float:left;width:25%">
          <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" style="float:left;width:25%">
          <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" style="float:left;width:25%">
          <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item style="float:left;width:25%">
          <el-button type="primary" @click="submitForm('form')">查询</el-button>
        </el-form-item>
        <el-form-item style="float:right;width:25%">
          <el-button type="primary" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="width:100%;clear:both">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="eid" label="事件日志编号" width="180"></el-table-column>
        <el-table-column prop="did" label="联动日志编号"></el-table-column>
        <el-table-column prop="method" label="联动方式"></el-table-column>
        <el-table-column prop="result" label="联动结果"></el-table-column>
        <el-table-column prop="order" label="联动顺序"></el-table-column>
        <el-table-column prop="time" label="联动时间"></el-table-column>
        <el-table-column prop="times" label="重复次数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        id: 1,
        eid: 'xxx',
        did: 'xxx',
        method: 'xxx',
        result: 'xxx',
        order: 1,
        time: 'xxxx.xx.xx xx.xx',
        times: 1
      }, {
        id: 2,
        eid: 'xxx',
        did: 'xxx',
        method: 'xxx',
        result: 'xxx',
        order: 2,
        time: 'xxxx.xx.xx xx.xx',
        times: 2
      }, {
        id: 3,
        eid: 'xxx',
        did: 'xxx',
        method: 'xxx',
        result: 'xxx',
        order: 3,
        time: 'xxxx.xx.xx xx.xx',
        times: 3
      }, {
        id: 4,
        eid: 'xxx',
        did: 'xxx',
        method: 'xxx',
        result: 'xxx',
        order: 4,
        time: 'xxxx.xx.xx xx.xx',
        times: 4
      }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>