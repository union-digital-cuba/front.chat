import { Buffer } from 'buffer'

const ConvertToBase64 = (data) => {
  const buffer = Buffer.from(data)
  return buffer.toString('base64')
}

export { ConvertToBase64 }
