<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
        <el-button @click="$router.push('/register')">去注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import request from '../../utils/request'
import { type ApiError, type Result } from '../../types/api'
// 新增Result类型定义（如果后端已定义可忽略）

// 登录表单类型
interface LoginForm {
  username: string
  password: string
}

const router = useRouter()
const loading = ref(false)
const formRef = ref<FormInstance>()

// 表单数据
const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
})

// 表单校验规则
const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

// 登录处理函数
const handleLogin = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    loading.value = true
    try {
      const res = await request.post<Result<string>>('/user/login', loginForm)
      if (res.data.code === 200) {
        console.log('Login response:', res)
        console.log('Received token:', res.data.data)
        localStorage.setItem('token', res.data.data)
        console.log('Stored token in localStorage:', localStorage.getItem('token'))
        ElMessage.success(res.data.message || '登录成功')
        router.push('/home')
      } else {
        ElMessage.error(res.data.message || '登录失败')
      }
    } catch (err) {
      const apiError = err as ApiError
      ElMessage.error(apiError.response?.data?.message || '登录失败')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-container {
  width: 400px;
  margin: 100px auto;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
