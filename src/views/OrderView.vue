<template>
  <el-container class="order-container">
    <!-- 订单标题 -->
    <el-header class="order-header">
      <h2>我的订单</h2>
    </el-header>

    <!-- 订单内容 -->
    <el-main>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="orders.length === 0" class="empty-orders">您还没有订单</div>

      <el-card v-for="order in orders" :key="order.id" class="order-item" shadow="hover">
        <el-row>
          <el-col :span="12">
            <h3>订单号：{{ order.orderId }}</h3>
            <p>订单日期：{{ order.orderDate }}</p>
          </el-col>
          <el-col :span="6" class="total-price">
            <p>总价：{{ order.totalPrice }}元</p>
          </el-col>
          <el-col :span="6" class="order-status">
            <p>状态：{{ order.status }}</p>
            <el-button size="small" type="primary" @click="viewOrderDetails(order.id)">
              查看详情
            </el-button>
            <el-button
              size="small"
              type="danger"
              v-if="order.status === '待支付'"
              @click="cancelOrder(order.id)"
            >
              取消订单
            </el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-dialog
        v-model="dialogVisible"
        title="订单详情"
        width="600px"
        :before-close="
          () => {
            dialogVisible = false
          }
        "
      >
        <template v-if="selectedOrder">
          <p><strong>订单号：</strong>{{ selectedOrder.orderId }}</p>
          <p><strong>下单时间：</strong>{{ selectedOrder.orderDate }}</p>
          <p><strong>状态：</strong>{{ selectedOrder.status }}</p>
          <p><strong>总价：</strong>{{ selectedOrder.totalPrice }} 元</p>

          <el-table :data="selectedOrder.items" style="margin-top: 20px" border>
            <el-table-column prop="name" label="商品名称" />
            <el-table-column prop="price" label="单价(元)" />
            <el-table-column prop="quantity" label="数量" />
            <el-table-column
              label="小计(元)"
              :formatter="(_, row: CartItem) => row.price * row.quantity"
            />
          </el-table>
        </template>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
  items: CartItem[]
}

const orders = ref<Order[]>([])
const loading = ref(true)
const dialogVisible = ref(false)
const selectedOrder = ref<Order | null>(null)

const fetchOrders = () => {
  const raw = localStorage.getItem('orders')
  if (raw) {
    orders.value = JSON.parse(raw)
  }
  loading.value = false
}

const viewOrderDetails = (orderId: string) => {
  const order = orders.value.find((o) => o.id === orderId)
  if (order) {
    selectedOrder.value = order
    dialogVisible.value = true
  }
}

const cancelOrder = (orderId: string) => {
  orders.value = orders.value.filter((order) => order.id !== orderId)
  localStorage.setItem('orders', JSON.stringify(orders.value))
}

onMounted(() => {
  fetchOrders()
})
</script>

<style scoped lang="scss">
.order-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.order-header {
  background-color: #e88a8a;
  padding: 20px;
  text-align: center;
}

.order-item {
  margin-bottom: 20px;
}

.order-item .total-price {
  text-align: right;
}

.order-item .order-status {
  text-align: right;
}

.order-footer {
  text-align: center;
  margin-top: 20px;
}

.empty-orders {
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
