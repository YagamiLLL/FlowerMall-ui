<template>
  <div class="product-detail">
    <div v-if="product">
      <img :src="product.image" :alt="product.title" class="product-image" />
      <div class="info">
        <h1>{{ product.title }}</h1>
        <p>{{ product.desc }}</p>
        <div class="price">{{ product.price }}</div>
        <el-button type="primary" @click="addToCart(product)">加入购物车</el-button>
      </div>
    </div>
    <div v-else>
      <p>未找到该商品</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

// 与主页同样的数据
const allProducts = [
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

const route = useRoute()
const productId = route.params.id
const product = allProducts.find((p) => p.id === productId)

const addToCart = (product: any) => {
  ElMessage.success('已加入购物车！')
}
</script>

<style scoped>
.product-detail {
  max-width: 800px;
  margin: 50px auto;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.info {
  flex: 1;
}

.info h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.info p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.info .price {
  font-size: 1.5rem;
  color: #e94f6b;
  margin-bottom: 1.5rem;
}
</style>
