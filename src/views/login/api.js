import { RealRequest, request } from '@/utils'

export default {
  toggleRole: data => request.post('/auth/role/toggle', data),
  login: data => RealRequest.post('/auth/login', data, { needToken: false }),
  getUser: () => request.get('/user/detail'),
}
