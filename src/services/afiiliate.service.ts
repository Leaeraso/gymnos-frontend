import apiClient from './api/api.client'

export const affiliateService = {
  getAffiliate: async (queryParams?: unknown): Promise<unknown> => {
    return apiClient<unknown>('/affiliates', {
      method: 'GET',
    })
  },
}
