<template>
  <div class="register-container">
    <el-form :model="registerForm" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="registerForm.confirmPassword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister" :loading="loading">注册</el-button>
        <el-button @click="$router.push('/login')">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import request from '../../utils/request'
import type { Result } from '@/types/api'
import type { AxiosError } from 'axios'
// 类型定义
interface RegisterForm {
  username: string
  password: string
  confirmPassword: string
}

const router = useRouter()
const loading = ref(false)

// 表单数据
const registerForm = reactive<RegisterForm>({
  username: '',
  password: '',
  confirmPassword: '',
})

// 表单实例引用
const formRef = ref<FormInstance>()

// 校验规则
const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

// 注册处理函数
const handleRegister = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    loading.value = true
    try {
      const res = await request.post<Result<null>>('/user/register', registerForm)
      if (res.data.code === 200) {
        ElMessage.success(res.data.message || '注册成功')
        router.push('/login')
      } else {
        ElMessage.error(res.data.message || '注册失败')
      }
    } catch (err) {
      const error = err as AxiosError<Result>
      const message = error.response?.data?.message || '注册失败'
      ElMessage.error(message)
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.register-container {
  width: 400px;
  margin: 100px auto;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
