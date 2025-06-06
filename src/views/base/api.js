import { RealRequest, request } from '@/utils'

export default {
  generateCode: data => RealRequest.post('/ai/generate-code', data)
}