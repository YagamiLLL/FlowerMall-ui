<template>
  <el-container class="app-layout">
    <!-- 顶部导航栏 -->
    <el-header class="navbar">
      <div class="navbar-container">
        <RouterLink to="/home" class="logo">🌸 Floral Palace</RouterLink>
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          background-color="white"
          text-color="#e94f6b"
          active-text-color="#c23656"
          class="nav-menu"
        >
          <el-menu-item v-for="link in navLinks" :key="link.path" :index="link.path">
            <RouterLink :to="link.path" @click="handleNavClick(link.path)">{{
              link.name
            }}</RouterLink>
          </el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <!-- 页面内容 -->
    <el-main class="main-view">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </el-main>

    <!-- 页脚 -->
    <el-footer class="footer">
      <p>© 2025 Floral Palace 用鲜花装点美好生活</p>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 模拟登录状态
const isLoggedIn = ref(false) // 修改为实际的登录状态逻辑

const navLinks = ref([
  { name: '首页', path: '/home' },
  { name: '分类', path: '/category' },
  { name: '购物车', path: '/cart' },
  { name: '我的订单', path: '/orders' },
  { name: isLoggedIn.value ? '个人中心' : '登录', path: isLoggedIn.value ? '/profile' : '/login' },
])

const activeIndex = ref('/')

// 动态更新activeIndex
activeIndex.value = route.path

// 处理导航点击逻辑
const handleNavClick = (path: string) => {
  if (path === '/profile' && !isLoggedIn.value) {
    // 如果未登录且点击了个人中心，跳转到登录页面
    router.push('/login')
  }
}
</script>

<style scoped lang="scss">
$app-width: 100%;
$primary-color: #e94f6b;
$text-color: #e94f6b;
$bg-color: #fdf4f7;

.app-layout {
  min-height: 100vh;
  background-color: $bg-color;
  display: flex;
  flex-direction: column;
}

.navbar {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 70px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: $primary-color;
  text-decoration: none;
}

.nav-menu {
  border-bottom: none;
  background-color: white;
}

.nav-menu .el-menu-item {
  font-size: 1.1rem;
}

.main-view {
  width: 100%;
  flex: 1;
  padding-top: 20px;
}

.footer {
  background: linear-gradient(to right, #e94f6b, #f28599);
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer p {
  font-size: 0.95rem;
  opacity: 0.9;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
