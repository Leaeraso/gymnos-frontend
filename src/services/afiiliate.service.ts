import { QueryParams } from '@/types/queryParams.type'
import apiClient from './api/api.client'
import { Affiliate } from '@/types/affiliates.type'

export type AffiliateResponse = {
  data: Affiliate[]
  paginate: {
    page: number | 1
    pageSize: number | 10
    total: number | 1
  }
}


export const affiliateService = {
  getAffiliate: async (queryParams?: QueryParams): Promise<AffiliateResponse> => {
    return apiClient<AffiliateResponse>('/affiliates', {
      method: 'GET',
    })
  },

}


