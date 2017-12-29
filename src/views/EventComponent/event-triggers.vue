<template>
  <div>
    <div style="width:100%">
      <el-form ref="form" v-model="form" label-width="80px">
        <el-form-item label="事件类型" style="float:left;width:25%">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有序" style="float:left;width:25%">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源" style="float:left;width:25%">
          <el-tree :data="data" @node-click="handleNodeClick"></el-tree>
        </el-form-item>
        <el-form-item style="float:left;width:25%">
          <el-button type="primary" @click="submitForm('form')">查询</el-button>
        </el-form-item>
        <el-form-item style="float:right;width:25%">
          <el-button type="primary" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 100%">
      <div style="clear:both"><el-button>新增</el-button></div>
      <br>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="rule" label="联动规则ID" width="180"></el-table-column>
        <el-table-column prop="type" label="事件类型" width="180"></el-table-column>
        <el-table-column prop="resource" label="资源点"></el-table-column>
        <el-table-column prop="developer" label="创建者"></el-table-column>
        <el-table-column prop="operate" label="操作">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      numberValidateForm: {
        age: ''
      },
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
        rule: '1',
        type: '类型1',
        resource: '站点1',
        developer: 'tom',
        operate: '查看 修改 删除'
      }, {
        rule: '2',
        type: '类型2',
        resource: '站点2',
        developer: 'kim',
        operate: '查看 修改 删除'
      }, {
        rule: '3',
        type: '类型3',
        resource: '站点3',
        developer: 'jim',
        operate: '查看 修改 删除'
      }, {
        rule: '4',
        type: '类型4',
        resource: '站点4',
        developer: 'jam',
        operate: '查看 修改 删除'
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
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
