import config from '../../config/index'

const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${config.API_URL}${endpoint}`, {
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
