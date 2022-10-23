import { Buffer } from 'buffer'

const ConvertToBase64 = (data) => {
  const buffer = Buffer.from(data)
  return buffer.toString('base64')
}

const GetImage = (image) => {
  return `data:image/svg+xml;base64,${image}`

  // return type === CustomTypes.ImageTypes.web ? `data:image/svg+xml;base64,${image}` : `images/avatars/${image}`
}

export { ConvertToBase64, GetImage }
