export interface StorageOptions {
  storage?: globalThis.Storage // 使用node的类型Storage，包括sessionStorage、localStorage
  prefixKey?: string
}
