import router from '@/router'
export function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
