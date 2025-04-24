<template>
  <el-container class="category-container">
    <el-header>
      <div class="category-header">
        <h2>花材分类</h2>
      </div>
    </el-header>

    <el-main>
      <div class="category-content">
        <div class="category-nav">
          <a
            v-for="(cat, index) in categories"
            :key="index"
            @click="toggleCategory(cat)"
            :class="{ active: selectedCategory === cat }"
          >
            {{ cat }}
          </a>
        </div>
      </div>

      <div class="product-grid">
        <div v-for="(product, index) in filteredFlowers" :key="index" class="product-card">
          <el-card>
            <RouterLink :to="`/productDetails/${product.id}`">
              <img :src="product.image" alt="flower" class="product-image" />
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p>{{ product.description }}</p>
                <div class="price">{{ product.price }}</div>
              </div>
            </RouterLink>
            <div class="product-info">
              <el-button size="small" type="primary" @click="addToCart(product)"
                >加入购物车</el-button
              >
            </div>
          </el-card>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { addToLocalCart } from '@/utils/addToLocalCart'
import { ElMessage } from 'element-plus'
const addToCart = (product: any) => {
  addToLocalCart(product.id)
  ElMessage.success('已加入购物车！')
}

import { ref, computed } from 'vue'

interface Flower {
  id: string
  name: string
  description: string
  price: string
  image: string
  category: string
}

const categories = ['全部', '玫瑰', '康乃馨', '百合', '郁金香', '向日葵']

const selectedCategory = ref('全部')

const products = ref<Flower[]>([
  {
    id: '1',
    name: '红玫瑰花束',
    description: '热情似火的告白之选',
    price: '¥199',
    image: 'src/assets/images/flower1.png',
    category: '玫瑰',
  },
  {
    id: '2',
    name: '粉玫瑰花束',
    description: '浪漫甜美的爱意',
    price: '¥189',
    image: 'src/assets/images/flower1.png',
    category: '玫瑰',
  },
  {
    id: '3',
    name: '白百合花束',
    description: '纯洁优雅的象征',
    price: '¥179',
    image: 'src/assets/images/flower1.png',
    category: '百合',
  },
  {
    id: '4',
    name: '康乃馨花束',
    description: '母亲节的温情选择',
    price: '¥159',
    image: 'src/assets/images/flower1.png',
    category: '康乃馨',
  },
  {
    id: '5',
    name: '黄色郁金香',
    description: '充满希望与祝福',
    price: '¥149',
    image: 'src/assets/images/flower1.png',
    category: '郁金香',
  },
  {
    id: '6',
    name: '向日葵花束',
    description: '阳光灿烂的正能量',
    price: '¥139',
    image: 'src/assets/images/flower1.png',
    category: '向日葵',
  },
])

const toggleCategory = (cat: string) => {
  selectedCategory.value = cat
}

const filteredFlowers = computed(() => {
  if (selectedCategory.value === '全部') {
    return products.value
  }
  return products.value.filter((f) => f.category === selectedCategory.value)
})
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.category-container {
  display: flex;
  flex-direction: column;
  // height: 100vh;
}

.category-header {
  padding: 20px;
  background-color: #f5f5f5;
  text-align: center;
}

.category-header h2 {
  font-size: 2rem;
  color: #e94f6b;
}
.category-content a.active {
  background: #e94f6b;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(233, 79, 107, 0.3);
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 每行五个商品 */
  gap: 2rem;
  padding: 20px;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.product-info {
  padding: 10px;
  text-align: center;
}

.product-info h3 {
  font-size: 1.1rem;
  color: #333;
}

.product-info p {
  font-size: 0.9rem;
  color: #666;
  margin: 8px 0;
}

.product-info .price {
  font-size: 1.2rem;
  color: #e94f6b;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-info button {
  background-color: #e94f6b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.product-info button:hover {
  background-color: #c23656;
}

.category-content {
  background: white;
  padding: 1rem 2rem;
  margin: 1.5rem auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  max-width: 1200px;
}

.category-nav {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6列布局 */
  gap: 0.8rem;
  padding: 0.5rem 0;
}

.category-content a {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 0;
  font-size: 0.95rem;
  color: #e94f6b;
  background: #fbe6eb;
  border-radius: 20px;
  transition: all 0.3s ease;
  text-align: center;
  white-space: nowrap;
}

.category-content a:hover {
  background: #e94f6b;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(233, 79, 107, 0.3);
}

/* 响应式适配 */
@media (max-width: 1200px) {
  .category-nav {
    grid-template-columns: repeat(6, minmax(120px, 1fr));
  }
}

@media (max-width: 992px) {
  .category-nav {
    grid-template-columns: repeat(3, 1fr); /* 中等屏幕显示为4行 */
    gap: 0.6rem;
  }
}

@media (max-width: 576px) {
  .category-nav {
    grid-template-columns: repeat(2, 1fr); /* 小屏幕显示为6行 */
  }

  .category-content {
    padding: 0.8rem;
  }
}
</style>
