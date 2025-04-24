export const addToLocalCart = (productId: string) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const existing = cart.find((item: any) => item.productId === productId)
  if (existing) {
    existing.quantity++
  } else {
    cart.push({ productId, quantity: 1 }) // 👈 必须是 productId
  }
  localStorage.setItem('cart', JSON.stringify(cart))
}
