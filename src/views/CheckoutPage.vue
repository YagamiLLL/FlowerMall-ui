<template>
  <el-container class="checkout-container">
    <el-header class="checkout-header">
      <h2>订单结算</h2>
    </el-header>

    <el-main>
      <el-card class="order-summary" shadow="hover">
        <h3>订单详情</h3>
        <el-table :data="cartItems" border style="width: 100%">
          <el-table-column prop="name" label="商品名称" />
          <el-table-column prop="price" label="单价(元)" />
          <el-table-column prop="quantity" label="数量" />
          <el-table-column
            label="小计(元)"
            :formatter="(column, row) => formatSubtotal(row as CartItem)"
          />
        </el-table>
        <div class="order-total">
          总计：<span class="price">{{ totalPrice }} 元</span>
        </div>
        <el-button type="success" @click="submitOrder">提交订单</el-button>
      </el-card>
    </el-main>
    <el-dialog v-model="qrDialogVisible" title="扫码支付" width="400px">
      <div style="text-align: center">
        <p>请使用微信扫码支付</p>
        <img
          src="D:\development\code\FlowerMall-ui\src\assets\images\payment-qrcode.png"
          alt="支付二维码"
          style="width: 250px; margin: 20px auto"
        />
        <el-button type="primary" @click="confirmPayment">完成支付</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const qrDialogVisible = ref(false)

const confirmPayment = () => {
  qrDialogVisible.value = false
  ElMessage.success('支付成功！')
  router.push('/orders')
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  orderId: string
  orderDate: string
  totalPrice: number
  status: string
  items: CartItem[] // 新增字段
}

const router = useRouter()
const cartItems = ref<CartItem[]>([])

const loadCart = () => {
  const raw = localStorage.getItem('cart')
  const staticProducts = [
    { id: '1', title: '浪漫玫瑰花束', price: '¥199', image: 'src/assets/images/flower1.png' },
    { id: '2', title: '缤纷郁金香', price: '¥159', image: 'src/assets/images/flower1.png' },
    { id: '3', title: '清新百合花束', price: '¥179', image: 'src/assets/images/flower1.png' },
    { id: '4', title: '温柔康乃馨', price: '¥139', image: 'src/assets/images/flower1.png' },
    { id: '5', title: '永生花礼盒', price: '¥259', image: 'src/assets/images/flower1.png' },
    { id: '6', title: '清晨向日葵', price: '¥149', image: 'src/assets/images/flower1.png' },
  ]
  if (raw) {
    const localCart = JSON.parse(raw)
    cartItems.value = localCart.map((item: any) => {
      const product = staticProducts.find((p) => p.id === String(item.productId))
      return {
        id: item.productId,
        name: product?.title || '未知商品',
        price: parseFloat(product?.price.replace('¥', '') || '0'),
        quantity: item.quantity,
        image: product?.image || '',
      }
    })
  }
}

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
)

const formatSubtotal = (row: CartItem) => {
  return row.price * row.quantity
}

// 生成唯一订单 ID（简单处理，可替换为更复杂的规则）
const generateOrderId = () => {
  return 'ORD-' + Date.now().toString(36)
}

// 提交订单
const submitOrder = () => {
  if (cartItems.value.length === 0) {
    ElMessage.warning('购物车为空')
    return
  }

  const newOrder: Order = {
    id: crypto.randomUUID(),
    orderId: generateOrderId(),
    orderDate: new Date().toLocaleString(),
    totalPrice: totalPrice.value,
    status: '待支付',
    items: [...cartItems.value], // 存储商品详情
  }

  const existingOrdersRaw = localStorage.getItem('orders')
  const existingOrders: Order[] = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : []

  const updatedOrders = [...existingOrders, newOrder]
  localStorage.setItem('orders', JSON.stringify(updatedOrders))
  localStorage.removeItem('cart')

  ElMessage.success('订单提交成功，请完成支付！')
  qrDialogVisible.value = true
}

onMounted(() => {
  loadCart()
})
</script>

<style scoped lang="scss">
.checkout-container {
  min-height: 100vh;
}
.checkout-header {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
}
.order-summary {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.order-total {
  text-align: right;
  margin-top: 20px;
  font-size: 18px;
}
.price {
  font-weight: bold;
  color: #e91e63;
  margin-left: 10px;
}
</style>
