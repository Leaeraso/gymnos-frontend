import { QueryParams } from '@/types/queryParams.type'
import config from '../../config/index'

const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {},
  params?: QueryParams
): Promise<T> => {

  let url = `${config.API_URL}${endpoint}`

  if(params && Object.keys(params).length > 0) {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value != null && value != undefined)
    )
    url += `?${new URLSearchParams(cleanParams as Record<string, string>).toString()}`
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }

  return response.json()
}

export default apiClient
