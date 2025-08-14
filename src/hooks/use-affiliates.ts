import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AffiliateResponse, affiliateService } from "@/services/afiiliate.service";
import { useState } from "react";
import { QueryParams } from "@/types/queryParams.type";

export const useAffiliates = () => {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 1,
        page_size: 10,
        search: '',
        sort: 'id',
        sort_dir: 'DESC'
    })

  const { isLoading, isFetching, isError, data, isPending, error } = useQuery<AffiliateResponse>({
    queryKey: ['affiliates', queryParams.page],
    queryFn: () => affiliateService.getAffiliate(queryParams),
    placeholderData: keepPreviousData,
  });

  return {
    isLoading,
    isFetching,
    isError,
    data,
    isPending,
    error,
    queryParams,
    setQueryParams,
  }
};
