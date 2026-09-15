<script setup>
import { ref, watch } from 'vue'

//搜索表单对象
const searchEmp = ref({
  name: '',
  gender: '',
  date: [],
  begin: '',
  end: ''
})

//查询员工列表
const search = () => {
  console.log('查询员工列表', searchEmp.value)
}

//清空
const clean = () => {
  searchEmp.value = {
    name: '',
    gender: '',
    date: [],
    begin: '',
    end: ''
  }
  search()
}

//侦听searchEmp对象的变化
watch(
  () => searchEmp.value.date,
  (newVal) => {
    if (newVal.length == 2) {
      searchEmp.value.begin = newVal[0]
      searchEmp.value.end = newVal[1]
    } else {
      searchEmp.value.begin = ''
      searchEmp.value.end = ''
    }
  },
  { deep: true }
)

//watch 侦听器----------演示-----------
//1.侦听一个响应式数据
// const a = ref('')
// watch(a, (newVal, oldVal) => {
//   console.log('a changed from', oldVal, 'to', newVal)
// })

//2.侦听一个对象
// const obj = ref({
//   name: '',
//   age: 0
// })
// watch(
//   obj,
//   (newVal, oldVal) => {
//     console.log('obj changed from', oldVal, 'to', newVal)
//   },
//   { deep: true }
// )

//3.侦听对象中的某一个属性
// const user = ref({
//   name: '',
//   age: 0
// })
// watch(
//   () => user.value.name,
//   (newVal, oldVal) => {
//     console.log('user.name changed from', oldVal, 'to', newVal)
//   }
// )
</script>

<template>
  <h1>员工管理</h1>
  <!-- 搜索栏 -->
  <div class="container">
    <el-form :inline="true" :model="searchEmp" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="searchEmp.name" placeholder="请输入员工姓名" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="searchEmp.gender" placeholder="请选择">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="入职日期">
        <el-date-picker
          v-model="searchEmp.date"
          type="daterange"
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="info" @click="clean">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.container {
  margin: 20px 0;
}
</style>
