<template>
  <h1>部门管理</h1>
  <div class="container">
    <el-button type="primary" @click="addDept">+ 新增部门</el-button>
  </div>

  <div class="container">
    <el-table :data="deptList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="name" label="部门名称" width="260" align="center" />
      <el-table-column prop="updateTime" label="最后操作时间" width="300" align="center" />
      <el-table-column label="操作" align="center">
        <template #default>
          <el-button type="primary" size="small"
            ><el-icon><Edit /></el-icon>编辑</el-button
          >
          <el-button type="danger" size="small"
            ><el-icon><Delete /></el-icon>删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogFormVisible" :title="fromTitle" width="500">
    <el-form :model="dept" :rules="rules" ref="deptFromRef">
      <el-form-item label="部门名称" :label-width="'80px'" prop="name">
        <el-input v-model="dept.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { queryAllApi, addApi } from '../../api/dept'
import { ElMessage } from 'element-plus'

//钩子函数
onMounted(() => {
  search()
})

//对话框
const dialogFormVisible = ref(false)
const fromTitle = ref('')
const dept = ref({ name: '' })

//新增部门
const addDept = () => {
  dialogFormVisible.value = true
  fromTitle.value = '新增部门'
  dept.value.name = ''
  //重置表单校验规则提示信息
  if (deptFromRef.value) {
    deptFromRef.value.resetFields()
  }
}

//保存部门
const save = async () => {
  //表单校验
  if (!deptFromRef.value) return
  deptFromRef.value.validate(async (valid) => {
    //valid表示是否校验通过
    if (valid) {
      const result = await addApi(dept.value)
      if (result.code) {
        //成功
        //提示信息
        ElMessage.success('新增成功')
        //关闭窗口
        dialogFormVisible.value = false
        //刷新页面
        search()
      } else {
        //失败
        ElMessage.error(result.msg)
      }
    } else {
      ElMessage.error('表单校验失败')
    }
  })
}

//表单校验规则
const rules = ref({
  name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    { min: 2, max: 20, message: '部门名称长度在2到20个字符之间', trigger: 'blur' }
  ]
})

//查询
const search = async () => {
  const result = await queryAllApi()
  if (result.code) {
    //js中隐式类型转换, 0 -> false, 其他数字 -> true
    deptList.value = result.data
  }
}

//部门列表
const deptFromRef = ref()

//表单引用
const deptList = ref([])
</script>

<style scoped>
.container {
  margin: 10px 0px;
}
</style>
