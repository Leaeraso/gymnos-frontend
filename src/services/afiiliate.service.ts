import { QueryParams } from '@/types/queryParams.type'
import apiClient from './api/api.client'
import { Affiliate, AffiliateInputForm } from '@/types/affiliates.type'
import config from '@/config'

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
    return apiClient<AffiliateResponse>(config.AFFILIATE_PATH, {
      method: 'GET',
    }, queryParams)
  },

  createAffiliate: async (data: AffiliateInputForm): Promise<Affiliate> => {
    return apiClient<Affiliate>(config.AFFILIATE_PATH, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

}


