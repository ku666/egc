<template>
  <div>
    <div style="width: 100%">
      <el-form ref="form" v-model="form" label-width="80px">
        <el-form-item label="事件类型" style="float:left;width:25%">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事件内容" style="float:left;width:25%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="事件状态" style="float:left;width:25%">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:left;width:25%">
          <el-button type="primary" @click="submitForm('form')">查询</el-button>
        </el-form-item>
        <el-form-item label="设备" style="float:left;width:25%">
          <el-tree :data="data"  @node-click="handleNodeClick"></el-tree>
        </el-form-item>
        <el-form-item label="开始时间" style="float:left;width:25%">
          <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" style="float:left;width:25%">
          <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item style="float:left;width:25%">
          <el-button type="primary" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 100%;clear:both">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="事件日志ID" width="180"></el-table-column>
        <el-table-column prop="type" label="事件类型" width="180"></el-table-column>
        <el-table-column prop="stime" label="开始时间"></el-table-column>
        <el-table-column prop="etime" label="结束时间"></el-table-column>
        <el-table-column prop="contain" label="事件内容"></el-table-column>
        <el-table-column prop="resource" label="资源点名称"></el-table-column>
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="state" label="事件状态"></el-table-column>
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
        type: '门禁',
        stime: 'xxxx.xx.xx.xx.xx',
        etime: 'xxxx.xx.xx.xx.xx',
        contain: 'xx事件',
        resource: 'xx小区',
        name: '设备001',
        state: '事件开始'
      }, {
        id: 2,
        type: '梯控',
        stime: 'xxxx.xx.xx.xx.xx',
        etime: 'xxxx.xx.xx.xx.xx',
        contain: 'xx事件',
        resource: 'xx小区',
        name: '设备002',
        state: '事件结束'
      }],
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
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
    },
    handleNodeClick (data) {
      console.log(data)
    }
  }

}
</script>



<style>

</style>
