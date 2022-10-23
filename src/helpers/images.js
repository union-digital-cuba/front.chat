import { Buffer } from 'buffer'
import { CustomTypes } from 'common/CustomTypes'

const ConvertToBase64 = (data) => {
  const buffer = Buffer.from(data)
  return buffer.toString('base64')
}

const GetSrcDependingOfType = (type, image) => {
  return type === CustomTypes.ImageTypes.web ? `data:image/svg+xml;base64,${image}` : `images/avatars/${image}`
}

export { ConvertToBase64, GetSrcDependingOfType }
