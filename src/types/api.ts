// ../types/api.ts
export type ApiError = {
  response?: {
    data?: {
      message: string
    }
  }
}
// 为避免使用 'any' 类型，这里将泛型 T 的默认值设为 'unknown'，'unknown' 比 'any' 更安全，因为在使用前需要进行类型检查
export type Result<T = unknown> = {
  code: number
  message: string
  data: T
}
