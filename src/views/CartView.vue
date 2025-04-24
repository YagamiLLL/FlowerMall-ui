<template>
  <el-container class="cart-container">
    <!-- 购物车标题 -->
    <el-header class="cart-header">
      <h2>我的购物车</h2>
    </el-header>

    <!-- 购物车内容 -->
    <el-main>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="cartItems.length === 0" class="empty-cart">购物车为空</div>

      <el-card v-for="(item, index) in cartItems" :key="index" class="cart-item" shadow="hover">
        <el-row>
          <el-col :span="4">
            <img :src="item.image" alt="product image" class="cart-item-image" />
          </el-col>
          <el-col :span="14">
            <h3>{{ item.name }}</h3>
            <p>单价：{{ item.price }}元</p>
            <div class="quantity">
              <el-button
                size="small"
                @click="decreaseQuantity(item.id)"
                :disabled="item.quantity <= 1"
                >-</el-button
              >
              <span>{{ item.quantity }}</span>
              <el-button size="small" @click="increaseQuantity(item.id)">+</el-button>
            </div>
          </el-col>
          <el-col :span="6" class="total-price">
            <p>总价：{{ item.price * item.quantity }}元</p>
            <el-button size="small" type="danger" @click="removeItem(item.id)">删除</el-button>
          </el-col>
        </el-row>
      </el-card>

      <!-- 总计和清空购物车 -->
      <div v-if="cartItems.length > 0" class="cart-footer">
        <p>购物车总价：{{ totalPrice }}元</p>
        <el-button type="danger" @click="clearCart">清空购物车</el-button>
        <el-button type="primary" @click="goToCheckout">去结算</el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

const goToCheckout = () => {
  router.push('/checkout')
}
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

const cartItems = ref<CartItem[]>([])
const loading = ref(true)

// 假设的静态商品数据
const staticProducts = [
  {
    id: '1',
    title: '浪漫玫瑰花束',
    price: '¥199',
    image: 'src/assets/images/flower1.png',
  },
  {
    id: '2',
    title: '缤纷郁金香',
    price: '¥159',
    image: 'src/assets/images/flower1.png',
  },
  {
    id: '3',
    title: '清新百合花束',
    price: '¥179',
    image: 'src/assets/images/flower1.png',
  },
  {
    id: '4',
    title: '温柔康乃馨',
    price: '¥139',
    image: 'src/assets/images/flower1.png',
  },
  {
    id: '5',
    title: '永生花礼盒',
    price: '¥259',
    image: 'src/assets/images/flower1.png',
  },
  {
    id: '6',
    title: '清晨向日葵',
    price: '¥149',
    image: 'src/assets/images/flower1.png',
  },
]

// 从 localStorage 获取购物车数据
const loadCart = () => {
  const raw = localStorage.getItem('cart')
  if (raw) {
    const localCart = JSON.parse(raw)
    // 遍历购物车中的商品 ID，匹配静态商品数据
    cartItems.value = localCart.map((item: any) => {
      const product = staticProducts.find((p) => p.id === item.productId)
      return {
        id: item.productId,
        name: product?.title || '未知商品', // 获取商品名称
        price: parseFloat(product?.price.replace('¥', '') || '0'), // 获取商品价格并转换为数字
        quantity: item.quantity,
        image: product?.image || '', // 获取商品图片
      }
    })
  }
  loading.value = false
}

// 更新 localStorage 中购物车
const saveCart = () => {
  const cartData = cartItems.value.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }))
  localStorage.setItem('cart', JSON.stringify(cartData))
}

// 增加数量
const increaseQuantity = (id: string) => {
  const item = cartItems.value.find((item) => item.id === id)
  if (item) {
    item.quantity++
    saveCart()
  }
}

// 减少数量
const decreaseQuantity = (id: string) => {
  const item = cartItems.value.find((item) => item.id === id)
  if (item && item.quantity > 1) {
    item.quantity--
    saveCart()
  }
}

// 删除商品
const removeItem = (id: string) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id)
  saveCart()
  ElMessage.success('商品已移除')
}

// 清空购物车
const clearCart = () => {
  cartItems.value = []
  localStorage.removeItem('cart')
  ElMessage.success('购物车已清空')
}

// 总价计算
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
})

// 页面加载时获取购物车数据
onMounted(() => {
  loadCart()
})
</script>

<style scoped lang="scss">
.cart-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.cart-header {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
}

.cart-item {
  margin-bottom: 20px;
}

.cart-item-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.total-price {
  text-align: right;
}

.cart-footer {
  text-align: center;
  margin-top: 20px;
}

.empty-cart {
  text-align: center;
  font-size: 1.2rem;
  color: #999;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>
