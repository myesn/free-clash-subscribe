import type { VercelRequest, VercelResponse } from '@vercel/node'
import dayjs from 'dayjs'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const clashSubscribeAddress = getClashSubscribeAddress()
  console.log('clashSubscribeAddress: ', clashSubscribeAddress)
  const response = await fetch(clashSubscribeAddress)
  const configYaml = await response.text()

  res.setHeader('Content-Type', 'application/octet-stream')

  return res.send(configYaml)
}

function getClashSubscribeAddress() {
  const now = dayjs()
  const year = now.format('YYYY')
  const month = now.format('MM')
  const day = now.format('DD')

  return `https://freeclash.org/wp-content/uploads/${year}/${month}/${month}${day}.yaml`
}
