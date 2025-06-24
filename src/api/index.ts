import { RealRequest, request } from '@/utils'

export default {
  // 获取用户信息
  getUser: () => request.get('/user/detail'),
  // 刷新token
  refreshToken: () => request.get('/auth/refresh/token'),
  // 登出
  logout: () => request.post('/auth/logout', {}, { needTip: false }),
  // 切换当前角色
  switchCurrentRole: (role: string | number) => request.post(`/auth/current-role/switch/${role}`),
  // 获取角色权限
  getRolePermissions: () => request.get('/role/permissions/tree'),
  // 验证菜单路径
  validateMenuPath: (path: string) => request.get(`/permission/menu/validate?path=${path}`),
  // 获取最近的项目
  getRecentBuild: (userId: string | number) => RealRequest.get(`/user/recentBuild/${userId}`),
  // 图生代码
  getImageCode:(formData: FormData) => RealRequest.post('ai/generate-code', formData),
}
