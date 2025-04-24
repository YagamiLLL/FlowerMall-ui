<template>
  <div class="page">
    <!-- 主体内容区域 -->
    <main class="main">
      <div class="content">
        <section class="banner">
          <h1>用鲜花点亮生活</h1>
          <p>精选花束 · 节日送礼 · 爱意表达</p>
        </section>

        <!-- 商品展示区 -->
        <section class="product-grid">
          <div class="product-card" v-for="(product, index) in products" :key="index">
            <!-- 使用 RouterLink 包裹图片和标题，跳转到详情页 -->
            <RouterLink :to="`/productDetails/${product.id}`">
              <img :src="product.image" :alt="product.title" />
              <div class="product-info">
                <h3>{{ product.title }}</h3>
                <p>{{ product.desc }}</p>
                <div class="price">{{ product.price }}</div>
              </div>
            </RouterLink>
            <div class="product-info">
              <button @click="addToCart(product)">加入购物车</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { addToLocalCart } from '@/utils/addToLocalCart'

const addToCart = (product: any) => {
  addToLocalCart(product.id)
  ElMessage.success('已加入购物车！')
}

const products = [
  {
    id: '1',
    title: '浪漫玫瑰花束',
    desc: '适合表白、纪念日',
    price: '¥199',
    image: 'src/assets/images/flower1.png',
  },
  {
    id: '2',
    title: '缤纷郁金香',
    desc: '春意盎然的选择',
    price: '¥159',
    image: 'src/assets/images/flower1.png',
  },
  {
    id: '3',
    title: '清新百合花束',
    desc: '送给挚爱的她',
    price: '¥179',
    image: 'src/assets/images/flower1.png',
  },
  {
    id: '4',
    title: '温柔康乃馨',
    desc: '母亲节首选',
    price: '¥139',
    image: 'src/assets/images/flower1.png',
  },
  {
    id: '5',
    title: '永生花礼盒',
    desc: '传递长久的爱意',
    price: '¥259',
    image: 'src/assets/images/flower1.png',
  },
  {
    id: '6',
    title: '清晨向日葵',
    desc: '送给阳光的你',
    price: '¥149',
    image: 'src/assets/images/flower1.png',
  },
]
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fff9fb;
  color: #2d3748;
}

.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

a {
  text-decoration: none;
  color: inherit;
}

header {
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.8rem;
  color: #e94f6b;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #e94f6b;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #c23656;
}

.main {
  flex: 1;
  padding: 60px 0;
  display: flex;
  justify-content: center;
}

.content {
  width: 70%;
}

.banner {
  background-color: #fbe6eb;
  padding: 60px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 60px;
}

.banner h1 {
  font-size: 2.4rem;
  margin-bottom: 1rem;
}

.banner p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.banner button {
  background-color: #e94f6b;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.banner button:hover {
  background-color: #c23656;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.product-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.product-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.product-info p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.product-info .price {
  font-weight: bold;
  color: #e94f6b;
  margin-bottom: 1rem;
}

.product-info button {
  background: #e94f6b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
}

.product-info button:hover {
  background: #c23656;
}
</style>
